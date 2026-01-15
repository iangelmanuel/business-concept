"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth.config"
import { prisma } from "@/lib/prisma-config"
import { ProductsToOrderSchema } from "@/schema"
import type { AddressForm, ProductToOrderType } from "@/types"

export async function placeOrder(
  productsData: ProductToOrderType[],
  address: AddressForm
) {
  const session = await auth()
  if (!session) {
    return {
      ok: false,
      message: "No autorizado"
    }
  }
  const userId = session.user.id

  const result = ProductsToOrderSchema.safeParse(productsData)
  if (!result.success) {
    return {
      ok: false,
      message: "Datos incorrectos"
    }
  }

  const { data: validProductData } = result
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: validProductData.map((product) => product.productId)
      }
    }
  })

  const itemsInOrder = validProductData.reduce((acc, p) => acc + p.quantity, 0)

  const { subtotal, discount, tax, total } = validProductData.reduce(
    (acc, items) => {
      const productQuantity = items.quantity
      const product = products.find((p) => p.id === items.productId)

      if (!product) throw new Error(`${items.productId} no existe - 500`)

      if (product.discount !== 1) {
        const productDiscount = product.discount * product.price
        acc.discount += productDiscount * productQuantity
      } else {
        acc.discount += 0
      }

      const subtotal = product.price * productQuantity
      acc.subtotal += subtotal
      acc.tax += subtotal * 0.035
      acc.total += subtotal * 0.035 + subtotal - acc.discount

      return acc
    },
    { subtotal: 0, discount: 0, tax: 0, total: 0 }
  )

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      const updatedProductsPromises = products.map(async (product) => {
        const productQuantity = validProductData
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0)

        if (productQuantity === 0) {
          throw new Error(`${product.id}, no tiene cantidad definida`)
        }

        return await tx.product.update({
          where: { id: product.id },
          data: {
            stock: {
              decrement: productQuantity
            }
          }
        })
      })

      const updatedProducts = await Promise.all(updatedProductsPromises)
      updatedProducts.forEach((product) => {
        if (product.stock < 0) {
          return {
            ok: false,
            message: "Producto sin stock disponible"
          }
        }
      })

      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subtotal,
          discount,
          tax,
          total,
          OrderItem: {
            createMany: {
              data: validProductData.map((p) => ({
                quantity: p.quantity,
                productId: p.productId,
                discount: products.find((product) => product.id === p.productId)
                  ?.discount,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0
              }))
            }
          }
        }
      })

      const orderId = order.id
      const orderAddress = await tx.orderAddress.create({
        data: {
          firstName: address.firstName,
          lastName: address.lastName,
          typeOfIdentification: address.typeOfIdentification,
          identification: address.identification,
          address: address.address,
          address2: address.address2,
          postalCode: address.postalCode,
          department: address.department,
          city: address.city,
          phone: address.phone,
          extraData: address.extraData,
          orderId
        }
      })

      return {
        order,
        updatedProducts,
        orderAddress
      }
    })

    revalidatePath("/dashboard/purchases")
    revalidatePath("/admin/orders")

    return {
      ok: true,
      message: "Pedido creado con éxito",
      orderId: prismaTx.order.id
    }
  } catch (error) {
    return {
      ok: false,
      message: "Error al crear el pedido"
    }
  }
}

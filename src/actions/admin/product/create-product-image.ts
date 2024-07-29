"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth.config"
import { prisma } from "@/lib"
import type { ProductAllType } from "@/types"
import type { UploadApiResponse } from "cloudinary"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function createProductImage(
  formData: FormData,
  id: ProductAllType["id"],
  slug: ProductAllType["slug"]
) {
  try {
    const session = await auth()
    if (!session) {
      return {
        ok: false,
        message: "No autorizado"
      }
    }

    const isAdmin = session.user.role.includes("admin")
    if (!isAdmin) {
      return {
        ok: false,
        message: "No autorizado"
      }
    }

    const images = formData.getAll("images") as File[]
    if (!images) {
      return {
        ok: false,
        message: "Datos incorrectos"
      }
    }

    images.forEach(async (image) => {
      const byte = await image.arrayBuffer()
      const buffer = Buffer.from(byte)

      const cloudinaryResponse = (await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "Business Concept",
              public_id: `${slug}-${id}-${Date.now()}`,
              resource_type: "image"
            },
            (error, result) => {
              if (error) {
                reject(error)
              }

              resolve(result)
            }
          )
          .end(buffer)
      })) as UploadApiResponse | undefined

      if (!cloudinaryResponse) {
        return {
          ok: false,
          message: "Error al subir la imagen del producto"
        }
      }

      await prisma.product.update({
        where: {
          id
        },
        data: {
          productImage: {
            create: {
              url: cloudinaryResponse.secure_url,
              publicId: cloudinaryResponse.public_id
            }
          }
        }
      })
    })

    revalidatePath("/admin/products")
    revalidatePath("/")
    revalidatePath("/shop/products")
    revalidatePath("/shop/products/[category]", "page")
    revalidatePath("/shop/product/[slug]", "page")
    revalidatePath("/shop/cart")
    revalidatePath("/shop/checkout")

    return {
      ok: true,
      message: "Imagen del producto subida correctamente"
    }
  } catch (error) {
    return {
      ok: false,
      message: "Error al subir la imagen del producto"
    }
  }
}

"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth.config"
import { prisma } from "@/lib"
import { ProductCreateSchema } from "@/schema"
import type { ProductCreateForm } from "@/types"
import { createSlugForProduct } from "@/utils"
import type { UploadApiResponse } from "cloudinary"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function createProduct(data: ProductCreateForm) {
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

    const { images: formData, ...restOfData } = data
    const result = ProductCreateSchema.safeParse(restOfData)
    if (!result.success) {
      return {
        ok: false,
        message: "Datos incorrectos"
      }
    }

    if (formData instanceof FormData) {
      const slug = createSlugForProduct(result.data.name)
      const images = formData.getAll("images") as File[]

      const cloudinaryResponse = images.map(async (image) => {
        const byte = await image.arrayBuffer()
        const buffer = Buffer.from(byte)

        return (await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "Business Concept",
                public_id: `${slug}-${crypto.randomUUID()}-${Date.now()}`,
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
      })

      const imageData = await Promise.all(cloudinaryResponse)
      if (typeof imageData === "undefined") {
        return {
          ok: false,
          message: "Error al subir las imágenes"
        }
      }

      await prisma.product.create({
        data: {
          ...result.data,
          slug,
          categoryId: result.data.categoryId,

          productImage: {
            createMany: {
              data: imageData.map((image) => {
                return {
                  url: image!.secure_url,
                  publicId: image!.public_id
                }
              })
            }
          }
        }
      })
    }

    revalidatePath("/admin/products")
    revalidatePath("/admin/products/[slug]", "page")
    revalidatePath("/")
    revalidatePath("/shop/products")
    revalidatePath("/shop/products/[slug]", "page")
    revalidatePath("/shop/products/[category]", "page")

    return {
      ok: true,
      message: "Producto creado correctamente"
    }
  } catch (error) {
    return {
      ok: false,
      message: "Error al crear el producto"
    }
  }
}

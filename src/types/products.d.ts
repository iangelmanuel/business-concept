import type {
  ProductGeneralSchema,
  ProductImage,
  ProductsSchema
} from "@/schema"
import type { z } from "zod"

export type ProductType = z.infer<typeof ProductGeneralSchema>
export type ProductAllType = z.infer<typeof ProductsSchema>
export type ProductImage = z.infer<typeof ProductImage>

import { CategoryGenralSchema } from '../../category/category-schema'
import { ProductGeneralSchema } from '../../products/products-schema'
import { z } from 'zod'

export const ProductCreateSchema = ProductGeneralSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
})

export const ProductUpdateSchema = ProductCreateSchema.omit({
  slug: true
}).extend({ category: CategoryGenralSchema })

export const ProductUpdateActionSchema = z.object({
  categoryId: CategoryGenralSchema.shape.id,
  ...ProductUpdateSchema.omit({ category: true }).shape
})

export const AddProductsDiscount = z.object({
  discount: ProductGeneralSchema.shape.discount
})

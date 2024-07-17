import { CategoryGenralSchema } from '../../category/category-schema'
import { ProductGeneralSchema } from '../../products/products-schema'
import { z } from 'zod'

export const ProductCreateSchema = ProductGeneralSchema.omit({
  id: true,
  slug: true,
  createdAt: true,
  updatedAt: true
}).extend({
  categoryId: CategoryGenralSchema.shape.id
})

export const ProductUpdateSchema = ProductGeneralSchema.omit({
  slug: true
}).extend({
  category: CategoryGenralSchema
})

export const ProductUpdateActionSchema = z.object({
  categoryId: CategoryGenralSchema.shape.id,
  ...ProductCreateSchema.omit({ categoryId: true }).shape
})

export const AddProductsDiscount = z.object({
  discount: ProductGeneralSchema.shape.discount
})

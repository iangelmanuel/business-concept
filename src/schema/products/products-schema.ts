import { z } from 'zod'

import { CategorySchema } from '../category/category-schema'

export const ProductImage = z.object({
  id: z.string(),
  url: z.string(),
  productId: z.string()
})

export const ProductsSchema = z.object({
  category: CategorySchema,
  productImage: z.array(ProductImage),
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const ProductsCategorySchema = z.object({
  category: CategorySchema,
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const ProductsImageSchema = z.object({
  productImage: z.array(ProductImage),
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  categoryId: z.number()
})

export const ProductsDbSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  categoryId: z.number()
})

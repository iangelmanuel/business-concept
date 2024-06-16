import { z } from 'zod'

const category = z.object({
  id: z.number(),
  name: z.string()
})

const productImage = z.object({
  id: z.number(),
  url: z.string(),
  productId: z.number()
})

export const ProductsSchema = z.object({
  category,
  productImage: z.array(productImage),
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const ProductsCategorySchema = z.object({
  category,
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const ProductsImageSchema = z.object({
  productImage: z.array(productImage),
  id: z.number(),
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
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  categoryId: z.number()
})

import type { ProductImage } from '@prisma/client'

export type CartProduct = {
  id: string
  slug: string
  name: string
  price: number
  stock: number
  quantity: number
  image: ProductImage[]
}

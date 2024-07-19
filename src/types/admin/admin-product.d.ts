import type { ProductCreateSchema, ProductUpdateSchema } from '@/schema'
import type { z } from 'zod'

export type ProductCreateForm = z.infer<typeof ProductCreateSchema> & {
  images: FormData | File[]
}

export type ProductUpdateForm = z.infer<typeof ProductUpdateSchema>

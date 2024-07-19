import { z } from 'zod'

export const CategoryGenralSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(50)
})

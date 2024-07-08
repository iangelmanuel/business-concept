import { z } from 'zod'

export const sendEmailUserSchema = z.object({
  subject: z.string(),
  email: z.string().email().trim(),
  userFullName: z.string(),
  message: z.string()
})

import { z } from "zod"

export const SendEmailUserSchema = z.object({
  subject: z.string(),
  email: z
    .string()
    .email()
    .trim()
    .transform((value) => value.toLowerCase()),
  userFullName: z.string().min(3).max(100),
  message: z.string().min(5).max(500)
})

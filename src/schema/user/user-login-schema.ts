import { z } from 'zod'

export const userLoginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6)
  })
  .transform((data) => ({
    email: data.email.toLocaleLowerCase(),
    password: data.password
  }))

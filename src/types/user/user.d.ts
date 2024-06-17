import type { loginUserSchema, userCreateSchema, userSchema } from '@/schema'
import type { z } from 'zod'

export type User = z.infer<typeof userSchema>

// Register
export type RegisterUser = z.infer<typeof userCreateSchema>

// Login
export type LoginUser = z.infer<typeof loginUserSchema>

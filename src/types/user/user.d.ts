import type {
  authUserSchema,
  changeUserPasswordSchema,
  loginUserSchema,
  updateUserSchema,
  userCreateSchema
} from '@/schema'
import type { z } from 'zod'

export type User = z.infer<typeof userSchema>

// Register
export type RegisterUser = z.infer<typeof userCreateSchema>

// Login
export type LoginUser = z.infer<typeof loginUserSchema>

// Auth
export type AuthUser = z.infer<typeof authUserSchema>

export type UpdateUser = z.infer<typeof updateUserSchema>

export type ChangeUserPassword = z.infer<typeof changeUserPasswordSchema>

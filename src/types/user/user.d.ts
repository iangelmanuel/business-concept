import type {
  ChangeUserPasswordSchema,
  LoginUserSchema,
  RegisterUserSchema,
  UpdateUserSchema,
  UserGeneralSchema
} from '@/schema'
import type { z } from 'zod'

export type UserType = z.infer<typeof UserGeneralSchema>

// Register
export type RegisterUser = z.infer<typeof RegisterUserSchema>

// Login
export type LoginUser = z.infer<typeof LoginUserSchema>

// Update
export type UpdateUser = z.infer<typeof UpdateUserSchema>

// Change password
export type ChangeUserPassword = z.infer<typeof ChangeUserPasswordSchema>

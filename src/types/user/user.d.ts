import type {
  AuthUserSchema,
  ChangeUserPasswordSchema,
  LoginUserSchema,
  UpdateUserSchema,
  UserCreateSchema,
  UserDataSchema
} from '@/schema'
import type { z } from 'zod'

export type UserType = z.infer<typeof UserDataSchema>

export type User = z.infer<typeof userSchema>

// Register
export type RegisterUser = z.infer<typeof UserCreateSchema>

// Login
export type LoginUser = z.infer<typeof LoginUserSchema>

// Auth
export type AuthUser = z.infer<typeof AuthUserSchema>

export type UpdateUser = z.infer<typeof UpdateUserSchema>

export type ChangeUserPassword = z.infer<typeof ChangeUserPasswordSchema>

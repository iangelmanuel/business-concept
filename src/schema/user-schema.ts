import { z } from 'zod'

export const UserGeneralSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(50),
  lastname: z.string().min(3).max(50),
  email: z
    .string()
    .email()
    .trim()
    .transform((value) => value.toLowerCase()),
  phone: z.string().max(15),
  role: z.enum(['admin', 'user']),
  isConfirmed: z.boolean().default(false),
  isUserDeleted: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const RegisterUserSchema = z
  .object({
    email: UserGeneralSchema.shape.email,
    name: UserGeneralSchema.shape.name,
    lastname: UserGeneralSchema.shape.lastname,
    phone: UserGeneralSchema.shape.phone,
    password: z.string().min(8),
    repeatPassword: z.string()
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ['repeatPassword']
  })

export const LoginUserSchema = z.object({
  email: UserGeneralSchema.shape.email,
  password: z.string().min(8)
})

export const UpdateUserSchema = z.object({
  name: UserGeneralSchema.shape.name,
  lastname: UserGeneralSchema.shape.lastname,
  email: UserGeneralSchema.shape.email
})

export const ChangeUserPasswordSchema = z.object({
  password: z.string(),
  newPassword: z.string().min(8),
  confirmNewPassword: z.string()
})

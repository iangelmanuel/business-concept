import { UserGeneralSchema } from '@/schema/user-schema'
import { z } from 'zod'

export const UpdateUserByAdmin = z.object({
  name: UserGeneralSchema.shape.name,
  lastname: UserGeneralSchema.shape.lastname,
  email: UserGeneralSchema.shape.email,
  phone: UserGeneralSchema.shape.phone,
  role: UserGeneralSchema.shape.role,
  isConfirmed: UserGeneralSchema.shape.isConfirmed,
  isUserDeleted: UserGeneralSchema.shape.isUserDeleted
})

import { z } from 'zod'
import { UserGeneralSchema } from './user-schema'

export const ContactGeneralSchema = z.object({
  id: z.string(),
  fullName: z.string().min(3).max(100),
  phone: z.string().max(15),
  email: z.string().email().trim(),
  createdAt: z.date()
})

export const ContactFullDataSchema = z.object({
  ...ContactGeneralSchema.shape,
  ContactMessage: z.array(
    z.object({
      id: z.string(),
      userRole: UserGeneralSchema.shape.role,
      message: z.string().max(255),
      createdAt: ContactGeneralSchema.shape.createdAt,
      contactId: ContactGeneralSchema.shape.id,
      user: UserGeneralSchema.nullable()
    })
  )
})

export const CreateContactSchema = z.object({
  fullName: ContactGeneralSchema.shape.fullName,
  phone: ContactGeneralSchema.shape.phone,
  email: ContactGeneralSchema.shape.email,
  message: z.string().max(255)
})

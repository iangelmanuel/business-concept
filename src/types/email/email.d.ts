import type { sendEmailUserSchema } from '@/schema'

export type SendEmailUserSchema = z.infer<typeof sendEmailUserSchema>

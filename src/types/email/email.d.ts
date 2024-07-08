import type { SendEmailUserSchema } from '@/schema'

export type SendEmailUserType = z.infer<typeof SendEmailUserSchema>

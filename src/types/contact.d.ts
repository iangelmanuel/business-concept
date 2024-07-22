import type {
  ContactFullDataSchema,
  ContactGeneralSchema,
  CreateContactSchema
} from '@/schema'
import type { z } from 'zod'

export type ContactType = z.infer<typeof ContactGeneralSchema>
export type ContactAllType = z.infer<typeof ContactFullDataSchema>
export type ContactFormType = z.infer<typeof CreateContactSchema>

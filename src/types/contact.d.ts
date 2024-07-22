import type { ContactFullDataSchema, ContactGeneralSchema } from '@/schema'
import type { z } from 'zod'

export type ContactType = z.infer<typeof ContactGeneralSchema>
export type ContactAllType = z.infer<typeof ContactFullDataSchema>

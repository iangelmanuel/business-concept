import type { UpdateUserByAdmin } from "@/schema"
import type { z } from "zod"

export type UpdateUserByAdminType = z.infer<typeof UpdateUserByAdmin>

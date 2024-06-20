'use server'

import { prisma } from '@/lib'
import { locationsSchema } from '@/schema'

export async function getLocationData() {
  try {
    const locationData = await prisma.location.findMany({
      orderBy: {
        department: 'asc'
      }
    })
    const result = locationsSchema.safeParse(locationData)
    if (!result.success) {
      return []
    }
    return result.data
  } catch (error) {
    return []
  }
}

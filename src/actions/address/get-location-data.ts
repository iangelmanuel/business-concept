"use server"

import { prisma } from "@/lib/prisma-config"
import { LocationsSchema } from "@/schema"

export async function getLocationData() {
  try {
    const locationData = await prisma.location.findMany({
      orderBy: {
        department: "asc"
      }
    })

    const result = LocationsSchema.safeParse(locationData)
    if (!result.success) {
      return []
    }

    return result.data
  } catch (error) {
    return []
  }
}

"use server"

import { auth } from "@/auth.config"
import type { EpaycoResponse } from "@/types"

export async function getRefPaycoData(refPayco: string) {
  try {
    const session = await auth()
    if (!session) {
      return { ok: false }
    }

    if (!refPayco) {
      return { ok: false }
    }

    const url = `https://secure.epayco.co/validation/v1/reference/${refPayco}`
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EPAYCO_PUBLIC_KEY}`
      },
      cache: "force-cache"
    })
    const dataPayco = (await response.json()) as EpaycoResponse

    return { ok: true, dataPayco }
  } catch (error) {
    return { ok: false }
  }
}

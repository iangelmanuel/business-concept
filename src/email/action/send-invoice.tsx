"use server"

import { auth } from "@/auth.config"
import { SendInvoiceTemplate } from "@/email"
import type { EpaycoResponse, SendEmailUserType } from "@/types"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendInvoice(
  email: SendEmailUserType["email"],
  dataPayco: EpaycoResponse
) {
  try {
    const session = await auth()
    if (!session) return { ok: false }

    const responseResend = await resend.emails.create({
      from: "Business Concept <businessconcept@resend.dev>",
      to: email,
      subject: "Correo de prueba",
      react: <SendInvoiceTemplate dataPayco={dataPayco} />
    })

    if (responseResend.error !== null) {
      return { ok: false }
    }

    return { ok: true }
  } catch (error) {
    return { ok: false }
  }
}

'use server'

import { UserEmailTemplate } from '../template/user-email-template'
import { auth } from '@/auth.config'
import { sendEmailUserSchema } from '@/schema'
import { Resend } from 'resend'

type Props = {
  subject: string
  email: string
  userFullName: string
  message: string
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendUserEmail({
  subject,
  email,
  userFullName,
  message
}: Props) {
  try {
    const session = await auth()
    if (!session) return { ok: false, message: 'No autorizado' }

    const isAdmin = session.user.role.includes('admin')
    if (!isAdmin) return { ok: false, message: 'No autorizado' }

    const result = sendEmailUserSchema.safeParse({
      subject,
      email,
      userFullName,
      message
    })
    if (!result.success) return { ok: false, message: 'Datos inválidos' }

    const responseResend = await resend.emails.create({
      from: 'Business Concept <businessconcept@resend.dev>',
      to: result.data.email,
      subject: result.data.subject,
      react: (
        <UserEmailTemplate
          message={result.data.message}
          userFullName={result.data.userFullName}
        />
      )
    })

    if (responseResend.error !== null) {
      return { ok: false, message: 'No se pudo enviar el correo electrónico' }
    }

    return {
      ok: true,
      message: 'Correo electrónico enviado'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo enviar el correo electrónico'
    }
  }
}

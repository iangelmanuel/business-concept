'use server'

import { UserEmailTemplate } from '../template/user-email-template'
import { auth } from '@/auth.config'
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

    await resend.emails.create({
      from: 'Business Concept <businessconcept@resend.dev>',
      to: email,
      subject,
      react: (
        <UserEmailTemplate
          message={message}
          userFullName={userFullName}
        />
      )
    })

    return {
      ok: true,
      message: 'Correo electrónico enviado'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'No se pudo enviar el correo electrónico'
    }
  }
}

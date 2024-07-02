import { ChangePasswordForm, DeleteUserAccount } from '@/components'
import { fontSans } from '@/config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Seguridad y Privacidad - Business Concept',
  description:
    'En esta sección puedes cambiar tu contraseña y eliminar tu cuenta de usuario en Business Concept. ¡Cuida tu información!',
  keywords:
    'seguridad, privacidad, contraseña, eliminar cuenta, usuario, Business Concept',
  robots: 'noindex, nofollow'
}

export default function SecurityPrivacyPage() {
  return (
    <article>
      <h1 className={`${fontSans.className} text-2xl font-bold`}>
        Seguridad y Privacidad
      </h1>

      <ChangePasswordForm />
      <DeleteUserAccount />
    </article>
  )
}

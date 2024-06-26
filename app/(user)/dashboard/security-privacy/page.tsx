import { ChangePasswordForm, DeleteUserAccount } from '@/components'
import { fontSans } from '@/config'

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

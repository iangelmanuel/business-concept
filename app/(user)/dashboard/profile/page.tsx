import { getUserById } from '@/actions'
import { auth } from '@/auth.config'
import { UpdateUserForm } from '@/components'
import { titleFont } from '@/config'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Perfil - Business Concept',
  description:
    'Actualiza tu información personal para que podamos enviarte tus compras.',
  keywords:
    'perfil, actualizar, información, personal, compras, dirección de envío',
  robots: 'noindex, nofollow'
}

export default async function ProfilePage() {
  const session = await auth()
  if (!session) return redirect('/auth/login')
  if (!session.user) return redirect('/auth/login')
  const userIdSession = session?.user.id

  const userDb = await getUserById(userIdSession)
  const user = userDb.user!
  return (
    <article>
      <h1 className={`${titleFont.className} text-2xl font-bold`}>
        Cuenta de {user.name} {user.lastname}
      </h1>

      <UpdateUserForm user={user} />
    </article>
  )
}

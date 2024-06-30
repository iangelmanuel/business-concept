import { getUserById } from '@/actions'
import { auth } from '@/auth.config'
import { UpdateUserForm } from '@/components'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const session = await auth()
  if (!session) return redirect('/auth/login')
  if (!session.user) return redirect('/auth/login')
  const userIdSession = session?.user.id

  const userDb = await getUserById(userIdSession)
  const user = userDb.user!
  return (
    <article>
      <h1 className="text-2xl font-bold">
        Cuenta de {user.name} {user.lastname}
      </h1>

      <UpdateUserForm user={user} />
    </article>
  )
}

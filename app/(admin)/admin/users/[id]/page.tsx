import { findUserById } from '@/actions'
import type { UserType } from '@/types'
import { notFound } from 'next/navigation'

export default async function UserIdPage({
  params
}: {
  params: { id: UserType['id'] }
}) {
  const { id } = params
  const user = await findUserById(id)
  if (!user) notFound()
  return (
    <div>
      <h1>Hola {user.name}</h1>
    </div>
  )
}

import type { Metadata } from 'next'
import { auth } from '@/auth.config'
import { Card, CardContent, CardHeader } from '@/components'
import { titleFont } from '@/config'
import { formatDate } from '@/utils'

export const metadata: Metadata = {
  title: 'Admin Perfil - Business Concept',
  description: 'Administrador de la tienda en línea Business Concept'
}

export default async function ProfilePage() {
  const session = await auth()
  const user = session!.user
  return (
    <section>
      <Card className="mb-5">
        <CardHeader>
          <h1
            className={`${titleFont.className} text-center text-2xl font-bold sm:text-6xl`}
          >
            Bienvenido al perfil Administrativo de Business Concept
          </h1>
        </CardHeader>
      </Card>

      <Card className="mx-auto max-w-screen-md">
        <CardHeader>
          <h2
            className={`${titleFont.className} text-center text-xl font-semibold`}
          >
            Perfil de {user.name} {user.lastname}
          </h2>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between">
            <p className="font-bold">ID:</p>
            <p>{user.id}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-bold">Email:</p>
            <p>{user.email}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-bold">Teléfono:</p>
            <p>{user.phone}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-bold">Rol:</p>
            <p>{user.role}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-bold">Fecha de Creación:</p>
            <p>{formatDate(user.createdAt)}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-bold">Fecha de Actualización:</p>
            <p>{formatDate(user.updatedAt)}</p>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

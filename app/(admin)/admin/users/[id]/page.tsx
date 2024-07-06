import { UpdateUserFromAdminForm } from '../ui/update-user-from-admin-form'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  deleteUserById,
  findUserById,
  getLocationData,
  getUserAddressById,
  getUserOrdersById
} from '@/actions'
import {
  AddressForm,
  AddressUser,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  OrderGrid,
  buttonVariants
} from '@/components'
import { titleFont } from '@/config'
import type { UserType } from '@/types'
import { ReturnPage } from '@/utils'
import { toast } from 'sonner'

export async function generateMetadata({
  params
}: {
  params: { id: UserType['id'] }
}): Promise<Metadata> {
  const { id } = params
  const user = await findUserById(id)
  if (!user) notFound()

  return {
    title: `${user.name} ${user.lastname} - Business Concept `,
    description: `Administra a ${user.name} ${user.lastname} en Business Concept`
  }
}

export default async function UserIdPage({
  params
}: {
  params: { id: UserType['id'] }
}) {
  const { id } = params
  const user = await findUserById(id)
  if (!user) notFound()

  const location = await getLocationData()
  const userData = await getUserAddressById(id)
  const userOrders = await getUserOrdersById(id)

  const userAddresses = userData!.addresses

  const handleActionDeleteUser = async () => {
    'use server'
    const response = await deleteUserById(id)
    if (response.ok) {
      toast.success(response.message, {
        duration: 3000,
        position: 'top-right'
      })
    } else {
      toast.error(response.message, {
        duration: 3000,
        position: 'top-right'
      })
    }
  }

  const { isUserDeleted, isConfirmed } = user
  const textIsDeleted = isUserDeleted ? 'Eliminada' : 'Activa'
  const variantIsDeleted = isUserDeleted ? 'destructive' : 'success'

  const textIsConfirmed = isConfirmed ? 'Confirmado' : 'Sin confirmar'
  const variantIsConfirmed = isConfirmed ? 'success' : 'destructive'

  const textIsAdmin = user.role === 'admin' ? 'Admin' : 'Usuario'
  const variantIsAdmin = user.role === 'admin' ? 'admin' : 'user'

  return (
    <article>
      <h1 className={`${titleFont.className} mb-3 text-2xl font-bold`}>
        Datos del usuario {user.name} {user.lastname}
      </h1>

      <ReturnPage />

      <Card className="mx-auto max-w-screen-lg">
        <CardHeader>
          <h2 className={`${titleFont.className} text-xl font-bold`}>
            Datos personales
          </h2>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <strong>Nombre:</strong>{' '}
            <p>
              {user.name} {user.lastname}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <strong>Correo:</strong> <p>{user.email}</p>
          </div>

          <div className="flex items-center justify-between">
            <strong>Télefono:</strong> <p>{user.phone}</p>
          </div>

          <div className="flex items-center justify-between">
            <strong>Rol:</strong>{' '}
            <Badge
              variant={variantIsAdmin}
              className="uppercase"
            >
              {textIsAdmin}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <strong>Estado de Cuenta:</strong>{' '}
            <Badge variant={variantIsDeleted}>{textIsDeleted}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <strong>Confirmación:</strong>{' '}
            <Badge variant={variantIsConfirmed}>{textIsConfirmed}</Badge>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-x-3">
          {/* Dialog de Editar Usuario */}
          <Dialog>
            <DialogTrigger>
              <span className={buttonVariants()}>Editar Usuario</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-screen-md">
              <DialogHeader>
                <DialogTitle>Editar el pérfil del usuario</DialogTitle>
                <DialogDescription>
                  Actualiza la información del usuario.
                </DialogDescription>
              </DialogHeader>
              {/* UpdateUserFromAdminForm */}
              <UpdateUserFromAdminForm user={user} />
            </DialogContent>
          </Dialog>

          {/* AlertDialog de Eliminar Usuario */}
          <AlertDialog>
            <AlertDialogTrigger>
              <span className={buttonVariants({ variant: 'ghost' })}>
                Eliminar Usuario
              </span>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  ¿Estás seguro que quieres eliminar al usuario?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  Esta acción no se puede deshacer y eliminará permanentemente
                  al usuario.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <form action={handleActionDeleteUser}>
                  <AlertDialogAction
                    className={buttonVariants({ variant: 'destructive' })}
                  >
                    <button type="submit">Eliminar</button>
                  </AlertDialogAction>
                </form>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>

      <Card className="mx-auto mt-5 max-w-screen-lg">
        <CardHeader>
          <h2 className={`${titleFont.className} text-xl font-bold`}>
            Datos de Direcciones
          </h2>
        </CardHeader>

        <CardContent>
          {userAddresses!.length === 0 ? (
            <>
              <CardDescription className="mb-3">
                El usuario no tiene direcciones registradas.
              </CardDescription>

              <AddressForm location={location} />
            </>
          ) : (
            <AddressUser
              location={location}
              addressDb={userAddresses}
            />
          )}
        </CardContent>
      </Card>

      <Card className="mx-auto mt-5 max-w-screen-lg">
        <CardHeader>
          <h2 className={`${titleFont.className} text-xl font-bold`}>
            Datos de Ordenes
          </h2>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {userOrders.length !== 0 ? (
            userOrders.map((order) => (
              <OrderGrid
                key={order.id}
                order={order}
                isAdmin
                userId={id}
              />
            ))
          ) : (
            <CardDescription>
              El usuario no tiene ordenes registradas.
            </CardDescription>
          )}
        </CardContent>
      </Card>
    </article>
  )
}

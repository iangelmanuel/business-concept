'use client'

import { useTransition } from 'react'
import { deleteUserAddress, updateUserAddress } from '@/actions'
import {
  AddressForm,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Spinner,
  buttonVariants
} from '@/components'
import { titleFont } from '@/config'
import { useAddressFormStore } from '@/store'
import type { AddressType, LocationType } from '@/types'
import { Pencil, TrashIcon } from 'lucide-react'
import { toast } from 'sonner'

interface Props {
  location: LocationType[]
  addressDb: AddressType[]
}

export const AddressUser = ({ location, addressDb }: Props) => {
  const [isPending, startTransition] = useTransition()

  const isAddressFormActive = useAddressFormStore(
    (state) => state.isAddressFormActive
  )
  const toggleAddressForm = useAddressFormStore(
    (state) => state.toggleAddressForm
  )

  const handleUpdateAddress = async (address: AddressType) => {
    startTransition(async () => {
      const response = await updateUserAddress(address)
      if (response.ok) {
        toast.success('¡Todo salió bien!', {
          description: response.message,
          duration: 3000,
          position: 'top-right'
        })
      } else {
        toast.error('Ocurrio un problema', {
          description: response.message,
          duration: 3000,
          position: 'top-right'
        })
      }
    })
  }

  const handleClickDelete = async (id: AddressType['id']) => {
    startTransition(async () => {
      const response = await deleteUserAddress(id)
      if (response.ok) {
        toast.success('¡Todo salió bien!', {
          description: response.message,
          duration: 3000,
          position: 'top-right'
        })
      } else {
        toast.error('Ocurrio un problema', {
          description: response.message,
          duration: 3000,
          position: 'top-right'
        })
      }
    })
  }

  const handleClickShowForm = () => {
    toggleAddressForm()
  }

  return (
    <>
      <article className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {addressDb.map((address) => (
          <Card key={address.id}>
            <CardHeader>
              <h2 className={`${titleFont.className} text-xl font-semibold`}>
                {address.firstName} {address.lastName}
              </h2>
              <CardDescription>
                <span className="capitalize">
                  {address.address}, {address.city}, {address.department}
                </span>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p>Télefono: {address.phone}</p>
              <p>
                Identificación: {address.typeOfIdentification}{' '}
                {address.identification}
              </p>
            </CardContent>

            <CardFooter className="flex flex-col md:flex-row">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-xs text-gray-500"
                  >
                    <Pencil size={16} />
                    Editar Dirección
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-screen-lg">
                  <DialogHeader>
                    <DialogTitle>Editar dirección</DialogTitle>
                    <DialogDescription>
                      Actualiza tu dirección de envío.
                    </DialogDescription>
                  </DialogHeader>
                  {/* Update Address Form */}
                  <AddressForm
                    location={location}
                    address={address}
                    handleUpdateAddress={handleUpdateAddress}
                  />
                  <DialogFooter>
                    <Button
                      type="submit"
                      disabled={isPending}
                      form="update-address"
                    >
                      {isPending ? (
                        <>
                          Actualizando dirección
                          <Spinner />
                        </>
                      ) : (
                        'Guardar nueva dirección'
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-xs text-gray-500"
                  >
                    <TrashIcon size={16} />
                    Eliminar Dirección
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      ¿Estás seguro de eliminar esta dirección?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. Esto eliminará
                      permanentemente su cuenta y eliminará su datos de nuestros
                      servidores.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleClickDelete(address.id)}
                      className={buttonVariants({ variant: 'destructive' })}
                    >
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </article>

      <article className="mt-5">
        <section className={isAddressFormActive ? 'mb-10' : ''}>
          <Button
            onClick={handleClickShowForm}
            disabled={isPending}
            className="w-full"
          >
            {isAddressFormActive ? 'Ocultar formulario' : 'Agregar dirección'}
          </Button>
        </section>

        {isAddressFormActive && <AddressForm location={location} />}
      </article>
    </>
  )
}

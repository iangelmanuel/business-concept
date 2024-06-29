'use client'

import { deleteUserAddress } from '@/actions'
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
  buttonVariants
} from '@/components'
import { useAddressFormStore } from '@/store'
import type { AddressType, LocationType } from '@/types'
import { TrashIcon } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

type Props = {
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

  const handleClickDelete = async (id: AddressType['id']) => {
    startTransition(async () => {
      const response = await deleteUserAddress(id)
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
    })
  }

  const handleClickShowForm = () => {
    toggleAddressForm()
  }

  return (
    <>
      <article className="grid grid-cols-1 sm:grid-cols-2 p-5 gap-3">
        {addressDb.map((address) => (
          <Card key={address.id}>
            <div>
              <CardHeader>
                <h2 className="text-xl font-semibold">
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
            </div>

            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex gap-2 items-center text-gray-500 text-xs"
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

      <article>
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

'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deleteUserAddress } from '@/actions'
import {
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
  CardAddressForm,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  buttonVariants
} from '@/components'
import { titleFont } from '@/config'
import { useAddressStore, useCartStore } from '@/store'
import type { AddressType, LocationType } from '@/types'
import { TrashIcon } from 'lucide-react'
import { toast } from 'sonner'

interface Props {
  location: LocationType[]
  addressDb: AddressType[]
}

export const CardAddressUser = ({ location, addressDb }: Props) => {
  const [isFormActive, setIsFormActive] = useState(false)
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const setAddress = useAddressStore((state) => state.setAddress)
  const cart = useCartStore((state) => state.cart)

  const isCartEmpty = cart.length === 0

  if (isCartEmpty) {
    router.push('/shop/cart?redirect=/shop/address')
    toast.error('El carrito esta vacio', {
      description: 'Intenta agregando productos al carrito',
      duration: 3000,
      position: 'top-right'
    })
  }

  const handleClickSelect = (address: AddressType) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, userId, ...restAddress } = address
    setAddress(restAddress)
    router.push('/shop/checkout')
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
    setIsFormActive(!isFormActive)
  }

  return (
    <>
      <article className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2">
        {addressDb.map((address) => (
          <Card
            key={address.id}
            className="cursor-pointer hover:border-gray-400"
          >
            <div onClick={() => handleClickSelect(address)}>
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
            </div>

            <CardFooter>
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

      <article>
        <section className={isFormActive ? 'mb-10' : ''}>
          <Button
            onClick={handleClickShowForm}
            disabled={isCartEmpty || isPending}
            className="w-full"
          >
            {isFormActive ? 'Ocultar formulario' : 'Agregar dirección'}
          </Button>
        </section>

        {isFormActive && <CardAddressForm location={location} />}
      </article>
    </>
  )
}

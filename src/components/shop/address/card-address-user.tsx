'use client'

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
import { useAddressStore, useCartStore } from '@/store'
import type { AddressType, LocationType } from '@/types'
import { TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

type Props = {
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
    toast.error('No se puede agregar direcciones en este momento', {
      duration: 3000,
      description: 'Intenta agregando productos al carrito',
      position: 'top-right'
    })
  }

  const handleClickSelect = (address: AddressType) => {
    setAddress(address)
    router.push('/shop/checkout')
  }

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
    setIsFormActive(!isFormActive)
  }

  return (
    <>
      <article className="grid grid-cols-1 sm:grid-cols-2 p-5 gap-3">
        {addressDb.map((address) => (
          <Card
            key={address.id}
            className="hover:border-gray-400 cursor-pointer"
          >
            <div onClick={() => handleClickSelect(address)}>
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

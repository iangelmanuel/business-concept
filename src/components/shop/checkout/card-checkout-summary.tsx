'use client'

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardSummaryLoading
} from '@/components'
import { useAddressStore, useCartStore } from '@/store'
import { formatCurrency } from '@/utils'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export const CardCheckoutSummary = () => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const address = useAddressStore((state) => state.address)
  const { subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInfo()
  )

  useEffect(() => {
    setLoading(false)
  }, [])

  const isAddressEmpty = Object.keys(address).length === 0

  if (isAddressEmpty) {
    router.push('/shop/address?redirect=/shop/checkout')
    toast.error('No se puede acceder al pedido en este momento', {
      duration: 3000,
      description: 'Intenta agregando una dirección al pedido',
      position: 'top-right'
    })
  }

  const handleClickNextStep = () => {
    router.push('/shop/payment')
  }

  const prom = 0.25

  if (loading) return <CardSummaryLoading />

  return (
    <article className="mt-10 order-1 lg:order-2">
      <Card className="md:sticky md:top-0">
        <CardHeader>
          <h2 className="text-2xl font-bold">Resumen de la compra</h2>
          <CardDescription>
            Por favor, revisa los productos seleccionados antes de proceder al
            pago.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <article className="space-y-2">
            <h3 className="text-lg font-bold mb-3">Dirección de envío</h3>
            <section className="mb-3 text-sm sm:text-base">
              <div className="flex justify-between">
                <p>Recibe:</p>
                <p className="capitalize">
                  {address.firstName} {address.lastName}
                </p>
              </div>

              <div className="flex justify-between">
                <p>Documento:</p>
                <p>
                  {address.typeOfIdentification} {address.identification}
                </p>
              </div>

              <div className="flex justify-between">
                <p>Télefono:</p>
                <p>{address.phone}</p>
              </div>

              <div className="flex justify-between">
                <p>Departamento:</p>
                <p className="capitalize">{address.department}</p>
              </div>

              <div className="flex justify-between">
                <p>Ciudad:</p>
                <p className="capitalize">{address.city}</p>
              </div>

              <div className="flex justify-between">
                <p>Código Postal:</p>
                <p>{address.postalCode}</p>
              </div>

              <div className="flex justify-between">
                <p>Dirección:</p>
                <p>{address.address}</p>
              </div>

              {address.address2 && (
                <div className="flex justify-between">
                  <p>Dirección 2:</p>
                  <p>{address.address2}</p>
                </div>
              )}

              {address.extraData && (
                <div className="flex justify-between">
                  <p>Información adicional:</p>
                  <p>{address.extraData}</p>
                </div>
              )}
            </section>

            <h3 className="text-lg font-bold mb-3">Detalles de Precio</h3>
            <section className="space-y-3 mb-3 text-sm sm:text-base">
              <div className="flex justify-between">
                <p>Subtotal:</p>
                <p>{formatCurrency(subTotal)}</p>
              </div>

              <div className="flex justify-between">
                <p>Descuento:</p>
                <p>{formatCurrency(subTotal * prom)}</p>
              </div>

              <div className="flex justify-between">
                <p>Impuestos:</p>
                <p>{formatCurrency(subTotal * tax)}</p>
              </div>

              <div className="flex justify-between">
                <p>Total:</p>
                <p className="font-bold">{formatCurrency(total)}</p>
              </div>
            </section>
          </article>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full"
            onClick={handleClickNextStep}
          >
            Proceder al Método de Pago
          </Button>
        </CardFooter>
      </Card>
    </article>
  )
}

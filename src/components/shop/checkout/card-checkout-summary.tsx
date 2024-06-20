'use client'

import { Button, Card, CardContent, CardFooter, CardHeader } from '@/components'
import { useAddressStore, useCartStore } from '@/store'
import { formatCurrency } from '@/utils'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const CardCheckoutSummary = () => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const address = useAddressStore((state) => state.address)
  const { subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInfo()
  )

  if (!address) {
    router.push('/shop/address?redirect=/shop/checkout')
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  const handleClickNextStep = () => {
    if (!address) {
      return router.push('/shop/address?redirect=/shop/checkout')
    } else {
      router.push('/shop/payment')
    }
  }

  const prom = 0.25

  if (loading) return <p>Cargando...</p>

  return (
    <article className="col-span-1">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Resumen de la compra</h2>
        </CardHeader>

        <CardContent>
          <section className="space-y-2">
            <h3 className="text-lg font-bold mb-3">Dirección de envío</h3>
            <article className="mb-3">
              <div className="flex justify-between">
                <p>Recibe:</p>
                <p>
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
                <p>{address.department}</p>
              </div>

              <div className="flex justify-between">
                <p>Ciudad:</p>
                <p>{address.city}</p>
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
            </article>

            <h3 className="text-lg font-bold mb-3">Detalles de Precio</h3>
            <article className="space-y-3">
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
            </article>
          </section>
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

'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  PaymentSummaryLoading,
  buttonVariants
} from '@/components'
import { useCartStore } from '@/store'
import { formatCurrency } from '@/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const PaymentSummary = () => {
  const [loaded, setLoaded] = useState(false)

  const {
    subTotal,
    tax: taxValue,
    total,
    itemsInCart
  } = useCartStore((state) => state.getSummaryInfo())

  const prom = 0.25

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) return <PaymentSummaryLoading />
  return (
    <>
      <Card className="mx-auto w-2/6 p-2 h-[420px] sticky top-0">
        {loaded && itemsInCart > 0 && (
          <CardHeader>
            <h2 className="text-xl font-bold mb-3">
              Resumen de la compra ({itemsInCart})
            </h2>
          </CardHeader>
        )}

        <CardContent>
          <article className="space-y-3">
            <section className="flex justify-between">
              <p>Subtotal</p>
              <p>{formatCurrency(subTotal)}</p>
            </section>

            <section className="flex justify-between">
              <p>Descuento</p>
              <p>{formatCurrency(subTotal * prom)}</p>
            </section>

            <section className="flex justify-between">
              <p>Impuestos</p>
              <p>{formatCurrency(subTotal * taxValue)}</p>
            </section>

            <section className="flex justify-between">
              <p>Total</p>
              <p>{formatCurrency(total)}</p>
            </section>
          </article>
        </CardContent>

        <CardFooter>
          <Link
            href="/shop/address"
            className={buttonVariants({ className: 'w-full' })}
          >
            Proceder con la Compra
          </Link>
        </CardFooter>
      </Card>
    </>
  )
}

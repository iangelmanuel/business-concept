'use client'

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CartSummaryLoading
} from '@/components'
import { useCartStore } from '@/store'
import { formatCurrency } from '@/utils'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const CardCartSummary = () => {
  const [loaded, setLoaded] = useState(false)
  const { data: session } = useSession()

  const router = useRouter()

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

  const handleClickNextStep = () => {
    if (!session) {
      router.push('/auth/login?callbackUrl=/shop/checkout')
    } else {
      router.push('/shop/address')
    }
  }

  const isAuth = !!session

  if (!loaded) return <CartSummaryLoading />
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
          <Button
            disabled={!isAuth}
            onClick={handleClickNextStep}
            className="w-full"
          >
            {isAuth ? 'Continuar con el pago' : 'Iniciar sesión para pagar'}
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

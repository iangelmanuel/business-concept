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

  const { subTotal, discont, tax, total, itemsInCart } = useCartStore((state) =>
    state.getSummaryInfo()
  )
  const cart = useCartStore((state) => state.cart)

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
  const isCartEmpty = cart.length === 0

  if (!loaded) return <CartSummaryLoading />
  return (
    <article className="order-1 lg:order-2">
      <Card className="md:sticky md:top-0">
        <CardHeader>
          <h2 className="text-xl font-bold mb-3">
            Resumen de la compra ({itemsInCart})
          </h2>
        </CardHeader>

        <CardContent>
          <article className="space-y-3">
            <section className="flex justify-between">
              <p>Subtotal</p>
              <p>{formatCurrency(subTotal)}</p>
            </section>

            {discont && discont > 0 ? (
              <section className="flex justify-between">
                <p>Descuento</p>
                <p>{formatCurrency(discont)}</p>
              </section>
            ) : null}

            <section className="flex justify-between">
              <p>Tarifa de Compra</p>
              <p>{formatCurrency(tax)}</p>
            </section>

            <section className="flex justify-between">
              <p>Total</p>
              <p>{formatCurrency(total)}</p>
            </section>
          </article>
        </CardContent>

        <CardFooter>
          <Button
            disabled={!isAuth || isCartEmpty}
            onClick={handleClickNextStep}
            className="w-full"
          >
            {isAuth ? 'Continuar' : 'Inicia sesión'}
          </Button>
        </CardFooter>
      </Card>
    </article>
  )
}

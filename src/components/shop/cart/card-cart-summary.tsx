'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CartSummaryLoading
} from '@/components'
import { titleFont } from '@/config'
import { useCartStore } from '@/store'
import { formatCurrency } from '@/utils'

export const CardCartSummary = () => {
  const [loaded, setLoaded] = useState(false)
  const { data: session } = useSession()

  const router = useRouter()

  const { subTotal, discount, tax, total, itemsInCart } = useCartStore(
    (state) => state.getSummaryInfo()
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
    <section className="order-1 lg:order-2">
      <Card className="md:sticky md:top-0">
        <CardHeader>
          <h2 className={`${titleFont.className} mb-3 text-xl font-bold`}>
            Resumen de la compra ({itemsInCart})
          </h2>
        </CardHeader>

        <CardContent>
          <article className="space-y-3">
            <section className="flex justify-between">
              <p>Subtotal</p>
              <p>{formatCurrency(subTotal)}</p>
            </section>

            {discount > 0 && (
              <section className="flex justify-between">
                <p>Descuento</p>
                <p>{formatCurrency(discount)}</p>
              </section>
            )}

            <section className="flex justify-between">
              <p>Impuestos</p>
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
            disabled={isCartEmpty}
            onClick={handleClickNextStep}
            className="w-full"
          >
            {isAuth
              ? 'Continuar'
              : isCartEmpty
                ? 'Carrito vacío'
                : 'Iniciar sesión'}
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}

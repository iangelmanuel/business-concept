'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardItemsLoading
} from '@/components'
import { useCartStore } from '@/store'
import { formatCurrency } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export const CardCheckoutItems = () => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const cart = useCartStore((state) => state.cart)

  const isCartEmpty = cart.length === 0

  if (isCartEmpty) {
    router.push('/shop/cart?redirect=/shop/checkout')
    toast.error('No se puede acceder al pedido en este momento', {
      duration: 3000,
      description: 'Intenta agregando productos al carrito',
      position: 'top-right'
    })
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) return <CardItemsLoading />

  const prom = 0.25
  return (
    <Card className="lg:col-span-2 mt-10 order-2 lg:order-1">
      <CardHeader>
        <h2 className="text-2xl font-bold">
          Detalles del resumen de la compra
        </h2>
        <CardDescription>
          Por favor, revisa los detalles de tu compra antes de proceder al pago.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <article>
          <section className="mt-4 space-y-3">
            <div>
              <h3 className="text-lg font-bold mb-3">Productos</h3>
              <ul className="space-y-3">
                {cart.map((item) => (
                  <li key={item.id}>
                    <Card
                      key={item.id}
                      className="p-6"
                    >
                      <section className="flex flex-col md:flex-row justify-between items-center">
                        <article className="flex flex-col md:flex-row items-center md:gap-x-5">
                          <Image
                            src={item.image[0].url}
                            alt={`producto ${item.name}`}
                            width={70}
                            height={50}
                            className="object-cover"
                          />
                          <div>
                            <Link
                              href={`/shop/product/${item.slug}`}
                              className="hover:underline"
                            >
                              {item.name}
                            </Link>
                          </div>
                        </article>

                        <CardContent className="p-0 flex flex-col justify-center items-center">
                          <section>
                            <p className="font-bold">
                              {formatCurrency(item.price)}
                            </p>
                          </section>
                          {prom > 0 && (
                            <section className="flex gap-x-2">
                              <p className="text-xs">
                                {formatCurrency(item.price - prom * item.price)}
                              </p>
                              <p className="text-orange-500 text-xs">
                                {prom * 100}%
                              </p>
                            </section>
                          )}
                        </CardContent>
                      </section>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </article>
      </CardContent>
    </Card>
  )
}

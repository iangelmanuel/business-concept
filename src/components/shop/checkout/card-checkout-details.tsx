'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader
} from '@/components'
import { useCartStore } from '@/store'
import { formatCurrency } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const CardCheckoutDetails = () => {
  const [loading, setLoading] = useState(true)

  const cart = useCartStore((state) => state.cart)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) return <p>Cargando...</p>

  const prom = 0.25
  return (
    <Card className="col-span-2">
      <CardHeader>
        <h1 className="text-2xl font-bold">
          Detalles del resumen de la compra
        </h1>
        <CardDescription className="text-sm">
          Por favor, revisa los detalles de tu compra antes de proceder al pago.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <article>
          <section className="mt-4 space-y-3">
            <div>
              <h2 className="text-lg font-bold">Productos</h2>
              <ul className="space-y-3">
                {cart.map((item) => (
                  <li key={item.id}>
                    <Card
                      key={item.id}
                      className="p-6"
                    >
                      <section className="flex justify-between items-center">
                        <article className="flex items-center gap-x-5">
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

                        <CardContent></CardContent>

                        <CardFooter className="p-0 flex flex-col justify-center items-center">
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
                        </CardFooter>
                      </section>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </article>
      </CardContent>

      <CardFooter></CardFooter>
    </Card>
  )
}

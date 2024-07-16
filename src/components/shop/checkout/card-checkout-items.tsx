'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardItemsLoading,
  PriceWithPosibleDiscount
} from '@/components'
import { titleFont } from '@/config'
import { useCartStore } from '@/store'

export const CardCheckoutItems = () => {
  const [loading, setLoading] = useState(true)
  const cart = useCartStore((state) => state.cart)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) return <CardItemsLoading />
  return (
    <Card className="order-2 mt-10 lg:order-1 lg:col-span-2">
      <CardHeader>
        <h2 className={`${titleFont.className} text-2xl font-bold`}>
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
              <h3 className={`${titleFont.className} mb-3 text-lg font-bold`}>
                Productos
              </h3>
              <ul className="space-y-3">
                {cart.map((item) => (
                  <li key={item.id}>
                    <Card
                      key={item.id}
                      className="p-6"
                    >
                      <section className="flex flex-col items-center justify-between md:flex-row">
                        <article className="flex flex-col items-center md:flex-row md:gap-x-5">
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
                              className={`${titleFont.className} font-bold hover:underline`}
                            >
                              {item.name}
                            </Link>
                          </div>
                        </article>

                        <CardContent className="flex flex-col items-center justify-center p-0">
                          <section>
                            <PriceWithPosibleDiscount
                              price={item.price}
                              discount={item.discount}
                              className={`${titleFont.className} text-lg font-bold`}
                            />
                          </section>
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

'use client'

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CartItemsLoading
} from '@/components'
import { useCartStore } from '@/store'
import type { Cart } from '@/types'
import { formatCurrency } from '@/utils'
import { MinusCircle, PlusCircle, TrashIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const CardCartItems = () => {
  const [loaded, setLoaded] = useState(false)

  const cart = useCartStore((state) => state.cart)
  const getTotalItems = useCartStore((state) => state.getTotalItems())
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  )
  const updateProductInCart = useCartStore((state) => state.updateProductInCart)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) return <CartItemsLoading />

  const updateProductQuantity = (item: Cart, quantity: number) => {
    if (quantity <= 0) {
      removeProductFromCart(item)
      return
    }
    if (quantity > 5) return
    updateProductInCart(item, quantity)
  }

  return (
    <Card className="lg:col-span-2 order-2 lg:order-1">
      {loaded && getTotalItems > 0 && (
        <CardHeader>
          <h2 className="text-xl font-bold mb-3">
            Mi carrito de compras ({getTotalItems})
          </h2>
        </CardHeader>
      )}

      {loaded && getTotalItems === 0 && (
        <CardHeader>
          <h2 className="text-xl font-bold mb-3">
            Tu carrito de compras está vacío
          </h2>
          <Link
            href="/shop/products"
            className="hover:underline"
          >
            <CardDescription>
              ¡Agrega productos a tu carrito para comenzar a comprar!
            </CardDescription>
          </Link>
        </CardHeader>
      )}

      <CardContent className="space-y-5">
        {cart.map((item) => (
          <Card
            key={item.id}
            className="p-6"
          >
            <article className="flex flex-col md:flex-row justify-between items-center">
              <section className="flex flex-col md:flex-row items-center md:gap-x-5">
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
                  <Button
                    variant="ghost"
                    className="flex gap-x-2 text-gray-500 text-xs"
                    onClick={() => removeProductFromCart(item)}
                  >
                    <TrashIcon size={16} />
                    <p>Eliminar</p>
                  </Button>
                </div>
              </section>

              <CardContent>
                <Card className="flex items-center gap-x-2">
                  <Button
                    variant="ghost"
                    onClick={() =>
                      updateProductQuantity(item, item.quantity - 1)
                    }
                  >
                    <MinusCircle size={24} />
                  </Button>

                  <span>{item.quantity}</span>

                  <Button
                    variant="ghost"
                    onClick={() =>
                      updateProductQuantity(item, item.quantity + 1)
                    }
                  >
                    <PlusCircle size={24} />
                  </Button>
                </Card>
              </CardContent>

              <CardFooter className="p-0 flex flex-col justify-center items-center">
                <section>
                  <p className="font-bold">{formatCurrency(item.price)}</p>
                </section>
                {item.discount && item.discount > 0 && (
                  <section className="flex gap-x-2">
                    <p className="text-xs">
                      {formatCurrency(item.price - item.discount * item.price)}
                    </p>
                    <p className="text-orange-500 text-xs">
                      {item.discount * 100}%
                    </p>
                  </section>
                )}
              </CardFooter>
            </article>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}

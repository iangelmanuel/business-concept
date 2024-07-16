'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CartItemsLoading,
  PriceWithPosibleDiscount
} from '@/components'
import { titleFont } from '@/config'
import { useCartStore } from '@/store'
import type { CartType } from '@/types'
import { MinusCircle, PlusCircle, TrashIcon } from 'lucide-react'

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

  const updateProductQuantity = (item: CartType, quantity: number) => {
    if (quantity > 5 || quantity > item.stock) return

    if (quantity <= 0) {
      removeProductFromCart(item)
      return
    }
    updateProductInCart(item, quantity)
  }

  return (
    <Card className="order-2 lg:order-1 lg:col-span-2">
      {loaded && getTotalItems > 0 && (
        <CardHeader>
          <h2 className={`${titleFont.className} mb-3 text-xl font-bold`}>
            Mi carrito de compras ({getTotalItems})
          </h2>
        </CardHeader>
      )}

      {loaded && getTotalItems === 0 && (
        <CardHeader>
          <h2 className={`${titleFont.className} mb-3 text-xl font-bold`}>
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
            <article className="flex flex-col items-center justify-between md:flex-row">
              <section className="flex flex-col items-center md:flex-row md:gap-x-5">
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
                  <Button
                    variant="ghost"
                    className="flex gap-x-2 text-xs text-gray-500"
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

              <CardFooter className="flex flex-col items-center justify-center p-0">
                <PriceWithPosibleDiscount
                  price={item.price}
                  discount={item.discount}
                  className={`${titleFont.className} text-lg font-bold`}
                />
              </CardFooter>
            </article>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}

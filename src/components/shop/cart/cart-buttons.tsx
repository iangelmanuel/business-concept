'use client'

import { Button, buttonVariants } from '@/components'
import { useCartStore } from '@/store'
import Link from 'next/link'

export const CartButtons = () => {
  const clearCart = useCartStore((state) => state.clearCart)
  const cart = useCartStore((state) => state.cart)
  return cart.length > 0 ? (
    <div>
      <Link
        href="/shop/cart"
        className={buttonVariants()}
      >
        Ir al Carrito
      </Link>
      <Button
        variant="ghost"
        onClick={() => clearCart()}
      >
        Vaciar Carrito
      </Button>
    </div>
  ) : (
    <div className="flex gap-2 justify-center items-center">
      <p className="text-sm">No hay productos en el carrito</p>
      <Link
        href="/shop/products"
        className={buttonVariants()}
      >
        Ir a la Tienda
      </Link>
    </div>
  )
}

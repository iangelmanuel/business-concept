'use client'

import { Button } from '@/components'
import { useCartStore } from '@/store'
import { useRouter } from 'next/navigation'

export const CartButtons = () => {
  const clearCart = useCartStore((state) => state.clearCart)
  const cart = useCartStore((state) => state.cart)
  const router = useRouter()
  return cart.length > 0 ? (
    <div>
      <Button onClick={() => router.push('/shop/cart')}>Ir al Carrito</Button>
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
      <Button onClick={() => router.push('/shop/products')}>
        Ir a la Tienda
      </Button>
    </div>
  )
}

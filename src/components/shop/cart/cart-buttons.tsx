'use client'

import { Button } from '@/components'
import { useCartStore } from '@/store'
import { useRouter } from 'next/navigation'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  setIsSheetOpen: Dispatch<SetStateAction<boolean>>
}

export const CartButtons = ({ setIsSheetOpen }: Props) => {
  const router = useRouter()

  const clearCart = useCartStore((state) => state.clearCart)
  const cart = useCartStore((state) => state.cart)

  return cart.length > 0 ? (
    <div>
      <Button
        onClick={() => {
          setIsSheetOpen((prevState) => !prevState)
          router.push('/shop/cart')
        }}
      >
        Ir al Carrito
      </Button>
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
      <Button
        onClick={() => {
          setIsSheetOpen((prevState) => !prevState)
          router.push('/shop/products')
        }}
      >
        Ir a la Tienda
      </Button>
    </div>
  )
}

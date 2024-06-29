'use client'

import { Button, CardContent } from '@/components'
import { useCartStore } from '@/store'
import type { ProductType } from '@/types'
import { MinusCircle, PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  product: ProductType
}

export const AddProductCart = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(1)
  const addProductToCart = useCartStore((state) => state.addProductToCart)

  const handleAddProductCart = () => {
    const { id, name, price, stock, slug, productImage } = product
    addProductToCart({
      id,
      name,
      price,
      stock,
      slug,
      image: productImage,
      quantity
    })
    toast.success('Producto añadido al carrito', {
      duration: 2500,
      position: 'top-right'
    })
  }

  const handleAddAmount = () => {
    if (quantity >= 5) return
    setQuantity(quantity + 1)
  }

  const handleSubtractAmount = () => {
    if (quantity <= 1) return
    setQuantity(quantity - 1)
  }

  const isQuantity = quantity !== 0

  return (
    <CardContent>
      <p>Elija una cantidad:</p>
      <div className="flex justify-between items-center border mb-2">
        <Button
          variant="ghost"
          onClick={handleSubtractAmount}
        >
          <MinusCircle size={24} />
        </Button>

        <span>{quantity}</span>

        <Button
          variant="ghost"
          onClick={handleAddAmount}
        >
          <PlusCircle size={24} />
        </Button>
      </div>

      <Button
        onClick={handleAddProductCart}
        className="w-full"
        disabled={!isQuantity}
      >
        Añadir al Carrito
      </Button>
    </CardContent>
  )
}

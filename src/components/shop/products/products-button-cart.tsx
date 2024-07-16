'use client'

import { Button } from '@/components'
import { useCartStore } from '@/store'
import type { ProductAllType } from '@/types'
import { toast } from 'sonner'

interface Props {
  product: ProductAllType
}

export const ProductsButtonCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart)
  const {
    id,
    slug,
    name,
    discount,
    price,
    stock,
    productImage: image
  } = product

  const handleClick = () => {
    addProductToCart({
      id,
      slug,
      name,
      discount,
      price,
      stock,
      quantity: 1,
      image
    })
    toast.success('Producto añadido al carrito', {
      duration: 3000,
      position: 'top-right'
    })
  }

  return (
    <Button
      className="w-full"
      onClick={handleClick}
    >
      Añadir Carrito
    </Button>
  )
}

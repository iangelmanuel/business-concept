import { useCartStore } from '@/store'
import { formatCurrency } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'

export const CartSheetItems = () => {
  const cart = useCartStore((state) => state.cart)
  return cart.map((product) => (
    <div
      key={product.id}
      className="flex gap-x-2 mb-2"
    >
      <Image
        src={product.image[0].url}
        alt={product.name}
        width={100}
        height={100}
      />
      <div>
        <Link
          href={`/shop/product/${product.slug}`}
          className="font-bold hover:underline"
        >
          {product.name}
        </Link>
        <p className="font-bold">
          Precio:{' '}
          <span className="font-normal">{formatCurrency(product.price)}</span>
        </p>

        <p className="font-bold">
          Cantidad: <span className="font-normal">{product.quantity}</span>
        </p>
      </div>
    </div>
  ))
}

import { getAllProducts } from '@/actions/get-all-products'
import { formatCurrency } from '@/utils/format-currency'
import Image from 'next/image'

export default async function HomePage() {
  const products = await getAllProducts()
  return (
    <div className="max-w-screen-xl h-screen mx-auto grid place-content-center grid-cols-5 gap-2">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col shadow-lg p-4 rounded-lg"
        >
          <Image
            src={product.ProductImage[0].url}
            alt={product.name}
            width={150}
            height={150}
            className="rounded-lg object-cover mx-auto"
          />
          <h2 className="text-xl">{product.name}</h2>
          <p className="truncate text-lg">{product.description}</p>
          <p className="text-lg">{formatCurrency(product.price)}</p>
        </div>
      ))}
    </div>
  )
}

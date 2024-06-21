import { getAllProducts } from '@/actions'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import type { ProductType } from '@/types'
import { formatCurrency } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'

export default async function HomePage() {
  const products = await getAllProducts()

  const categorizedProducts = products.reduce<Record<string, ProductType[]>>(
    (acc, product) => {
      if (!acc[product.category.name.toLowerCase()]) {
        acc[product.category.name.toLowerCase()] = []
      }
      acc[product.category.name.toLowerCase()].push(product)
      return acc
    },
    {}
  )
  return (
    <section className="space-y-20 mx-auto max-w-screen-2xl mt-10">
      {Object.entries(categorizedProducts).map(([category, productsOrder]) => (
        <article key={category}>
          <h3 className="text-lg lg:text-4xl text-center font-bold mb-5 capitalize">
            {category}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 place-content-center items-center p-5 lg:p-0">
            {productsOrder.map((productOrder) => (
              <Card key={productOrder.id}>
                <Image
                  src={productOrder.productImage[0].url}
                  alt={`${productOrder.name}`}
                  width={1000}
                  height={1000}
                  className="w-60 h-40 mx-auto object-cover rounded-lg"
                />
                <Link href={`/shop/product/${productOrder.slug}`}>
                  <CardContent className="text-xl font-bold text-center">
                    {productOrder.name}
                  </CardContent>
                </Link>
                <CardDescription className="text-center text-lg">
                  {formatCurrency(productOrder.price)}
                </CardDescription>
              </Card>
            ))}
          </div>
        </article>
      ))}
    </section>
  )
}

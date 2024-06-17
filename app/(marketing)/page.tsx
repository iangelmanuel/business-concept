import { getAllProducts } from '@/actions'
import { IndexProducts } from '@/components'
import type { ProductType } from '@/types'

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
    <section className="space-y-20">
      {Object.entries(categorizedProducts).map(([category, productsOrder]) => (
        <IndexProducts
          key={category}
          category={category}
          productsOrder={productsOrder}
        />
      ))}
    </section>
  )
}

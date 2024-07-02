import { getProductByCategory } from '@/actions'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  ProductsButtonCart
} from '@/components'
import { fontSans } from '@/config'
import { formatCurrency } from '@/utils'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export async function generateMetadata({
  params
}: {
  params: { category: string }
}): Promise<Metadata> {
  const { category } = params

  return {
    title: `Productos de la categoria ${category} - Business Concept`,
    description: `Descubre todos los productos de la categoria ${category} que tenemos en Business Concept. Desde productos de limpieza, hasta productos de oficina. ¡Descubre todo lo que tenemos para ti!`
  }
}

export default async function CategoryProductPage({
  params
}: {
  params: { category: string }
}) {
  const { category } = params
  const products = await getProductByCategory(category)
  return (
    <section className="p-5 2xl:p-0 max-w-screen-2xl mx-auto mt-10">
      <article>
        <h2 className={`text-xl font-bold ${fontSans.className} mb-2`}>
          Productos de la categoria{' '}
          <span className="capitalize">{params.category}</span>
        </h2>
        <section className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <Image
                  src={product.productImage[0].url}
                  alt={`producto ${product.name}`}
                  width={300}
                  height={300}
                  className="w-80 h-40 object-cover"
                />
              </CardHeader>

              <CardContent className="space-y-1">
                <Link
                  href={`/shop/product/${product.slug}`}
                  className={`hover:underline font-bold ${fontSans.className}`}
                >
                  {product.name}
                </Link>
                <CardDescription className="truncate">
                  {product.description}
                </CardDescription>
                <p>{formatCurrency(product.price)}</p>
              </CardContent>

              <CardFooter>
                <ProductsButtonCart product={product} />
              </CardFooter>
            </Card>
          ))}
        </section>
      </article>
    </section>
  )
}

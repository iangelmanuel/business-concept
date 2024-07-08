import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAllProducts } from '@/actions'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { titleFont } from '@/config'
import type { ProductAllType } from '@/types'
import { formatCurrency } from '@/utils'

export const metadata: Metadata = {
  title: 'Business Concept - Tienda Online',
  description:
    'Business Concept es una tienda online donde puedes encontrar productos de calidad a precios accesibles.',
  keywords:
    'business concept, tienda online, productos, calidad, precios accesibles',
  robots: 'index, follow'
}

export default async function HomePage() {
  const products = await getAllProducts()

  const categorizedProducts = products.reduce<Record<string, ProductAllType[]>>(
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
    <>
      <section className="relative">
        <article className="absolute z-10 flex h-screen w-full flex-col items-center justify-center p-5 sm:flex-row xl:p-0">
          <Image
            src="/logo.png"
            alt="Business Concept"
            width={400}
            height={400}
            quality={100}
          />

          <div className="max-w-screen-sm">
            <h1
              className={`${titleFont.className} text-center text-3xl font-bold text-purple-700 sm:text-start lg:text-6xl`}
            >
              Bienvenido a Business Concept
            </h1>
            <p className="text-center text-lg font-bold sm:text-start lg:text-2xl">
              Tu tienda online de productos tecnológicos y de oficina de
              confianza
            </p>
          </div>
        </article>

        <article>
          <Image
            src="/hero.jpg"
            alt="Hero"
            width={1920}
            height={1080}
            quality={100}
            className="h-screen w-full object-cover opacity-35 dark:opacity-45"
          />
        </article>
      </section>

      <section className="mx-auto mt-10 max-w-screen-2xl space-y-20">
        {Object.entries(categorizedProducts).map(
          ([category, productsOrder]) => (
            <article key={category}>
              <h2
                className={`${titleFont.className} mb-5 text-center text-lg font-bold capitalize lg:text-4xl`}
              >
                {category}
              </h2>

              <section className="grid grid-cols-2 place-content-center items-center gap-3 p-5 sm:grid-cols-3 lg:grid-cols-5 lg:p-0">
                {productsOrder.map((productOrder) => (
                  <Card key={productOrder.id}>
                    <Image
                      src={productOrder.productImage[0].url}
                      alt={`${productOrder.name}`}
                      width={1000}
                      height={1000}
                      className="mx-auto h-40 w-60 rounded-lg object-cover"
                    />
                    <Link href={`/shop/product/${productOrder.slug}`}>
                      <CardContent className="text-center text-xl font-bold">
                        <h3 className={titleFont.className}>
                          {productOrder.name}
                        </h3>
                      </CardContent>
                    </Link>
                    <CardDescription className="text-center text-lg">
                      {formatCurrency(productOrder.price)}
                    </CardDescription>
                  </Card>
                ))}
              </section>
            </article>
          )
        )}
      </section>
    </>
  )
}

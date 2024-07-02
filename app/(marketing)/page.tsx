import { getAllProducts } from '@/actions'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { titleFont } from '@/config'
import type { ProductType } from '@/types'
import { formatCurrency } from '@/utils'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

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
    <>
      <section className="relative">
        <article className="absolute z-10 w-full h-screen flex flex-col sm:flex-row p-5 xl:p-0 justify-center items-center">
          <Image
            src="/logo.png"
            alt="Business Concept"
            width={400}
            height={400}
            quality={100}
          />

          <div className="max-w-screen-sm">
            <h1
              className={`${titleFont.className} text-3xl text-center sm:text-start lg:text-6xl font-bold text-purple-700`}
            >
              Bienvenido a Business Concept
            </h1>
            <p className="text-lg text-center sm:text-start lg:text-2xl font-bold">
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
            className="w-full h-screen object-cover opacity-35 dark:opacity-45"
          />
        </article>
      </section>

      <section className="space-y-20 mx-auto max-w-screen-2xl mt-10">
        {Object.entries(categorizedProducts).map(
          ([category, productsOrder]) => (
            <article key={category}>
              <h2
                className={`${titleFont.className} text-lg lg:text-4xl text-center font-bold mb-5 capitalize`}
              >
                {category}
              </h2>

              <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 place-content-center items-center p-5 lg:p-0">
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

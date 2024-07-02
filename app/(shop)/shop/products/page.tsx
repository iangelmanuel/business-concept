import { getAllProducts } from '@/actions'
import { Card, CardContent, CardDescription, CardHeader } from '@/components'
import { titleFont } from '@/config'
import { formatCurrency } from '@/utils'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Nuestros Productos - Business Concept',
  description:
    'Descubre todos los productos que tenemos en Business Concept. Desde productos de limpieza, hasta productos de oficina. ¡Descubre todo lo que tenemos para ti!'
}

export default async function ShopProductsPage() {
  const products = await getAllProducts()
  const lastProduct = products[products.length - 1]
  if (!products) return notFound()

  return (
    <section className="mx-auto mt-10 max-w-screen-2xl p-5 2xl:p-0">
      <article className="mb-10">
        <Card className="flex flex-col items-center justify-center gap-y-5 p-10 lg:flex-row lg:gap-y-0">
          <section className="max-w-xl">
            <h1
              className={`mb-2 text-2xl font-bold md:text-3xl lg:text-5xl ${titleFont.className}`}
            >
              Ahora la mágia de comprar en un sitio web rapido y seguro
            </h1>
            <CardDescription>
              En Business Concept manejamos un amplio catálogo de productos para
              que puedas encontrar lo que necesitas. Desde productos de
              limpieza, hasta productos de oficina. ¡Descubre todo lo que
              tenemos para ti!
            </CardDescription>
          </section>

          <section>
            <Image
              src={lastProduct.productImage[1].url}
              alt={`producto ${lastProduct.name}`}
              width={500}
              height={500}
              className="object-cover"
            ></Image>
          </section>
        </Card>
      </article>

      <article>
        <h2 className={`text-xl font-bold ${titleFont.className} mb-2`}>
          Nuestros productos
        </h2>
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/shop/product/${product.slug}`}
            >
              <Card>
                <CardHeader>
                  <Image
                    src={product.productImage[0].url}
                    alt={`producto ${product.name}`}
                    width={500}
                    height={500}
                    className="object-cover"
                  />
                </CardHeader>

                <CardContent className="space-y-1">
                  <h3 className={`${titleFont.className} font-bold`}>
                    {product.name}
                  </h3>

                  <CardDescription className="truncate">
                    {product.description}
                  </CardDescription>
                  <p>{formatCurrency(product.price)}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>
      </article>
    </section>
  )
}

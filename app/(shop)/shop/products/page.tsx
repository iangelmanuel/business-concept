import { getAllProducts } from '@/actions'
import { Card, CardContent, CardDescription, CardHeader } from '@/components'
import { fontSans } from '@/config'
import { formatCurrency } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ShopProductsPage() {
  const products = await getAllProducts()
  const lastProduct = products[products.length - 1]
  if (!products) return notFound()
  return (
    <section className="p-5 2xl:p-0 max-w-screen-2xl mx-auto mt-10">
      <article className="mb-10">
        <Card className="p-10 flex flex-col lg:flex-row gap-y-5 lg:gap-y-0 justify-center items-center">
          <section className="max-w-xl">
            <h1
              className={`text-2xl md:text-3xl lg:text-5xl font-bold mb-2 ${fontSans.className}`}
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
        <h3 className={`text-xl font-bold ${fontSans.className} mb-2`}>
          Nuestros productos
        </h3>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/shop/product/${product.slug}`}
              className={fontSans.className}
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
                  <h3 className="font-bold">{product.name}</h3>

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

import { getAllProducts, getCategories } from '@/actions'
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
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ShopProductsPage() {
  const products = await getAllProducts()
  const categories = await getCategories()
  if (!products || !categories) return notFound()
  return (
    <section className="p-5 2xl:p-0 max-w-screen-2xl mx-auto mt-10">
      <h1 className={`text-2xl font-bold ${fontSans.className} mb-3`}>
        Bienvenidos a nuestra tienda online
      </h1>

      <article className="mb-10">
        <h2 className={`text-xl font-bold ${fontSans.className} mb-2`}>
          Categorias
        </h2>

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop/products/category/${category.name}`}
              className={`extrabold ${fontSans.className} text-4xl`}
            >
              <Card className="flex items-center justify-center hover:border-gray-400 py-5 capitalize">
                {category.name}
              </Card>
            </Link>
          ))}
        </section>
      </article>

      <article>
        <h2 className={`text-xl font-bold ${fontSans.className} mb-2`}>
          Productos
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

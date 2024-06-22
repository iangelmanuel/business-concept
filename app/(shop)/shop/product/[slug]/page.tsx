import { getProductBySlug } from '@/actions'
import { AddProductCart, Card, CardDescription, CardHeader } from '@/components'
import { formatCurrency } from '@/utils'
import { Headphones, Package, Undo2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ShopProductPage({
  params
}: {
  params: { slug: string }
}) {
  const { product } = await getProductBySlug(params.slug)
  if (!product) notFound()
  return (
    <section className="flex flex-col sm:flex-row justify-center items-center min-h-screen max-w-screen-2xl mx-auto p-5 2xl:p-0">
      <article className="mx-auto w-full">
        <Link href="/shop/products">
          <Undo2 size={26} />
        </Link>

        <Image
          src={product.productImage[0].url}
          alt={`imagen de ${product.name}`}
          width={1000}
          height={1000}
        />
      </article>

      <Card className="mx-auto w-full">
        <CardHeader>
          <article className="flex justify-between items-center">
            <section>
              <h1 className="text-xl font-bold">{product.name}</h1>
            </section>

            <section>
              <p className="text-xl font-extrabold">
                {formatCurrency(product.price)}
              </p>
            </section>
          </article>

          <article className="flex justify-between items-center">
            <section className="flex items-center justify-start gap-2">
              <Package size={24} />
              <span>{product.stock}</span>
            </section>
            <section className="flex items-center justify-end gap-2">
              <Headphones size={24} />
              <span className="capitalize">{product.category.name}</span>
            </section>
          </article>

          <CardDescription className="mt-3">
            {product.description}
          </CardDescription>
        </CardHeader>

        <AddProductCart product={product} />
      </Card>
    </section>
  )
}

import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/actions'
import { AddProductCart, Card, CardDescription, CardHeader } from '@/components'
import { titleFont } from '@/config'
import type { ProductType } from '@/types'
import { ReturnPage, formatCurrency } from '@/utils'
import { Headphones, Package } from 'lucide-react'

export async function generateMetadata({
  params
}: {
  params: { slug: ProductType['slug'] }
}): Promise<Metadata> {
  const slug = params.slug
  const { product } = await getProductBySlug(slug)
  if (!product) notFound()

  return {
    title: `${product?.name} - Business Concept`,
    description: `Información acerca de ${product?.name} en nuestra tienda de Business Concept. ${product?.description}`,
    openGraph: {
      title: `${product?.name} - Business Concept`,
      description: `Información acerca de ${product?.name} en nuestra tienda de Business Concept.`,
      url: `https://business-concept.vercel.app/shop/product/${slug}`,
      type: 'article',
      siteName: `${product?.name} - Business Concept`,
      images: [
        {
          url: product.productImage[0].url,
          width: 800,
          height: 600,
          alt: `Imagen de ${product?.name}`
        }
      ]
    }
  }
}

export default async function ProductSlugPage({
  params
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const { product } = await getProductBySlug(slug)
  if (!product) notFound()
  return (
    <section className="mx-auto flex min-h-screen max-w-screen-2xl flex-col items-center justify-center p-5 sm:flex-row 2xl:p-0">
      <article className="mx-auto w-full">
        <ReturnPage />

        <Image
          src={product.productImage[0].url}
          alt={`imagen de ${product.name}`}
          width={1000}
          height={1000}
        />
      </article>

      <Card className="mx-auto w-full">
        <CardHeader>
          <article className="flex items-center justify-between">
            <section>
              <h1 className={`${titleFont.className} text-xl font-bold`}>
                {product.name}
              </h1>
            </section>

            <section>
              <p className={`${titleFont.className} text-xl font-extrabold`}>
                {formatCurrency(product.price)}
              </p>
            </section>
          </article>

          <article className="flex items-center justify-between">
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

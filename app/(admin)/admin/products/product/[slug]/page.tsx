import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/actions'
import { ProductSlug } from '@/components'
import type { ProductAllType } from '@/types'

export async function generateMetadata({
  params
}: {
  params: { slug: ProductAllType['slug'] }
}): Promise<Metadata> {
  const { slug } = params
  const { product } = await getProductBySlug(slug)
  if (!product) notFound()

  return {
    title: `${product?.name} - Business Concept`,
    description: `Información acerca de ${product?.name} en el dashboard administrativo de Business Concept. ${product?.description}`,
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
  params: { slug: ProductAllType['slug'] }
}) {
  const { slug } = params
  const { product } = await getProductBySlug(slug)
  if (!product) notFound()
  return (
    <ProductSlug
      product={product}
      isAdmin
    />
  )
}

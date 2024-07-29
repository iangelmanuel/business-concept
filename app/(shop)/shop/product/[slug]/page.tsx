import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProductBySlug } from "@/actions"
import { ProductSlug } from "@/components"
import type { ProductType } from "@/types"

export async function generateMetadata({
  params
}: {
  params: { slug: ProductType["slug"] }
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
      type: "article",
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
  return <ProductSlug product={product} />
}

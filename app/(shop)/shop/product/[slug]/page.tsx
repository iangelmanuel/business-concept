import { getProductBySlug } from '@/actions'
import { AddProductCart, Card, CardDescription, CardHeader } from '@/components'
import { formatCurrency } from '@/utils'
import { Headphones, Package } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function ShopProductPage({
  params
}: {
  params: { slug: string }
}) {
  const { product } = await getProductBySlug(params.slug)
  if (!product) notFound()
  return (
    <section className="flex flex-col sm:flex-row justify-center items-center min-h-screen max-w-screen-2xl mx-auto">
      <div className="mx-auto w-4/6 sm:w-full">
        <Image
          src={product.productImage[0].url}
          alt={`imagen de ${product.name}`}
          width={1000}
          height={1000}
        />
      </div>

      <Card className="mx-auto w-2/6 sm:w-full">
        <CardHeader>
          <section className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">{product.name}</h1>
            </div>

            <div>
              <p className="text-xl font-extrabold">
                {formatCurrency(product.price)}
              </p>
            </div>
          </section>

          <section className="flex justify-between items-center">
            <div className="flex items-center justify-start gap-2">
              <Package size={24} />
              <span>{product.stock}</span>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Headphones size={24} />
              <span className="capitalize">{product.category.name}</span>
            </div>
          </section>

          <CardDescription className="mt-3">
            {product.description}
          </CardDescription>
        </CardHeader>

        <AddProductCart product={product} />
      </Card>
    </section>
  )
}

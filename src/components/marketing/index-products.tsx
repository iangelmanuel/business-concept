import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from '@/components/ui/card'
import { ProductWithImageAndCategory } from '@/types'
import { formatCurrency } from '@/utils/format-currency'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  category: string
  productsOrder: ProductWithImageAndCategory[]
}

export const IndexProducts = ({ category, productsOrder }: Props) => {
  return (
    <article key={category}>
      <h3 className="text-4xl text-center font-bold mb-5 capitalize">
        {category}
      </h3>

      <div className="flex gap-x-2 justify-center items-center">
        {productsOrder.map((productOrder) => (
          <Card key={productOrder.id}>
            <Image
              src={productOrder.productImage[0].url}
              alt={`${productOrder.name}`}
              width={1000}
              height={1000}
              className="w-60 h-40 mx-auto object-cover rounded-lg"
            />
            <Link
              href={`/products/category/${productOrder.category.name}/product/${productOrder.slug}`}
            >
              <CardContent className="text-xl font-bold text-center">
                {productOrder.name}
              </CardContent>
            </Link>
            <CardDescription className="text-center text-lg">
              {formatCurrency(productOrder.price)}
            </CardDescription>
          </Card>
        ))}
      </div>
    </article>
  )
}

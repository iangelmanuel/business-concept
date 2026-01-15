import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { titleFont } from "@/config"
import type { ProductAllType } from "@/types"
import { ProductDeletedButton } from "./product-deleted-button"

type ProductWithoutCategory = Omit<ProductAllType, "category">
interface Props {
  product: ProductWithoutCategory
}

export const ProductDeletedGrid = ({ product }: Props) => {
  return (
    <section>
      <Card className="flex min-h-full flex-col justify-center">
        <CardHeader>
          <Image
            src={product.productImage[0].url}
            alt={`producto ${product.name}`}
            width={800}
            height={800}
            className="mx-auto h-auto w-auto p-10"
          />
        </CardHeader>

        <CardContent className="space-y-1">
          <h3 className={`${titleFont.className} font-bold`}>{product.name}</h3>

          <CardDescription className="truncate">
            {product.description}
          </CardDescription>
        </CardContent>

        <ProductDeletedButton productId={product.id} />
      </Card>
    </section>
  )
}

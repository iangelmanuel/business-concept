import {
  AddProductCart,
  Card,
  CardDescription,
  CardHeader,
  PriceWithPosibleDiscount
} from ".."
import React from "react"
import { titleFont } from "@/config"
import type { ProductAllType } from "@/types"
import { ReturnPage } from "@/utils"
import { Headphones, Package } from "lucide-react"
import { ImageProductCarousel } from "./image-product-carousel"

interface Props {
  product: ProductAllType
  isAdmin?: boolean
}

export const ProductSlug = ({ product, isAdmin = false }: Props) => {
  const { discount, price } = product

  return (
    <section className="mx-auto flex min-h-screen max-w-(--breakpoint-2xl) flex-col items-center justify-center p-5 sm:flex-row 2xl:p-0">
      <article className="mx-auto w-full">
        <ReturnPage />
        <ImageProductCarousel product={product} />
      </article>

      <Card className="mx-auto w-full">
        <CardHeader>
          <article className="flex items-center justify-between">
            <section>
              <h1 className={`${titleFont.className} text-xl font-bold`}>
                {product.name}
              </h1>
            </section>

            <section className="mb-3">
              <PriceWithPosibleDiscount
                price={price}
                discount={discount}
                className={`${titleFont.className} text-xl font-extrabold`}
              />
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

        {!isAdmin && <AddProductCart product={product} />}
      </Card>
    </section>
  )
}

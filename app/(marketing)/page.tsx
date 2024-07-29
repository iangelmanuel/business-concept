import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getAllProducts } from "@/actions"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  PriceWithPosibleDiscount
} from "@/components"
import { titleFont } from "@/config"
import type { ProductAllType } from "@/types"

export const metadata: Metadata = {
  title: "Business Concept - Tienda Online",
  description:
    "Business Concept es una tienda online donde puedes encontrar productos de calidad a precios accesibles.",
  keywords:
    "business concept, tienda online, productos, calidad, precios accesibles",
  robots: "index, follow"
}

export default async function HomePage() {
  const products = await getAllProducts()

  const categorizedProducts = products.reduce<Record<string, ProductAllType[]>>(
    (acc, product) => {
      if (!acc[product.category.name.toLowerCase()]) {
        acc[product.category.name.toLowerCase()] = []
      }
      acc[product.category.name.toLowerCase()].push(product)
      return acc
    },
    {}
  )

  return (
    <>
      <section className="relative">
        <article className="absolute z-10 flex h-screen w-full flex-col items-center justify-center p-5 sm:flex-row xl:p-0">
          <Image
            src="/logo.png"
            alt="Business Concept"
            width={400}
            height={400}
            quality={100}
          />

          <div className="max-w-screen-sm">
            <h1
              className={`${titleFont.className} text-center text-3xl font-bold text-purple-700 sm:text-start lg:text-6xl`}
            >
              Bienvenido a Business Concept
            </h1>
            <p className="text-center text-lg font-bold sm:text-start lg:text-2xl">
              Tu tienda online de productos tecnológicos y de oficina de
              confianza
            </p>
          </div>
        </article>

        <article>
          <Image
            src="/hero.jpg"
            alt="Hero"
            width={1920}
            height={1080}
            quality={100}
            className="h-screen w-full object-cover opacity-35 dark:opacity-45"
          />
        </article>
      </section>

      <section className="mx-auto mt-10 max-w-screen-2xl space-y-20">
        {Object.entries(categorizedProducts).map(
          ([category, productsOrder]) => (
            <article key={category}>
              <h2
                className={`${titleFont.className} mb-5 text-center text-lg font-bold capitalize lg:text-4xl`}
              >
                {category}
              </h2>

              <section className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3 lg:grid-cols-5 lg:p-0">
                {productsOrder.map((productOrder) => (
                  <Link
                    key={productOrder.id}
                    href={`/shop/product/${productOrder.slug}`}
                  >
                    <Card className="flex min-h-full flex-col justify-center">
                      <CardHeader>
                        <Image
                          src={productOrder.productImage[0].url}
                          alt={`producto ${productOrder.name}`}
                          width={800}
                          height={800}
                          className="mx-auto h-auto w-full object-cover p-10"
                        />
                      </CardHeader>

                      <CardContent className="space-y-1">
                        <h3 className={`${titleFont.className} font-bold`}>
                          {productOrder.name}
                        </h3>

                        <CardDescription className="truncate">
                          {productOrder.description}
                        </CardDescription>

                        <PriceWithPosibleDiscount
                          price={productOrder.price}
                          discount={productOrder.discount}
                          className={`${titleFont.className} font-bold`}
                        />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </section>
            </article>
          )
        )}
      </section>
    </>
  )
}

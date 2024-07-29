"use client"

import { Card, CardContent } from "../ui/card"
import { useEffect, useState } from "react"
import Image from "next/image"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import type { ProductAllType } from "@/types"
import Autoplay from "embla-carousel-autoplay"

interface Props {
  product: ProductAllType
}

export const ImageProductCarousel = ({ product }: Props) => {
  const [api1, setApi1] = useState<CarouselApi>()
  const [api2, setApi2] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!api1 || !api2) {
      return
    }

    const onSelect = () => {
      const index = api1.selectedScrollSnap()
      setSelectedIndex(index)
      api2.scrollTo(index)
    }

    api1.on("select", onSelect)
    api2.on("select", onSelect)

    return () => {
      api1.off("select", onSelect)
      api2.off("select", onSelect)
    }
  }, [api1, api2])

  useEffect(() => {
    if (api1 && api2) {
      api1.scrollTo(selectedIndex)
      api2.scrollTo(selectedIndex)
    }
  }, [selectedIndex, api1, api2])

  return (
    <div>
      <Carousel
        setApi={setApi1}
        opts={{
          align: "center",
          loop: true
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: true
          })
        ]}
        className="mx-auto mb-3 w-60 max-w-xl lg:w-full"
      >
        <CarouselContent>
          {product.productImage.map((image) => (
            <CarouselItem key={image.id}>
              <div>
                <Image
                  src={image.url}
                  alt={`Imagen de ${product.name}`}
                  width={1000}
                  height={1000}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Carousel
        setApi={setApi2}
        opts={{
          align: "center",
          loop: true
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: true
          })
        ]}
        className="mx-auto hidden w-full max-w-md lg:block"
      >
        <CarouselContent>
          {product.productImage.map((image, index) => (
            <CarouselItem
              key={image.id}
              onClick={() => api1?.scrollTo(index)}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image
                    src={image.url}
                    alt={`Imagen de ${product.name}`}
                    width={1000}
                    height={1000}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

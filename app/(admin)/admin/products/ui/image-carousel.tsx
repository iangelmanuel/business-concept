"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components"
import type { ProductAllType } from "@/types"

interface Props {
  images: ProductAllType["productImage"]
  productName: ProductAllType["name"]
}

export const ImageCarousel = ({ images, productName }: Props) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  return (
    <>
      <section
        onClick={() => setIsImageModalOpen(true)}
        className="flex items-center justify-center"
      >
        <Image
          src={images[0].url}
          alt={`Imagen del producto ${productName}`}
          width={50}
          height={50}
          className="cursor-pointer"
        />
      </section>

      <Dialog
        open={isImageModalOpen}
        onOpenChange={setIsImageModalOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Imagenes del producto: {productName}</DialogTitle>
          </DialogHeader>

          <Carousel className="mx-auto max-w-xs">
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem key={image.id}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Image
                          src={image.url}
                          alt={`Imagen del producto ${productName}`}
                          width={500}
                          height={500}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  )
}

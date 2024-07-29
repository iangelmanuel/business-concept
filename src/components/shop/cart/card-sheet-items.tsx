"use client"

import Image from "next/image"
import Link from "next/link"
import { PriceWithPosibleDiscount } from "@/components/shop-and-admin/price-data-with-posible-discount"
import { titleFont } from "@/config"
import { useCartStore } from "@/store"

export const CartSheetItems = () => {
  const cart = useCartStore((state) => state.cart)

  return cart.map((product) => (
    <div
      key={product.id}
      className="mb-2 grid grid-cols-2 gap-x-2"
    >
      <Image
        src={product.image[0].url}
        alt={`Imagen de ${product.name}`}
        width={200}
        height={200}
        className="my-auto object-cover"
      />
      <div>
        <Link
          href={`/shop/product/${product.slug}`}
          className={`${titleFont.className} font-bold hover:underline`}
        >
          {product.name}
        </Link>
        <p className="font-bold">
          Precio:{" "}
          <PriceWithPosibleDiscount
            price={product.price}
            discount={product.discount}
            className={`${titleFont.className} font-font-bold`}
          />
        </p>

        <p className="font-bold">
          Cantidad: <span className="font-normal">{product.quantity}</span>
        </p>
      </div>
    </div>
  ))
}

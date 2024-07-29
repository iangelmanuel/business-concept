// import Image from 'next/image'
import type { Metadata } from "next"
import Link from "next/link"
import { titleFont } from "@/config"

export const metadata: Metadata = {
  title: "Producto no encontrado - Business Concept",
  description:
    "Lo sentimos mucho, pero el producto que buscas no se encuentra en nuestra tienda. ¡Regresa al inicio!",
  keywords: "producto, no encontrado, no existe, no se encuentra",
  robots: "noindex, nofollow"
}

export default function PageNotFound() {
  return (
    <section className="flex h-[800px] w-full flex-col-reverse items-center justify-center align-middle md:flex-row">
      <div className="mx-5 px-5 text-center">
        <h2 className={`${titleFont.className} text-9xl antialiased`}>404</h2>
        <p className="text-xl font-semibold">Whoops! Lo sentimos mucho.</p>
        <p className="font-light">
          <span>Puedes regresar al </span>
          <Link
            href="/shop/products"
            className="font-normal transition-all hover:underline"
          >
            Inicio
          </Link>
        </p>
      </div>

      {/* <div className="px-5 mx-5">
        <Image
          src="/imgs/starman_750x750.png"
          alt="Starman"
          width={550}
          height={550}
          className="p-5 sm:p-0"
        />
      </div> */}
    </section>
  )
}

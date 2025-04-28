import type { Metadata } from "next"
import Image from "next/image"
import { ContactForm } from "@/components"
import { titleFont } from "@/config"

export const metadata: Metadata = {
  title: "Business Concept - Contacto",
  description:
    "Ponte en contacto con nosotros si tienes alguna duda o problema",
  keywords:
    "business concept, tienda online, productos, calidad, precios accesibles",
  robots: "index, follow"
}

export default function ContactPage() {
  return (
    <>
      <article className="p-20">
        <h1
          className={`${titleFont.className} mb-5 text-center text-2xl font-bold`}
        >
          ¡Si tienes alguna duda o problema por favor contactanos!
        </h1>
      </article>

      <article className="mx-auto grid max-w-(--breakpoint-lg) grid-cols-1 gap-5 sm:grid-cols-2">
        <section className="m-auto">
          <Image
            src="/contact.jpg"
            alt="Logo Business Concept"
            width={512}
            height={512}
            className="rounded-lg"
          />
        </section>

        <section className="m-auto max-w-(--breakpoint-sm)">
          <ContactForm />
        </section>
      </article>
    </>
  )
}

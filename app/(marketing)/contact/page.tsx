import Image from 'next/image'
import { ContactForm } from '@/components'
import { titleFont } from '@/config'

export default function ContactPage() {
  return (
    <section className="mt-10">
      <article className="mx-auto max-w-screen-lg">
        <h1
          className={`${titleFont.className} mb-5 text-center text-2xl font-bold`}
        >
          ¡Si tienes alguna duda o problema por favor contactanos!
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          <Image
            src="/logo.png"
            alt="Logo Business Concept"
            width={400}
            height={400}
          />

          <ContactForm />
        </div>
      </article>
    </section>
  )
}

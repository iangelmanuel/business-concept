import { Suspense } from "react"
import type { Metadata } from "next"
import { getUserContacts } from "@/actions"
import { ContactInfoGrid, ContactInfoGridSkeleton } from "@/components"
import { titleFont } from "@/config"

export const metadata: Metadata = {
  title: "Business Concept - Contacto de Usuarios",
  description: "Administra los contactos de los usuarios de la tienda",
  keywords:
    "business concept, tienda online, productos, calidad, precios accesibles",
  robots: "noindex, nofollow"
}

export default async function AdminContactsPage() {
  const contacts = await getUserContacts()

  const isEmptyTitleDescription =
    contacts?.length === 0
      ? "No hay contactos de usuarios"
      : "Administra los contactos de los usuarios"

  return (
    <article>
      <h1 className={`${titleFont.className} mb-3 text-2xl font-bold`}>
        {isEmptyTitleDescription}
      </h1>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
        {contacts?.length !== 0 ? (
          contacts?.map((contact) => (
            <Suspense
              key={contact.id}
              fallback={<ContactInfoGridSkeleton />}
            >
              <ContactInfoGrid
                key={contact.id}
                contact={contact}
              />
            </Suspense>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No se ha recibido ningún mensaje de contacto
          </p>
        )}
      </section>
    </article>
  )
}

import type { Metadata } from "next"
import { getCategories } from "@/actions"
import { NewProductForm } from "@/components"
import { titleFont } from "@/config"
import { ReturnPage } from "@/utils"

export const metadata: Metadata = {
  title: "Nuevo producto - Business Concept",
  description: "Crea un nuevo producto"
}

export default async function ProductNewPage() {
  const categories = await getCategories()
  return (
    <article>
      <ReturnPage />
      <h1 className={`${titleFont.className} mb-3 text-2xl font-bold`}>
        Crear un nuevo producto
      </h1>

      <NewProductForm categories={categories} />
    </article>
  )
}

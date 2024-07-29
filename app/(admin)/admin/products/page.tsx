import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllProductsByAdmin } from "@/actions"
import { titleFont } from "@/config"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export const metadata: Metadata = {
  title: "Productos - Business Concept",
  description: "Administra tus productos en Business Concept"
}

export default async function ProductsPage() {
  const products = await getAllProductsByAdmin()
  if (!products) notFound()
  return (
    <article>
      <h1 className={`${titleFont.className} mb-3 text-2xl font-bold`}>
        Administra tus productos
      </h1>

      <DataTable
        columns={columns}
        data={products}
      />
    </article>
  )
}

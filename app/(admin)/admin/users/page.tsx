import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllUsers } from "@/actions"
import { titleFont } from "@/config"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export const metadata: Metadata = {
  title: "Usuarios - Business Concept",
  description: "Administra a tus usuarios en Business Concept"
}

export default async function UserPage() {
  const users = await getAllUsers()
  if (!users) notFound()
  return (
    <article>
      <h1 className={`${titleFont.className} mb-3 text-2xl font-bold`}>
        Administra a tus usuarios
      </h1>

      <DataTable
        columns={columns}
        data={users}
      />
    </article>
  )
}

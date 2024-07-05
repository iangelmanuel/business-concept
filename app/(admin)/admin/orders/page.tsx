import { DataTable } from './data-table'
import { columns } from './columns'
import { titleFont } from '@/config'
import type { Metadata } from 'next'
import { getAllUsersOrders } from '@/actions'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Ordenes - Business Concept',
  description: 'Administra las ordenes de la tienda de Business Concept'
}

export default async function UserPage() {
  const orders = await getAllUsersOrders()
  if (!orders) notFound()

  return (
    <article>
      <h1 className={`${titleFont.className} mb-3 text-2xl font-bold`}>
        Administra a las ordenes de la tienda
      </h1>

      <DataTable
        columns={columns}
        data={orders}
      />
    </article>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getOrderById } from '@/actions'
import { OrderItems, OrderSummary } from '@/components'
import type { UserOrderByAdmin } from '@/types'
import { ReturnPage } from '@/utils'

export async function generateMetadata({
  params
}: {
  params: { id: UserOrderByAdmin['id'] }
}): Promise<Metadata> {
  const { id } = params
  const order = await getOrderById(id)
  if (!order) notFound()

  const isOrderPaid = order.isPaid ? 'pagada' : 'pendiente'

  return {
    title: `Orden ${isOrderPaid} - Business Concept `,
    description: `Detalles del pedido #${order.id} en Business Concept`
  }
}

export default async function OrderIdPage({
  params
}: {
  params: { id: UserOrderByAdmin['id'] }
}) {
  const { id } = params

  const order = await getOrderById(id)
  if (!order) notFound()

  return (
    <article>
      <ReturnPage />
      <section className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-5 p-5 lg:grid-cols-3">
        <OrderItems
          order={order}
          isAdminFromOrder
        />

        <OrderSummary
          order={order}
          isAdmin
        />
      </section>
    </article>
  )
}

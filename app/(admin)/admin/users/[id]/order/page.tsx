import { getOrderById } from '@/actions'
import { OrderItems, OrderSummary } from '@/components'
import type { Order } from '@/types'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  searchParams
}: {
  searchParams: { orderId: Order['id'] }
}) {
  const { orderId } = searchParams
  const order = await getOrderById(orderId)
  if (!order) notFound()

  const isOrderPaid = order.isPaid ? 'pagada' : 'pendiente'

  return {
    title: `Orden ${isOrderPaid} - Business Concept `,
    description: `Detalles del pedido #${order.id} en Business Concept`
  }
}

export default async function OrderIdPage({
  searchParams
}: {
  searchParams: { orderId: Order['id'] }
}) {
  const { orderId } = searchParams
  const order = await getOrderById(orderId)
  if (!order) notFound()

  const { userId } = order

  return (
    <article>
      <section className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-5 p-5 lg:grid-cols-3">
        <OrderItems
          order={order}
          isAdmin
          userId={userId}
        />
        <OrderSummary
          order={order}
          isAdmin
        />
      </section>
    </article>
  )
}

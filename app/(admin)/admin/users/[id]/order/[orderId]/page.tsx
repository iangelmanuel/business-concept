import { notFound } from 'next/navigation'
import { getOrderById } from '@/actions'
import { OrderItems, OrderSummary } from '@/components'
import type { UserOrder } from '@/types'

export async function generateMetadata({
  params
}: {
  params: { orderId: UserOrder['id'] }
}) {
  const { orderId } = params
  const order = await getOrderById(orderId)
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
  params: { orderId: UserOrder['id'] }
}) {
  const { orderId } = params
  const order = await getOrderById(orderId)
  if (!order) notFound()

  const { userId } = order

  return (
    <article>
      <section className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-5 p-5 lg:grid-cols-3">
        <OrderItems
          order={order}
          isAdminFromUser
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

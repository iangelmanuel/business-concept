import { getOrderById } from '@/actions'
import { OrderItems, OrderSummary } from '@/components'
import type { UserOrder } from '@/types'
import { notFound } from 'next/navigation'

export default async function OrderIdPage({
  searchParams
}: {
  searchParams: { orderId: UserOrder['id'] }
}) {
  const orderId = searchParams.orderId
  const order = await getOrderById(orderId)
  if (!order) notFound()

  return (
    <section>
      <article className="max-w-screen-2xl grid grid-cols-1 lg:grid-cols-3 gap-5 mx-auto p-5">
        <OrderItems order={order} />
        <OrderSummary order={order} />
      </article>
    </section>
  )
}

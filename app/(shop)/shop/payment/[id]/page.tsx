import { getOrderById } from '@/actions'
import { BarProgress, OrderItems, OrderSummary } from '@/components'
import { notFound } from 'next/navigation'

export default async function PaymentIdPage({
  params
}: {
  params: { id: string }
}) {
  const order = await getOrderById(params.id)
  if (!order) notFound()

  return (
    <section>
      <BarProgress step={4} />
      <article className="max-w-screen-2xl grid grid-cols-1 lg:grid-cols-3 gap-5 mx-auto p-5">
        <OrderItems order={order} />
        <OrderSummary order={order} />
      </article>
    </section>
  )
}

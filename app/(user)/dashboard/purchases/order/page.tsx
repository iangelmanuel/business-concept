import { getOrderById } from '@/actions'
import { OrderItems, OrderSummary } from '@/components'
import type { UserOrder } from '@/types'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  searchParams
}: {
  searchParams: { orderId: UserOrder['id'] }
}): Promise<Metadata> {
  const orderId = searchParams.orderId

  return {
    title: 'Orden de compra - Business Concept',
    description: `Mira el detalle de tu orden de compra con el numero de registro ${orderId} en Business Concept. ¡Descubre todo lo que has comprado!`,
    keywords: 'orden, compra, detalle, Business Concept',
    robots: 'noindex, nofollow'
  }
}

export default async function OrderIdPage({
  searchParams
}: {
  searchParams: { orderId: UserOrder['id'] }
}) {
  const { orderId } = searchParams
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

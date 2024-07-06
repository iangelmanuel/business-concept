import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getOrderById } from '@/actions'
import { OrderItems, OrderSummary } from '@/components'
import type { UserOrder } from '@/types'
import { ReturnPage } from '@/utils'

export async function generateMetadata({
  params
}: {
  params: { id: UserOrder['id'] }
}): Promise<Metadata> {
  const { id } = params

  return {
    title: 'Orden de compra - Business Concept',
    description: `Mira el detalle de tu orden de compra con el numero de registro ${id} en Business Concept. ¡Descubre todo lo que has comprado!`,
    keywords: 'orden, compra, detalle, Business Concept',
    robots: 'noindex, nofollow'
  }
}

export default async function PurchaseIdPage({
  params
}: {
  params: { id: UserOrder['id'] }
}) {
  const { id } = params
  const order = await getOrderById(id)
  if (!order) notFound()

  return (
    <>
      <ReturnPage />
      <section>
        <article className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-5 p-5 lg:grid-cols-3">
          <OrderItems order={order} />
          <OrderSummary order={order} />
        </article>
      </section>
    </>
  )
}

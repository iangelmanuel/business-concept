import { notFound } from "next/navigation"
import { getOrderById } from "@/actions"
import { OrderItems, OrderSummary } from "@/components"
import { orderStatusLang } from "@/consts"
import type { UserOrder } from "@/types"
import { ReturnPage } from "@/utils"

export async function generateMetadata({
  params
}: {
  params: Promise<{ orderId: UserOrder["id"] }>
}) {
  const { orderId } = await params
  const order = await getOrderById(orderId)
  if (!order) notFound()

  const { orderStatus } = order

  return {
    title: `Orden ${orderStatusLang[orderStatus]} - Business Concept `,
    description: `Detalles del pedido #${order.id} en Business Concept`
  }
}

export default async function OrderIdPage({
  params
}: {
  params: Promise<{ orderId: UserOrder["id"] }>
}) {
  const { orderId } = await params
  const order = await getOrderById(orderId)
  if (!order) notFound()

  const { userId } = order

  return (
    <article>
      <ReturnPage />
      <section className="mx-auto grid max-w-(--breakpoint-2xl) grid-cols-1 gap-5 p-5 lg:grid-cols-3">
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

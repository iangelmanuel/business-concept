import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getOrderById } from "@/actions"
import { BarProgress, OrderItems, OrderSummary } from "@/components"
import type { UserOrder } from "@/types"

export const dynamic = "force-dynamic"

export async function generateMetadata({
  searchParams
}: {
  searchParams: Promise<{ orderId: UserOrder["id"] }>
}): Promise<Metadata> {
  const { orderId } = await searchParams
  const order = await getOrderById(orderId)

  const getTotalItems = order?.OrderItem.reduce(
    (acc, item) => acc + item.quantity,
    0
  )

  return {
    title: "Realiza tu pago - Business Concept",
    description: `Realiza tu pago para la compra en Business Concept. Tu orden es la número ${order?.id} y tienes un total de ${getTotalItems} de articulos para un total de $${order?.total} por pagar.`,
    keywords: "compra, epayco, business concept, tienda online, pagos",
    robots: "noindex, nofollow"
  }
}

export default async function PaymentIdPage({
  searchParams
}: {
  searchParams: Promise<{ orderId: UserOrder["id"] }>
}) {
  const { orderId } = await searchParams
  const order = await getOrderById(orderId)
  if (!order) notFound()

  return (
    <section>
      <BarProgress step={4} />
      <article className="mx-auto grid max-w-(--breakpoint-2xl) grid-cols-1 gap-5 p-5 lg:grid-cols-3">
        <OrderItems order={order} />
        <OrderSummary order={order} />
      </article>
    </section>
  )
}

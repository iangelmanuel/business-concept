import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth.config"
import {
  BarProgress,
  CardCheckoutItems,
  // CardItemsLoading,
  CardCheckoutSummary // CardSummaryLoading
} from "@/components"

export const metadata: Metadata = {
  title: "Revisión del Pedido - Business Concept",
  description:
    "Revisa los productos que has agregado al carrito y tu dirección de envio para las compras en Business Concept.",
  keywords: "carrito, compras, productos, tienda online, business concept",
  robots: "noindex, nofollow"
}

export default async function CheckoutPage() {
  const session = await auth()
  if (!session) redirect("/auth/login?redirect=/shop/checkout")
  return (
    <section>
      <BarProgress step={3} />
      <article className="mx-auto grid max-w-(--breakpoint-2xl) grid-cols-1 gap-x-5 p-5 lg:grid-cols-3">
        <CardCheckoutItems />
        <CardCheckoutSummary />
      </article>
    </section>
  )
}

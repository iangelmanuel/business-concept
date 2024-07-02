import { auth } from '@/auth.config'
import {
  BarProgress,
  CardCheckoutItems, // CardItemsLoading,
  CardCheckoutSummary // CardSummaryLoading
} from '@/components'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Revisión del Pedido - Business Concept',
  description:
    'Revisa los productos que has agregado al carrito y tu dirección de envio para las compras en Business Concept.',
  keywords: 'carrito, compras, productos, tienda online, business concept',
  robots: 'noindex, nofollow'
}

export default async function CheckoutPage() {
  const session = await auth()
  if (!session) redirect('/auth/login?redirect=/shop/checkout')
  return (
    <section>
      <BarProgress step={3} />
      <article className="max-w-screen-2xl grid grid-cols-1 lg:grid-cols-3 gap-x-5 mx-auto p-5">
        <CardCheckoutItems />
        <CardCheckoutSummary />
      </article>
    </section>
  )
}

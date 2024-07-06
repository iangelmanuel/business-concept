import type { Metadata } from 'next'
import {
  BarProgress,
  CardCartItems, // CartItemsLoading,
  CardCartSummary // CartSummaryLoading
} from '@/components'

export const metadata: Metadata = {
  title: 'Carrito de compras - Business Concept',
  description:
    'Revisa los productos que has agregado al carrito de compras en Business Concept.',
  keywords: 'carrito, compras, productos, tienda online, business concept',
  robots: 'noindex, nofollow'
}

export default function CardPage() {
  return (
    <section>
      <BarProgress step={1} />
      <article className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-x-5 p-5 lg:grid-cols-3 lg:p-0">
        <CardCartItems />
        <CardCartSummary />
        {/* <CartItemsLoading />
      <CartSummaryLoading /> */}
      </article>
    </section>
  )
}

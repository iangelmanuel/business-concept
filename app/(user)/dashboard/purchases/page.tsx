import type { Metadata } from 'next'
import { getOrdersByUser } from '@/actions'
import { OrderGrid } from '@/components'
import { titleFont } from '@/config'

export const metadata: Metadata = {
  title: 'Mis compras - Business Concept',
  description:
    'Revisa todas tus compras realizadas en Business Concept. Desde el importe, hasta el estado de tu compra. ¡Descubre todo lo que has comprado!',
  keywords: 'compras, ordenes, estado, importe, Business Concept',
  robots: 'noindex, nofollow'
}

export default async function PurchasesPage() {
  const orders = await getOrdersByUser()

  const isEmptyTitleDescription =
    orders.length === 0 ? 'No tienes ordenes registradas.' : 'Mis compras'

  return (
    <article>
      <>
        <h1 className={`${titleFont.className} mb-3 text-2xl font-bold`}>
          {isEmptyTitleDescription}
        </h1>

        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
          {orders.length !== 0 ? (
            orders.map((order) => (
              <OrderGrid
                key={order.id}
                order={order}
              />
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              Realiza una compra y tendrás tus registros de ordenes en esta
              sección.
            </p>
          )}
        </section>
      </>
    </article>
  )
}

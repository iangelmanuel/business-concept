import { getLocationData, getUserAddress } from '@/actions'
import { auth } from '@/auth.config'
import {
  BarProgress,
  Card,
  CardAddressForm,
  CardAddressUser,
  CardDescription,
  CardHeader
} from '@/components'
import { titleFont } from '@/config'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Detalles del envio - Business Concept',
  description: '¡Necesitamos saber donde hacerte llegar tu pedido!',
  keywords: 'envio, direccion, pedido, compra, tienda online, business concept',
  robots: 'noindex, nofollow'
}

export default async function AddressPage() {
  const session = await auth()
  const location = await getLocationData()
  const addressDb = await getUserAddress()
  if (!session) redirect('/auth/login?redirect=/shop/address')
  return (
    <article>
      <BarProgress step={2} />
      <section className="max-w-screen-lg mx-auto mt-10 p-5 lg:p-0">
        <Card>
          <CardHeader>
            <h1 className={`${titleFont.className} text-2xl font-semibold`}>
              Detalles del envio
            </h1>
            <CardDescription>
              ¡Necesitamos saber donde hacerte llegar tu pedido!
            </CardDescription>
          </CardHeader>

          {addressDb.length === 0 ? (
            <CardAddressForm location={location} />
          ) : (
            <CardAddressUser
              location={location}
              addressDb={addressDb}
            />
          )}
        </Card>
      </section>
    </article>
  )
}

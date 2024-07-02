import { getLocationData, getUserAddress } from '@/actions'
import {
  AddressForm,
  AddressUser,
  Card,
  CardDescription,
  CardHeader
} from '@/components'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dirección de envío - Business Concept',
  description:
    'Agrega tu dirección de envío para que podamos enviarte tus compras.',
  keywords: 'dirección, envío, agregar, compras, dirección de envío',
  robots: 'noindex, nofollow'
}

export default async function AddressesPage() {
  const addresses = await getUserAddress()
  const location = await getLocationData()
  return (
    <article>
      <h1 className="text-2xl font-bold mb-3">Detalles del envio</h1>
      <section className="max-w-screen-lg mx-auto p-5 lg:p-0">
        <Card>
          <CardHeader>
            <CardDescription>
              Agrega tu dirección de envío para que podamos enviarte tus
              compras.
            </CardDescription>
          </CardHeader>

          {addresses.length === 0 ? (
            <AddressForm location={location} />
          ) : (
            <AddressUser
              location={location}
              addressDb={addresses}
            />
          )}
        </Card>
      </section>
    </article>
  )
}

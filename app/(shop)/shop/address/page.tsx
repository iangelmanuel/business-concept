import { getLocationData } from '@/actions'
import { auth } from '@/auth.config'
import {
  Card,
  CardAddressForm,
  CardDescription,
  CardHeader
} from '@/components'
import { redirect } from 'next/navigation'

export default async function AddressPage() {
  const user = await auth()
  const location = await getLocationData()
  if (!user) redirect('/auth/login?redirect=/shop/address')
  return (
    <section className="max-w-screen-lg mx-auto mt-10 p-5 lg:p-0">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-semibold">Detalles del envio</h1>
          <CardDescription>
            ¡Necesitamos saber donde hacerte llegar tu pedido!
          </CardDescription>
        </CardHeader>

        <CardAddressForm location={location} />
      </Card>
    </section>
  )
}

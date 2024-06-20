import { getLocationData } from '@/actions'
import {
  Card,
  CardAddressForm,
  CardDescription,
  CardHeader
} from '@/components'

export default async function AddressPage() {
  const location = await getLocationData()
  return (
    <section className="max-w-screen-lg mx-auto mt-10">
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

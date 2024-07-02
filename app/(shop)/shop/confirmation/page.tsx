import { getRefPaycoData, saveRefEpayco } from '@/actions'
import { BarProgress, ConfirmationData } from '@/components'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  searchParams
}: {
  searchParams: { ref_payco: string }
}): Promise<Metadata> {
  const refPayco = searchParams.ref_payco
  if (refPayco === 'undefined') notFound()

  const dataPaycoAction = await getRefPaycoData(refPayco)
  if (!dataPaycoAction.ok || !dataPaycoAction.dataPayco) notFound()

  const { dataPayco } = dataPaycoAction

  return {
    title: `Compra ${dataPayco.data.x_response} - Business Concept`,
    description: `Compra ${dataPayco.data.x_response} en Business Concept. La razón de la compra es: ${dataPayco.data.x_response_reason_text}`,
    keywords: 'compra, epayco, business concept, tienda online, pago exitoso',
    robots: 'noindex, nofollow'
  }
}

export default async function ConfirmationPage({
  searchParams
}: {
  searchParams: { ref_payco: string }
}) {
  const refPayco = searchParams.ref_payco
  if (refPayco === 'undefined') notFound()

  const dataPaycoAction = await getRefPaycoData(refPayco)
  if (!dataPaycoAction.ok || !dataPaycoAction.dataPayco) notFound()

  const { dataPayco } = dataPaycoAction

  const orderId = dataPayco.data.x_id_invoice
  const saveRef = await saveRefEpayco(refPayco, orderId)
  if (!saveRef.ok) notFound()

  return (
    <section>
      <BarProgress step={5} />

      <ConfirmationData
        dataPayco={dataPayco}
        refPayco={searchParams.ref_payco}
      />
    </section>
  )
}

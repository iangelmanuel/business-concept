import { getRefPaycoData, saveRefEpayco } from '@/actions'
import { BarProgress, ConfirmationData } from '@/components'
import { notFound } from 'next/navigation'

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

import { getRefPaycoData } from '@/actions'
import { ConfirmationData } from '@/components'
import type { UserOrderByAdmin } from '@/types'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params
}: {
  params: { transactionId: UserOrderByAdmin['transactionId'] }
}): Promise<Metadata> {
  const { transactionId } = params
  if (!transactionId) notFound()

  const dataPaycoAction = await getRefPaycoData(transactionId)
  if (!dataPaycoAction.ok || !dataPaycoAction.dataPayco) notFound()

  const { dataPayco } = dataPaycoAction

  return {
    title: `Compra ${dataPayco.data.x_response} - Business Concept`,
    description: `Compra ${dataPayco.data.x_response} en Business Concept. La razón de la compra es: ${dataPayco.data.x_response_reason_text}`,
    keywords: 'compra, epayco, business concept, tienda online, pago exitoso'
  }
}

export default async function InvoiceTransactionIdPage({
  params
}: {
  params: { transactionId: UserOrderByAdmin['transactionId'] }
}) {
  const { transactionId } = params
  if (!transactionId) notFound()

  const dataPaycoAction = await getRefPaycoData(transactionId)
  console.log({ transactionId, dataPaycoAction })
  if (!dataPaycoAction.ok || !dataPaycoAction.dataPayco) notFound()

  const { dataPayco } = dataPaycoAction
  return (
    <section>
      <ConfirmationData
        dataPayco={dataPayco}
        refPayco={transactionId}
      />
    </section>
  )
}

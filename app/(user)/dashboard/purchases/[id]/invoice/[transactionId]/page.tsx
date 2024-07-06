import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getRefPaycoData } from '@/actions'
import { ConfirmationData } from '@/components'
import type { UserOrder } from '@/types'

export async function generateMetadata({
  params
}: {
  params: { transactionId: UserOrder['transactionId'] }
}): Promise<Metadata> {
  const { transactionId } = params
  if (!transactionId) notFound()

  const dataPaycoAction = await getRefPaycoData(transactionId)
  if (!dataPaycoAction.ok || !dataPaycoAction.dataPayco) notFound()

  const { dataPayco } = dataPaycoAction

  return {
    title: `Compra ${dataPayco.data.x_response} - Business Concept`,
    description: `Compra ${dataPayco.data.x_response} en Business Concept. La razón de la compra es: ${dataPayco.data.x_response_reason_text}`,
    keywords: 'compra, epayco, business concept, tienda online, pago exitoso',
    robots: 'noindex, nofollow'
  }
}

export default async function TransactionIdPage({
  params
}: {
  params: { transactionId: UserOrder['transactionId'] }
}) {
  const { transactionId } = params
  if (!transactionId) notFound()

  const dataPaycoAction = await getRefPaycoData(transactionId)
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

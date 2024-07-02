import { getRefPaycoData } from '@/actions'
import { ConfirmationData } from '@/components'
import type { UserOrder } from '@/types'
import { notFound } from 'next/navigation'

export default async function OrderTransactionIdPage({
  params
}: {
  params: { transactionId: UserOrder['transactionId'] }
}) {
  const transactionId = params.transactionId
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

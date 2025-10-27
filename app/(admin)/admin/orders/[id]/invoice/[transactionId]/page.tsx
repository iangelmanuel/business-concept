import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getRefPaycoData } from "@/actions"
import { ConfirmationData } from "@/components"
import type { UserOrderByAdmin } from "@/types"
import { ReturnPage } from "@/utils"

export async function generateMetadata({
  params
}: {
  params: Promise<{ transactionId: UserOrderByAdmin["transactionId"] }>
}): Promise<Metadata> {
  const { transactionId } = await params
  if (!transactionId) notFound()

  const dataPaycoAction = await getRefPaycoData(transactionId)
  if (!dataPaycoAction.ok || !dataPaycoAction.dataPayco) notFound()

  const { dataPayco } = dataPaycoAction

  return {
    title: `Compra ${dataPayco.data.x_response} - Business Concept`,
    description: `Compra ${dataPayco.data.x_response} en Business Concept. La razón de la compra es: ${dataPayco.data.x_response_reason_text}`
  }
}

export default async function InvoiceTransactionIdPage({
  params
}: {
  params: Promise<{ transactionId: UserOrderByAdmin["transactionId"] }>
}) {
  const { transactionId } = await params
  if (!transactionId) notFound()

  const dataPaycoAction = await getRefPaycoData(transactionId)
  if (!dataPaycoAction.ok || !dataPaycoAction.dataPayco) notFound()

  const { dataPayco } = dataPaycoAction

  return (
    <>
      <ReturnPage />
      <section>
        <ConfirmationData
          dataPayco={dataPayco}
          refPayco={transactionId}
        />
      </section>
    </>
  )
}

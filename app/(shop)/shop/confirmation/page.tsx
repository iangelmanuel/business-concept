import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { getRefPaycoData, saveRefEpayco } from '@/actions'
import {
  AlertMessage,
  BarProgress,
  Button,
  ConfirmationData,
  Input,
  Label,
  buttonVariants
} from '@/components'
import { sendInvoice } from '@/email'

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
  searchParams: { ref_payco: string; emailSend: string }
}) {
  const { ref_payco: refPayco, emailSend } = searchParams
  if (refPayco === 'undefined') notFound()

  const dataPaycoAction = await getRefPaycoData(refPayco)
  if (!dataPaycoAction.ok || !dataPaycoAction.dataPayco) notFound()

  const { dataPayco } = dataPaycoAction

  const orderId = dataPayco.data.x_id_invoice
  const saveRef = await saveRefEpayco(refPayco, orderId)
  if (!saveRef.ok) notFound()

  const sendInvoiceEmail = async (formData: FormData) => {
    'use server'
    const email = formData.get('email') as string
    const response = await sendInvoice(email, dataPayco)
    redirect(
      `/shop/confirmation?ref_payco=${refPayco}&emailSend=${response.ok}`
    )
  }

  return (
    <section className="p-3">
      <BarProgress step={5} />

      <ConfirmationData
        dataPayco={dataPayco}
        refPayco={refPayco}
      />

      {emailSend === 'true' ? (
        <div className="mx-auto mt-3 max-w-screen-md">
          <AlertMessage
            variant="success"
            title="¡Todo salió bien!"
            description="Se envio un correo con su factura correctamente."
          />
        </div>
      ) : emailSend === 'false' ? (
        <div className="mx-auto mt-3 max-w-screen-md">
          <AlertMessage
            variant="destructive"
            title="Ocurrio un problema"
            description="No se pudo enviar su factura, por favor intente de nuevo."
          />
        </div>
      ) : null}

      <div className="mx-auto mt-3 flex max-w-screen-md justify-between">
        {emailSend !== 'true' ? (
          <form
            noValidate
            action={sendInvoiceEmail}
            className="flex-1"
          >
            <Label htmlFor="email">Enviar factura al correo:</Label>
            <section className="flex">
              <Input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="Ej. ejemplo@correo.com"
              />
              <Button type="submit">Enviar factura</Button>
            </section>

            <section className="mt-5">
              <Link
                href="/dashboard/purchases"
                className={buttonVariants({ variant: 'secondary' })}
              >
                Ver mis compras
              </Link>
            </section>
          </form>
        ) : (
          <Link
            href="/dashboard/purchases"
            className={buttonVariants({ variant: 'secondary' })}
          >
            Ver mis compras
          </Link>
        )}
      </div>
    </section>
  )
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader
} from '@/components'
import { titleFont } from '@/config'
import type { EpaycoResponse } from '@/types'
import { formatCurrency, formatDate } from '@/utils'
import { CheckCircle, XCircleIcon } from 'lucide-react'

interface Props {
  dataPayco: EpaycoResponse
  refPayco: string
}

export const ConfirmationData = ({ dataPayco, refPayco }: Props) => {
  const isStatusOk =
    dataPayco.data.x_response === 'Aceptada' &&
    dataPayco.data.x_response_reason_text === 'Aprobada'

  return dataPayco.success ? (
    <article className="mx-auto max-w-screen-md">
      <Card>
        <CardHeader>
          <section className="flex items-center justify-center">
            {isStatusOk ? (
              <CheckCircle
                className="text-green-500"
                size={100}
              />
            ) : (
              <XCircleIcon
                className="text-red-500"
                size={100}
              />
            )}
          </section>

          <h1
            className={`${titleFont.className} text-center text-3xl font-bold`}
          >
            {isStatusOk ? 'Transacción Aceptada' : dataPayco.data.x_respuesta}
          </h1>

          <h2
            className={`${titleFont.className} text-center text-xl font-bold text-gray-600`}
          >
            Referencia ePayco #{dataPayco.data.x_ref_payco}
          </h2>

          <p className="text-center">
            Fecha: {formatDate(dataPayco.data.x_transaction_date)}
          </p>
        </CardHeader>

        <CardContent>
          <h3
            className={`mb-3 text-center text-xl font-bold ${titleFont.className}`}
          >
            Medio de pago
          </h3>
          <section className="grid grid-cols-2 gap-5">
            <div className="flex flex-col items-center justify-center">
              <p className="font-bold">Banco</p>
              <CardDescription>{dataPayco.data.x_bank_name}</CardDescription>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className={`${titleFont.className} font-bold`}>Transacción</p>
              <CardDescription>
                {dataPayco.data.x_transaction_id}
              </CardDescription>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className={`${titleFont.className} font-bold`}>
                Tarjeta de crédito
              </p>
              <CardDescription>{dataPayco.data.x_cardnumber}</CardDescription>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className={`${titleFont.className} font-bold`}>Cuotas</p>
              <CardDescription>{dataPayco.data.x_quotas}</CardDescription>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className={`${titleFont.className} font-bold`}>Estado</p>
              <div className="flex items-center gap-x-1">
                {isStatusOk ? (
                  <CheckCircle
                    className="text-green-500"
                    size={20}
                  />
                ) : (
                  <XCircleIcon
                    className="text-red-500"
                    size={20}
                  />
                )}
                <CardDescription>
                  {dataPayco.data.x_transaction_state}
                </CardDescription>
              </div>
            </div>
          </section>

          <h3
            className={`mb-3 mt-8 text-center text-xl font-bold ${titleFont.className}`}
          >
            Datos de la compra
          </h3>
          <section className="grid grid-cols-2 gap-5">
            <div className="flex flex-col items-center justify-center">
              <p className={`${titleFont.className} font-bold`}>
                Ref. Comercio
              </p>
              <CardDescription>{dataPayco.data.x_ref_payco}</CardDescription>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className={`${titleFont.className} font-bold`}>Descripción</p>
              <CardDescription>{dataPayco.data.x_description}</CardDescription>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className={`${titleFont.className} font-bold`}>Subtotal</p>
              <CardDescription>
                {formatCurrency(dataPayco.data.x_amount)}
              </CardDescription>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className={`${titleFont.className} font-bold`}>Valor Total</p>
              <CardDescription>
                {formatCurrency(dataPayco.data.x_amount_ok)}
              </CardDescription>
            </div>
          </section>
        </CardContent>

        <CardFooter className="flex items-center justify-center">
          <CardDescription className="text-center text-xs">
            Número de referencia: {refPayco}
          </CardDescription>
        </CardFooter>
      </Card>
    </article>
  ) : (
    <article className="mx-auto max-w-screen-md p-5">
      <Card>
        <CardHeader>
          <XCircleIcon
            className="text-red-500"
            size={100}
          />
          <h1 className="text-center text-3xl font-bold text-red-500">
            {dataPayco.title_response}
          </h1>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-xs">
            {dataPayco.text_response}
          </CardDescription>
        </CardContent>
      </Card>
    </article>
  )
}

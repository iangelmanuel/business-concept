import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components'
import { titleFont } from '@/config'
import type { EpaycoResponse } from '@/types'
import { formatCurrency, formatDate } from '@/utils'
import { CheckCircle, XCircleIcon } from 'lucide-react'
import process from 'process'

interface Props {
  dataPayco: EpaycoResponse
}

// TODO: Mejorar el template de este email

const { VERCEL_URL } = process.env

const baseUrl = VERCEL_URL ? `https://${VERCEL_URL}` : ''

export const SendInvoiceTemplate = ({ dataPayco }: Props) => {
  const isStatusOk =
    dataPayco.data.x_response === 'Aceptada' &&
    dataPayco.data.x_response_reason_text === 'Aprobada'

  return (
    <Html>
      <Head />
      <Preview>
        Hola,{' '}
        {isStatusOk
          ? '¡Tu transacción ha sido exitosa!'
          : 'Lo sentimos, tu transacción ha sido rechazada.'}
      </Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] py-3">
          <Container className="border bg-white p-[45px]">
            <Img
              src={`${baseUrl}/logo.png`}
              width="40"
              height="33"
              alt="Business Concept Logo"
            />
            <Section>
              <Text>Hola,</Text>
              <Text>
                {isStatusOk
                  ? '¡Tu transacción ha sido exitosa! A continuación, te mostramos los detalles de la transacción.'
                  : 'Lo sentimos, tu transacción ha sido rechazada. A continuación, te mostramos los detalles de la transacción.'}
              </Text>
            </Section>

            <Section className="mx-auto max-w-screen-md">
              <Section>
                <Section>
                  <Section className="flex items-center justify-center">
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
                  </Section>

                  <Heading
                    className={`${titleFont.className} text-center text-3xl font-bold`}
                  >
                    {isStatusOk
                      ? 'Transacción Aceptada'
                      : dataPayco.data.x_respuesta}
                  </Heading>

                  <Heading
                    className={`${titleFont.className} text-center text-xl font-bold text-gray-600`}
                  >
                    Referencia ePayco #{dataPayco.data.x_ref_payco}
                  </Heading>

                  <p className="text-center">
                    Fecha: {formatDate(dataPayco.data.x_transaction_date)}
                  </p>
                </Section>

                <Section>
                  <Heading
                    className={`mb-3 text-center text-xl font-bold ${titleFont.className}`}
                  >
                    Medio de pago
                  </Heading>
                  <Section className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col items-center justify-center">
                      <Text className="font-bold">Banco</Text>
                      <Text className="text-sm text-muted-foreground">
                        {dataPayco.data.x_bank_name}
                      </Text>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <Text className={`${titleFont.className} font-bold`}>
                        Transacción
                      </Text>
                      <Text className="text-sm text-muted-foreground">
                        {dataPayco.data.x_transaction_id}
                      </Text>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <Text className={`${titleFont.className} font-bold`}>
                        Tarjeta de crédito
                      </Text>
                      <Text className="text-sm text-muted-foreground">
                        {dataPayco.data.x_cardnumber}
                      </Text>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <Text className={`${titleFont.className} font-bold`}>
                        Cuotas
                      </Text>
                      <Text className="text-sm text-muted-foreground">
                        {dataPayco.data.x_quotas}
                      </Text>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <Text className={`${titleFont.className} font-bold`}>
                        Estado
                      </Text>
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
                        <Text className="text-sm text-muted-foreground">
                          {dataPayco.data.x_transaction_state}
                        </Text>
                      </div>
                    </div>
                  </Section>

                  <Heading
                    className={`mb-3 mt-8 text-center text-xl font-bold ${titleFont.className}`}
                  >
                    Datos de la compra
                  </Heading>
                  <Section className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col items-center justify-center">
                      <Text className={`${titleFont.className} font-bold`}>
                        Ref. Comercio
                      </Text>
                      <Text className="text-sm text-muted-foreground">
                        {dataPayco.data.x_ref_payco}
                      </Text>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <Text className={`${titleFont.className} font-bold`}>
                        Descripción
                      </Text>
                      <Text className="text-sm text-muted-foreground">
                        {dataPayco.data.x_description}
                      </Text>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <Text className={`${titleFont.className} font-bold`}>
                        Subtotal
                      </Text>
                      <Text className="text-sm text-muted-foreground">
                        {formatCurrency(dataPayco.data.x_amount)}
                      </Text>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <Text className={`${titleFont.className} font-bold`}>
                        Valor Total
                      </Text>
                      <Text className="text-sm text-muted-foreground">
                        {formatCurrency(dataPayco.data.x_amount_ok)}
                      </Text>
                    </div>
                  </Section>

                  <Section>
                    <Text>
                      Si tienes alguna pregunta, no dudes en ponerte en contacto
                      con nosotros por medio de{' '}
                      <Link
                        href={`${baseUrl}/contact`}
                        className="text-blue-500 underline"
                      >
                        este enlace
                      </Link>
                    </Text>

                    <Text>Gracias por confiar en nosotros.</Text>
                  </Section>
                </Section>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

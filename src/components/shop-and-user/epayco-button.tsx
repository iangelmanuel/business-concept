'use client'

import { Badge, CardFooter, Label, buttonVariants } from '@/components'
import type { UserOrder } from '@/types'
import { checkOrderStatus } from '@/utils'
import Script from 'next/script'
import { useEffect } from 'react'

type Props = {
  order: UserOrder
  isAdmin?: boolean
}

export const EpaycoButton = ({ order, isAdmin = false }: Props) => {
  useEffect(() => {
    const btnpay = document.getElementsByClassName('epayco-button-render')
    if (!order.isPaid && !isAdmin) {
      setTimeout(() => {
        btnpay[0].setAttribute('id', 'epayco-pay')
      }, 1000)
    }
  }, [isAdmin, order])

  return (
    <CardFooter>
      {order.isPaid ? (
        <Badge
          variant="success"
          className="flex w-full items-center justify-center py-2"
        >
          Aprobado
        </Badge>
      ) : !isAdmin ? (
        <>
          <Label
            htmlFor="epayco-pay"
            className={`${buttonVariants()} w-full cursor-pointer`}
          >
            {checkOrderStatus(order) === 'destructive'
              ? 'Reintentar pago'
              : 'Pagar con ePayco'}
          </Label>

          <form>
            <Script
              src={'https://checkout.epayco.co/checkout.js'}
              data-epayco-key={process.env.NEXT_PUBLIC_EPAYCO_KEY}
              data-epayco-private-key={
                process.env.NEXT_PUBLIC_EPAYCO_PRIVATE_KEY
              }
              className="epayco-button"
              data-epayco-invoice={order.id}
              data-epayco-amount="20000"
              data-epayco-tax="0.00"
              data-epayco-tax-ico="0.00"
              data-epayco-tax-base="20000"
              data-epayco-name="Business Concept"
              data-epayco-description="Compra en Business Concept"
              data-epayco-currency="cop"
              data-epayco-country="CO"
              data-epayco-test="true"
              data-epayco-external="false"
              data-epayco-methodconfirmation="get"
              data-epayco-confirmation={
                process.env.NEXT_PUBLIC_PAYCO_RESPONSE_URL
              }
              data-epayco-type-doc-billing={
                order.OrderAddress?.typeOfIdentification
              }
              data-epayco-number-doc-billing={
                order.OrderAddress?.identification
              }
              data-epayco-name-billing={`
              ${order.OrderAddress?.firstName} ${order.OrderAddress?.lastName}
            `}
              data-epayco-mobilephone-billing={order.OrderAddress?.phone}
            />
          </form>
        </>
      ) : null}
    </CardFooter>
  )
}

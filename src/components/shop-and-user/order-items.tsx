import Image from 'next/image'
import Link from 'next/link'
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  PriceWithPosibleDiscount,
  buttonVariants
} from '@/components'
import { titleFont } from '@/config'
import { orderStatusLang } from '@/consts'
import type { UserOrder, UserOrderByAdmin } from '@/types'
import { checkOrderStatusCn } from '@/utils'

interface Props {
  order: UserOrder | UserOrderByAdmin
  isAdminFromUser?: boolean
  isAdminFromOrder?: boolean
  userId?: string
}

export const OrderItems = ({
  order,
  isAdminFromUser = false,
  isAdminFromOrder = false,
  userId = ''
}: Props) => {
  const isAdminTitle = isAdminFromUser
    ? 'Detalles del resumen de la compra del usuario'
    : 'Detalles del resumen de la compra'

  const isAdminCardDescription = isAdminFromUser
    ? 'Detalles de la compra del usuario.'
    : 'Por favor, revisa los detalles de tu compra antes de proceder al pago.'

  const orderId = order.id
  const { transactionId, orderStatus } = order

  const isAdminHref =
    isAdminFromUser && userId
      ? `/admin/users/${userId}/order/${orderId}/invoice/${transactionId}`
      : isAdminFromOrder
        ? `/admin/orders/${orderId}/invoice/${transactionId}`
        : `/dashboard/purchases/${orderId}/invoice/${transactionId}`

  return (
    <Card className="order-2 lg:order-1 lg:col-span-2">
      <CardHeader>
        <section className="flex items-center justify-between">
          <h2 className={`${titleFont.className} text-2xl font-bold`}>
            {isAdminTitle}
          </h2>

          <Badge variant={checkOrderStatusCn(orderStatus)}>
            {orderStatusLang[orderStatus]}
          </Badge>
        </section>

        <CardDescription>{isAdminCardDescription}</CardDescription>

        <section className="flex items-center justify-between">
          {order.OrderTracking && (
            <>
              <div>
                <p className="font-bold">Código de rastreo:</p>
                <span className="capitalize">
                  {order.OrderTracking.company} -{' '}
                </span>
                <span>{order.OrderTracking.trackingCode}</span>
              </div>
            </>
          )}

          {order.transactionId && (
            <Link
              href={isAdminHref}
              className={buttonVariants()}
            >
              Ver factura
            </Link>
          )}
        </section>
      </CardHeader>

      <CardContent>
        <section className="mt-4 space-y-3">
          <div>
            <h3 className={`${titleFont.className} mb-3 text-lg font-bold`}>
              Productos
            </h3>
            <ul className="space-y-3">
              {order.OrderItem.map((item) => (
                <li key={item.product.slug}>
                  <Card className="p-6">
                    <section className="flex flex-col items-center justify-between md:flex-row">
                      <article className="flex flex-col items-center md:flex-row md:gap-x-5">
                        <Image
                          src={item.product.productImage[0].url}
                          alt={`producto ${item.product.name}`}
                          width={70}
                          height={50}
                          className="object-cover"
                        />
                        <div>
                          <Link
                            href={`/shop/product/${item.product.slug}`}
                            className={`${titleFont.className} font-bold hover:underline`}
                          >
                            {item.product.name}
                          </Link>
                        </div>
                      </article>

                      <CardContent className="flex flex-col items-center justify-center p-0">
                        <PriceWithPosibleDiscount
                          price={item.price}
                          discount={item.discount}
                          className={`${titleFont.className} font-bold`}
                        />
                      </CardContent>
                    </section>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </CardContent>
    </Card>
  )
}

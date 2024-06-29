import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from '@/components'
import type { UserOrder } from '@/types'
import { checkOrderStatus, formatCurrency } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  order: UserOrder
}

export const OrderItems = ({ order }: Props) => {
  return (
    <Card className="lg:col-span-2 order-2 lg:order-1">
      <CardHeader>
        <section className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            Detalles del resumen de la compra
          </h2>
          <Badge variant={checkOrderStatus(order)}>
            {checkOrderStatus(order) === 'success'
              ? 'Aprobado'
              : checkOrderStatus(order) === 'pending'
                ? 'Pendiente'
                : 'Rechazado'}
          </Badge>
        </section>

        <CardDescription>
          Por favor, revisa los detalles de tu compra antes de proceder al pago.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <article>
          <section className="mt-4 space-y-3">
            <div>
              <h3 className="text-lg font-bold mb-3">Productos</h3>
              <ul className="space-y-3">
                {order.OrderItem.map((item) => (
                  <li key={item.product.slug}>
                    <Card className="p-6">
                      <section className="flex flex-col md:flex-row justify-between items-center">
                        <article className="flex flex-col md:flex-row items-center md:gap-x-5">
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
                              className="hover:underline"
                            >
                              {item.product.name}
                            </Link>
                          </div>
                        </article>

                        <CardContent className="p-0 flex flex-col justify-center items-center">
                          <section>
                            <p className="font-bold">
                              {formatCurrency(item.price)}
                            </p>
                          </section>
                        </CardContent>
                      </section>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </article>
      </CardContent>
    </Card>
  )
}

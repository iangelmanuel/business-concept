import {
  Badge,
  buttonVariants,
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components'
import { titleFont } from '@/config'
import type { OrderGridType } from '@/types'
import { formatCurrency, formatDate, checkOrderStatus } from '@/utils'
import Link from 'next/link'

type Props = {
  order: OrderGridType
  isAdmin?: boolean
  userId?: string
}

export const OrderGrid = ({ order, isAdmin, userId }: Props) => {
  const isAdminHref = isAdmin
    ? `/admin/users/${userId}/order?orderId=${order.id}`
    : `/dashboard/purchases/order?orderId=${order.id}`

  return (
    <Card key={order.id}>
      <CardHeader className="flex">
        <h2 className={`${titleFont.className} font-bold`}>
          Orden: {order.id}
        </h2>
      </CardHeader>

      <CardContent>
        <h3 className={`${titleFont.className} font-bold`}>Información</h3>
        <section className="text-sm text-muted-foreground">
          <div>
            <span className="font-bold">Importe:</span>{' '}
            <span>{formatCurrency(order.total)}</span>
          </div>

          <div>
            <span className="font-bold">Fecha:</span>{' '}
            <span>{formatDate(order.createdAt)}</span>
          </div>

          <div>
            <span className="font-bold">Estado:</span>{' '}
            <Badge variant={checkOrderStatus(order)}>
              {checkOrderStatus(order) === 'success'
                ? 'Aprobado'
                : checkOrderStatus(order) === 'pending'
                  ? 'Pendiente de Pago'
                  : 'Rechazado'}
            </Badge>
          </div>
        </section>
      </CardContent>

      <CardFooter className="flex items-center justify-end">
        <Link
          href={isAdminHref}
          className={buttonVariants()}
        >
          Ver detalles
        </Link>
      </CardFooter>
    </Card>
  )
}

import Link from 'next/link'
import {
  Badge,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  buttonVariants
} from '@/components'
import { titleFont } from '@/config'
import type { OrderGridType } from '@/types'
import { checkOrderStatus, formatCurrency, formatDate } from '@/utils'

type Props = {
  order: OrderGridType
  isAdmin?: boolean
  userId?: string
}

export const OrderGrid = ({ order, isAdmin, userId }: Props) => {
  const orderId = order.id

  const isAdminHref = isAdmin
    ? `/admin/users/${userId}/order/${orderId}`
    : `/dashboard/purchases/${orderId}`

  return (
    <Card key={orderId}>
      <CardHeader className="flex">
        <h2 className={`${titleFont.className} font-bold`}>Orden: {orderId}</h2>
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

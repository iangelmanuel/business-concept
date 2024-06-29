import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader
} from '@/components'
import type { UserOrder } from '@/types'
import { checkOrderStatus, formatCurrency } from '@/utils'
import { notFound } from 'next/navigation'

type Props = {
  order: UserOrder
}

export const OrderSummary = ({ order }: Props) => {
  const address = order.OrderAddress
  if (!address) return notFound()
  return (
    <section className="order-1 lg:order-2">
      <Card className="md:sticky md:top-0">
        <CardHeader>
          <h2 className="text-2xl font-bold">Resumen de la compra</h2>
          <CardDescription>
            Por favor, revisa los productos seleccionados antes de proceder al
            pago.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <article className="space-y-2">
            <h3 className="text-lg font-bold mb-3">Dirección de envío</h3>
            <section className="mb-3 text-sm sm:text-base">
              <div className="flex justify-between">
                <p>Recibe:</p>
                <p className="capitalize">
                  {address.firstName} {address.lastName}
                </p>
              </div>

              <div className="flex justify-between">
                <p>Documento:</p>
                <p>
                  {address.typeOfIdentification} {address.identification}
                </p>
              </div>

              <div className="flex justify-between">
                <p>Télefono:</p>
                <p>{address.phone}</p>
              </div>

              <div className="flex justify-between">
                <p>Departamento:</p>
                <p className="capitalize">{address.department}</p>
              </div>

              <div className="flex justify-between">
                <p>Ciudad:</p>
                <p className="capitalize">{address.city}</p>
              </div>

              <div className="flex justify-between">
                <p>Código Postal:</p>
                <p>{address.postalCode}</p>
              </div>

              <div className="flex justify-between">
                <p>Dirección:</p>
                <p>{address.address}</p>
              </div>

              {address.address2 && (
                <div className="flex justify-between">
                  <p>Dirección 2:</p>
                  <p>{address.address2}</p>
                </div>
              )}

              {address.extraData && (
                <div className="flex justify-between">
                  <p>Información adicional:</p>
                  <p>{address.extraData}</p>
                </div>
              )}
            </section>

            <h3 className="text-lg font-bold mb-3">Detalles de Precio</h3>
            <section className="space-y-3 mb-3 text-sm sm:text-base">
              <div className="flex justify-between">
                <p>Subtotal:</p>
                <p>{formatCurrency(order.subtotal)}</p>
              </div>

              <div className="flex justify-between">
                <p>Impuestos:</p>
                <p>{formatCurrency(order.tax)}</p>
              </div>

              <div className="flex justify-between">
                <p>Total:</p>
                <p className="font-bold">{formatCurrency(order.total)}</p>
              </div>
            </section>
          </article>
        </CardContent>

        <CardFooter>
          <Badge
            variant={checkOrderStatus(order)}
            className="w-full flex justify-center items-center py-2"
          >
            {checkOrderStatus(order) === 'success'
              ? 'Pago Completado'
              : checkOrderStatus(order) === 'pending'
                ? 'Pendiente de Pago'
                : 'Pago Rechazado'}
          </Badge>
        </CardFooter>
      </Card>
    </section>
  )
}

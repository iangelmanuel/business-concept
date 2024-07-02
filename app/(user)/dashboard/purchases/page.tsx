import { getOrdersByUser } from '@/actions'
import {
  Badge,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  buttonVariants
} from '@/components'
import { checkOrderStatus, formatCurrency, formatDate } from '@/utils'
import Link from 'next/link'

export default async function PurchasesPage() {
  const orders = await getOrdersByUser()
  return (
    <article>
      {orders.length !== 0 ? (
        <>
          <h1 className="text-2xl font-bold mb-3">Mis compras</h1>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-5">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="flex">
                  <h2 className="font-bold">Orden: {order.id}</h2>
                </CardHeader>

                <CardContent>
                  <h3 className="font-bold">Información</h3>
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

                <CardFooter className="flex justify-end items-center">
                  <Link
                    href={`/dashboard/purchases/order?orderId=${order.id}`}
                    className={buttonVariants()}
                  >
                    Ver detalles
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </section>
        </>
      ) : (
        <h1 className="text-2xl font-bold">No se ha registrado compras</h1>
      )}
    </article>
  )
}

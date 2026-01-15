import { notFound } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card"
import { titleFont } from "@/config"
import type { UserOrder } from "@/types"
import { formatCurrency } from "@/utils"
import { EpaycoButton } from "./epayco-button"

interface Props {
  order: UserOrder
  isAdmin?: boolean
}

export const OrderSummary = ({ order, isAdmin = false }: Props) => {
  const address = order.OrderAddress
  if (!address) return notFound()

  const isAdminTitle = isAdmin ? "Orden del usuario" : "Resumen de la compra"

  const isAdminCardDescription = isAdmin
    ? `Orden: ${order.id}`
    : "Por favor, revisa los productos seleccionados antes de proceder al pago."

  return (
    <section className="order-1 lg:order-2">
      <Card className="md:sticky md:top-0">
        <CardHeader>
          <h2 className={`${titleFont.className} text-2xl font-bold`}>
            {isAdminTitle}
          </h2>
          <CardDescription>{isAdminCardDescription}</CardDescription>
        </CardHeader>

        <CardContent>
          <article className="space-y-2">
            <h3 className={`${titleFont.className} mb-3 text-lg font-bold`}>
              Dirección de envío
            </h3>
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

            <h3 className={`${titleFont.className} mb-3 text-lg font-bold`}>
              Detalles de Precio
            </h3>
            <section className="mb-3 space-y-3 text-sm sm:text-base">
              <div className="flex justify-between">
                <p>Subtotal:</p>
                <p>{formatCurrency(order.subtotal)}</p>
              </div>

              {order.discount > 0 && (
                <div className="flex justify-between">
                  <p>Descuento:</p>
                  <p>{formatCurrency(order.discount)}</p>
                </div>
              )}

              <div className="flex justify-between">
                <p>Impuestos:</p>
                <p>{formatCurrency(order.tax)}</p>
              </div>

              <div className="flex justify-between">
                <p className={`${titleFont.className} font-bold`}>Total:</p>
                <p className={`${titleFont.className} font-bold`}>
                  {formatCurrency(order.total)}
                </p>
              </div>
            </section>
          </article>
        </CardContent>

        <EpaycoButton
          order={order}
          isAdmin={isAdmin}
        />
      </Card>
    </section>
  )
}

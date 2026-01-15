import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { titleFont } from "@/config"
import { orderStatusLang } from "@/consts"
import type { OrderGridType } from "@/types"
import { checkOrderStatusCn, formatCurrency, formatDate } from "@/utils"

interface Props {
  order: OrderGridType
  isAdmin?: boolean
  userId?: string
}

export const OrderGrid = ({ order, isAdmin, userId }: Props) => {
  const orderId = order.id

  const isAdminHref = isAdmin
    ? `/admin/users/${userId}/order/${orderId}`
    : `/dashboard/purchases/${orderId}`

  const { orderStatus } = order

  return (
    <Card key={orderId}>
      <CardHeader className="flex">
        <h2 className={`${titleFont.className} font-bold`}>Orden: {orderId}</h2>
      </CardHeader>

      <CardContent>
        <h3 className={`${titleFont.className} font-bold`}>Información</h3>
        <section className="text-muted-foreground text-sm">
          <div>
            <span className="font-bold">Importe:</span>{" "}
            <span>{formatCurrency(order.total)}</span>
          </div>

          <div>
            <span className="font-bold">Fecha:</span>{" "}
            <span>{formatDate(order.createdAt)}</span>
          </div>

          <div>
            <span className="font-bold">Estado:</span>{" "}
            <Badge variant={checkOrderStatusCn(orderStatus)}>
              {orderStatusLang[orderStatus]}
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

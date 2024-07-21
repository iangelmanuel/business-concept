import Link from 'next/link'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from '@/components'
import { titleFont } from '@/config'
import type { AdminDashboard } from '@/types'
import { formatCurrency, formatDate, getLettersName } from '@/utils'

interface Props {
  data: AdminDashboard[] | null
}

export const OrderWithApproveStatus = ({ data }: Props) => {
  const ordersWithApproveStatus = data?.filter(
    (item) => item.orderStatus === 'approved'
  )

  return (
    <article>
      <Card>
        <CardHeader>
          <h2 className={`${titleFont.className} text-xl font-bold`}>
            Pedidos esperados a ser enviados:
          </h2>
          <CardDescription>
            Total de productos a ser enviados: {ordersWithApproveStatus?.length}
          </CardDescription>
        </CardHeader>

        <CardContent className="h-80 overflow-y-auto">
          {ordersWithApproveStatus?.map((item) => (
            <Link
              key={item.id}
              href={`/admin/orders/${item.id}`}
              className="flex cursor-pointer flex-col items-center justify-between rounded-lg p-3 hover:bg-muted sm:flex-row"
            >
              <article className="flex items-center gap-3">
                <section>
                  <Avatar>
                    <AvatarImage
                      src="/images/avatar.jpg"
                      alt="avatar"
                    />
                    <AvatarFallback>
                      {getLettersName(item.user.name, item.user.lastname)}
                    </AvatarFallback>
                  </Avatar>
                </section>

                <section>
                  <h3>{item.user.name}</h3>
                  <CardDescription>{item.user.email}</CardDescription>
                </section>
              </article>

              <article>
                <h3 className={`${titleFont.className} text-lg font-bold`}>
                  {formatCurrency(item.total)}
                </h3>
                <CardDescription>{formatDate(item.paidAt!)}</CardDescription>
              </article>
            </Link>
          ))}
        </CardContent>
      </Card>
    </article>
  )
}

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { titleFont } from "@/config"
import type { AdminDashboard, UserType } from "@/types"
import { formatCurrency } from "@/utils"
import { Box, CheckCircle, DollarSign, User } from "lucide-react"

interface UserIdType {
  id: UserType["id"]
}

interface Props {
  data: AdminDashboard[] | null
  userId: UserIdType[] | null
}

export const GeneralFinanceCards = ({ data, userId }: Props) => {
  const totalReceived = data?.reduce((acc, item) => {
    const { total, discount } = item

    if (item.discount === 0 && item.paidAt !== null) {
      return acc + total
    }

    if (item.discount !== 0 && item.paidAt !== null) {
      return acc + total - discount
    }

    return acc
  }, 0)

  const totalOrderWithApproveStatus = data?.reduce((acc, item) => {
    if (item.orderStatus === "approved") {
      return acc + 1
    }
    return acc
  }, 0)

  const totalOrders = data?.length
  const totalUsers = userId?.length

  return (
    <article className="lg:col-span-2">
      <h1 className={`${titleFont.className} mb-5 text-2xl font-bold`}>
        Dashboard Administrativo de Business Company
      </h1>

      <section className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <Card className="flex flex-col-reverse items-center justify-between p-2 sm:flex-row">
          <div>
            <CardHeader>
              <h2>Total recibido:</h2>
            </CardHeader>

            <CardContent>
              <span className="mb-3 block text-sm font-bold md:text-xl lg:text-2xl">
                {formatCurrency(totalReceived!)}
              </span>
            </CardContent>
          </div>

          <div>
            <DollarSign size={18} />
          </div>
        </Card>

        <Card className="flex flex-col-reverse items-center justify-between p-3 sm:flex-row">
          <div>
            <CardHeader>
              <h2>Total ordenes:</h2>
            </CardHeader>

            <CardContent>
              <span
                className={`${titleFont.className} mb-3 block text-sm font-bold md:text-xl lg:text-2xl`}
              >
                {totalOrders}
              </span>
            </CardContent>
          </div>

          <div>
            <Box size={18} />
          </div>
        </Card>

        <Card className="flex flex-col-reverse items-center justify-between p-3 sm:flex-row">
          <div>
            <CardHeader>
              <h2>Total ordenes por revisar:</h2>
            </CardHeader>

            <CardContent>
              <span
                className={`${titleFont.className} mb-3 block text-sm font-bold md:text-xl lg:text-2xl`}
              >
                {totalOrderWithApproveStatus}
              </span>
            </CardContent>
          </div>

          <div>
            <CheckCircle size={18} />
          </div>
        </Card>

        <Card className="flex flex-col-reverse items-center justify-between p-3 sm:flex-row">
          <div>
            <CardHeader>
              <h2>Total usuarios activos:</h2>
            </CardHeader>

            <CardContent>
              <span
                className={`${titleFont.className} mb-3 block text-sm font-bold md:text-xl lg:text-2xl`}
              >
                {totalUsers}
              </span>
            </CardContent>
          </div>

          <div>
            <User size={18} />
          </div>
        </Card>
      </section>
    </article>
  )
}

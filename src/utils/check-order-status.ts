import type { UserOrder } from "@/types"

type OrderStatus = UserOrder["orderStatus"]

export function checkOrderStatusCn(orderStatus: OrderStatus) {
  switch (orderStatus) {
    case "pending":
      return "pending"

    case "processing":
      return "pending"

    case "cancelled":
      return "destructive"

    case "approved":
      return "success"

    case "shipped":
      return "shipped"

    case "delivered":
      return "delivered"

    default:
      return "pending"
  }
}

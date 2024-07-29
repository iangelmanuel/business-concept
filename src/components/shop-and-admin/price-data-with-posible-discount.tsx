import type { ProductType } from "@/types"
import { utilDiscountConverter } from "@/utils"

interface Props {
  price: ProductType["price"]
  discount: ProductType["discount"]
  className?: string
  isAdmin?: boolean
}

export const PriceWithPosibleDiscount = ({
  price,
  discount,
  className = "",
  isAdmin = false
}: Props) => {
  const {
    isProductWithDiscount,
    priceBeforeFormatted,
    priceAfterFormatted,
    percentageOfDiscount
  } = utilDiscountConverter(discount, price)

  const isAdminDashboard = isAdmin ? "N/A" : priceBeforeFormatted

  return isProductWithDiscount ? (
    <>
      <p className="text-muted-foreground line-through">
        {priceBeforeFormatted}
      </p>
      <div>
        <span className={className}>{priceAfterFormatted}</span>{" "}
        <span className="font-extrabold text-yellow-500">
          {percentageOfDiscount}
        </span>
      </div>
    </>
  ) : (
    <p className={className}>{isAdminDashboard}</p>
  )
}

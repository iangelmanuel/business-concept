import { formatCurrency } from '../format-currency/format-currency'
import type { ProductType } from '@/types'

function discountConverter(discount: ProductType['discount']) {
  if (discount === 1) {
    return '0%'
  } else {
    return `${discount * 100}%`
  }
}

function getProductDiscount(
  price: ProductType['price'],
  discount: ProductType['discount']
) {
  if (discount === 1) {
    return price
  } else {
    return price * discount
  }
}

export function utilDiscountConverter(
  discount: ProductType['price'],
  price: ProductType['discount']
) {
  const isProductWithDiscount = discount !== 1 // TRUE OR FALSE
  const priceWithDiscount = getProductDiscount(price, discount) // NUMBER

  const priceBeforeFormatted = formatCurrency(price)
  const priceAfterFormatted = formatCurrency(price - priceWithDiscount)
  const percentageOfDiscount = discountConverter(discount)

  return {
    isProductWithDiscount,
    priceWithDiscount,
    priceBeforeFormatted,
    priceAfterFormatted,
    percentageOfDiscount
  }
}

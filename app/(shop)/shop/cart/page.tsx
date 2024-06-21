import {
  CardCartItems, // CartItemsLoading,
  CardCartSummary // CartSummaryLoading
} from '@/components'

export default function CardPage() {
  return (
    <section className="max-w-screen-2xl grid grid-cols-1 sm:grid-cols-3 gap-x-5 mx-auto">
      <CardCartItems />
      <CardCartSummary />
      {/* <CartItemsLoading />
      <CartSummaryLoading /> */}
    </section>
  )
}

import {
  CardCartItems, // CartItemsLoading,
  CardCartSummary // CartSummaryLoading
} from '@/components'

export default function CardPage() {
  return (
    <section className="max-w-screen-2xl grid grid-cols-1 lg:grid-cols-3 gap-x-5 mx-auto p-5 2xl:p-0">
      <CardCartItems />
      <CardCartSummary />
      {/* <CartItemsLoading />
      <CartSummaryLoading /> */}
    </section>
  )
}

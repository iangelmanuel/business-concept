import {
  CardCartItems, // CartItemsLoading,
  CardCartSummary // CartSummaryLoading
} from '@/components'

export default function CardPage() {
  return (
    <section className="max-w-screen-2xl flex gap-x-5 mx-auto">
      <CardCartItems />
      <CardCartSummary />
      {/* <CartItemsLoading />
      <CartSummaryLoading /> */}
    </section>
  )
}

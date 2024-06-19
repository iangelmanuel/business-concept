import {
  CartItems, // CartItemsLoading,
  PaymentSummary // PaymentSummaryLoading
} from '@/components'

export default function CardPage() {
  return (
    <section className="max-w-screen-2xl flex gap-x-5 mx-auto">
      <CartItems />
      <PaymentSummary />
      {/* <CartItemsLoading />
      <PaymentSummaryLoading /> */}
    </section>
  )
}

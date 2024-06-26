import {
  BarProgress,
  CardCartItems, // CartItemsLoading,
  CardCartSummary // CartSummaryLoading
} from '@/components'

export default function CardPage() {
  return (
    <section>
      <BarProgress step={1} />
      <article className="max-w-screen-2xl grid grid-cols-1 lg:grid-cols-3 gap-x-5 mx-auto p-5 lg:p-0">
        <CardCartItems />
        <CardCartSummary />
        {/* <CartItemsLoading />
      <CartSummaryLoading /> */}
      </article>
    </section>
  )
}

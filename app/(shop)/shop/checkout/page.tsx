import { auth } from '@/auth.config'
import {
  CardCheckoutItems, // CardItemsLoading,
  CardCheckoutSummary // CardSummaryLoading
} from '@/components'
import { redirect } from 'next/navigation'

export default async function CheckoutPage() {
  const user = await auth()
  if (!user) redirect('/auth/login?redirect=/shop/checkout')
  return (
    <section className="max-w-screen-2xl grid grid-cols-1 lg:grid-cols-3 gap-x-5 mx-auto p-5">
      <CardCheckoutItems />
      <CardCheckoutSummary />
    </section>
  )
}

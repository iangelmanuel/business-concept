import { auth } from '@/auth.config'
import { CardCheckoutDetails, CardCheckoutSummary } from '@/components'
import { redirect } from 'next/navigation'

export default async function CheckoutPage() {
  const user = await auth()
  if (!user) redirect('/auth/login?redirect=/shop/checkout')
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 max-w-screen-2xl mx-auto mt-10">
      <CardCheckoutDetails />
      <CardCheckoutSummary />
    </section>
  )
}

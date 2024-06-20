import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'

export default async function CheckoutPage() {
  const user = await auth()
  if (!user) redirect('/auth/login?redirect=/shop/checkout')
  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  )
}

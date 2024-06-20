import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'

export default function CheckoutPage() {
  const user = auth()
  if (!user) redirect('/login?redirect=/shop/checkout')
  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  )
}

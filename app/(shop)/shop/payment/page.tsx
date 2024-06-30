import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'

export default async function PaymentPage() {
  const user = await auth()
  if (!user) redirect('/auth/login?redirect=/shop/payment')

  return redirect('/shop/cart')
}

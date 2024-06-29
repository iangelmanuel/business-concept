import { redirect } from 'next/navigation'

export default function OrderPage() {
  return redirect('/dashboard/purchases')
}

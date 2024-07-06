'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Progress } from '@/components'
import { useAddressStore, useCartStore } from '@/store'
import {
  CalendarCheck,
  CircleCheckBig,
  CreditCardIcon,
  MapPinIcon,
  ShoppingCart,
  UserCheckIcon
} from 'lucide-react'

type Props = {
  step: number
}

export const BarProgress = ({ step }: Props) => {
  const pathname = usePathname()

  const initialProgress =
    pathname === '/shop/cart'
      ? 0
      : pathname === '/shop/address'
        ? 0
        : pathname === '/shop/checkout'
          ? 25
          : pathname === '/shop/payment'
            ? 50
            : pathname === '/shop/confirmation'
              ? 100
              : 0

  const [progress, setProgress] = useState(initialProgress)

  const cart = useCartStore((state) => state.cart)
  const clearCart = useCartStore((state) => state.clearCart)

  const address = useAddressStore((state) => state.address)
  const clearAddress = useAddressStore((state) => state.clearAddress)

  useEffect(() => {
    switch (step) {
      case 1:
        setTimeout(() => setProgress(0), 500)
        break
      case 2:
        setTimeout(() => setProgress(25), 500)
        break
      case 3:
        setTimeout(() => setProgress(50), 500)
        break
      case 4:
        setTimeout(() => setProgress(75), 500)
        break
      default:
        setTimeout(() => setProgress(100), 500)
        break
    }
  }, [step, pathname])

  const isAddressEmpty = Object.keys(address).length === 0
  const isCartEmpty = cart.length === 0

  if (!isCartEmpty && !isAddressEmpty && pathname === '/shop/payment') {
    clearCart()
    clearAddress()
  }

  return (
    <section className="mx-auto mb-3 mt-10 max-w-screen-2xl p-5 2xl:p-0">
      <article className="relative flex items-center justify-between text-white">
        <Progress
          value={progress}
          className="absolute left-1/2 top-1/2 -z-10 w-full -translate-x-1/2 -translate-y-1/2 transform border-b-2"
        />

        <section className="flex h-8 w-8 items-center justify-evenly gap-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500">
          <Link href="/shop/cart">
            {step > 1 ? (
              <CircleCheckBig size={24} />
            ) : (
              <ShoppingCart size={24} />
            )}
          </Link>
        </section>

        <section className="flex h-8 w-8 items-center justify-evenly gap-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500">
          <Link href="/shop/address">
            {step > 2 ? <CircleCheckBig size={24} /> : <MapPinIcon size={24} />}
          </Link>
        </section>

        <section className="flex h-8 w-8 items-center justify-evenly gap-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500">
          <Link href="/shop/checkout">
            {step > 3 ? (
              <CircleCheckBig size={24} />
            ) : (
              <UserCheckIcon size={24} />
            )}
          </Link>
        </section>

        <section className="flex h-8 w-8 items-center justify-evenly gap-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500">
          <Link href="/dashboard/purchases">
            {step > 4 ? (
              <CircleCheckBig size={24} />
            ) : (
              <CreditCardIcon size={24} />
            )}
          </Link>
        </section>

        <section className="flex h-8 w-8 items-center justify-evenly gap-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500">
          <Link href="/dashboard/purchases">
            {step > 5 ? (
              <CircleCheckBig size={24} />
            ) : (
              <CalendarCheck size={24} />
            )}
          </Link>
        </section>
      </article>
    </section>
  )
}

'use client'

import { Progress } from '@/components'
import {
  CircleCheckBig,
  CreditCardIcon,
  MapPinIcon,
  ShoppingCart,
  UserCheckIcon
} from 'lucide-react'
import { useEffect, useState } from 'react'

type Props = {
  step: number
}

export const BarProgress = ({ step }: Props) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    switch (step) {
      case 1:
        setTimeout(() => setProgress(0), 500)
        break
      case 2:
        setTimeout(() => setProgress(35), 500)
        break
      case 3:
        setTimeout(() => setProgress(65), 500)
        break
      case 4:
        setTimeout(() => setProgress(100), 500)
        break
      default:
        setTimeout(() => setProgress(0), 500)
        break
    }
  }, [step])

  return (
    <section className="max-w-screen-2xl mx-auto p-5 2xl:p-0 mt-10 mb-3">
      <article className="flex justify-between items-center relative text-white">
        <Progress
          value={progress}
          className="absolute border-b-2 w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10"
        />

        <section className="flex gap-2 items-center justify-evenly h-8 w-8 rounded-full ring-2 ring-emerald-500 bg-emerald-500">
          {step > 1 ? <CircleCheckBig size={24} /> : <ShoppingCart size={24} />}
        </section>

        <section className="flex gap-2 items-center justify-evenly h-8 w-8 rounded-full ring-2 ring-emerald-500 bg-emerald-500">
          {step > 2 ? <CircleCheckBig size={24} /> : <MapPinIcon size={24} />}
        </section>

        <section className="flex gap-2 items-center justify-evenly h-8 w-8 rounded-full ring-2 ring-emerald-500 bg-emerald-500">
          {step > 3 ? (
            <CircleCheckBig size={24} />
          ) : (
            <UserCheckIcon size={24} />
          )}
        </section>

        <section className="flex gap-2 items-center justify-evenly h-8 w-8 rounded-full ring-2 ring-emerald-500 bg-emerald-500">
          {step > 4 ? (
            <CircleCheckBig size={24} />
          ) : (
            <CreditCardIcon size={24} />
          )}
        </section>
      </article>
    </section>
  )
}

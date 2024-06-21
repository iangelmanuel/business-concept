'use client'

import {
  DropdownMenuGeneral,
  DropdownMenuUser,
  SheetMenuCart
} from '@/components'
import { useSession } from 'next-auth/react'

export const TopMenuAuth = () => {
  const { data: session } = useSession()
  const user = session?.user
  return (
    <section>
      {user ? (
        <section className="flex items-center">
          <SheetMenuCart />
          <DropdownMenuUser />
        </section>
      ) : (
        <section>
          <SheetMenuCart />
          <DropdownMenuGeneral />
        </section>
      )}
    </section>
  )
}

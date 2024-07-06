'use client'

import { useSession } from 'next-auth/react'
import {
  DropdownMenuAdmin,
  DropdownMenuGeneral,
  DropdownMenuUser,
  SheetMenuCart
} from '@/components'

export const TopMenuAuth = () => {
  const { data: session } = useSession()
  const role = session?.user.role
  const user = role === 'user'
  const admin = role === 'admin'
  return (
    <section>
      {user ? (
        <section className="flex items-center">
          <SheetMenuCart />
          <DropdownMenuUser />
        </section>
      ) : admin ? (
        <section className="flex items-center">
          <SheetMenuCart />
          <DropdownMenuAdmin />
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

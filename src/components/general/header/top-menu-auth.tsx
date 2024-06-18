'use client'

import { DropdownMenuUser, SheetMenuCart, buttonVariants } from '@/components'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

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
          <Link
            href="/auth/login"
            className={buttonVariants({ variant: 'ghost' })}
          >
            Signin
          </Link>
          <Link
            href="/auth/register"
            className={buttonVariants({ variant: 'default' })}
          >
            Signup
          </Link>
        </section>
      )}
    </section>
  )
}

'use client'

import { dropdownAdmin, dropdownUser } from '@/data'
import { cn } from '@/lib'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const AuthAside = () => {
  const { data: session } = useSession()
  const pathname = usePathname()

  const isAdmin = session?.user.role.includes('admin')

  return (
    <aside className="sticky top-0 col-span-2 hidden h-screen border-r xl:block">
      <section className="mt-5 space-y-2 p-2">
        {isAdmin &&
          dropdownAdmin.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                'flex items-center p-3',
                pathname === item.href
                  ? 'bg-gray-100 dark:bg-gray-900'
                  : 'hover:bg-gray-100 hover:dark:bg-gray-900'
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}

        {isAdmin && <div className="border-b" />}

        {dropdownUser.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              'flex items-center p-3',
              pathname === item.href
                ? 'bg-gray-100 dark:bg-gray-900'
                : 'hover:bg-gray-100 hover:dark:bg-gray-900'
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </section>
    </aside>
  )
}

'use client'

import { titleFont } from '@/config'
import { dropdownAdmin, dropdownUser } from '@/data'
import { cn } from '@/lib'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const AdminAside = () => {
  const pathname = usePathname()
  return (
    <aside className="sticky top-0 col-span-2 hidden h-screen border-r xl:block">
      <section className="mt-5 space-y-2 p-2">
        <p className={`${titleFont.className} font-bold`}>
          Funcionalidades administrativas
        </p>

        {dropdownAdmin.map((item, index) => (
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

        <p className={`${titleFont.className} mt-5 font-bold`}>
          Funcionalidades de usuario
        </p>

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

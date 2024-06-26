import {
  DropdownPhoneNavigation,
  TopMenuAuth,
  TopMenuNavigation
} from '@/components'
import Image from 'next/image'
import Link from 'next/link'

export const Header = async () => {
  return (
    <header className="flex justify-between items-center lg:px-7 py-1.5 w-full border-b">
      <section className="flex items-center gap-x-2">
        <Link
          href="/"
          className="flex items-center gap-x-2"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={45}
            height={45}
          />
          <h2 className="hidden md:block text-xl font-bold">
            Business Concept
          </h2>
        </Link>
        <TopMenuNavigation />
        <DropdownPhoneNavigation />
      </section>

      <TopMenuAuth />
    </header>
  )
}

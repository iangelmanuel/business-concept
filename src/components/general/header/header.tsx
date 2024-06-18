import { TopMenuAuth, TopMenuNavigation } from '@/components'
import Image from 'next/image'
import Link from 'next/link'

export const Header = async () => {
  return (
    <header className="flex justify-between items-center px-7 py-1.5 w-full border-b">
      <section className="flex items-center gap-x-2">
        <Link
          href="/"
          className="flex items-center gap-x-2"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={55}
            height={55}
          />
          <h2 className="text-xl font-bold">Company Logo</h2>
        </Link>
        <TopMenuNavigation />
      </section>

      <TopMenuAuth />
    </header>
  )
}

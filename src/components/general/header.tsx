import Image from 'next/image'
import Link from 'next/link'

import { TopMenuNavigation } from './ui/top-menu'

export const Header = () => {
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

      <section>
        <p>Login</p>
        <p>Register</p>
      </section>
    </header>
  )
}

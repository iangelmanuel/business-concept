import Image from "next/image"
import Link from "next/link"
import { titleFont } from "@/config"
import { DropdownPhoneNavigation } from "./dropdown-phone-navigation"
import { TopMenuAuth } from "./top-menu-auth"
import { TopMenuNavigation } from "./top-menu-navigation"

export const Header = async () => {
  return (
    <header className="flex w-full items-center justify-between border-b py-1.5 lg:px-7">
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
          <span
            className={`${titleFont.className} hidden text-xl font-bold md:block`}
          >
            Business Concept
          </span>
        </Link>
        <TopMenuNavigation />
        <DropdownPhoneNavigation />
      </section>

      <TopMenuAuth />
    </header>
  )
}

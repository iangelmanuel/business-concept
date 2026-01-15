"use client"

import { useSession } from "next-auth/react"
import { DropdownMenuAdmin } from "./dropdown-menu-admin"
import { DropdownMenuGeneral } from "./dropdown-menu-general"
import { DropdownMenuUser } from "./dropdown-menu-user"
import { SheetMenuCart } from "./sheet-menu-cart"

export const TopMenuAuth = () => {
  const { data: session } = useSession()
  const role = session?.user.role
  const user = role === "user"
  const admin = role === "admin"
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

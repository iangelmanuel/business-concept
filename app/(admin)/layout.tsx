import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth.config"
import { AdminAside, Header } from "@/components"

export const metadata: Metadata = {
  title: "Admin - Business Concept",
  description: "Administrador de la tienda en línea Business Concept",
  robots: "noindex, nofollow",
  keywords:
    "admin, dashboard, business concept, store, online, ecommerce, shop, products, orders, users, contacts, profile"
}

export default async function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  const userRole = session?.user.role.includes("user")
  if (userRole || !session) return redirect("/auth/login")

  return (
    <>
      <Header />
      <AdminAside>{children}</AdminAside>
    </>
  )
}

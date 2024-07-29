import { redirect } from "next/navigation"
import { auth } from "@/auth.config"
import { Footer, Header } from "@/components"

export default async function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  if (session?.user) redirect("/")
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/auth.config'
import { Header, UserAside } from '@/components'

export const metadata: Metadata = {
  title: 'Business Concept',
  description: 'Bienvenido a tu dashboard de usuario en Business Concept',
  keywords: 'business concept, dashboard, usuario, productos, compras, ventas',
  robots: 'noindex, nofollow'
}

export default async function UserLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  if (!session) redirect('/auth/login')
  return (
    <>
      <Header />
      <UserAside>{children}</UserAside>
    </>
  )
}

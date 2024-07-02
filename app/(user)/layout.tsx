import { auth } from '@/auth.config'
import { Card, Header, UserAside } from '@/components'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

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
    <main>
      <Header />

      <section className="xl:grid xl:grid-cols-12 gap-10 p-5 2xl:p-0">
        <UserAside />
        <Card className="xl:col-span-9 mt-5 p-3 xl:p-10 xl:max-h-[800px] overflow-y-auto">
          {children}
        </Card>
      </section>
    </main>
  )
}

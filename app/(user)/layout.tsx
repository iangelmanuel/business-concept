import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/auth.config'
import { AuthAside, Card, Footer, Header } from '@/components'

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
      <main>
        <section className="gap-10 p-5 xl:grid xl:grid-cols-12 2xl:p-0">
          <AuthAside />
          <Card className="mt-5 overflow-y-auto p-3 xl:col-span-9 xl:max-h-[800px] xl:p-10">
            {children}
          </Card>
        </section>
      </main>
      <Footer />
    </>
  )
}

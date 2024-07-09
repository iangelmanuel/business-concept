import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/auth.config'
import { AdminAside, Card, Footer, Header } from '@/components'

export const metadata: Metadata = {
  title: 'Admin - Business Concept',
  description: 'Administrador de la tienda en línea Business Concept',
  robots: 'noindex, nofollow',
  keywords:
    'admin, dashboard, business concept, store, online, ecommerce, shop, products, orders, users, contacts, profile'
}

export default async function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  const userRole = session?.user.role.includes('user')
  if (userRole || !session) return redirect('/auth/login')

  return (
    <>
      <Header />
      <main>
        <section className="h-screen gap-10 p-5 xl:grid xl:grid-cols-12 2xl:p-0">
          <AdminAside />
          <Card className="mt-5 overflow-y-auto p-3 xl:col-span-9 xl:h-[650px] xl:p-10 2xl:h-[850px]">
            {children}
          </Card>
        </section>
      </main>
      <Footer />
    </>
  )
}

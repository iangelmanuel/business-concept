import { auth } from '@/auth.config'
import { Card, Header, UserAside } from '@/components'
import { redirect } from 'next/navigation'

export default function UserLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = auth()
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

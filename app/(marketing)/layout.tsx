import { Footer, Header } from '@/components'

export default function MarketingLayoutLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

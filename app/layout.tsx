import { inter } from '@/config'
import { Providers } from '@/providers'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'

import '../src/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://business-concept.vercel.app'),
  title: 'Business Concept',
  description:
    'Bienvenido a Business Concept nuestra tienda en línea de productos tecnológicos y de oficina para tu empresa o negocio',
  keywords:
    'business concept, productos, tecnología, oficina, empresa, negocio',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://business-concept.vercel.app',
    languages: {
      'es-CO': '/es-CO'
    }
  },
  twitter: {
    site: '@iangelmanuel',
    creator: '@iangelmanuel'
  },
  openGraph: {
    title: 'Business Concept',
    description:
      'Bienvenido a Business Concept nuestra tienda en línea de productos tecnológicos y de oficina para tu empresa o negocio',
    url: 'https://business-concept.vercel.app',
    type: 'website',
    siteName: 'Business Concept',
    images: [
      {
        url: './logo.png',
        width: 1200,
        height: 630,
        alt: 'Business Concept'
      }
    ],
    countryName: 'Colombia',
    locale: 'es_CO',
    emails: ['iangelmanuel02@gmail.com'],
    phoneNumbers: ['+573164338233']
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} selection:bg-black selection:text-white selection:dark:bg-white selection:dark:text-black`}
      >
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}

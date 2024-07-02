import {
  Card,
  CardDescription,
  CardHeader,
  CardRegisterForm
} from '@/components'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Registrate en Business Concept',
  description:
    'Registrate en Business Concept y accede a todas las funcionalidades de la plataforma.',
  keywords: 'business concept, registrate, registro, cuenta, usuario, empresa',
  robots: 'noindex, nofollow'
}

export default function RegisterPage() {
  return (
    <section className="grid min-h-screen place-content-center">
      <Card className="max-w-screen-sm">
        <CardHeader>
          <h1 className="text-center text-5xl font-bold">
            Registrate en{' '}
            <span className="text-gray-500">Business Concept</span>
          </h1>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro nam
            soluta sint voluptatibus laborum natus, vitae tenetur sunt officia
            tempore.
          </CardDescription>
        </CardHeader>

        <CardRegisterForm />
      </Card>

      <article className="mt-4 text-center">
        <p>
          ¿Ya tienes una cuenta?{' '}
          <Link
            href="/auth/login"
            className="text-primary hover:underline"
          >
            Inicia Sesión
          </Link>
        </p>
      </article>
    </section>
  )
}

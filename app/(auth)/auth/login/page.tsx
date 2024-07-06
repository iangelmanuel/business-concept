import type { Metadata } from 'next'
import Link from 'next/link'
import {
  AlertMessage,
  Card,
  CardDescription,
  CardHeader,
  CardLoginForm
} from '@/components'
import { titleFont } from '@/config'

export const metadata: Metadata = {
  title: 'Inicia sesión en Business Concept',
  description:
    'Inicia sesión en Business Concept y accede a todas las funcionalidades de la plataforma.',
  keywords: 'business concept, inicia sesion, login, cuenta, usuario, empresa',
  robots: 'noindex, nofollow'
}

export default function LoginPage({
  searchParams
}: {
  searchParams: { registered: string }
}) {
  const { registered } = searchParams

  const isRegistered = !!registered
  return (
    <section className="grid min-h-screen place-content-center">
      {isRegistered && (
        <AlertMessage
          variant="success"
          title="¡Registro exitoso!"
          description="Inicia sesión en tu cuenta para validar tu registro."
          className="mb-3"
        />
      )}
      <Card className="max-w-screen-sm">
        <CardHeader>
          <h1
            className={`${titleFont.className} text-center text-5xl font-bold`}
          >
            Inicia sesión en Business Concept
          </h1>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro nam
            soluta sint voluptatibus laborum natus, vitae tenetur sunt officia
            tempore.
          </CardDescription>
        </CardHeader>

        <CardLoginForm />
      </Card>

      <article className="mt-4 text-center">
        <p>
          ¿No tienes cuenta?{' '}
          <Link
            href="/auth/register"
            className="text-primary hover:underline"
          >
            Registrate
          </Link>
        </p>
      </article>
    </section>
  )
}

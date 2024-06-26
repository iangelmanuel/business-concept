import {
  AlertMessage,
  Card,
  CardDescription,
  CardHeader,
  CardLoginForm
} from '@/components'
import Link from 'next/link'

export default function LoginPage({
  searchParams
}: {
  searchParams: { registered: string }
}) {
  const { registered } = searchParams

  const isRegistered = !!registered
  return (
    <section className="grid place-content-center min-h-screen">
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
          <h1 className="text-5xl font-bold text-center">
            Inicia sesión en{' '}
            <span className="text-gray-500">Business Concept</span>
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

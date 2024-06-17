import {
  Card,
  CardDescription,
  CardHeader,
  FormCardContent
} from '@/components'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <section className="grid place-content-center min-h-screen">
      <Card className="max-w-screen-sm">
        <CardHeader>
          <h1 className="text-5xl font-bold text-center">
            Registrate en{' '}
            <span className="text-gray-500">Business Concept</span>
          </h1>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro nam
            soluta sint voluptatibus laborum natus, vitae tenetur sunt officia
            tempore.
          </CardDescription>
        </CardHeader>

        <FormCardContent />
      </Card>

      <div className="mt-4 text-center">
        <p>
          ¿Ya tienes una cuenta?{' '}
          <Link
            href="/auth/login"
            className="text-primary"
          >
            Inicia Sesión
          </Link>
        </p>
      </div>
    </section>
  )
}

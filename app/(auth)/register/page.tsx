import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Input,
  Label
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

        <CardContent>
          <form
            action=""
            className="space-y-2"
          >
            <div>
              <Label>Nombres:</Label>
              <Input
                type="text"
                placeholder="Ej. Angel"
              />
            </div>
            <div>
              <Label>Apellidos:</Label>
              <Input
                type="text"
                placeholder="Ej. Montaño"
              />
            </div>
            <div>
              <Label>Correo Eléctrnico:</Label>
              <Input
                type="email"
                placeholder="Ej. correo@correo.com"
              />
            </div>
            <div>
              <Label>Contraseña:</Label>
              <Input
                type="password"
                placeholder="Escriba su contraseña"
              />
            </div>
            <div>
              <Label>Repetir Contraseña:</Label>
              <Input
                type="password"
                placeholder="Repita su contraseña"
              />
            </div>

            <div className="flex justify-end items-center">
              <Button>Registrarme</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mt-4 text-center">
        <p>
          ¿Ya tienes una cuenta?{' '}
          <Link
            href="/login"
            className="text-primary"
          >
            Inicia Sesión
          </Link>
        </p>
      </div>
    </section>
  )
}

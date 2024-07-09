'use client'

import { useTransition } from 'react'
import { loginUser } from '@/actions'
import { Button, CardContent, ErrorMessage, Input, Label } from '@/components'
import { DEFAULT_LOGIN_VALUES } from '@/consts'
import type { LoginUser } from '@/types'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const CardLoginForm = () => {
  const [isPeding, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginUser>({
    defaultValues: DEFAULT_LOGIN_VALUES
  })

  const onSubmit = (data: LoginUser) => {
    startTransition(async () => {
      const response = await loginUser(data)

      if (response.ok) {
        window.location.replace('/shop/products?registered=true')
      } else {
        toast.error('Ocurrio un problema', {
          description: response.message,
          duration: 5000,
          position: 'top-right'
        })
      }
    })
  }

  return (
    <CardContent>
      <form
        className="space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Label htmlFor="email">Correo Electrónico:</Label>
          <Input
            type="email"
            id="email"
            autoComplete="email"
            placeholder="Ej. correo@correo.com"
            {...register('email', {
              required: 'El campo email es requerido',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: 'El correo electrónico no es válido'
              }
            })}
          />
          {errors.email && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
        </div>
        <div>
          <Label htmlFor="password">Contraseña:</Label>
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            placeholder="Escriba su contraseña"
            {...register('password', {
              required: 'El campo contraseña es requerido'
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          )}
        </div>

        <div className="flex items-center justify-end">
          <Button disabled={isPeding}>Iniciar Sesión</Button>
        </div>
      </form>
    </CardContent>
  )
}

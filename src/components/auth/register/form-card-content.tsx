'use client'

import { registerUser } from '@/actions'
import { Button, CardContent, ErrorMessage, Input, Label } from '@/components'
import { DEFAULT_VALUES } from '@/consts'
import type { RegisterUser } from '@/types'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const FormCardContent = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<RegisterUser>({
    defaultValues: DEFAULT_VALUES
  })

  const onSubmit = (data: RegisterUser) => {
    startTransition(async () => {
      const response = await registerUser(data)
      if (response.ok) {
        router.push('/auth/login')
        toast.success('¡Registrado!', {
          description: response.message,
          duration: 5000,
          position: 'top-right'
        })
      } else {
        toast.success('¡Algo fallo!', {
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
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2"
      >
        <div>
          <Label>Nombres:</Label>
          <Input
            type="text"
            placeholder="Ej. Angel"
            {...register('name', {
              required: 'El campo nombres es requerido',
              minLength: {
                value: 3,
                message: 'El nombre debe tener al menos 3 caracteres'
              },
              maxLength: {
                value: 50,
                message: 'El nombre debe tener máximo 50 caracteres'
              }
            })}
          />
          {errors.name && <ErrorMessage>{errors.name?.message}</ErrorMessage>}
        </div>

        <div>
          <Label>Apellidos:</Label>
          <Input
            type="text"
            placeholder="Ej. Montaño"
            {...register('lastname', {
              required: 'El campo apellidos es requerido',
              minLength: {
                value: 3,
                message: 'El nombre debe tener al menos 3 caracteres'
              },
              maxLength: {
                value: 50,
                message: 'El nombre debe tener máximo 50 caracteres'
              }
            })}
          />
          {errors.lastname && (
            <ErrorMessage>{errors.lastname?.message}</ErrorMessage>
          )}
        </div>

        <div>
          <Label>Correo Eléctrnico:</Label>
          <Input
            type="email"
            autoComplete="username"
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
          <Label>Contraseña:</Label>
          <Input
            type="password"
            placeholder="Escriba su contraseña"
            autoComplete="new-password"
            {...register('password', {
              required: 'El campo contraseña es requerido',
              minLength: {
                value: 8,
                message: 'La contraseña debe tener al menos 8 caracteres'
              }
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          )}
        </div>

        <div>
          <Label>Repetir Contraseña:</Label>
          <Input
            type="password"
            placeholder="Repita su contraseña"
            autoComplete="new-password"
            {...register('repeatPassword', {
              required: 'El campo repetir contraseña es requerido',
              validate: (value) =>
                value !== watch('password')
                  ? 'Las contraseñas no coinciden'
                  : true
            })}
          />
          {errors.repeatPassword && (
            <ErrorMessage>{errors.repeatPassword?.message}</ErrorMessage>
          )}
        </div>

        <div className="flex justify-end items-center">
          <Button disabled={isPending}>Registrarme</Button>
        </div>
      </form>
    </CardContent>
  )
}

'use client'

import { changeUserPassword } from '@/actions'
import { Button, ErrorMessage, Input, Label } from '@/components'
import type { ChangeUserPassword } from '@/types'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const ChangePasswordForm = () => {
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<ChangeUserPassword>()

  const onSubmit = (data: ChangeUserPassword) => {
    startTransition(async () => {
      const response = await changeUserPassword(data)
      if (response.ok) {
        toast.success(response.message, {
          duration: 3000,
          position: 'top-right'
        })
        reset()
      } else {
        toast.error(response.message, {
          duration: 3000,
          position: 'top-right'
        })
      }
    })
  }

  return (
    <section className="mt-10 max-w-screen-md mx-auto">
      <h2 className="text-xl font-bold">Cambiar contraseña:</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-3 space-y-5"
      >
        <div>
          <Label htmlFor="password">Contraseña actual:</Label>
          <Input
            type="password"
            id="password"
            {...register('password', {
              required: 'El campo contraseña es requerido'
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div>
          <Label htmlFor="new-password">Nueva contraseña:</Label>
          <Input
            type="password"
            id="new-password"
            {...register('newPassword', {
              required: 'El campo nueva contraseña es requerido',
              minLength: {
                value: 8,
                message: 'La contraseña debe tener al menos 8 caracteres'
              }
            })}
          />
          {errors.newPassword && (
            <ErrorMessage>{errors.newPassword.message}</ErrorMessage>
          )}
        </div>

        <div>
          <Label htmlFor="confirm-password">Confirmar nueva contraseña:</Label>
          <Input
            type="password"
            id="confirm-password"
            {...register('confirmNewPassword', {
              required: 'El campo confirmar contraseña es requerido',
              validate: (value) =>
                value !== watch('newPassword')
                  ? 'Las contraseñas no coinciden'
                  : true
            })}
          />
          {errors.confirmNewPassword && (
            <ErrorMessage>{errors.confirmNewPassword.message}</ErrorMessage>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            {isPending ? 'Cambiando contraseña' : 'Cambiar contraseña'}
          </Button>
        </div>
      </form>
    </section>
  )
}

'use client'

import { useTransition } from 'react'
import { updateUser } from '@/actions'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  ErrorMessage,
  Input,
  Label
} from '@/components'
import { titleFont } from '@/config'
import type { UpdateUser, UserType } from '@/types'
import { formatDate, getLettersName } from '@/utils'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
  user: UserType
}

export const UpdateUserForm = ({ user }: Props) => {
  const [isPending, startTransition] = useTransition()

  const defaultValues: UpdateUser = {
    name: user.name,
    lastname: user.lastname,
    email: user.email
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateUser>({
    defaultValues
  })

  const onSubmit = async (data: UpdateUser) => {
    const compareDatas = JSON.stringify(data) === JSON.stringify(defaultValues)
    if (compareDatas) {
      return toast.error('No se han realizado cambios', {
        duration: 3000,
        position: 'top-right'
      })
    }

    startTransition(async () => {
      const response = await updateUser(data)
      if (response.ok) {
        toast.success(response.message, {
          duration: 3000,
          position: 'top-right'
        })
      } else {
        toast.error(response.message, {
          duration: 3000,
          position: 'top-right'
        })
      }
    })
  }

  return (
    <section className="mt-10">
      <h2 className={`${titleFont.className} text-xl font-bold`}>
        Actualizar datos:
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        id="update-user"
        className="mt-3 grid grid-cols-1 gap-5 lg:grid-cols-2"
      >
        <div className="flex items-center justify-center">
          <Avatar className="mx-auto h-80 w-80 sm:h-96 sm:w-96">
            <AvatarImage
              src="/images/avatar.jpg"
              alt="avatar"
            />
            <AvatarFallback className="text-9xl">
              {getLettersName(user.name, user.lastname)}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="space-y-4">
          <section>
            <Label>Nombre:</Label>
            <Input
              type="text"
              {...register('name', {
                required: 'El campo nombre es requerido',
                minLength: {
                  value: 3,
                  message: 'El campo nombre debe tener al menos 3 caracteres'
                },
                maxLength: {
                  value: 50,
                  message: 'El campo nombre debe tener menos de 50 caracteres'
                }
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </section>

          <section>
            <Label>Apellido:</Label>
            <Input
              type="text"
              {...register('lastname', {
                required: 'El campo apellido es requerido',
                minLength: {
                  value: 3,
                  message: 'El campo apellido debe tener al menos 3 caracteres'
                },
                maxLength: {
                  value: 50,
                  message: 'El campo apellido debe tener menos de 50 caracteres'
                }
              })}
            />
            {errors.lastname && (
              <ErrorMessage>{errors.lastname.message}</ErrorMessage>
            )}
          </section>

          <section>
            <Label>Role:</Label>
            <Input
              type="text"
              disabled
              defaultValue={user.role}
            />
          </section>

          <section>
            <Label>Email:</Label>
            <Input
              type="email"
              {...register('email', {
                required: 'El campo email es requerido',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'El email no es válido'
                },
                maxLength: {
                  value: 50,
                  message: 'El campo email debe tener menos de 50 caracteres'
                }
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </section>

          <section>
            <Label>Fecha de creación:</Label>
            <Input
              type="text"
              disabled
              defaultValue={formatDate(user.createdAt)}
            />
          </section>

          <section>
            <Label>Fecha de actualización:</Label>
            <Input
              type="text"
              disabled
              defaultValue={formatDate(user.updatedAt)}
            />
          </section>
        </div>
      </form>
      <div className="mt-5 flex justify-end">
        <Button
          type="submit"
          form="update-user"
          disabled={isPending}
        >
          {isPending ? 'Actualizando datos' : 'Actualizar datos'}
        </Button>
      </div>
    </section>
  )
}

import {
  Button,
  DialogFooter,
  ErrorMessage,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components'
import type { UserType, UpdateUserByAdminType } from '@/types'
import { formatDate } from '@/utils'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { updateUserById } from '@/actions'

interface Props {
  user: UserType
}

export const UpdateUserFromAdminForm = ({ user }: Props) => {
  const [isPending, startTransition] = useTransition()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, createdAt, updatedAt, ...restOfUser } = user

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<UpdateUserByAdminType>({
    defaultValues: { ...restOfUser }
  })

  const onSubmit = (data: UpdateUserByAdminType) => {
    const compareDatas = JSON.stringify(data) === JSON.stringify(restOfUser)
    if (compareDatas) {
      return toast.error('No se han realizado cambios', {
        duration: 3000,
        position: 'top-right'
      })
    }

    startTransition(async () => {
      const { id } = user

      const response = await updateUserById(id, data)
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

  const userRole = user.role === 'user' ? 'Usuario' : 'Administrador'

  return (
    <>
      <form
        id="update-user-from-admin-form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <article className="space-y-5">
          <section>
            <Label htmlFor="id">ID:</Label>
            <Input
              type="text"
              id="id"
              disabled
              value={user.id}
            />
          </section>

          <section>
            <Label htmlFor="name">Nombres:</Label>
            <Input
              type="text"
              id="name"
              {...register('name', {
                required: 'El campo nombre es requerido',
                minLength: {
                  value: 3,
                  message: 'El nombre debe tener al menos 3 caracteres'
                },
                maxLength: {
                  value: 50,
                  message: 'El nombre debe tener menos de 100 caracteres'
                }
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </section>

          <section>
            <Label htmlFor="lastname">Apellidos:</Label>
            <Input
              type="text"
              id="lastname"
              {...register('lastname', {
                required: 'El campo apellido es requerido',
                minLength: {
                  value: 3,
                  message: 'El apellido debe tener al menos 3 caracteres'
                },
                maxLength: {
                  value: 50,
                  message: 'El apellido debe tener menos de 100 caracteres'
                }
              })}
            />
            {errors.lastname && (
              <ErrorMessage>{errors.lastname.message}</ErrorMessage>
            )}
          </section>

          <section>
            <Label htmlFor="email">Correo:</Label>
            <Input
              type="email"
              id="email"
              {...register('email', {
                required: 'El campo email es requerido',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: 'El correo electrónico no es válido'
                }
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </section>

          <section>
            <Label htmlFor="phone">Télefono:</Label>
            <Input
              type="tel"
              id="phone"
              {...register('phone', {
                required: 'El campo télefono es requerido',
                pattern: {
                  value: /^[0-9]{7,10}$/,
                  message: 'El télefono no es válido'
                }
              })}
            />
            {errors.phone && (
              <ErrorMessage>{errors.phone.message}</ErrorMessage>
            )}
          </section>
        </article>

        <article className="space-y-5">
          <section>
            <Label>Rol:</Label>
            <Select
              onValueChange={(value) =>
                setValue('role', value as UpdateUserByAdminType['role'])
              }
              {...register('role')}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={userRole}
                  className="capitalize"
                />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Seleccione</SelectLabel>
                  <SelectItem value="user">Usuario</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.role && <ErrorMessage>{errors.role.message}</ErrorMessage>}
          </section>

          <section>
            <Label>Estado de Cuenta:</Label>
            <Select
              onValueChange={(value) =>
                setValue('isUserDeleted', value === 'true')
              }
              {...register('isUserDeleted')}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={`${user.isUserDeleted ? 'Eliminada' : 'Activa'}`}
                />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Seleccione</SelectLabel>
                  <SelectItem value="false">Activa</SelectItem>
                  <SelectItem value="true">Eliminada</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.isUserDeleted && (
              <ErrorMessage>{errors.isUserDeleted.message}</ErrorMessage>
            )}
          </section>

          <section>
            <Label>Confirmación:</Label>
            <Select
              onValueChange={(value) =>
                setValue('isConfirmed', value === 'true')
              }
              {...register('isConfirmed')}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={`${user.isConfirmed ? 'Confirmado' : 'Sin confirmar'}`}
                />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Seleccione</SelectLabel>
                  <SelectItem value="true">Confirmado</SelectItem>
                  <SelectItem value="false">Sin confirmar</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.isConfirmed && (
              <ErrorMessage>{errors.isConfirmed.message}</ErrorMessage>
            )}
          </section>

          <section>
            <Label htmlFor="createdAt">Fecha de Creación:</Label>
            <Input
              type="text"
              id="createdAt"
              value={formatDate(user.createdAt)}
              disabled
            />
          </section>

          <section>
            <Label htmlFor="updatedAt">Ultima actualización:</Label>
            <Input
              type="text"
              id="updatedAt"
              disabled
              value={formatDate(user.updatedAt)}
            />
          </section>
        </article>
      </form>

      <DialogFooter>
        <Button
          type="submit"
          form="update-user-from-admin-form"
          disabled={isPending}
        >
          Guardar Cambios
        </Button>
      </DialogFooter>
    </>
  )
}

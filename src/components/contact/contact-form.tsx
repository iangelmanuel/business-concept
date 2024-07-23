'use client'

import { useTransition } from 'react'
import { createUserContact } from '@/actions'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  ErrorMessage,
  Input,
  Label,
  Spinner,
  Textarea
} from '@/components'
import { titleFont } from '@/config'
import type { ContactFormType } from '@/types'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const ContactForm = () => {
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormType>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      message: ''
    }
  })

  const onSubmit = async (data: ContactFormType) => {
    startTransition(async () => {
      const response = await createUserContact(data)
      if (response.ok) {
        toast.success('¡Todo salió bien!', {
          description: response.message,
          duration: 3000,
          position: 'top-right'
        })
        reset()
      } else {
        toast.error('Ocurrio un problema', {
          description: response.message,
          duration: 3000,
          position: 'top-right'
        })
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <h2 className={`${titleFont.className} text-xl font-bold`}>
          Formulario de contacto
        </h2>

        <CardDescription>
          Rellena este formulario para contactar con nosotros y te responderemos
          lo antes posible vía correo electrónico.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          noValidate
          id="send-contact-data"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3"
        >
          <section>
            <Label htmlFor="name">Nombre completo:</Label>
            <Input
              type="text"
              id="name"
              placeholder="Ej. Angel De La Torre"
              {...register('fullName', {
                required: 'El campo nombre completo es requerido',
                minLength: {
                  value: 5,
                  message: 'El nombre completo debe tener al menos 5 caracteres'
                },
                maxLength: {
                  value: 50,
                  message: 'El nombre completo debe tener máximo 50 caracteres'
                }
              })}
            />
            {errors.fullName && (
              <ErrorMessage>{errors.fullName.message}</ErrorMessage>
            )}
          </section>

          <section>
            <Label htmlFor="email">Correo:</Label>
            <Input
              type="email"
              id="email"
              placeholder="Ej. ejemplo@correo.com"
              {...register('email', {
                required: 'El campo correo es requerido',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'El correo no es válido'
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
              placeholder="Ej. 312 345 6789"
              {...register('phone', {
                required: 'El campo télefono es requerido',
                maxLength: {
                  value: 15,
                  message: 'El télefono debe tener máximo 15 caracteres'
                }
              })}
            />
            {errors.phone && (
              <ErrorMessage>{errors.phone.message}</ErrorMessage>
            )}
          </section>

          <section>
            <Label htmlFor="message">Mensaje:</Label>
            <Textarea
              id="message"
              placeholder="Ej. Hola, me gustaría saber más sobre..."
              {...register('message', {
                required: 'El campo mensaje es requerido',
                minLength: {
                  value: 10,
                  message: 'El mensaje debe tener al menos 10 caracteres'
                },
                maxLength: {
                  value: 500,
                  message: 'El mensaje debe tener máximo 500 caracteres'
                }
              })}
            />
            {errors.message && (
              <ErrorMessage>{errors.message.message}</ErrorMessage>
            )}
          </section>
        </form>
      </CardContent>

      <CardFooter className="flex items-center justify-end">
        <Button
          type="submit"
          form="send-contact-data"
          disabled={isPending}
        >
          {isPending ? (
            <>
              Enviando
              <Spinner />
            </>
          ) : (
            'Enviar'
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

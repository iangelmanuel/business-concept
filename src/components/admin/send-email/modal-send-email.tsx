"use client"

import { useTransition } from "react"
import { Spinner } from "@/components/general/spinner/spinner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { ErrorMessage } from "@/components/ui/error-message"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { sendUserEmail } from "@/email"
import type { UserType } from "@/types"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface Props {
  email: UserType["email"]
  userFullName: UserType["name"] | UserType["lastname"]
  isOrder?: boolean
}

type FormData = {
  to: string
  subject: string
  message: string
}

export const SendEmail = ({ email, userFullName, isOrder = false }: Props) => {
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    defaultValues: {
      to: email,
      subject: "",
      message: ""
    }
  })

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      const response = await sendUserEmail({
        subject: data.subject,
        email: data.to,
        userFullName,
        message: data.message
      })

      if (response.ok) {
        toast.success("Correo electrónico enviado", {
          duration: 3000,
          position: "top-right"
        })
        reset()
      } else {
        toast.error("No se pudo enviar el correo electrónico", {
          duration: 3000,
          position: "top-right"
        })
      }
    })
  }

  const isOrderText = isOrder
    ? "Enviale un correo electrónico a tu cliente para informarle sobre el estado de su pedido."
    : "Enviale un correo electrónico a tu cliente para ponerte en contacto con él."

  return (
    <Dialog>
      <DialogTrigger>
        <span className="hover:underline">{email}</span>
      </DialogTrigger>
      <DialogContent className="max-w-(--breakpoint-sm)">
        <DialogHeader>
          <DialogTitle>
            Enviale un correo electrónico a {userFullName}
          </DialogTitle>
          <DialogDescription>{isOrderText}</DialogDescription>
        </DialogHeader>

        {/* Formulario para envio de correo al usuario */}
        <form
          noValidate
          id="send-email"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2"
        >
          <section>
            <Label htmlFor="to">Para:</Label>
            <Input
              type="text"
              id="to"
              disabled
              value={email}
              {...register("to")}
            />
          </section>

          <section>
            <Label htmlFor="subject">Asunto:</Label>
            <Input
              type="text"
              id="subject"
              placeholder="Escribe el asunto del correo electrónico"
              {...register("subject", {
                required: "El campo asunto es requerido",
                minLength: {
                  value: 5,
                  message: "El asunto debe tener al menos 5 caracteres"
                },
                maxLength: {
                  value: 100,
                  message: "El asunto no puede tener más de 100 caracteres"
                }
              })}
            />
            {errors.subject && (
              <ErrorMessage>{errors.subject.message}</ErrorMessage>
            )}
          </section>

          <section>
            <Label htmlFor="message">Mensaje:</Label>
            <Textarea
              id="message"
              placeholder="Escribe el mensaje que deseas enviar al cliente"
              {...register("message", {
                required: "El campo mensaje es requerido",
                minLength: {
                  value: 5,
                  message: "El mensaje debe tener al menos 5 caracteres"
                },
                maxLength: {
                  value: 500,
                  message: "El mensaje no puede tener más de 500 caracteres"
                }
              })}
            />
            {errors.message && (
              <ErrorMessage>{errors.message.message}</ErrorMessage>
            )}
          </section>
        </form>

        <DialogFooter>
          <Button
            form="send-email"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <>
                Enviando correo
                <Spinner />
              </>
            ) : (
              "Enviar correo"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

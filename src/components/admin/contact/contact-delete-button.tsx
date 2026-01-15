"use client"

import { useTransition } from "react"
import Link from "next/link"
import { deleteUserContact } from "@/actions"
import { Button, buttonVariants } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Spinner } from "@/components/general/spinner/spinner"
import type { ContactType } from "@/types"
import { toast } from "sonner"

interface Props {
  contactId: ContactType["id"]
}

export const ContactDeleteButton = ({ contactId }: Props) => {
  const [isPending, startTransition] = useTransition()

  const handleClickDeleteContact = () => {
    startTransition(async () => {
      const response = await deleteUserContact(contactId)
      if (response.ok) {
        toast.success("¡Todo salió bien!", {
          description: response.message,
          duration: 3000,
          position: "top-right"
        })
      } else {
        toast.error("Ocurrio un problema", {
          description: response.message,
          duration: 3000,
          position: "top-right"
        })
      }
    })
  }

  return (
    <CardFooter className="flex items-center justify-end gap-2">
      <Link
        href={`/admin/contacts/${contactId}`}
        className={buttonVariants()}
      >
        Ver mensaje
      </Link>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost">
            {isPending ? (
              <>
                Eliminando
                <Spinner />
              </>
            ) : (
              "Eliminar"
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Estás seguro de eliminar este contacto?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer y eliminará todos los mensajes
              relacionados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClickDeleteContact}
              className={buttonVariants({ variant: "destructive" })}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CardFooter>
  )
}

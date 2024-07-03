import { deleteUserById } from '@/actions'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  buttonVariants
} from '@/components'
import type { UserType } from '@/types'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { UpdateUserFromAdminForm } from './update-user-from-admin-form'

interface Props {
  user: UserType
}

export const ActionsButtons = ({ user }: Props) => {
  const [isDeleteOptionOpen, setIsDeleteOptionOpen] = useState(false)
  const [isEditOptionOpen, setIsEditOptionOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const { id } = user

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">Abrir menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href={`/admin/users/${id}`}>Ver usuario</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            {/* Boton de Editar */}
            <button
              disabled={isPending}
              onClick={() => setIsEditOptionOpen(true)}
            >
              Editar usuario
            </button>
          </DropdownMenuItem>

          {/* Boton de Eliminar */}
          <DropdownMenuItem>
            <button
              disabled={isPending}
              onClick={() => setIsDeleteOptionOpen(true)}
            >
              Eliminar usuario
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* AlertDialog de Eliminar Usuario */}
      <AlertDialog
        open={isDeleteOptionOpen}
        onOpenChange={setIsDeleteOptionOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Estás seguro que quieres eliminar al usuario?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Esta acción no se puede deshacer y eliminará permanentemente al
              usuario.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={() => {
                setIsDeleteOptionOpen(false)

                startTransition(async () => {
                  const response = await deleteUserById(id)
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
              }}
              className={buttonVariants({ variant: 'destructive' })}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog de Editar Usuario */}
      <Dialog
        open={isEditOptionOpen}
        onOpenChange={setIsEditOptionOpen}
      >
        <DialogContent className="sm:max-w-screen-md">
          <DialogHeader>
            <DialogTitle>Editar el pérfil del usuario</DialogTitle>
            <DialogDescription>
              Actualiza la información del usuario.
            </DialogDescription>
          </DialogHeader>
          {/* UpdateUserFromAdminForm */}
          <UpdateUserFromAdminForm user={user} />
        </DialogContent>
      </Dialog>
    </>
  )
}

import { deleteOrderById } from '@/actions'
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
  Input,
  Label,
  buttonVariants
} from '@/components'
import type { UserOrderByAdmin } from '@/types'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

interface Props {
  order: UserOrderByAdmin
}

export const ActionsButtons = ({ order }: Props) => {
  const [isOrderTrakingOpen, setIsOrderTrakingOpen] = useState(false)
  const [isDeleteOptionOpen, setIsDeleteOptionOpen] = useState(false)

  const [isPending, startTransition] = useTransition()

  const { id } = order

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
            {/* Boton para ver los detalles del producto */}
            <Link href={`/admin/orders/${id}`}>Ver pedido</Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            {/* Boton de agregar rastreo */}
            <button
              disabled={isPending}
              onClick={() => setIsOrderTrakingOpen(true)}
            >
              Agregar rastreo
            </button>
          </DropdownMenuItem>

          {/* Boton de Eliminar */}
          <DropdownMenuItem>
            <button
              disabled={isPending}
              onClick={() => setIsDeleteOptionOpen(true)}
            >
              Eliminar pedido
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog de añadir número de rastreo */}
      <Dialog
        open={isOrderTrakingOpen}
        onOpenChange={setIsOrderTrakingOpen}
      >
        <DialogContent className="max-w-screen-sm">
          <DialogHeader>
            <DialogTitle>Número de rastreo del pedido</DialogTitle>
            <DialogDescription>
              Aquí puedes añadir el número de rastreo del pedido para que tus
              clientes puendan ver donde va su pedido.
            </DialogDescription>
          </DialogHeader>
          {/* Usar el formulario para agregar numero de rastreo al usuario */}
          <form className="flex items-center justify-center gap-x-5">
            <section>
              <Label>Número de rastreo</Label>
              <Input
                type="text"
                placeholder="Agregar número de rastreo"
              />
            </section>

            <section>
              <Label>Estado del pedido</Label>
            </section>
          </form>
        </DialogContent>
      </Dialog>

      {/* AlertDialog de Eliminar la orden */}
      <AlertDialog
        open={isDeleteOptionOpen}
        onOpenChange={setIsDeleteOptionOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Estás seguro que quieres eliminar la orden?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Esta acción no se puede deshacer y eliminará permanentemente al
              usuario.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>

            <AlertDialogAction
              onClick={() => {
                setIsDeleteOptionOpen(false)

                startTransition(async () => {
                  const response = await deleteOrderById(id)
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
    </>
  )
}

import { useState, useTransition } from "react"
import Link from "next/link"
import { deleteOrderById, deleteOrderTrackingById } from "@/actions"
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
} from "@/components"
import type { UserOrderByAdmin } from "@/types"
import {
  Ellipsis,
  Package,
  PackageCheck,
  ScanEye,
  Trash,
  Trash2
} from "lucide-react"
import { toast } from "sonner"
import { OrderStatusForm } from "./order-status-form"
import { OrderTrackingForm } from "./order-tracking-form"

interface Props {
  order: UserOrderByAdmin
}

export const ActionsButtons = ({ order }: Props) => {
  const [isOrderTrakingOpen, setIsOrderTrakingOpen] = useState(false)
  const [isOrderStatusOpen, setIsOrderStatusOpen] = useState(false)
  const [isDeleteTrackingOpen, setIsDeleteTrackingOpen] = useState(false)
  const [isDeleteOptionOpen, setIsDeleteOptionOpen] = useState(false)

  const [isPending, startTransition] = useTransition()

  const { id, orderStatus, OrderTracking } = order

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">Abrir menu</span>
            <Ellipsis className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem>
            {/* Boton para ver los detalles del producto */}
            <Link
              href={`/admin/orders/${id}`}
              className="flex items-center"
            >
              <Package className="mr-2 h-4 w-4" />
              Ver pedido
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <button
              disabled={isPending}
              onClick={() => setIsOrderStatusOpen(true)}
              className="flex items-center"
            >
              <PackageCheck className="mr-2 h-4 w-4" />
              Cambiar estado
            </button>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {(orderStatus === "approved" || orderStatus === "shipped") && (
            <DropdownMenuItem>
              <button
                disabled={isPending}
                onClick={() => setIsOrderTrakingOpen(true)}
                className="flex items-center"
              >
                <ScanEye className="mr-2 h-4 w-4" />
                {OrderTracking ? "Actualizar" : "Añadir"} rastreo
              </button>
            </DropdownMenuItem>
          )}

          {OrderTracking && (
            <DropdownMenuItem>
              <button
                disabled={isPending}
                onClick={() => setIsDeleteTrackingOpen(true)}
                className="flex items-center"
              >
                <Trash className="mr-2 h-4 w-4" />
                Quitar código de rastreo
              </button>
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          {/* Boton de Eliminar */}
          <DropdownMenuItem>
            <button
              disabled={isPending}
              onClick={() => setIsDeleteOptionOpen(true)}
              className="flex items-center text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4 text-destructive" />
              Eliminar pedido
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog de cambiar el estado de la orden */}
      <Dialog
        open={isOrderStatusOpen}
        onOpenChange={setIsOrderStatusOpen}
      >
        <DialogContent className="max-w-(--breakpoint-sm)">
          <DialogHeader>
            <DialogTitle>Estado del pedido</DialogTitle>
            <DialogDescription>
              En este apartado podrás cambiar el estado del pedido.
            </DialogDescription>
          </DialogHeader>
          {/* Usar el formulario para cambiar el estado del pedido */}
          <OrderStatusForm order={order} />
        </DialogContent>
      </Dialog>

      {/* Dialog de añadir o editar número de rastreo */}
      <Dialog
        open={isOrderTrakingOpen}
        onOpenChange={setIsOrderTrakingOpen}
      >
        <DialogContent className="max-w-(--breakpoint-sm)">
          <DialogHeader>
            <DialogTitle>Detalles del código de rastro del pedido</DialogTitle>
            <DialogDescription>
              Aquí puedes añadir la compañia y el número de rastreo del pedido
              para que tus clientes puendan ver donde va su pedido.
            </DialogDescription>
          </DialogHeader>
          {/* Usar el formulario para agregar numero de rastreo al usuario */}
          <OrderTrackingForm order={order} />
        </DialogContent>
      </Dialog>

      {/* AlertDialog de Eliminar el rastreo */}
      <AlertDialog
        open={isDeleteTrackingOpen}
        onOpenChange={setIsDeleteTrackingOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Estás seguro que quieres eliminar el código de rastreo?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Esta acción no se puede deshacer y eliminará permanentemente el
              código de rastreo.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>

            <AlertDialogAction
              onClick={() => {
                setIsDeleteOptionOpen(false)

                startTransition(async () => {
                  const orderTrackingId = OrderTracking!.id
                  const orderId = order.id
                  const response = await deleteOrderTrackingById(
                    orderId,
                    orderTrackingId
                  )

                  if (response.ok) {
                    toast.success("¡Todo salió bien!", {
                      description: response.message,
                      duration: 3000,
                      position: "top-right"
                    })
                  } else {
                    toast.error("Ocurrio un problema", {
                      duration: 3000,
                      position: "top-right"
                    })
                  }
                })
              }}
              className={buttonVariants({ variant: "destructive" })}
            >
              Eliminar rastreo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
              Esta acción no se puede deshacer y eliminará permanentemente la
              orden.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>

            <AlertDialogAction
              onClick={() => {
                setIsDeleteTrackingOpen(false)

                startTransition(async () => {
                  const response = await deleteOrderById(id)
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
              }}
              className={buttonVariants({ variant: "destructive" })}
            >
              Eliminar orden
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

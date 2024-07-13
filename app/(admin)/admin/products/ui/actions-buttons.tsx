import { useState, useTransition } from 'react'
import Link from 'next/link'
import { deleteProductById } from '@/actions'
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
import type { ProductAllType } from '@/types'
import {
  Ellipsis,
  Headphones,
  Settings,
  Trash2,
  UserRoundCog
} from 'lucide-react'
import { toast } from 'sonner'
import { UpdateProductFromAdminForm } from './update-product-from-admin-form'

interface Props {
  product: ProductAllType
}

export const ActionsButtons = ({ product }: Props) => {
  const [isDeleteOptionOpen, setIsDeleteOptionOpen] = useState(false)
  const [isEditOptionOpen, setIsEditOptionOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const { id, slug } = product

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
            <Link
              href={`/admin/products/product/${slug}`}
              className="flex items-center"
            >
              <Headphones className="mr-2 h-4 w-4" />
              Ver producto
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            {/* Boton de Editar */}
            <button
              disabled={isPending}
              onClick={() => setIsEditOptionOpen(true)}
              className="flex items-center"
            >
              <Settings className="mr-2 h-4 w-4" />
              Editar producto
            </button>
          </DropdownMenuItem>

          {/* Boton de Eliminar */}
          <DropdownMenuItem>
            <button
              disabled={isPending}
              onClick={() => setIsDeleteOptionOpen(true)}
              className="flex items-center text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4 text-destructive" />
              Eliminar producto
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={isEditOptionOpen}
        onOpenChange={setIsEditOptionOpen}
      >
        <DialogContent className="max-w-screen-sm">
          <DialogHeader>
            <DialogTitle>Editar producto</DialogTitle>
            <DialogDescription>
              Modifica la información del producto.
            </DialogDescription>
          </DialogHeader>
          {/* Usar el formulario para editar el producto */}
          <UpdateProductFromAdminForm product={product} />
        </DialogContent>
      </Dialog>

      {/* AlertDialog de Eliminar Producto */}
      <AlertDialog
        open={isDeleteOptionOpen}
        onOpenChange={setIsDeleteOptionOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Estás seguro que quieres eliminar el producto?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Esta acción no se puede deshacer y eliminará permanentemente el
              producto.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>

            <AlertDialogAction
              onClick={() => {
                setIsDeleteOptionOpen(false)

                startTransition(async () => {
                  const response = await deleteProductById(id)
                  if (response.ok) {
                    toast.success('¡Todo salió bien!', {
                      description: response.message,
                      duration: 3000,
                      position: 'top-right'
                    })
                  } else {
                    toast.error('Ocurrio un problema', {
                      description: response.message,
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

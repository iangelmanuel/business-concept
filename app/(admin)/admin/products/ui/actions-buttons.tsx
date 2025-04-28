import { useState, useTransition } from "react"
import Link from "next/link"
import { archiveProductById } from "@/actions"
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
import type { ProductAllType } from "@/types"
import {
  Archive,
  Ellipsis,
  Headphones,
  ImageIcon,
  Settings
} from "lucide-react"
import { toast } from "sonner"
import { UpdateProductFromAdminForm } from "./update-product-from-admin-form"
import { UpdateProductImageForm } from "./update-product-image-form"

interface Props {
  product: ProductAllType
}

export const ActionsButtons = ({ product }: Props) => {
  const [isDeleteOptionOpen, setIsDeleteOptionOpen] = useState(false)
  const [isEditOptionOpen, setIsEditOptionOpen] = useState(false)
  const [isEditImgOptionOpen, setIsEditImgOptionOpen] = useState(false)
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

          <DropdownMenuItem>
            {/* Boton de Editar */}
            <button
              disabled={isPending}
              onClick={() => setIsEditImgOptionOpen(true)}
              className="flex items-center"
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              Editar imagen
            </button>
          </DropdownMenuItem>

          {/* Boton de Archivar */}
          <DropdownMenuItem>
            <button
              disabled={isPending}
              onClick={() => setIsDeleteOptionOpen(true)}
              className="flex items-center text-destructive"
            >
              <Archive className="mr-2 h-4 w-4 text-destructive" />
              Archivar producto
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={isEditOptionOpen}
        onOpenChange={setIsEditOptionOpen}
      >
        <DialogContent className="max-w-(--breakpoint-sm)">
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

      <Dialog
        open={isEditImgOptionOpen}
        onOpenChange={setIsEditImgOptionOpen}
      >
        <DialogContent className="max-w-(--breakpoint-sm)">
          <DialogHeader>
            <DialogTitle>Editar imagen</DialogTitle>
            <DialogDescription>
              Modifica las imagenes que deseas que se muestren en el producto.
            </DialogDescription>
          </DialogHeader>
          {/* Usar el formulario para editar la imagen del producto */}
          <UpdateProductImageForm product={product} />
        </DialogContent>
      </Dialog>

      {/* AlertDialog de Archivar producto */}
      <AlertDialog
        open={isDeleteOptionOpen}
        onOpenChange={setIsDeleteOptionOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Estás seguro que quieres archivar el producto?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Esta acción se puede deshacer y se puede revertir en cualquier
              momento.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>

            <AlertDialogAction
              onClick={() => {
                setIsDeleteOptionOpen(false)

                startTransition(async () => {
                  const response = await archiveProductById(id)
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
              Archivar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

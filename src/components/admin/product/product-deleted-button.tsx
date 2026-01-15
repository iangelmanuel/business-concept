"use client"

import { useState, useTransition } from "react"
import { recoverProductDeleted } from "@/actions"
import { Spinner } from "@/components/general/spinner/spinner"
import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { ErrorMessage } from "@/components/ui/error-message"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ProductType } from "@/types"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface Props {
  productId: ProductType["id"]
}

interface RecoverProductDeleted {
  stock: ProductType["stock"]
}

export const ProductDeletedButton = ({ productId }: Props) => {
  const [isProductDeletedModalOpen, setIsProductDeletedModalOpen] =
    useState(false)
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RecoverProductDeleted>()

  const onSubmit = (data: RecoverProductDeleted) => {
    const { stock } = data

    startTransition(async () => {
      const response = await recoverProductDeleted(productId, Number(stock))
      if (response.ok) {
        toast.success("¡Todo salió bien!", {
          description: response.message,
          duration: 3000,
          position: "top-right"
        })
        setIsProductDeletedModalOpen(false)
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
    <>
      <CardFooter className="flex items-center justify-end">
        <Button onClick={() => setIsProductDeletedModalOpen(true)}>
          Recuperar producto
        </Button>

        <Dialog
          open={isProductDeletedModalOpen}
          onOpenChange={setIsProductDeletedModalOpen}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                ¿Estás seguro de que deseas recuperar este producto?
              </DialogTitle>
              <DialogDescription>
                Para recuperar el producto por favor añade el numero de
                disponibilidad del producto.
              </DialogDescription>
            </DialogHeader>

            <form
              noValidate
              id="recover-product-deleted"
              onSubmit={handleSubmit(onSubmit)}
            >
              <section>
                <Label
                  htmlFor="stock"
                  className="text-right"
                >
                  Disponibilidad:
                </Label>
                <Input
                  type="number"
                  id="stock"
                  placeholder="Ej. 10"
                  {...register("stock", {
                    required: "El campo disponibildad es requerido",
                    min: {
                      value: 1,
                      message: "La disponibilidad debe ser mayor a 0"
                    },
                    max: {
                      value: 1000,
                      message: "La disponibilidad debe ser menor a 1000"
                    }
                  })}
                />
                {errors.stock && (
                  <ErrorMessage>{errors.stock.message}</ErrorMessage>
                )}
              </section>
            </form>

            <DialogFooter>
              <Button
                type="submit"
                form="recover-product-deleted"
              >
                {isPending ? (
                  <>
                    Recuperando producto
                    <Spinner />
                  </>
                ) : (
                  "Recuperar producto"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </>
  )
}

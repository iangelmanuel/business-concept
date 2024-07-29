"use client"

import type { Table } from "@tanstack/react-table"
import { useTransition } from "react"
import { addProductsDiscount } from "@/actions"
import {
  Button,
  DialogFooter,
  ErrorMessage,
  Input,
  Label,
  Spinner
} from "@/components"
import type { ProductAllType } from "@/types"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { HoverCardDiscountDocs } from "./hover-card-discount-docs"

interface Props {
  productsIds: ProductAllType["id"][]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: Table<any>
}

interface FormType {
  discount: ProductAllType["discount"]
}

export const AddProductsDiscount = ({ productsIds, table }: Props) => {
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormType>({
    defaultValues: {
      discount: 1
    }
  })

  const onSubmit = (data: FormType) => {
    const { discount } = data

    startTransition(async () => {
      const response = await addProductsDiscount(productsIds, Number(discount))
      if (response.ok) {
        toast.success("¡Todo salió bien!", {
          description: response.message,
          duration: 3000,
          position: "top-right"
        })
        table.toggleAllRowsSelected(false)
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
      <form
        noValidate
        id="add-products-discount"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section>
          <Label
            htmlFor="discount"
            className="mb-0.5 flex items-center justify-between"
          >
            Descuento para los productos seleccionados:
            <HoverCardDiscountDocs />
          </Label>
          <Input
            type="number"
            id="discount"
            placeholder="Ej. 0.1 para un 10% de descuento"
            {...register("discount", {
              required: "El campo descuento campo es requerido",
              min: {
                value: 0.01,
                message: "El descuento no puede ser menor o igual a 0"
              },
              max: {
                value: 1,
                message: "El descuento no puede ser mayor a 1"
              }
            })}
          />
          {errors.discount && (
            <ErrorMessage>{errors.discount.message}</ErrorMessage>
          )}
        </section>
      </form>

      <DialogFooter>
        <Button
          type="submit"
          form="add-products-discount"
          disabled={isPending}
        >
          {isPending ? (
            <>
              Añadiendo descuento
              <Spinner />
            </>
          ) : (
            "Guardar Cambios"
          )}
        </Button>
      </DialogFooter>
    </>
  )
}

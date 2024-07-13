'use client'

import { useEffect, useState, useTransition } from 'react'
import { getCategories, updateProductById } from '@/actions'
import {
  Button,
  DialogFooter,
  ErrorMessage,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Spinner,
  Textarea
} from '@/components'
import type { CategoryType, ProductAllType, ProductUpdateForm } from '@/types'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { HoverCardDiscountDocs } from './hover-card-discount-docs'

interface Props {
  product: ProductAllType
}

export const UpdateProductFromAdminForm = ({ product }: Props) => {
  const [categories, setCategories] = useState<CategoryType[]>([])

  const [isPending, startTransition] = useTransition()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, createdAt, updatedAt, productImage, ...restOfProduct } = product

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<ProductUpdateForm>({
    defaultValues: { ...restOfProduct }
  })

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories()
      setCategories(categories)
    }
    fetchCategories()
  }, [])

  const onSubmit = (data: ProductUpdateForm) => {
    const categoryId = data.category.id
    const actualCategoryId = restOfProduct.category.id

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { category: x, ...productWithoutCategory } = data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { category: y, ...productToCompareWithoutCategory } = restOfProduct

    const productFormData = { ...productWithoutCategory, categoryId }
    const productToCompare = {
      ...productToCompareWithoutCategory,
      categoryId: actualCategoryId
    }

    const productToUpdate = {
      name: productFormData.name,
      stock: Number(productFormData.stock),
      price: Number(productFormData.price),
      discount: Number(productFormData.discount),
      description: productFormData.description,
      categoryId: productFormData.categoryId
    }

    const compareDatas =
      JSON.stringify(productFormData) === JSON.stringify(productToCompare)
    if (compareDatas) {
      return toast.error('No se han realizado cambios', {
        duration: 3000,
        position: 'top-right'
      })
    }

    startTransition(async () => {
      const response = await updateProductById(id, productToUpdate)
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
  }

  return (
    <>
      <form
        id="update-product-from-admin-form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <article className="space-y-5">
          <section>
            <Label htmlFor="name">Nombre:</Label>
            <Input
              id="name"
              type="text"
              {...register('name', {
                required: 'El campo nombre es requerido'
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </section>

          <section>
            <Label htmlFor="stock">Disponibilidad:</Label>
            <Input
              id="stock"
              type="number"
              {...register('stock', {
                required: 'El campo disponibilidad es requerido'
              })}
            />
            {errors.stock && (
              <ErrorMessage>{errors.stock.message}</ErrorMessage>
            )}
          </section>

          <section>
            <Label htmlFor="price">Precio:</Label>
            <Input
              id="price"
              type="number"
              {...register('price', {
                required: 'El campo disponibilidad es requerido'
              })}
            />
            {errors.price && (
              <ErrorMessage>{errors.price.message}</ErrorMessage>
            )}
          </section>

          <section>
            <Label
              htmlFor="discount"
              className="mb-0.5 flex items-center justify-between"
            >
              Descuento:
              <HoverCardDiscountDocs />
            </Label>

            <Input
              id="discount"
              type="number"
              {...register('discount', {
                required: 'El campo descuento campo es requerido',
                min: {
                  value: 0.01,
                  message: 'El descuento no puede ser menor o igual a 0'
                },
                max: {
                  value: 1,
                  message: 'El descuento no puede ser mayor a 1'
                }
              })}
            />
            {errors.discount && (
              <ErrorMessage>{errors.discount.message}</ErrorMessage>
            )}
          </section>

          <section>
            <Label htmlFor="category">Categoría:</Label>
            <Select
              onValueChange={(value) => setValue('category.id', value)}
              {...register('category.id')}
            >
              <SelectTrigger className="w-full capitalize">
                <SelectValue placeholder={restOfProduct.category.name} />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Seleccione una categoría</SelectLabel>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                      className="capitalize"
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.discount && (
              <ErrorMessage>{errors?.category?.id?.message}</ErrorMessage>
            )}
          </section>
        </article>

        <article className="space-y-5">
          <section>
            <Label htmlFor="description">Descripción:</Label>
            <Textarea
              id="description"
              rows={18}
              {...register('description', {
                required: 'El campo descripción es requerido'
              })}
            />
            {errors.description && (
              <ErrorMessage>{errors.description.message}</ErrorMessage>
            )}
          </section>
        </article>
      </form>

      <DialogFooter>
        <Button
          type="submit"
          form="update-product-from-admin-form"
          disabled={isPending}
        >
          {isPending ? (
            <>
              Actualizando
              <Spinner />
            </>
          ) : (
            'Guardar Cambios'
          )}
        </Button>
      </DialogFooter>
    </>
  )
}

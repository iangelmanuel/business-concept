"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { createProduct } from "@/actions"
import { Spinner } from "@/components/general/spinner/spinner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader
} from "@/components/ui/card"
import { ErrorMessage } from "@/components/ui/error-message"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { formValuesCreateProduct } from "@/consts"
import type { CategoryType, ProductCreateForm } from "@/types"
import { ChevronDown, Upload } from "lucide-react"
import Dropzone from "react-dropzone"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface Props {
  categories: CategoryType[]
}

export const NewProductForm = ({ categories }: Props) => {
  const [images, setImages] = useState<File[]>([])
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<ProductCreateForm>({
    defaultValues: formValuesCreateProduct
  })

  const onSubmit = (data: ProductCreateForm) => {
    const { images } = data

    const formData = new FormData()
    images.forEach((image) => {
      formData.append("images", image)
    })

    const newDataFormatted = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
      discount: Number(data.discount) || 1,
      images: formData
    }

    startTransition(async () => {
      const response = await createProduct(newDataFormatted)
      if (response.ok) {
        toast.success("¡Todo salió bien!", {
          description: response.message,
          duration: 3000,
          position: "top-right"
        })
        router.push("/admin/products")
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
    <Card className="mx-auto max-w-(--breakpoint-xl)">
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-x-5 sm:grid-cols-2"
      >
        <CardHeader className="space-y-5">
          <section>
            <Label htmlFor="name">Nombre:</Label>
            <Input
              type="text"
              id="name"
              placeholder="Ejemplo: iPhone 15 Pro Max"
              {...register("name", {
                required: "El campo nombre es requerido",
                minLength: {
                  value: 3,
                  message: "El nombre debe tener al menos 3 caracteres"
                },
                maxLength: {
                  value: 50,
                  message: "El nombre debe tener como máximo 50 caracteres"
                }
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </section>

          <section>
            <Label htmlFor="price">Precio:</Label>
            <Input
              type="number"
              id="price"
              placeholder="Ej. 4600000"
              {...register("price", {
                required: "El campo precio es requerido",
                min: {
                  value: 0,
                  message: "El precio debe ser mayor a 0"
                },
                max: {
                  value: 5000000,
                  message: "El precio debe ser menor a 5.000.000"
                }
              })}
            />
            {errors.price && (
              <ErrorMessage>{errors.price.message}</ErrorMessage>
            )}
          </section>

          <section>
            <Label htmlFor="stock">Disponibilidad:</Label>
            <Input
              type="number"
              id="stock"
              placeholder="Ej. 10 en el inventario"
              {...register("stock", {
                required: "El campo disponibilidad es requerido",
                min: {
                  value: 0,
                  message: "La disponibilidad debe ser mayor a 0"
                },
                max: {
                  value: 300,
                  message: "La disponibilidad debe ser menor a 300"
                }
              })}
            />
            {errors.stock && (
              <ErrorMessage>{errors.stock.message}</ErrorMessage>
            )}
          </section>

          <section>
            <Label htmlFor="discount">Descuento (Opcional):</Label>
            <Input
              type="number"
              id="discount"
              placeholder="Ej. 0.10 (para un 10% de descuento)"
              {...register("discount", {
                min: {
                  value: 0,
                  message: "El precio no puede ser menor a 0"
                },
                max: {
                  value: 1,
                  message: "El precio no puede ser mayor a 1"
                }
              })}
            />
            {errors.discount && (
              <ErrorMessage>{errors.discount.message}</ErrorMessage>
            )}
          </section>

          <section>
            <Label>Categoría:</Label>
            <Select
              onValueChange={(value) => setValue("categoryId", value)}
              {...register("categoryId", {
                required: "El campo categoría es requerido"
              })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>

              <SelectContent align="center">
                <SelectGroup>
                  <SelectLabel>Ordenes por páginas</SelectLabel>
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
            {errors.categoryId && (
              <ErrorMessage>{errors.categoryId.message}</ErrorMessage>
            )}
          </section>
        </CardHeader>

        <CardHeader>
          <section>
            <Label htmlFor="description">Descripción:</Label>
            <Textarea
              id="description"
              rows={18}
              placeholder="Ej. El iPhone 15 Pro Max es el mejor teléfono del mercado..."
              {...register("description", {
                required: "El campo descripción es requerido",
                minLength: {
                  value: 10,
                  message: "La descripción debe tener al menos 10 caracteres"
                },
                maxLength: {
                  value: 500,
                  message:
                    "La descripción debe tener como máximo 500 caracteres"
                }
              })}
            />
          </section>
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </CardHeader>

        <CardContent className="col-span-2">
          <section>
            <input
              type="hidden"
              aria-hidden="true"
              {...register("images", {
                required: "El campo imagen es requerido"
              })}
            />
          </section>

          <Label htmlFor="image">Imagen:</Label>
          <Dropzone
            onDrop={(acceptedFiles) => {
              setImages(acceptedFiles)
              setValue("images", acceptedFiles)
            }}
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <Card className="cursor-pointer p-3">
                <div {...getRootProps()}>
                  <input
                    id="image"
                    {...getInputProps({
                      multiple: true,
                      accept: "image/*",
                      max: 5
                    })}
                  />

                  {isDragActive ? (
                    <>
                      <ChevronDown
                        size={30}
                        className="text-muted-foreground m-auto"
                      />
                      <CardDescription className="mt-2 text-center">
                        Suelta los archivos aquí
                      </CardDescription>
                    </>
                  ) : (
                    <>
                      <Upload
                        size={30}
                        className="text-muted-foreground m-auto"
                      />
                      <CardDescription className="mt-2 text-center">
                        Arrastra y suelta una o más imagenes aquí, o haz clic
                        para seleccionarlas manualmente.
                      </CardDescription>
                    </>
                  )}
                </div>
              </Card>
            )}
          </Dropzone>
          {errors.images && (
            <ErrorMessage>{errors.images.message}</ErrorMessage>
          )}

          {images.length > 0 && (
            <Card className="mt-3 grid grid-cols-2 gap-2">
              {images.map((file) => (
                <Image
                  key={file.name}
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  width={200}
                  height={200}
                />
              ))}
            </Card>
          )}
        </CardContent>

        <CardFooter className="col-span-2">
          <section className="ml-auto">
            <Button
              type="submit"
              className="btn btn-primary"
            >
              {isPending ? (
                <>
                  Creando producto
                  <Spinner />
                </>
              ) : (
                "Crear producto"
              )}
            </Button>
          </section>
        </CardFooter>
      </form>
    </Card>
  )
}

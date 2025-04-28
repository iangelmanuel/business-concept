"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import { createProductImage, deleteProductImage } from "@/actions"
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
  Card,
  CardDescription,
  DialogFooter,
  ErrorMessage,
  Label,
  Spinner,
  buttonVariants
} from "@/components"
import type { ProductAllType, ProductImage } from "@/types"
import { ChevronDown, CircleX, Upload } from "lucide-react"
import Dropzone from "react-dropzone"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface Props {
  product: ProductAllType
}

interface ImageFormData {
  image: File[]
}

export const UpdateProductImageForm = ({ product }: Props) => {
  const [image, setImage] = useState<File[] | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<ImageFormData>({
    defaultValues: {
      image: undefined
    }
  })

  const onSubmit = async (data: ImageFormData) => {
    const { id, slug } = product
    const { image: formDataImages } = data

    const formData = new FormData()
    formDataImages.forEach((file) => {
      formData.append("images", file)
    })

    startTransition(async () => {
      const response = await createProductImage(formData, id, slug)
      if (response.ok) {
        toast.success("¡Todo salió bien!", {
          description: response.message,
          duration: 3000,
          position: "top-right"
        })
        setImage(null)
      } else {
        toast.error("Ocurrio un problema", {
          description: response.message,
          duration: 3000,
          position: "top-right"
        })
      }
    })
  }

  const handleClickDeleteImage = (imageId: ProductImage["id"]) => {
    startTransition(async () => {
      const response = await deleteProductImage(imageId)
      if (response.ok) {
        toast.success("¡Todo salió bien!", {
          description: response.message,
          duration: 3000,
          position: "top-right"
        })
        setIsDeleteModalOpen(false)
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
      <article>
        <Label>Imagen del producto actual:</Label>
        <section className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {product.productImage.map((image) => (
            <div
              key={image.id}
              className="relative mt-2"
            >
              <div onClick={() => setIsDeleteModalOpen(true)}>
                <CircleX
                  size={20}
                  className="text-muted-foreground hover:text-destructive absolute -top-2 -right-1 cursor-pointer transition-colors"
                />
              </div>

              <Card>
                <Image
                  src={image.url}
                  alt={product.name}
                  width={100}
                  height={100}
                  className="h-auto w-auto"
                />
              </Card>

              <AlertDialog
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      ¿Estás seguro que quieres eliminar la imagen del producto?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                      Esta acción no se puede deshacer y eliminará
                      permanentemente la imagen del producto.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>

                    <AlertDialogAction
                      onClick={() => handleClickDeleteImage(image.id)}
                      className={buttonVariants({ variant: "destructive" })}
                    >
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </section>
      </article>

      <article>
        <form
          noValidate
          id="update-product-image-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="hidden"
            aria-hidden="true"
            {...register("image", {
              required: "El campo imagen es requerido"
            })}
          />
        </form>
      </article>

      <article>
        <Label htmlFor="image">Añade una nueva imagen:</Label>
        <Dropzone
          onDrop={(acceptedFiles) => {
            setImage(acceptedFiles)
            setValue("image", acceptedFiles)
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
                      Arrastra y suelta una o más imagenes aquí, o haz clic para
                      seleccionarlas manualmente.
                    </CardDescription>
                  </>
                )}
              </div>
            </Card>
          )}
        </Dropzone>
        {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
      </article>

      {image && (
        <article>
          <Label>Imagenes seleccionadas:</Label>
          <section className="grid grid-cols-2 gap-x-2 sm:grid-cols-4">
            {Array.from(image).map((file) => (
              <Card key={file.name}>
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  width={100}
                  height={100}
                  className="h-auto w-auto"
                />
              </Card>
            ))}
          </section>
        </article>
      )}

      <DialogFooter>
        <Button
          type="submit"
          form="update-product-image-form"
          disabled={isPending}
        >
          {isPending ? (
            <>
              Actualizando
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

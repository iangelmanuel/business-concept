'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import { createProductImage } from '@/actions'
import {
  Button,
  Card,
  CardDescription,
  DialogFooter,
  ErrorMessage,
  Label,
  Spinner
} from '@/components'
import type { ProductAllType } from '@/types'
import { toBase64 } from '@/utils'
import { ChevronDown, Upload } from 'lucide-react'
import Dropzone from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface Props {
  product: ProductAllType
}

interface ImageFormData {
  image: File[]
}

export const UpdateProductImageForm = ({ product }: Props) => {
  const [image, setImage] = useState<File[] | null>(null)
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
    const { id } = product

    const files = await Promise.all(
      Array.from(data.image).map(async (file) => {
        const base64 = await toBase64(file)
        return {
          name: file.name,
          type: file.type,
          base64
        }
      })
    )

    startTransition(async () => {
      const response = await createProductImage(files, id)
      if (response.ok) {
        toast.success('', {
          description: response.message,
          duration: 3000,
          position: 'top-right'
        })
        setImage(null)
      } else {
        toast.error('', {
          description: response.message,
          duration: 3000,
          position: 'top-right'
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
            <Card key={image.id}>
              <Image
                src={image.url}
                alt={product.name}
                width={100}
                height={100}
                className="h-auto w-auto"
              />
            </Card>
          ))}
        </section>
      </article>

      <article>
        <form
          id="update-product-image-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <input
            type="hidden"
            aria-hidden="true"
            {...register('image', {
              required: 'El campo imagen es requerido'
            })}
          />
        </form>
      </article>

      <article>
        <Label htmlFor="image">Añade una nueva imagen:</Label>
        <Dropzone
          onDrop={(acceptedFiles) => {
            setImage(acceptedFiles)
            setValue('image', acceptedFiles)
          }}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <Card className="p-3">
              <div {...getRootProps()}>
                <input
                  id="image"
                  {...getInputProps({
                    multiple: true,
                    accept: 'image/*',
                    max: 5
                  })}
                />

                {isDragActive ? (
                  <>
                    <ChevronDown
                      size={30}
                      className="m-auto text-muted-foreground"
                    />
                    <CardDescription className="mt-2 text-center">
                      Suelta los archivos aquí
                    </CardDescription>
                  </>
                ) : (
                  <>
                    <Upload
                      size={30}
                      className="m-auto text-muted-foreground"
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
            'Guardar Cambios'
          )}
        </Button>
      </DialogFooter>
    </>
  )
}

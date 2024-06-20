'use client'

import { saveUserAddress } from '@/actions'
import {
  Button,
  CardContent,
  CardFooter,
  Checkbox,
  ErrorMessage,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components'
import { FORM_VALUES_ADDRESS } from '@/consts'
import { useAddressStore } from '@/store'
import type { AddressForm, LocationType } from '@/types'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
  location: LocationType[]
}

export const CardAddressForm = ({ location }: Props) => {
  const [citiesOfDepartment, setCitiesOfDepartment] = useState<
    LocationType['cities']
  >([])
  const [isSaveAddressActive, setIsSaveAddressActive] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const setAddress = useAddressStore((state) => state.setAddress)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<AddressForm>({ defaultValues: FORM_VALUES_ADDRESS })

  const getDepartmentValue = (value: LocationType['department']) => {
    const department = location.filter((item) => item.department === value)
    const cities = department[0].cities
    setCitiesOfDepartment(cities)
  }

  const onSubmit = (data: AddressForm) => {
    if (isSaveAddressActive) {
      startTransition(async () => {
        const response = await saveUserAddress(data)
        if (response.ok) {
          toast.success('Dirección guardada correctamente', {
            duration: 3000,
            position: 'top-right'
          })
        } else {
          toast.error('Error al guardar la dirección', {
            duration: 3000,
            position: 'top-right'
          })
        }
      })
    }
    setAddress(data)
    setValue('typeOfIdentification', '')
    setValue('department', '')
    setValue('city', '')
    reset()
    router.push('/shop/checkout')
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <article className="space-y-2">
          <div>
            <Label>Nombres:</Label>
            <Input
              type="text"
              autoComplete="additional-name"
              placeholder="Ej. Angel"
              {...register('firstName', {
                required: 'El campo nombres es obligatorio',
                minLength: {
                  value: 3,
                  message: 'El campo nombres debe tener al menos 3 caracteres'
                },
                maxLength: {
                  value: 50,
                  message: 'El campo nombres debe tener máximo 50 caracteres'
                }
              })}
            />
            {errors.firstName && (
              <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
            )}
          </div>
          <div>
            <Label>Apellidos:</Label>
            <Input
              type="text"
              autoComplete="family-name"
              placeholder="Ej. De La Torre"
              {...register('lastName', {
                required: 'El campo apellidos es obligatorio',
                minLength: {
                  value: 3,
                  message: 'El campo apellidos debe tener al menos 3 caracteres'
                },
                maxLength: {
                  value: 50,
                  message: 'El campo apellidos debe tener máximo 50 caracteres'
                }
              })}
            />
            {errors.lastName && (
              <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
            )}
          </div>
          <div>
            <Label>Tipo de documento:</Label>
            <Select
              autoComplete="document-type"
              onValueChange={(value) => setValue('typeOfIdentification', value)}
              {...register('typeOfIdentification', {
                required: 'El campo tipo de documento es obligatorio'
              })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Seleccione</SelectLabel>
                  <SelectItem value="c.c">Cédula Ciudadania</SelectItem>
                  <SelectItem value="t.e">Tarjeta de Extranjería</SelectItem>
                  <SelectItem value="passport">Pasaporte</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.typeOfIdentification && (
              <ErrorMessage>
                {errors.typeOfIdentification?.message}
              </ErrorMessage>
            )}
          </div>
          <div>
            <Label>Cédula:</Label>
            <Input
              type="text"
              autoComplete="family-name"
              placeholder="Ej. 1234567890"
              {...register('identification', {
                required: 'El campo cédula es obligatorio',
                minLength: {
                  value: 10,
                  message: 'El campo cédula debe tener al menos 10 caracteres'
                }
              })}
            />
            {errors.identification && (
              <ErrorMessage>{errors.identification?.message}</ErrorMessage>
            )}
          </div>
          <div>
            <Label>Télefono:</Label>
            <Input
              type="tel"
              autoComplete="tel"
              placeholder="Ej. 312 345 6789"
              {...register('phone', {
                required: 'El campo teléfono es obligatorio',
                minLength: {
                  value: 10,
                  message: 'El campo teléfono debe tener al menos 10 caracteres'
                },
                maxLength: {
                  value: 10,
                  message: 'El campo teléfono debe tener máximo 10 caracteres'
                }
              })}
            />
            {errors.phone && (
              <ErrorMessage>{errors.phone?.message}</ErrorMessage>
            )}
          </div>
        </article>

        <article className="space-y-2">
          <div>
            <Label>Dirección 1:</Label>
            <Input
              type="text"
              autoComplete="street-address"
              placeholder="Ej. Calle 123 #123 - 123"
              {...register('address', {
                required: 'El campo dirección es obligatorio',
                minLength: {
                  value: 5,
                  message: 'El campo dirección debe tener al menos 5 caracteres'
                },
                maxLength: {
                  value: 100,
                  message: 'El campo dirección debe tener máximo 100 caracteres'
                }
              })}
            />
            {errors.address && (
              <ErrorMessage>{errors.address?.message}</ErrorMessage>
            )}
          </div>
          <div>
            <Label>Dirección 2 (opcional):</Label>
            <Input
              type="text"
              autoComplete="street-address"
              placeholder="Ej. Apartamento 123"
              {...register('address2', {
                minLength: {
                  value: 5,
                  message: 'El campo dirección debe tener al menos 5 caracteres'
                },
                maxLength: {
                  value: 100,
                  message: 'El campo dirección debe tener máximo 100 caracteres'
                }
              })}
            />
            {errors.address2 && (
              <ErrorMessage>{errors.address2?.message}</ErrorMessage>
            )}
          </div>
          <div>
            <Label>Código Postal:</Label>
            <Input
              type="text"
              autoComplete="postal-code"
              placeholder="Ej. 123456"
              {...register('postalCode', {
                required: 'El campo código postal es obligatorio',
                minLength: {
                  value: 6,
                  message:
                    'El campo código postal debe tener al menos 6 caracteres'
                },
                maxLength: {
                  value: 10,
                  message:
                    'El campo código postal debe tener máximo 10 caracteres'
                }
              })}
            />
            {errors.postalCode && (
              <ErrorMessage>{errors.postalCode?.message}</ErrorMessage>
            )}
          </div>
          <div>
            <Label>Departamento:</Label>
            <Select
              autoComplete="address-level1"
              onValueChange={(value) => {
                getDepartmentValue(value)
                setValue('department', value)
              }}
              {...register('department', {
                required: 'El campo departamento es obligatorio'
              })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Seleccione</SelectLabel>
                  {location.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.department}
                    >
                      {item.department}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.department && (
              <ErrorMessage>{errors.department?.message}</ErrorMessage>
            )}
          </div>
          <div>
            <Label>Ciudad:</Label>
            <Select
              autoComplete="address-level2"
              onValueChange={(value) => setValue('city', value)}
              {...register('city', {
                required: 'El campo ciudad es obligatorio'
              })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Seleccione</SelectLabel>
                  {citiesOfDepartment.map((item) => (
                    <SelectItem
                      key={item}
                      value={item}
                    >
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.city && <ErrorMessage>{errors.city?.message}</ErrorMessage>}
          </div>
          <div>
            <Label>Información Adicional (opcional):</Label>
            <Input
              type="text"
              autoComplete="address-line2"
              placeholder="Ej. Bogotá"
              {...register('extraData', {
                minLength: {
                  value: 3,
                  message:
                    'El campo información adicional debe tener al menos 3 caracteres'
                },
                maxLength: {
                  value: 50,
                  message:
                    'El campo información adicional debe tener máximo 50 caracteres'
                }
              })}
            />
            {errors.extraData && (
              <ErrorMessage>{errors.extraData?.message}</ErrorMessage>
            )}
          </div>
        </article>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="save-address"
            disabled={isPending}
            checked={isSaveAddressActive}
            onCheckedChange={() => setIsSaveAddressActive(!isSaveAddressActive)}
          />
          <label
            htmlFor="save-address"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            ¿Desear guardar esta dirección para futuras compras?
          </label>
        </div>

        <Button
          type="submit"
          disabled={isPending}
        >
          Proceder al Pago
        </Button>
      </CardFooter>
    </form>
  )
}

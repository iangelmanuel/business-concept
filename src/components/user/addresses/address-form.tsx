"use client"

import { useState, useTransition } from "react"
import { saveUserAddress } from "@/actions"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ErrorMessage } from "@/components/ui/error-message"
import { Spinner } from "@/components/general/spinner/spinner"
import { FORM_VALUES_ADDRESS } from "@/consts"
import { useAddressFormStore } from "@/store"
import type {
  AddressForm as AddressFormType,
  AddressType,
  LocationType
} from "@/types"
import { capitalize } from "@/utils"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface Props {
  location: LocationType[]
  address?: AddressType
  handleUpdateAddress?: (address: AddressType) => void
}

export const AddressForm = ({
  location,
  address,
  handleUpdateAddress
}: Props) => {
  const [citiesOfDepartment, setCitiesOfDepartment] = useState<
    LocationType["cities"]
  >([])
  const [isPending, startTransition] = useTransition()

  const toggleAddressForm = useAddressFormStore(
    (state) => state.toggleAddressForm
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<AddressFormType>({
    defaultValues: address ?? FORM_VALUES_ADDRESS
  })

  const getDepartmentValue = (value: LocationType["department"]) => {
    const department = location.filter((item) => item.department === value)
    const cities = department[0].cities
    setCitiesOfDepartment(cities)
  }

  const onSubmit = (data: AddressFormType | AddressType) => {
    if (address === undefined) {
      startTransition(async () => {
        const response = await saveUserAddress(data)
        if (response.ok) {
          toast.success("¡Todo salió bien!", {
            description: response.message,
            duration: 3000,
            position: "top-right"
          })
          toggleAddressForm()
        } else {
          toast.error("Ocurrio un problema", {
            description: response.message,
            duration: 3000,
            position: "top-right"
          })
        }
      })
    } else {
      const isAddressChange = JSON.stringify(address) === JSON.stringify(data)
      if (isAddressChange) {
        return toast.success("No se han realizado cambios", {
          duration: 3000,
          position: "top-right"
        })
      }

      if (handleUpdateAddress) {
        handleUpdateAddress(data as AddressType)
      }
    }
  }

  const isAddressExists = address !== undefined

  return (
    <form
      noValidate
      id={isAddressExists ? "update-address" : "save-address"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <article className="space-y-2">
          <section>
            <Label htmlFor="name">Nombres:</Label>
            <Input
              type="text"
              id="name"
              autoComplete="additional-name"
              placeholder="Ej. Angel"
              {...register("firstName", {
                required: "El campo nombres es obligatorio",
                minLength: {
                  value: 3,
                  message: "El campo nombres debe tener al menos 3 caracteres"
                },
                maxLength: {
                  value: 50,
                  message: "El campo nombres debe tener máximo 50 caracteres"
                }
              })}
            />
            {errors.firstName && (
              <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
            )}
          </section>

          <section>
            <Label htmlFor="lastname">Apellidos:</Label>
            <Input
              type="text"
              id="lastname"
              autoComplete="family-name"
              placeholder="Ej. De La Torre"
              {...register("lastName", {
                required: "El campo apellidos es obligatorio",
                minLength: {
                  value: 3,
                  message: "El campo apellidos debe tener al menos 3 caracteres"
                },
                maxLength: {
                  value: 50,
                  message: "El campo apellidos debe tener máximo 50 caracteres"
                }
              })}
            />
            {errors.lastName && (
              <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
            )}
          </section>

          <section>
            <Label>Tipo de documento:</Label>
            <Select
              autoComplete="document-type"
              onValueChange={(value) => setValue("typeOfIdentification", value)}
              {...register("typeOfIdentification", {
                required: "El campo tipo de documento es obligatorio"
              })}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={address?.typeOfIdentification ?? "Selecciona"}
                />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Seleccione</SelectLabel>
                  <SelectItem value="C.C">Cédula Ciudadania</SelectItem>
                  <SelectItem value="T.E">Tarjeta de Extranjería</SelectItem>
                  <SelectItem value="Pasaporte">Pasaporte</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.typeOfIdentification && (
              <ErrorMessage>
                {errors.typeOfIdentification?.message}
              </ErrorMessage>
            )}
          </section>

          <section>
            <Label htmlFor="identification">Cédula:</Label>
            <Input
              type="text"
              id="identification"
              autoComplete="family-name"
              placeholder="Ej. 1234567890"
              {...register("identification", {
                required: "El campo cédula es obligatorio",
                minLength: {
                  value: 10,
                  message: "El campo cédula debe tener al menos 10 caracteres"
                }
              })}
            />
            {errors.identification && (
              <ErrorMessage>{errors.identification?.message}</ErrorMessage>
            )}
          </section>

          <section>
            <Label htmlFor="phone">Télefono:</Label>
            <Input
              type="tel"
              id="phone"
              autoComplete="tel-national"
              placeholder="Ej. 312 345 6789"
              {...register("phone", {
                required: "El campo teléfono es obligatorio",
                minLength: {
                  value: 10,
                  message: "El campo teléfono debe tener al menos 10 caracteres"
                },
                maxLength: {
                  value: 10,
                  message: "El campo teléfono debe tener máximo 10 caracteres"
                }
              })}
            />
            {errors.phone && (
              <ErrorMessage>{errors.phone?.message}</ErrorMessage>
            )}
          </section>
        </article>

        <article className="space-y-2">
          <section>
            <Label htmlFor="address">Dirección 1:</Label>
            <Input
              type="text"
              id="address"
              autoComplete="street-address"
              placeholder="Ej. Calle 123 #123 - 123"
              {...register("address", {
                required: "El campo dirección es obligatorio",
                minLength: {
                  value: 5,
                  message: "El campo dirección debe tener al menos 5 caracteres"
                },
                maxLength: {
                  value: 100,
                  message: "El campo dirección debe tener máximo 100 caracteres"
                }
              })}
            />
            {errors.address && (
              <ErrorMessage>{errors.address?.message}</ErrorMessage>
            )}
          </section>

          <section>
            <Label htmlFor="address2">Dirección 2 (opcional):</Label>
            <Input
              type="text"
              id="address2"
              autoComplete="street-address"
              placeholder="Ej. Apartamento 123"
              {...register("address2", {
                minLength: {
                  value: 5,
                  message: "El campo dirección debe tener al menos 5 caracteres"
                },
                maxLength: {
                  value: 100,
                  message: "El campo dirección debe tener máximo 100 caracteres"
                }
              })}
            />
            {errors.address2 && (
              <ErrorMessage>{errors.address2?.message}</ErrorMessage>
            )}
          </section>

          <section>
            <Label htmlFor="postal-code">Código Postal:</Label>
            <Input
              type="text"
              id="postal-code"
              autoComplete="postal-code"
              placeholder="Ej. 123456"
              {...register("postalCode", {
                required: "El campo código postal es obligatorio",
                minLength: {
                  value: 6,
                  message:
                    "El campo código postal debe tener al menos 6 caracteres"
                },
                maxLength: {
                  value: 10,
                  message:
                    "El campo código postal debe tener máximo 10 caracteres"
                }
              })}
            />
            {errors.postalCode && (
              <ErrorMessage>{errors.postalCode?.message}</ErrorMessage>
            )}
          </section>

          <section>
            <Label>Departamento:</Label>
            <Select
              autoComplete="address-level1"
              onValueChange={(value) => {
                getDepartmentValue(value)
                setValue("department", value)
              }}
              {...register("department", {
                required: "El campo departamento es obligatorio"
              })}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={capitalize(address?.department) ?? "Selecciona"}
                />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Seleccione</SelectLabel>
                  {location.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.department}
                      className="capitalize"
                    >
                      <span className="capitalize">{item.department}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.department && (
              <ErrorMessage>{errors.department?.message}</ErrorMessage>
            )}
          </section>

          <section>
            <Label>Ciudad:</Label>
            <Select
              autoComplete="address-level2"
              onValueChange={(value) => setValue("city", value)}
              {...register("city", {
                required: "El campo ciudad es obligatorio"
              })}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={capitalize(address?.city) ?? "Selecciona"}
                />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Seleccione</SelectLabel>
                  {citiesOfDepartment.map((item) => (
                    <SelectItem
                      key={item}
                      value={item}
                      className="capitalize"
                    >
                      <span className="capitalize">{item}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.city && <ErrorMessage>{errors.city?.message}</ErrorMessage>}
          </section>

          <section>
            <Label htmlFor="extra-data">
              Información Adicional (opcional):
            </Label>
            <Input
              type="text"
              id="extra-data"
              autoComplete="address-line2"
              placeholder="Ej. Bogotá"
              {...register("extraData", {
                minLength: {
                  value: 3,
                  message:
                    "El campo información adicional debe tener al menos 3 caracteres"
                },
                maxLength: {
                  value: 50,
                  message:
                    "El campo información adicional debe tener máximo 50 caracteres"
                }
              })}
            />
            {errors.extraData && (
              <ErrorMessage>{errors.extraData?.message}</ErrorMessage>
            )}
          </section>
        </article>
      </CardContent>

      {!isAddressExists && (
        <CardFooter className="flex items-center justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            {isPending ? (
              <>
                Guardando dirección
                <Spinner />
              </>
            ) : (
              "Guardar dirección"
            )}
          </Button>
        </CardFooter>
      )}
    </form>
  )
}

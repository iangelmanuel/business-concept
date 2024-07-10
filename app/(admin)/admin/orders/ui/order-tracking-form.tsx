'use client'

import { useTransition } from 'react'
import { addOrUpdateOrderTrackingCode } from '@/actions'
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
  Spinner
} from '@/components'
import { selectOrderTrackingCompanyData } from '@/data'
import type { UserOrderByAdmin, UserOrderTracking } from '@/types'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface Props {
  order: UserOrderByAdmin
}

export const OrderTrackingForm = ({ order }: Props) => {
  const [isPending, startTransition] = useTransition()

  const { OrderTracking } = order

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<UserOrderTracking>({
    defaultValues: {
      company: OrderTracking?.company || '',
      trackingCode: OrderTracking?.trackingCode || ''
    }
  })

  const onSubmit = (data: UserOrderTracking) => {
    startTransition(async () => {
      const orderId = order.id

      const response = await addOrUpdateOrderTrackingCode(orderId, data)
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
        id="add-tracking-code"
        className="space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section>
          <Label>Empresa de rastreo</Label>
          <Select
            {...register('company', {
              required: 'El campo compañia es requerido'
            })}
            onValueChange={(value) => setValue('company', value)}
          >
            <SelectTrigger className="w-full capitalize">
              <SelectValue
                placeholder={
                  OrderTracking?.company ?? 'Selecciona la empresa de envio'
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Empresa de envio</SelectLabel>
                {selectOrderTrackingCompanyData.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.company && (
            <ErrorMessage>{errors.company.message}</ErrorMessage>
          )}
        </section>

        <section>
          <Label>Código de rastreo</Label>
          <Input
            type="text"
            placeholder="Agregar número de rastreo"
            {...register('trackingCode', {
              required: 'El campo número de rastreo es requerido'
            })}
          />
          {errors.trackingCode && (
            <ErrorMessage>{errors.trackingCode.message}</ErrorMessage>
          )}
        </section>
      </form>
      <DialogFooter>
        <Button
          form="add-tracking-code"
          disabled={isPending}
        >
          {isPending ? (
            <>
              Añadiendo código
              <Spinner />
            </>
          ) : (
            'Añadir código'
          )}
          Añadir código
        </Button>
      </DialogFooter>
    </>
  )
}

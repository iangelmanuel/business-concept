'use client'

import { useTransition } from 'react'
import { changeOrderStatus } from '@/actions'
import {
  Button,
  DialogFooter,
  ErrorMessage,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components'
import { orderStatusLang } from '@/consts'
import { selectOrderStatusData } from '@/data'
import type { OrderStatusFormValues, UserOrderByAdmin } from '@/types'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface Props {
  order: UserOrderByAdmin
}

export const OrderStatusForm = ({ order }: Props) => {
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<OrderStatusFormValues>({
    defaultValues: {
      orderStatus: order.orderStatus
    }
  })

  const onSubmit = (data: OrderStatusFormValues) => {
    const orderId = order.id
    const { orderStatus } = data

    startTransition(async () => {
      const response = await changeOrderStatus(orderId, orderStatus)
      if (response?.ok) {
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

  const { orderStatus } = order

  return (
    <>
      <form
        id="change-order-status"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section>
          <Label>Estado del rastreo</Label>
          <Select
            {...register('orderStatus', {
              required: 'El campo estado del rastreo es requerido'
            })}
            onValueChange={(value) =>
              setValue('orderStatus', value as UserOrderByAdmin['orderStatus'])
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={orderStatusLang[orderStatus]} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Estados para el rastreo:</SelectLabel>
                {selectOrderStatusData.map((option) => (
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
          {errors.orderStatus && (
            <ErrorMessage>{errors.orderStatus.message}</ErrorMessage>
          )}
        </section>
      </form>

      <DialogFooter>
        <Button
          form="change-order-status"
          disabled={isPending}
        >
          Cambiar estado
        </Button>
      </DialogFooter>
    </>
  )
}

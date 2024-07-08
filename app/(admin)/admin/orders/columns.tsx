'use client'

import type { ColumnDef, SortDirection } from '@tanstack/react-table'
import { Badge, Button, Checkbox, SendEmail } from '@/components'
import { orderStatusLang } from '@/consts'
import type { UserOrderByAdmin } from '@/types'
import { checkOrderStatusCn, formatCurrency, formatDate } from '@/utils'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { ActionsButtons } from './ui/actions-buttons'

const SorterIcon = ({ isSorted }: { isSorted: false | SortDirection }) => {
  if (isSorted === 'asc') {
    return <ChevronUpIcon className="h-4 w-4" />
  }
  if (isSorted === 'desc') {
    return <ChevronDownIcon className="h-4 w-4" />
  }
  return null
}

export const columns: ColumnDef<UserOrderByAdmin>[] = [
  {
    accessorKey: 'id',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },

  {
    accessorFn: (row) => row.OrderAddress?.firstName,
    id: 'OrderAddress.firstName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombre
          <SorterIcon isSorted={column.getIsSorted()} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const order = row.original as UserOrderByAdmin
      const firstName = order.OrderAddress?.firstName
      const lastName = order.OrderAddress?.lastName

      return (
        <>
          <p>{firstName}</p>
          <p>{lastName}</p>
        </>
      )
    }
  },

  {
    accessorFn: (row) => row.user.email,
    id: 'user.email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Correo
          <SorterIcon isSorted={column.getIsSorted()} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const email = row.getValue('user.email') as string
      const orderAddres = row.original
        .OrderAddress as UserOrderByAdmin['OrderAddress']

      if (!orderAddres) return <span>{email}</span>

      const { firstName, lastName } = orderAddres
      const userFullName = `${firstName} ${lastName}`

      return (
        <SendEmail
          userFullName={userFullName}
          email={email}
          isOrder
        />
      )
    }
  },

  {
    accessorFn: (row) => row.OrderAddress?.department,
    id: 'OrderAddress.department',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Lugar
          <SorterIcon isSorted={column.getIsSorted()} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const order = row.original as UserOrderByAdmin
      const department = order.OrderAddress?.department
      const city = order.OrderAddress?.city

      return (
        <>
          <p className="capitalize">{department}</p>
          <p className="capitalize">{city}</p>
        </>
      )
    }
  },

  {
    accessorKey: 'paidAt',
    header: 'Fecha de Pago',
    cell: ({ row }) => {
      const paidAt = row.getValue('paidAt') as string
      const isOrderPaidAt = paidAt !== null ? formatDate(paidAt) : 'N/A'
      return <p className="text-center">{isOrderPaidAt}</p>
    }
  },

  {
    accessorKey: 'orderStatus',
    header: 'Estado de la orden',
    cell: ({ row }) => {
      const orderStatus = row.getValue(
        'orderStatus'
      ) as UserOrderByAdmin['orderStatus']

      return (
        <section className="flex items-center justify-center">
          <Badge variant={checkOrderStatusCn(orderStatus)}>
            {orderStatusLang[orderStatus]}
          </Badge>
        </section>
      )
    }
  },

  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => {
      const total = row.getValue('total') as number
      const totalFormated = formatCurrency(total)

      return <p>{totalFormated}</p>
    }
  },

  {
    accessorKey: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const order = row.original
      return <ActionsButtons order={order} />
    }
  }
]

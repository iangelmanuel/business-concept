'use client'

import type { ColumnDef, SortDirection } from '@tanstack/react-table'
import {
  Badge,
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SendEmail
} from '@/components'
import { orderStatusLang } from '@/consts'
import type { UserOrderByAdmin } from '@/types'
import { checkOrderStatusCn, formatCurrency, formatDate } from '@/utils'
import {
  Ban,
  ChevronDownIcon,
  ChevronUp,
  ChevronUpIcon,
  ChevronsUpDown,
  Clock,
  EyeOff,
  House,
  Package,
  PackageCheck,
  Truck
} from 'lucide-react'
import { ActionsButtons } from './ui/actions-buttons'

const SorterIcon = ({ isSorted }: { isSorted: false | SortDirection }) => {
  if (!isSorted) {
    return <ChevronsUpDown className="h-4 w-4" />
  }
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
    id: 'OrderAddress.id',
    accessorFn: (row) => row.OrderAddress?.id,
    header: ({ table }) => (
      <section>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </section>
    ),

    cell: ({ row }) => (
      <section>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </section>
    ),
    enableSorting: false,
    enableHiding: false
  },

  {
    accessorKey: 'nombres',
    id: 'OrderAddress.firstName',
    accessorFn: (row) => row.OrderAddress?.firstName,
    header: ({ column }) => {
      return (
        <section className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-x-1"
              >
                Nombres
                <SorterIcon isSorted={column.getIsSorted()} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center">
              <DropdownMenuItem>
                <button
                  onClick={() => column.toggleSorting(false)}
                  className="flex items-center"
                >
                  <ChevronUp className="mr-2 h-4 w-4" />
                  Asc
                </button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button
                  onClick={() => column.toggleSorting(true)}
                  className="flex items-center"
                >
                  <ChevronDownIcon className="mr-2 h-4 w-4" />
                  Desc
                </button>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <button
                  onClick={() => column.toggleVisibility(false)}
                  className="flex items-center"
                >
                  <EyeOff className="mr-2 h-4 w-4" />
                  Ocultar
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      )
    },
    cell: ({ row }) => {
      const order = row.original as UserOrderByAdmin
      const firstName = order.OrderAddress?.firstName
      const lastName = order.OrderAddress?.lastName

      return (
        <section className="flex flex-col items-center justify-center">
          <span>{firstName}</span>
          <span>{lastName}</span>
        </section>
      )
    }
  },

  {
    accessorKey: 'email',
    id: 'user.email',
    accessorFn: (row) => row.user.email,
    header: ({ column }) => {
      return (
        <section className="flex flex-col items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-x-1"
              >
                Email
                <SorterIcon isSorted={column.getIsSorted()} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center">
              <DropdownMenuItem>
                <button
                  onClick={() => column.toggleSorting(false)}
                  className="flex items-center"
                >
                  <ChevronUp className="mr-2 h-4 w-4" />
                  Asc
                </button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button
                  onClick={() => column.toggleSorting(true)}
                  className="flex items-center"
                >
                  <ChevronDownIcon className="mr-2 h-4 w-4" />
                  Desc
                </button>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <button
                  onClick={() => column.toggleVisibility(false)}
                  className="flex items-center"
                >
                  <EyeOff className="mr-2 h-4 w-4" />
                  Ocultar
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
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
        <section className="flex flex-col items-center justify-center">
          <SendEmail
            userFullName={userFullName}
            email={email}
            isOrder
          />
        </section>
      )
    }
  },

  {
    accessorKey: 'locación',
    id: 'OrderAddress.department',
    accessorFn: (row) => row.OrderAddress?.department,
    header: ({ column }) => {
      return (
        <section className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-x-1"
              >
                Localidad
                <SorterIcon isSorted={column.getIsSorted()} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center">
              <DropdownMenuItem>
                <button
                  onClick={() => column.toggleSorting(false)}
                  className="flex items-center"
                >
                  <ChevronUp className="mr-2 h-4 w-4" />
                  Asc
                </button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button
                  onClick={() => column.toggleSorting(true)}
                  className="flex items-center"
                >
                  <ChevronDownIcon className="mr-2 h-4 w-4" />
                  Desc
                </button>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <button
                  onClick={() => column.toggleVisibility(false)}
                  className="flex items-center"
                >
                  <EyeOff className="mr-2 h-4 w-4" />
                  Ocultar
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      )
    },
    cell: ({ row }) => {
      const order = row.original as UserOrderByAdmin
      const department = order.OrderAddress?.department
      const city = order.OrderAddress?.city

      return (
        <section className="flex flex-col items-center justify-center">
          <span className="capitalize">{department}</span>
          <span className="capitalize">{city}</span>
        </section>
      )
    }
  },

  {
    accessorKey: 'fecha de pago',
    id: 'paidAt',
    accessorFn: (row) => row.paidAt,
    header: () => {
      return (
        <section className="flex items-center justify-center">
          <span>Fecha de Pago</span>
        </section>
      )
    },
    cell: ({ row }) => {
      const paidAt = row.getValue('paidAt') as string
      const isOrderPaidAt = paidAt !== null ? formatDate(paidAt) : 'N/A'
      return (
        <section className="flex flex-col items-center justify-center">
          <span>{isOrderPaidAt}</span>
        </section>
      )
    }
  },

  {
    accessorKey: 'estado de la orden',
    id: 'orderStatus',
    accessorFn: (row) => row.orderStatus,
    header: ({ column }) => {
      return (
        <>
          <section className="flex items-center justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-x-1"
                >
                  Estado de orden
                  <SorterIcon isSorted={column.getIsSorted()} />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="center">
                <DropdownMenuItem>
                  <button
                    onClick={() => column.setFilterValue(undefined)}
                    className="flex items-center"
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Todos
                  </button>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <button
                    onClick={() => {
                      column.setFilterValue(undefined)
                      column.setFilterValue('delivered')
                    }}
                    className="flex items-center"
                  >
                    <House className="mr-2 h-4 w-4" />
                    Entregados
                  </button>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <button
                    onClick={() => {
                      column.setFilterValue(undefined)
                      column.setFilterValue('shipped')
                    }}
                    className="flex items-center"
                  >
                    <Truck className="mr-2 h-4 w-4" />
                    Enviados
                  </button>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <button
                    onClick={() => {
                      column.setFilterValue(undefined)
                      column.setFilterValue('approved')
                    }}
                    className="flex items-center"
                  >
                    <PackageCheck className="mr-2 h-4 w-4" />
                    Aprobados
                  </button>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <button
                    onClick={() => {
                      column.setFilterValue(undefined)
                      column.setFilterValue('pending')
                    }}
                    className="flex items-center"
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Pendientes
                  </button>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <button
                    onClick={() => {
                      column.setFilterValue(undefined)
                      column.setFilterValue('canceled')
                    }}
                    className="flex items-center"
                  >
                    <Ban className="mr-2 h-4 w-4" />
                    Cancelados
                  </button>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <button
                    onClick={() => column.toggleVisibility(false)}
                    className="flex items-center"
                  >
                    <EyeOff className="mr-2 h-4 w-4" />
                    Ocultar
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </section>
        </>
      )
    },
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
    id: 'total',
    accessorFn: (row) => row.total,
    header: () => {
      return (
        <section className="flex items-center justify-center">
          <span>Total</span>
        </section>
      )
    },
    cell: ({ row }) => {
      const total = row.getValue('total') as number
      const totalFormated = formatCurrency(total)

      return (
        <section className="flex items-center justify-center">
          <span>{totalFormated}</span>
        </section>
      )
    }
  },

  {
    accessorKey: 'acciones',
    header: () => {
      return (
        <section className="flex items-center justify-center">
          <span>Acciones</span>
        </section>
      )
    },
    cell: ({ row }) => {
      const order = row.original
      return (
        <section className="flex items-center justify-center">
          <ActionsButtons order={order} />
        </section>
      )
    }
  }
]

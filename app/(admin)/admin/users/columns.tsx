'use client'

import { Badge, Button, Checkbox } from '@/components'
import type { UserType } from '@/types'
import type { ColumnDef, SortDirection } from '@tanstack/react-table'
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

export const columns: ColumnDef<UserType>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombres
          <SorterIcon isSorted={column.getIsSorted()} />
        </Button>
      )
    }
  },

  {
    accessorKey: 'lastname',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Apellidos
          <SorterIcon isSorted={column.getIsSorted()} />
        </Button>
      )
    }
  },

  {
    accessorKey: 'email',
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
    }
  },

  {
    accessorKey: 'phone',
    header: 'Teléfono',
    cell: ({ row }) => {
      const phone = row.getValue('phone') as string
      const data = phone || 'N/A'

      return <span>{data}</span>
    }
  },

  {
    accessorKey: 'role',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Rol
          <SorterIcon isSorted={column.getIsSorted()} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const role = row.getValue('role') as string
      const isAdminOrUserText = role === 'admin' ? 'Admin' : 'Usuario'
      return (
        <section className="flex items-center justify-center">
          <Badge className="uppercase">{isAdminOrUserText}</Badge>
        </section>
      )
    }
  },

  {
    accessorKey: 'isUserDeleted',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Estado Cuenta
          <SorterIcon isSorted={column.getIsSorted()} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isUserDeleted = row.getValue('isUserDeleted')
      const text = isUserDeleted ? 'Eliminada' : 'Activa'
      const variant = isUserDeleted ? 'destructive' : 'success'

      return (
        <section className="flex items-center justify-center">
          <Badge variant={variant}>{text}</Badge>
        </section>
      )
    }
  },

  {
    accessorKey: 'isConfirmed',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Confirmación
          <SorterIcon isSorted={column.getIsSorted()} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isConfirmed = row.getValue('isConfirmed')
      const text = isConfirmed ? 'Confirmado' : 'Sin confirmado'
      const variant = isConfirmed ? 'success' : 'destructive'

      return (
        <section className="flex items-center justify-center">
          <Badge variant={variant}>{text}</Badge>
        </section>
      )
    }
  },

  {
    accessorKey: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const user = row.original
      return <ActionsButtons user={user} />
    }
  }
]

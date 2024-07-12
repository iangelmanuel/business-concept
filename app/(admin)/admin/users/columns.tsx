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
import type { UserType } from '@/types'
import {
  ChevronDownIcon,
  ChevronUp,
  ChevronUpIcon,
  ChevronsUpDown,
  CircleCheckBig,
  CircleDot,
  CircleX,
  EyeOff,
  ShieldCheck,
  User,
  Users
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
                  <ChevronUp className="mr-1.5 h-4 w-4" />
                  Asc
                </button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button
                  onClick={() => column.toggleSorting(true)}
                  className="flex items-center"
                >
                  <ChevronDownIcon className="mr-1.5 h-4 w-4" />
                  Desc
                </button>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <button
                  onClick={() => column.toggleVisibility(false)}
                  className="flex items-center"
                >
                  <EyeOff className="mr-1.5 h-3 w-3" />
                  Ocultar
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      )
    },
    cell: ({ row }) => {
      const name = row.getValue('name') as string
      return (
        <section className="flex items-center justify-center">
          <span>{name}</span>
        </section>
      )
    }
  },

  {
    accessorKey: 'lastname',
    header: ({ column }) => {
      return (
        <section className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-x-1"
              >
                Apellidos
                <SorterIcon isSorted={column.getIsSorted()} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center">
              <DropdownMenuItem>
                <button
                  onClick={() => column.toggleSorting(false)}
                  className="flex items-center"
                >
                  <ChevronUp className="mr-1.5 h-4 w-4" />
                  Asc
                </button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button
                  onClick={() => column.toggleSorting(true)}
                  className="flex items-center"
                >
                  <ChevronDownIcon className="mr-1.5 h-4 w-4" />
                  Desc
                </button>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <button
                  onClick={() => column.toggleVisibility(false)}
                  className="flex items-center"
                >
                  <EyeOff className="mr-1.5 h-3 w-3" />
                  Ocultar
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      )
    },
    cell: ({ row }) => {
      const lastname = row.getValue('lastname') as string
      return (
        <section className="flex items-center justify-center">
          <span>{lastname}</span>
        </section>
      )
    }
  },

  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <section className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-x-1"
              >
                Correo
                <SorterIcon isSorted={column.getIsSorted()} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center">
              <DropdownMenuItem>
                <button
                  onClick={() => column.toggleSorting(false)}
                  className="flex items-center"
                >
                  <ChevronUp className="mr-1.5 h-4 w-4" />
                  Asc
                </button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button
                  onClick={() => column.toggleSorting(true)}
                  className="flex items-center"
                >
                  <ChevronDownIcon className="mr-1.5 h-4 w-4" />
                  Desc
                </button>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <button
                  onClick={() => column.toggleVisibility(false)}
                  className="flex items-center"
                >
                  <EyeOff className="mr-1.5 h-3 w-3" />
                  Ocultar
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      )
    },
    cell: ({ row }) => {
      const email = row.getValue('email') as string
      const name = row.getValue('name') as string
      const lastname = row.getValue('lastname') as string

      const userFullName = `${name} ${lastname}`

      return (
        <section className="flex items-center justify-center">
          <SendEmail
            userFullName={userFullName}
            email={email}
          />
        </section>
      )
    }
  },

  {
    accessorKey: 'phone',
    header: () => {
      return (
        <section className="flex items-center justify-center">
          <span>Teléfono</span>
        </section>
      )
    },
    cell: ({ row }) => {
      const phone = row.getValue('phone') as string
      const data = phone || 'N/A'

      return (
        <section className="flex items-center justify-center">
          <span>{data}</span>
        </section>
      )
    }
  },

  {
    accessorKey: 'role',
    header: ({ column }) => {
      return (
        <section className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-x-1"
              >
                Rol
                <SorterIcon isSorted={column.getIsSorted()} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center">
              <DropdownMenuItem>
                <button
                  onClick={() => column.setFilterValue(undefined)}
                  className="flex items-center"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Todos
                </button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button
                  onClick={() => {
                    column.setFilterValue(undefined)
                    column.setFilterValue('admin')
                  }}
                  className="flex items-center"
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Administrador
                </button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button
                  onClick={() => {
                    column.setFilterValue(undefined)
                    column.setFilterValue('user')
                  }}
                  className="flex items-center"
                >
                  <User className="mr-2 h-4 w-4" />
                  Usuario
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
      const role = row.getValue('role') as string
      const textIsAdmin = role === 'admin' ? 'Admin' : 'Usuario'
      const variantIsAdmin = role === 'admin' ? 'admin' : 'user'
      return (
        <section className="flex items-center justify-center">
          <Badge
            variant={variantIsAdmin}
            className="uppercase"
          >
            {textIsAdmin}
          </Badge>
        </section>
      )
    }
  },

  {
    accessorKey: 'isUserDeleted',
    header: ({ column }) => {
      return (
        <section className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-x-1"
              >
                Estado de cuenta
                <SorterIcon isSorted={column.getIsSorted()} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center">
              <DropdownMenuItem>
                <button
                  onClick={() => column.setFilterValue(undefined)}
                  className="flex items-center"
                >
                  <CircleDot className="mr-2 h-4 w-4" />
                  Todos
                </button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button
                  onClick={() => {
                    column.setFilterValue(undefined)
                    column.setFilterValue(false)
                  }}
                  className="flex items-center"
                >
                  <CircleCheckBig className="mr-2 h-4 w-4" />
                  Activas
                </button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button
                  onClick={() => {
                    column.setFilterValue(undefined)
                    column.setFilterValue(true)
                  }}
                  className="flex items-center"
                >
                  <CircleX className="mr-2 h-4 w-4" />
                  Eliminadas
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
        <section className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-x-1"
              >
                Confirmación
                <SorterIcon isSorted={column.getIsSorted()} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center">
              <DropdownMenuItem>
                <button
                  onClick={() => column.setFilterValue(undefined)}
                  className="flex items-center"
                >
                  <CircleDot className="mr-2 h-4 w-4" />
                  Todos
                </button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button
                  onClick={() => {
                    column.setFilterValue(undefined)
                    column.setFilterValue(true)
                  }}
                  className="flex items-center"
                >
                  <CircleCheckBig className="mr-2 h-4 w-4" />
                  Confirmados
                </button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button
                  onClick={() => {
                    column.setFilterValue(undefined)
                    column.setFilterValue(false)
                  }}
                  className="flex items-center"
                >
                  <CircleX className="mr-2 h-4 w-4" />
                  No confirmados
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
      const isConfirmed = row.getValue('isConfirmed')
      const text = isConfirmed ? 'Confirmado' : 'Sin confirmar'
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
      return (
        <section className="flex items-center justify-center">
          <ActionsButtons user={user} />
        </section>
      )
    }
  }
]

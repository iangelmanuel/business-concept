/* eslint-disable indent */

'use client'

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState
} from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  buttonVariants
} from '@/components'
import type { UserType } from '@/types'
import { useState, useTransition } from 'react'
import { deleteManyUsers } from '@/actions'
import { toast } from 'sonner'

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [selectStatus, setSelectStatus] = useState('all')
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const [isPending, startTransition] = useTransition()

  const isDeleteVisible = Object.keys(rowSelection).length > 0

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filtrar todo..."
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) => {
            setSelectStatus('all')
            table.getColumn('status')?.setFilterValue(undefined)
            table.getColumn('email')?.setFilterValue(event.target.value)
          }}
          className="max-w-sm"
        />

        <Select
          value={selectStatus}
          onValueChange={(value) => {
            if (value === 'all') {
              table.getColumn('isUserDeleted')?.setFilterValue(undefined)
              setSelectStatus('all')
              return
            }
            setSelectStatus(value)
            const isUserDeleted = value === 'true'
            table.getColumn('isUserDeleted')?.setFilterValue(isUserDeleted)
          }}
        >
          <SelectTrigger className="ml-2 w-[180px]">
            <SelectValue placeholder="Status - All" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Estado de Cuenta</SelectLabel>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="false">Activos</SelectItem>
              <SelectItem value="true">Eliminados</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {isDeleteVisible && (
          <>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  disabled={isPending}
                  className="ml-2"
                >
                  Eliminar Seleccionados
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    ¿Estás seguro que quieres eliminar los usuarios
                    seleccionados?
                  </AlertDialogTitle>

                  <AlertDialogDescription>
                    Esta acción no se puede deshacer y eliminará permanentemente
                    los usuarios seleccionados.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>

                  <AlertDialogAction
                    onClick={() => {
                      const usersIds = table
                        .getSelectedRowModel()
                        .rows.map((row) => {
                          const user = row.original as UserType
                          const { id } = user
                          return id
                        })

                      startTransition(async () => {
                        const response = await deleteManyUsers(usersIds)
                        if (response.ok) {
                          toast.success(response.message, {
                            duration: 3000,
                            position: 'top-right'
                          })
                          setRowSelection({})
                        } else {
                          toast.error(response.message, {
                            duration: 3000,
                            position: 'top-right'
                          })
                        }
                      })
                    }}
                    className={buttonVariants({ variant: 'destructive' })}
                  >
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto"
            >
              Columnas
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .filter((column) => column.id !== 'actions')
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No se encontraron usuarios.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="mx-2 flex items-center justify-between space-y-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} de{' '}
            {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Siguiente
            </Button>
          </div>
        </div>

        <Select onValueChange={(value) => table.setPageSize(Number(value))}>
          <SelectTrigger className="m-2 w-[180px]">
            <SelectValue placeholder="10 Usuarios" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Usuarios por páginas</SelectLabel>
              <SelectItem value="10">10 Usuarios</SelectItem>
              <SelectItem value="20">20 Usuarios</SelectItem>
              <SelectItem value="30">30 Usuarios</SelectItem>
              <SelectItem value="50">50 Usuarios</SelectItem>
              <SelectItem value="100">100 Usuarios</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  )
}

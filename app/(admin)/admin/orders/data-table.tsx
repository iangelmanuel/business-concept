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
import React, { useState, useTransition } from 'react'
import { deleteManyOrders } from '@/actions'
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
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  buttonVariants
} from '@/components'
import type { UserOrderByAdmin } from '@/types'
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
          placeholder="Filtrar por correo..."
          value={
            (table.getColumn('user.email')?.getFilterValue() as string) ?? ''
          }
          onChange={(e) => {
            setSelectStatus('all')
            const value = e.target.value
            table.getColumn('user.email')?.setFilterValue(value)
          }}
          className="max-w-sm"
        />

        <Select
          value={selectStatus}
          onValueChange={(value) => {
            if (value === 'all') {
              table.getColumn('orderStatus')?.setFilterValue(undefined)
              setSelectStatus('all')
              return
            }
            setSelectStatus(value)
            table.getColumn('orderStatus')?.setFilterValue(value)
          }}
        >
          <SelectTrigger className="ml-2 w-[180px]">
            <SelectValue placeholder="Status - All" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Estado de la Orden</SelectLabel>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="delivered">Entregados</SelectItem>
              <SelectItem value="shipped">Enviados</SelectItem>
              <SelectItem value="approved">Aprobados</SelectItem>
              <SelectItem value="pending">Pendientes</SelectItem>
              <SelectItem value="cancelled">Cancelados</SelectItem>
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
                  {isPending ? (
                    <>
                      Eliminando
                      <Spinner />
                    </>
                  ) : (
                    'Eliminar'
                  )}
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    ¿Estás seguro que quieres eliminar las ordenes
                    seleccionados?
                  </AlertDialogTitle>

                  <AlertDialogDescription>
                    Esta acción no se puede deshacer y eliminará permanentemente
                    las ordenes seleccionadas.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>

                  <AlertDialogAction
                    onClick={() => {
                      const ordersId = table
                        .getSelectedRowModel()
                        .rows.map((row) => {
                          const order = row.original as UserOrderByAdmin
                          const { id } = order
                          return id
                        })

                      startTransition(async () => {
                        const response = await deleteManyOrders(ordersId)
                        if (response.ok) {
                          toast.success('¡Todo salió bien!', {
                            description: response.message,
                            duration: 3000,
                            position: 'top-right'
                          })
                          setRowSelection({})
                        } else {
                          toast.error('Ocurrio un problema', {
                            description: response.message,
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
                  No se encontraron ordenes.
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
            <SelectValue placeholder="10 Ordenes" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Ordenes por páginas</SelectLabel>
              <SelectItem value="10">10 Ordenes</SelectItem>
              <SelectItem value="20">20 Ordenes</SelectItem>
              <SelectItem value="30">30 Ordenes</SelectItem>
              <SelectItem value="50">50 Ordenes</SelectItem>
              <SelectItem value="100">100 Ordenes</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  )
}

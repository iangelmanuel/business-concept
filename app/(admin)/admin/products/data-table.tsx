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
import { useState, useTransition } from 'react'
import { deleteManyProducts } from '@/actions'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import type { ProductAllType } from '@/types'
import { ChevronLeft, ChevronRight, Settings2 } from 'lucide-react'
import { toast } from 'sonner'
import { AddProductsDiscount } from './ui/add-products-discount'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const [isPending, startTransition] = useTransition()

  const isDeleteOrDiscountVisible = Object.keys(rowSelection).length > 0

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

  const productsIds = table.getSelectedRowModel().rows.map((row) => {
    const product = row.original as ProductAllType
    const { id } = product
    return id
  })

  return (
    <>
      <section className="flex items-center justify-between py-4">
        <Input
          placeholder="Filtrar por nombre de producto"
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(e) => {
            const value = e.target.value
            table.getColumn('name')?.setFilterValue(value)
          }}
          className="max-w-sm"
        />

        {isDeleteOrDiscountVisible && (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="ml-2">Añadir descuentos</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[450px]">
                <DialogHeader>
                  <DialogTitle>
                    Añade descuentos a multiples productos
                  </DialogTitle>
                  <DialogDescription>
                    Aquí puedes agregar descuentos a múltiples productos
                    seleccionados. Ingresa el porcentaje de descuento y haz clic
                    en &quot;Guardar cambios&quot; para aplicar los descuentos.
                  </DialogDescription>
                </DialogHeader>
                {/* Formulario para añadir descuentos a multiples productos */}
                <AddProductsDiscount
                  productsIds={productsIds}
                  table={table}
                />
              </DialogContent>
            </Dialog>

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
                    ¿Estás seguro que quieres eliminar los productos
                    seleccionados?
                  </AlertDialogTitle>

                  <AlertDialogDescription>
                    Esta acción no se puede deshacer y eliminará permanentemente
                    los usuarios seleccionados.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>

                  <AlertDialogAction
                    onClick={() => {
                      startTransition(async () => {
                        const response = await deleteManyProducts(productsIds)
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
              className="ml-auto flex items-center gap-x-1"
            >
              <Settings2 size={16} />
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
      </section>

      <section className="rounded-md border">
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
                  No se encontraron productos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>

      <section className="flex flex-col items-center justify-between py-4 sm:flex-row">
        <div className="flex items-center justify-between">
          <section className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} de{' '}
            {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
          </section>
        </div>

        <div className="mt-10 flex items-center justify-end gap-x-10 sm:mt-0">
          <section className="flex flex-col items-center gap-x-2 sm:flex-row">
            <span className="text-center text-sm text-muted-foreground sm:text-start">
              Filas por página
            </span>
            <Select onValueChange={(value) => table.setPageSize(Number(value))}>
              <SelectTrigger className="ml-2 w-[70px]">
                <SelectValue placeholder="10" />
              </SelectTrigger>

              <SelectContent align="center">
                <SelectGroup>
                  <SelectLabel>Usuarios por páginas</SelectLabel>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </section>

          <section>
            <span className="text-center text-sm text-muted-foreground sm:text-start">
              Página {table.getState().pagination.pageIndex + 1} de{' '}
              {table.getPageCount()}
            </span>
          </section>

          <section className="flex gap-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight size={16} />
            </Button>
          </section>
        </div>
      </section>
    </>
  )
}

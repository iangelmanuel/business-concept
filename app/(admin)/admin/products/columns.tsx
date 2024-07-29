"use client"

import type { ColumnDef, SortDirection } from "@tanstack/react-table"
import Image from "next/image"
import Link from "next/link"
import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardHeader,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  PriceWithPosibleDiscount
} from "@/components"
import { titleFont } from "@/config"
import { data } from "@/data"
import type { ProductAllType } from "@/types"
import { formatCurrency } from "@/utils"
import {
  BadgeDollarSign,
  BadgePercent,
  ChevronDownIcon,
  ChevronUp,
  ChevronUpIcon,
  ChevronsUpDown,
  EyeOff,
  Headphones,
  Package
} from "lucide-react"
import { ActionsButtons } from "./ui/actions-buttons"
import { ImageCarousel } from "./ui/image-carousel"

const SorterIcon = ({ isSorted }: { isSorted: false | SortDirection }) => {
  if (!isSorted) {
    return <ChevronsUpDown className="h-4 w-4" />
  }
  if (isSorted === "asc") {
    return <ChevronUpIcon className="h-4 w-4" />
  }
  if (isSorted === "desc") {
    return <ChevronDownIcon className="h-4 w-4" />
  }
  return null
}

export const columns: ColumnDef<ProductAllType>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
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
    accessorKey: "image",
    id: "image",
    accessorFn: (row) => row.productImage,
    header: () => {
      return (
        <section className="flex items-center justify-center">
          <span>Imagen</span>
        </section>
      )
    },
    cell: ({ row }) => {
      const product = row.original
      const images = row.getValue("image") as ProductAllType["productImage"]
      return (
        <ImageCarousel
          images={images}
          productName={product.name}
        />
      )
    }
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <section className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-x-1"
              >
                Nombre del producto
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
                  <EyeOff className="mr-2 h-3 w-3" />
                  Ocultar
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      )
    },
    cell: ({ row }) => {
      const name = row.getValue("name") as string
      const slug = row.original.slug
      const product = row.original

      return (
        <section className="flex items-center justify-center">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Link
                href={`/shop/product/${slug}`}
                className="hover:underline"
              >
                {name}
              </Link>
            </HoverCardTrigger>

            <HoverCardContent className="w-80">
              <section className="mx-auto flex flex-col items-center justify-center gap-y-2">
                <article className="flex justify-center">
                  <Image
                    src={product.productImage[0].url}
                    alt={`imagen de ${product.name}`}
                    width={150}
                    height={150}
                  />
                </article>

                <Card className="mx-auto w-full">
                  <CardHeader>
                    <article className="flex items-center justify-between">
                      <section>
                        <h4
                          className={`${titleFont.className} text-xs font-bold`}
                        >
                          {product.name}
                        </h4>
                      </section>

                      <section>
                        <p
                          className={`${titleFont.className} text-xs font-extrabold`}
                        >
                          {formatCurrency(product.price)}
                        </p>
                      </section>
                    </article>

                    <article className="flex items-center justify-between">
                      <section className="flex items-center justify-start gap-2">
                        <Package size={16} />
                        <span>{product.stock}</span>
                      </section>
                      <section className="flex items-center justify-end gap-2">
                        <Headphones size={16} />
                        <span className="text-xs capitalize">
                          {product.category.name}
                        </span>
                      </section>
                    </article>

                    <CardDescription className="mt-3 text-xs">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </section>
            </HoverCardContent>
          </HoverCard>
        </section>
      )
    }
  },

  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <section className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-x-1"
              >
                Disponibilidad
                <SorterIcon isSorted={column.getIsSorted()} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center">
              <DropdownMenuItem>
                <button
                  onClick={() => column.toggleSorting(false)}
                  className="flex items-center"
                >
                  <ChevronUpIcon className="mr-2 h-4 w-4" />
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
      const stock = row.getValue("stock") as number
      const isInStock = stock === 0

      return (
        <section className="flex items-center justify-center">
          {isInStock ? (
            <Badge
              variant="destructive"
              className="capitalize"
            >
              Agotado
            </Badge>
          ) : (
            <span>{stock}</span>
          )}
        </section>
      )
    }
  },

  {
    accessorKey: "price",
    header: () => {
      return (
        <section className="flex items-center justify-center">
          <span>Precio</span>
        </section>
      )
    },
    cell: ({ row }) => {
      const price = row.getValue("price") as number
      const formattedPrice = formatCurrency(price)
      return (
        <section className="flex items-center justify-center">
          <span>{formattedPrice}</span>
        </section>
      )
    }
  },

  {
    accessorKey: "discount",
    header: ({ column }) => {
      return (
        <section className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-x-1"
              >
                Descuento
                <SorterIcon isSorted={column.getIsSorted()} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center">
              <DropdownMenuItem>
                <button
                  onClick={() => column.toggleSorting(false)}
                  className="flex items-center"
                >
                  <BadgePercent className="mr-2 h-4 w-4" />
                  Con descuento
                </button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button
                  onClick={() => column.toggleSorting(true)}
                  className="flex items-center"
                >
                  <BadgeDollarSign className="mr-2 h-4 w-4" />
                  Sin descuento
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
      const discount = row.getValue("discount") as number
      const price = row.original.price

      return (
        <section className="flex flex-col items-center justify-center">
          <PriceWithPosibleDiscount
            price={price}
            discount={discount}
            isAdmin
          />
        </section>
      )
    }
  },

  {
    accessorKey: "category",
    id: "category",
    accessorFn: (row) => row.category.name,
    header: ({ column }) => {
      const { categories } = data

      return (
        <section className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-x-1"
              >
                Categoria
                <SorterIcon isSorted={column.getIsSorted()} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center">
              <DropdownMenuItem>
                <button
                  onClick={() => {
                    column.setFilterValue(undefined)
                  }}
                  className="flex items-center"
                >
                  <Package className="mr-2 h-4 w-4" />
                  <span className="capitalize">Todos</span>
                </button>
              </DropdownMenuItem>

              {categories.map((category) => (
                <DropdownMenuItem key={category}>
                  <button
                    onClick={() => column.setFilterValue(category)}
                    className="flex items-center"
                  >
                    <Headphones className="mr-2 h-4 w-4" />
                    <span className="capitalize">{category}</span>
                  </button>
                </DropdownMenuItem>
              ))}

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
      const cateogories = row.getValue("category") as string

      return (
        <section className="flex items-center justify-center">
          <Badge
            variant="outline"
            className="capitalize"
          >
            {cateogories}
          </Badge>
        </section>
      )
    }
  },

  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const product = row.original
      return (
        <section className="flex items-center justify-center">
          <ActionsButtons product={product} />
        </section>
      )
    }
  }
]

"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { getCategories } from "@/actions"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components"
import { navigationItems } from "@/data"
import { cn } from "@/lib"
import type { CategoryType } from "@/types"

export function TopMenuNavigation() {
  const [categories, setCategories] = useState<CategoryType[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories()
      setCategories([...categories])
    }
    fetchCategories()
  }, [])
  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Menu de Navegación</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium">
                      Business Concept
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Concepto de modelo de negocio ecommerce para empresas que
                      esten interesadas en las ventas online.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              {navigationItems.map((item) => (
                <ListItem
                  key={item.label}
                  href={item.href}
                  title={item.label}
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categorias</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {categories.map((category) => (
                <ListItem
                  key={category.id}
                  capitalize
                  title={category.name}
                  href={`/shop/products/category/${category.name}`}
                >
                  lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates voluptatum nisi velit, modi quod nesciunt eligendi
                  molestiae sit accusamus ut.
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href="/shop/products"
            passHref
            className={navigationMenuTriggerStyle()}
          >
            Nuestra Tienda
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  capitalize?: boolean
}

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, href, capitalize = false, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            href={href ?? "/"}
            passHref
            ref={ref}
            className={cn(
              "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none",
              className,
              capitalize && "capitalize"
            )}
            {...props}
          >
            <div className="text-sm leading-none font-medium">
              <span className={cn(capitalize ? "capitalize" : "")}>
                {title}
              </span>
            </div>
            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = "ListItem"

"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { navigationItems } from "@/data"
import { MenuSquare } from "lucide-react"

export const DropdownPhoneNavigation = () => {
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="block lg:hidden"
      >
        <Button variant="ghost">
          <MenuSquare className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Navegación</DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navigationItems.map((item) => (
            <DropdownMenuItem
              key={item.href}
              onClick={() => router.push(item.href)}
            >
              {item.icon}
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

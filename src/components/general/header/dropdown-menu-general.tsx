'use client'

import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components'
import { notUserNavigation } from '@/data'
import { Laptop2Icon, MenuIcon, Moon, Palette, Sun } from 'lucide-react'

export const DropdownMenuGeneral = () => {
  const { setTheme } = useTheme()
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MenuIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {notUserNavigation.map((item) => (
            <DropdownMenuItem
              key={item.href}
              onClick={() => router.push(item.href)}
            >
              {item.icon}
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Palette className="mr-2 h-4 w-4" />
              <span>Tema</span>
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  <Laptop2Icon className="mr-2 h-4 w-4" />
                  <span>Sistema</span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setTheme('ligth')}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Claro</span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Oscuro</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

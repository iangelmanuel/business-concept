'use client'

import { useTransition } from 'react'
import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { logoutUser } from '@/actions'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
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
import { dropdownAdmin, dropdownUser } from '@/data'
import { getLettersName } from '@/utils'
import { Laptop2Icon, LogOut, Moon, Palette, Sun } from 'lucide-react'

export const DropdownMenuAdmin = () => {
  const [isPending, startTransition] = useTransition()
  const { data: session } = useSession()
  const { setTheme } = useTheme()

  const router = useRouter()

  const user = session!.user

  const handleLogout = () => {
    startTransition(async () => {
      if (session) {
        await logoutUser()
        window.location.reload()
      }
    })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Avatar>
            <AvatarImage
              src="/images/avatar.jpg"
              alt="avatar"
            />
            <AvatarFallback>
              {getLettersName(user.name, user.lastname)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Admin Session</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {dropdownAdmin.map((item) => (
            <DropdownMenuItem
              key={item.href}
              onClick={() => router.push(item.href)}
            >
              {item.icon}
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          {dropdownUser.map((item) => (
            <DropdownMenuItem
              key={item.href}
              onClick={() => router.push(item.href)}
            >
              {item.icon}
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

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

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={isPending}
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

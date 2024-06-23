'use client'

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
import { getLettersName } from '@/utils'
import {
  CreditCard,
  Laptop2Icon,
  LockIcon,
  LogOut,
  Moon,
  Palette,
  ShoppingBagIcon,
  Sun,
  User
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { useTransition } from 'react'

export const DropdownMenuUser = () => {
  const [isPending, startTransition] = useTransition()
  const { data: session } = useSession()
  const { setTheme } = useTheme()

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
              src={user.avatar!}
              alt={`${user?.name} avatar`}
            />
            <AvatarFallback>
              {getLettersName(user.name, user.lastname)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <ShoppingBagIcon className="mr-2 h-4 w-4" />
            <span>Mis Compras</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Métodos de Pago</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <LockIcon className="mr-2 h-4 w-4" />
            <span>Segurdad y Privacidad</span>
          </DropdownMenuItem>
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

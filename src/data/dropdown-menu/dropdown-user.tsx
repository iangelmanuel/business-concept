import {
  BookUserIcon,
  // CreditCard,
  LockIcon,
  ShoppingBagIcon,
  User
} from 'lucide-react'

export const dropdownUser = [
  {
    label: 'Cuenta',
    href: '/dashboard/profile',
    icon: <User className="mr-2 h-4 w-4" />
  },
  {
    label: 'Mis Compras',
    href: '/dashboard/purchases',
    icon: <ShoppingBagIcon className="mr-2 h-4 w-4" />
  },
  {
    label: 'Mis direcciones',
    href: '/dashboard/addresses',
    icon: <BookUserIcon className="mr-2 h-4 w-4" />
  },
  // {
  //   label: 'Métodos de Pago',
  //   href: '/dashboard/payment-methods',
  //   icon: <CreditCard className="mr-2 h-4 w-4" />
  // },
  {
    label: 'Seguridad y Privacidad',
    href: '/dashboard/security-privacy',
    icon: <LockIcon className="mr-2 h-4 w-4" />
  }
]

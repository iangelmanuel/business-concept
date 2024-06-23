import type { NavigationItem } from '@/types'
import { HomeIcon, MailIcon, Package2, PersonStanding } from 'lucide-react'

export const navigationItems: NavigationItem[] = [
  {
    label: 'Inicio',
    href: '/',
    description: 'Página principal',
    icon: <HomeIcon />
  },
  {
    label: 'Nosotros',
    href: '/about-us',
    description: 'Conoce más sobre nosotros',
    icon: <PersonStanding />
  },
  {
    label: 'Contacto',
    href: '/contact',
    description: 'Contáctanos',
    icon: <MailIcon />
  },
  {
    label: 'Productos',
    href: '/shop/products',
    description: 'Explora nuestros productos',
    icon: <Package2 />
  }
]

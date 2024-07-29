import type { NavigationItem } from "@/types"
import { HomeIcon, MailIcon, PersonStanding } from "lucide-react"

export const navigationItems: NavigationItem[] = [
  {
    label: "Inicio",
    href: "/",
    description: "Página principal",
    icon: <HomeIcon className="mr-2 h-4 w-4" />
  },
  {
    label: "Nosotros",
    href: "/about-us",
    description: "Conoce más sobre nosotros",
    icon: <PersonStanding className="mr-2 h-4 w-4" />
  },
  {
    label: "Contacto",
    href: "/contact",
    description: "Contáctanos",
    icon: <MailIcon className="mr-2 h-4 w-4" />
  }
  // {
  //   label: 'Productos',
  //   href: '/shop/products',
  //   description: 'Explora nuestros productos',
  //   icon: <Package2 className="mr-2 h-4 w-4" />
  // }
]

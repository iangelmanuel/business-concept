import {
  Contact,
  FileAudio2,
  Headphones,
  Package,
  ShieldCheck,
  User
} from "lucide-react"

export const adminNavigation = [
  {
    label: "Admin",
    href: "/admin/profile",
    icon: <ShieldCheck className="mr-2 h-4 w-4" />
  },
  {
    label: "Usuarios",
    href: "/admin/users",
    icon: <User className="mr-2 h-4 w-4" />
  },
  {
    label: "Pedidos",
    href: "/admin/orders",
    icon: <Package className="mr-2 h-4 w-4" />
  },
  {
    label: "Productos",
    href: "/admin/products",
    icon: <Headphones className="mr-2 h-4 w-4" />
  },
  {
    label: "Productos archivados",
    href: "/admin/products-archived",
    icon: <FileAudio2 className="mr-2 h-4 w-4" />
  },
  {
    label: "Contanctos",
    href: "/admin/contacts",
    icon: <Contact className="mr-2 h-4 w-4" />
  }
]

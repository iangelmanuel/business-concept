import { User, UserRoundPlus } from "lucide-react"

export const notUserNavigation = [
  {
    label: "Iniciar Sesión",
    href: "/auth/login",
    icon: <User className="mr-2 h-4 w-4" />
  },
  {
    label: "Registrarse",
    href: "/auth/register",
    icon: <UserRoundPlus className="mr-2 h-4 w-4" />
  }
]

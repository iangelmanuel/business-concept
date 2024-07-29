import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getUserById } from "@/actions"
import { auth } from "@/auth.config"
import { UpdateUserForm } from "@/components"
import { titleFont } from "@/config"

export const metadata: Metadata = {
  title: "Perfil - Business Concept",
  description:
    "Actualiza tu información personal para que podamos enviarte tus compras.",
  keywords:
    "perfil, actualizar, información, personal, compras, dirección de envío",
  robots: "noindex, nofollow"
}

export default async function ProfilePage() {
  const session = await auth()
  if (!session) return redirect("/auth/login")

  const userIdSession = session?.user.id
  const user = await getUserById(userIdSession)
  if (!user) return redirect("/auth/login")

  return (
    <article>
      <h1 className={`${titleFont.className} text-2xl font-bold`}>
        Cuenta de {user.name} {user.lastname}
      </h1>

      <UpdateUserForm user={user} />
    </article>
  )
}

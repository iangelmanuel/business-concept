import type { Metadata } from "next"
import { getSpecificsOrderDatas, getSpecificsUserDatas } from "@/actions"
import {
  GeneralFinanceCards,
  OrderWithApproveStatus,
  PrincipalContent
} from "@/components"

export const metadata: Metadata = {
  title: "Admin Perfil - Business Concept",
  description: "Administrador de la tienda en línea Business Concept"
}

export default async function ProfilePage() {
  const data = await getSpecificsOrderDatas()
  const userData = await getSpecificsUserDatas()

  return (
    <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <GeneralFinanceCards
        data={data}
        userId={userData}
      />
      <PrincipalContent data={data} />
      <OrderWithApproveStatus data={data} />
    </section>
  )
}

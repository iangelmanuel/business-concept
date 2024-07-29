import { redirect } from "next/navigation"

export default function InvoicePage() {
  return redirect("/admin/orders")
}

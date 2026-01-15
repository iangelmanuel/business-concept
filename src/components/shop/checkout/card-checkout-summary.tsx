"use client"

import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { placeOrder } from "@/actions/order/place-order"
import { Spinner } from "@/components/general/spinner/spinner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader
} from "@/components/ui/card"
import { titleFont } from "@/config"
import { useAddressStore, useCartStore } from "@/store"
import { formatCurrency } from "@/utils"
import { toast } from "sonner"
import { CardSummaryLoading } from "./card-summary-loading"

export const CardCheckoutSummary = () => {
  const [loading, setLoading] = useState(true)
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const address = useAddressStore((state) => state.address)

  const cart = useCartStore((state) => state.cart)

  const summaryInfo = useCartStore((state) => state.getSummaryInfo)

  const { subTotal, discount, tax, total } = summaryInfo()

  useEffect(() => {
    setLoading(false)
  }, [])

  const handleClickNextStep = () => {
    const productsToOrder = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity
    }))

    startTransition(async () => {
      const response = await placeOrder(productsToOrder, address)
      if (response.ok) {
        toast.success("¡Todo salió bien!", {
          description: response.message,
          duration: 3000,
          position: "top-right"
        })
        if (response.orderId) {
          router.push(`/shop/payment/?orderId=${response.orderId}`)
        }
      } else {
        toast.error("Ocurrio un problema", {
          description: response.message,
          duration: 3000,
          position: "top-right"
        })
      }
    })
  }

  if (loading) return <CardSummaryLoading />

  return (
    <section className="order-1 mt-10 lg:order-2">
      <Card className="md:sticky md:top-0">
        <CardHeader>
          <h2 className={`${titleFont.className} text-2xl font-bold`}>
            Resumen de la compra
          </h2>
          <CardDescription>
            Por favor, revisa los productos seleccionados antes de proceder al
            pago.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <article className="space-y-2">
            <h3 className={`${titleFont.className} mb-3 text-lg font-bold`}>
              Dirección de envío
            </h3>
            <section className="mb-3 text-sm sm:text-base">
              <div className="flex justify-between">
                <p>Recibe:</p>
                <p className="capitalize">
                  {address.firstName} {address.lastName}
                </p>
              </div>

              <div className="flex justify-between">
                <p>Documento:</p>
                <p>
                  {address.typeOfIdentification} {address.identification}
                </p>
              </div>

              <div className="flex justify-between">
                <p>Télefono:</p>
                <p>{address.phone}</p>
              </div>

              <div className="flex justify-between">
                <p>Departamento:</p>
                <p className="capitalize">{address.department}</p>
              </div>

              <div className="flex justify-between">
                <p>Ciudad:</p>
                <p className="capitalize">{address.city}</p>
              </div>

              <div className="flex justify-between">
                <p>Código Postal:</p>
                <p>{address.postalCode}</p>
              </div>

              <div className="flex justify-between">
                <p>Dirección:</p>
                <p>{address.address}</p>
              </div>

              {address.address2 && (
                <div className="flex justify-between">
                  <p>Dirección 2:</p>
                  <p>{address.address2}</p>
                </div>
              )}

              {address.extraData && (
                <div className="flex justify-between">
                  <p>Información adicional:</p>
                  <p>{address.extraData}</p>
                </div>
              )}
            </section>

            <h3 className={`${titleFont.className} mb-3 text-lg font-bold`}>
              Detalles de Precio
            </h3>
            <section className="mb-3 space-y-3 text-sm sm:text-base">
              <div className="flex justify-between">
                <p>Subtotal:</p>
                <p>{formatCurrency(subTotal)}</p>
              </div>

              {discount > 0 && (
                <section className="flex justify-between">
                  <p>Descuento</p>
                  <p>{formatCurrency(discount)}</p>
                </section>
              )}

              <div className="flex justify-between">
                <p>Impuestos:</p>
                <p>{formatCurrency(tax)}</p>
              </div>

              <div className="flex justify-between">
                <p className={`${titleFont.className} font-bold`}>Total:</p>
                <p className={`${titleFont.className} font-bold`}>
                  {formatCurrency(total)}
                </p>
              </div>
            </section>
          </article>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full"
            onClick={handleClickNextStep}
            disabled={isPending}
          >
            {isPending ? (
              <>
                Creando orden
                <Spinner />
              </>
            ) : (
              "Continuar al pago"
            )}
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}

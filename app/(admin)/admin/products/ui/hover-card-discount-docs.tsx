import React from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components"
import { MessageCircleQuestion } from "lucide-react"

export const HoverCardDiscountDocs = () => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button>
          <MessageCircleQuestion size={16} />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-60 space-y-1">
        <h4 className="mb-3 flex items-center justify-between">
          ¿Cómo funciona el descuento?
          <MessageCircleQuestion size={16} />
        </h4>
        <span className="text-muted-foreground block text-xs">
          El descuento debe ser un valor entre 0 y 1
        </span>
        <span className="text-muted-foreground block text-xs">
          1 es sin descuento y entre 0 y 0.99 es con descuento
        </span>
        <span className="text-muted-foreground block text-xs">Ejemplo:</span>
        <span className="text-muted-foreground block text-xs">
          0.25 = 25% de descuento
        </span>
        <span className="text-muted-foreground block text-xs">
          1 = Sin descuento
        </span>
      </HoverCardContent>
    </HoverCard>
  )
}

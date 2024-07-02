'use client'

import {
  Button,
  CartButtons,
  CartSheetItems,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components'
import { titleFont } from '@/config'
import { ShoppingBagIcon } from 'lucide-react'
import { useState } from 'react'

export const SheetMenuCart = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={setIsSheetOpen}
    >
      <SheetTrigger asChild>
        <Button variant="ghost">
          <ShoppingBagIcon size={24} />
        </Button>
      </SheetTrigger>

      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className={titleFont.className}>
            Carrito de Compras
          </SheetTitle>
          <SheetDescription>
            Añade productos de tu interes a tu carrito de compras
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <CartSheetItems />
        </div>
        <SheetFooter>
          <SheetClose
            asChild
            className="flex items-center justify-center"
          >
            <CartButtons setIsSheetOpen={setIsSheetOpen} />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

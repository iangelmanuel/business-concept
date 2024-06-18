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
import { ShoppingCart } from 'lucide-react'

export const SheetMenuCart = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <ShoppingCart size={24} />
        </Button>
      </SheetTrigger>

      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Carrito de Compras</SheetTitle>
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
            className="flex justify-center items-center"
          >
            <CartButtons />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

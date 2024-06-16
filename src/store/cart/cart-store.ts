import type { Cart } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  cart: Cart[]
  getTotalItems: () => number
  getSummaryInfo: () => {
    subTotal: number
    tax: number
    total: number
    itemsInCart: number
  }
  addProductToCart: (product: Cart) => void
  updateProductInCart: (product: Cart, quantity: number) => void
  removeProductFromCart: (product: Cart) => void

  clearCart: () => void
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () => {
        const { cart } = get()
        return cart.reduce((total, item) => total + item.quantity, 0)
      },

      getSummaryInfo: () => {
        const { cart } = get()

        const subTotal = cart.reduce(
          (subtotal, product) => product.quantity * product.price + subtotal,
          0
        )

        const tax = subTotal * 0.15
        const total = subTotal + tax
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        )
        return { subTotal, tax, total, itemsInCart }
      },

      addProductToCart: (product: Cart) => {
        const { cart } = get()

        const productInCart = cart.some((item) => item.id === product.id)

        if (!productInCart) {
          set({ cart: [...cart, product] })
          return
        }

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + product.quantity }
          }
          return item
        })
        set({ cart: updatedCartProducts })
      },

      updateProductInCart: (product: Cart, quantity: Cart['quantity']) => {
        const { cart } = get()

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity }
          }
          return item
        })
        set({ cart: updatedCartProducts })
      },

      removeProductFromCart: (product: Cart) => {
        const { cart } = get()

        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id
        )
        set({ cart: updatedCartProducts })
      },

      clearCart: () => {
        set({ cart: [] })
      }
    }),
    { name: 'shopping-cart' }
  )
)

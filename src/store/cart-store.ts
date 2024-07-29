import type { CartType } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type State = {
  cart: CartType[]
  getTotalItems: () => number
  getSummaryInfo: () => {
    subTotal: number
    tax: number
    discount: number
    total: number
    itemsInCart: number
  }
  addProductToCart: (product: CartType) => void
  updateProductInCart: (product: CartType, quantity: number) => void
  removeProductFromCart: (product: CartType) => void

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
          (acc, product) => product.quantity * product.price + acc,
          0
        )

        const discount = cart.reduce((acc, product) => {
          if (product.discount !== 1) {
            const discount = product.discount * product.price
            return discount * product.quantity + acc
          }
          return acc
        }, 0)

        const tax = subTotal * 0.035
        const total = subTotal - discount + tax
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        )
        return { subTotal, discount, tax, total, itemsInCart }
      },

      addProductToCart: (product: CartType) => {
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

      updateProductInCart: (
        product: CartType,
        quantity: CartType["quantity"]
      ) => {
        const { cart } = get()

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity }
          }
          return item
        })
        set({ cart: updatedCartProducts })
      },

      removeProductFromCart: (product: CartType) => {
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
    { name: "shopping-cart" }
  )
)

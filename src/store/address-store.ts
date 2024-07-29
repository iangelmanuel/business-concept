import type { AddressForm } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type State = {
  address: AddressForm
  setAddress: (address: AddressForm) => void
  clearAddress: () => void
}

export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      address: {} as AddressForm,

      setAddress: (address) => {
        set({ address })
      },

      clearAddress: () => {
        set({ address: {} as AddressForm })
      }
    }),
    {
      name: "address-storage"
    }
  )
)

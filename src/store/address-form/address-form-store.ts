import { create } from 'zustand'

type State = {
  isAddressFormActive: boolean
  toggleAddressForm: () => void
}

export const useAddressFormStore = create<State>()((set) => ({
  isAddressFormActive: false,

  toggleAddressForm: () => {
    set((state) => ({ isAddressFormActive: !state.isAddressFormActive }))
  }
}))

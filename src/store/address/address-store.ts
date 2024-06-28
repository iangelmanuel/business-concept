import type { AddressForm } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  address: AddressForm
  setAddress: (address: AddressForm) => void
}

export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      address: {
        firstName: '',
        lastName: '',
        city: '',
        typeOfIdentification: '' as AddressForm['typeOfIdentification'],
        identification: '',
        phone: '',
        address: '',
        address2: '',
        postalCode: '',
        department: '',
        extraData: ''
      },

      setAddress: (address) => {
        set({ address })
      }
    }),
    {
      name: 'address-storage'
    }
  )
)

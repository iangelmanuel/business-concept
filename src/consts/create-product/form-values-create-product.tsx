import type { ProductCreateForm } from '@/types'

export const formValuesCreateProduct: ProductCreateForm = {
  name: '',
  description: '',
  price: 0,
  discount: 1,
  stock: 0,
  category: {
    id: '',
    name: ''
  },
  images: []
}

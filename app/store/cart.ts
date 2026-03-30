import { atom } from 'jotai'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export const cartAtom = atom<CartItem[]>([])
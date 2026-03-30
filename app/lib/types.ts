export type Product = {
  id: string
  name: string
  price: number
}

export type CartItem = Product & {
  quantity: number
}

export type Order = {
  id: string
  deviceId: string
  items: CartItem[]
  total: number
  createdAt: string
}
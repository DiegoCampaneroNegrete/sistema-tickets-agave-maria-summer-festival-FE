export type Order = {
  id: string
  items: CartItem[]
  total: number
  createdAt: string
}


 export type Product = {
  id: string
  name: string
  price: number
}

export type CartItem = Product & {
  quantity: number
}
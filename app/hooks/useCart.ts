/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAtom } from 'jotai'
import { cartAtom } from '@/store/cart'

export function useCart() {
  const [cart, setCart] = useAtom(cartAtom)

  const addToCart = (product: any) => {
    const exists = cart.find((p: any) => p.id === product.id)
    if (exists) {
      setCart(cart.map((p: any) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item: any) => item.id !== id))
  }

  const clearCart = () => setCart([])

  const total = cart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    total
  }
}

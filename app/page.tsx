/* eslint-disable @typescript-eslint/no-explicit-any */
// 🧾 Agave Maria POS - Starter (Next.js + React + Tailwind + Jotai + Dexie)
// This is a simplified single-file starter to show structure.
// In real project, split into folders.

'use client'

import { useState } from 'react'
import { atom, useAtom } from 'jotai'
import Dexie from 'dexie'

// -------------------- DB --------------------
class POSDB extends Dexie {
  orders: any
  constructor() {
    super('AgaveMariaPOS')
    this.version(1).stores({
      orders: 'id, createdAt'
    })
  }
}

export const db = new POSDB()

// -------------------- TYPES --------------------
type Product = {
  id: string
  name: string
  price: number
}

type CartItem = Product & {
  quantity: number
}

// -------------------- STATE --------------------
const cartAtom = atom<CartItem[]>([])

// -------------------- MOCK PRODUCTS --------------------
const PRODUCTS: Product[] = [
  { id: '1', name: 'Pulque Piña', price: 50 },
  { id: '2', name: 'Pulque Fresa', price: 50 },
  { id: '3', name: 'Pócima', price: 70 },
  { id: '4', name: 'Tejuichela', price: 80 }
]

// -------------------- COMPONENT --------------------
export default function POSPage() {
  const [cart, setCart] = useAtom(cartAtom)

  const addToCart = (product: Product) => {
    const exists = cart.find(p => p.id === product.id)

    if (exists) {
      setCart(cart.map(p =>
        p.id === product.id
          ? { ...p, quantity: p.quantity + 1 }
          : p
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleCheckout = async () => {
    const order = {
      // eslint-disable-next-line react-hooks/purity
      id: Math.random().toString(36).substring(2, 8).toUpperCase(),
      items: cart,
      total,
      createdAt: new Date().toISOString()
    }

    await db.table('orders').add(order)

    printTicket(order)

    setCart([])
  }

  const printTicket = (order: any) => {
    const printWindow = window.open('', '', 'width=300,height=600')

    if (!printWindow) return

    const content = `
      <html>
        <head>
          <style>
            body { font-family: monospace; padding: 10px }
            .ticket { margin-bottom: 20px }
          </style>
        </head>
        <body>
          ${renderTicketHTML(order)}
          <hr />
          ${renderTicketHTML(order)}
          <script>
            window.print();
            window.close();
          </script>
        </body>
      </html>
    `

    printWindow.document.write(content)
    printWindow.document.close()
  }

  const renderTicketHTML = (order: any) => {
    return `
      <div class="ticket">
        <h2>Agave Maria 🍹</h2>
        <p>ID: ${order.id}</p>
        <p>${new Date(order.createdAt).toLocaleString()}</p>
        <hr />
        ${order.items.map((i: any) => `
          <div>${i.quantity} x ${i.name} - $${i.price}</div>
        `).join('')}
        <hr />
        <h3>Total: $${order.total}</h3>
      </div>
    `
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Agave Maria POS</h1>

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {PRODUCTS.map(product => (
          <button
            key={product.id}
            onClick={() => addToCart(product)}
            className="p-4 bg-green-500 text-white rounded-xl"
          >
            {product.name}\n${product.price}
          </button>
        ))}
      </div>

      {/* CART */}
      <div className="mb-4">
        <h2 className="font-bold">Carrito</h2>
        {cart.map(item => (
          <div key={item.id} className="flex justify-between">
            <span>{item.quantity} x {item.name}</span>
            <span>${item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="flex justify-between font-bold text-lg mb-4">
        <span>Total</span>
        <span>${total}</span>
      </div>

      {/* CHECKOUT */}
      <button
        onClick={handleCheckout}
        className="w-full p-4 bg-black text-white rounded-xl"
      >
        COBRAR
      </button>
    </div>
  )
}

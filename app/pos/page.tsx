/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { LABELS } from "@/utils/constants";

import { useCart } from "@/hooks/useCart";
import { useOrders } from "@/hooks/useOrders";
import { Order } from "@/lib/types";
import { usePrinter } from '@/hooks/usePrinter'

const PRODUCTS = [
  { id: "1", name: "Pulque Piña", price: 50 },
  { id: "2", name: "Pulque Fresa", price: 50 },
  { id: "3", name: "Pócima", price: 70 },
  { id: "4", name: "Tejuichela", price: 80 },
];

export default function POSPage() {
    const { print } = usePrinter({
  width: '58mm',
  copies: 2,
  businessName: 'Agave Maria 🍹'
})
  const { cart, addToCart, removeFromCart, total, clearCart } = useCart();
  console.log('Cart:', cart);
  const { createOrder } = useOrders();

  const handleCheckout = async () => {
    if (!cart.length) return;

    const order = {
      id: Math.random().toString(36).substring(2, 8),
      items: cart,
      total,
      createdAt: new Date().toISOString(),
    };

    await createOrder(order);
    print(order);
    clearCart();
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {PRODUCTS.map((p) => (
          <button
            key={p.id}
            onClick={() => addToCart(p)}
            className="h-24 rounded-2xl bg-black text-white"
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {cart.map((item: any) => (
          <div key={item.id} className="flex justify-between items-center">
            {item.name} - ${item.price.toFixed(2)} - Qty: {item.quantity}
            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-2 text-red-500"
            >
              {LABELS.remove}
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleCheckout}
        className="w-full h-20 bg-green-600 text-white mt-4"
      >
        {LABELS.checkout}
      </button>
    </>
  );
}

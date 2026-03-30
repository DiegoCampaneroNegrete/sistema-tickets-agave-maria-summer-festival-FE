/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { LABELS } from "@/utils/constants";

import { useCart } from "@/hooks/useCart";
import { useOrders } from "@/hooks/useOrders";
import { useDeviceId } from "@/hooks/useDeviceId";
import { Order } from "@/lib/types";
import { usePrinter } from '@/hooks/usePrinter'
import { generateId } from "@/utils/utils";

const PRODUCTS = [
  { id: "1", name: "Pulque Natural", price: 100 },
  { id: "2", name: "Pulque Curado", price: 120 },
  { id: "3", name: "Pócima", price: 150 },
  { id: "4", name: "Tejuichela", price: 100 },
];

export default function POSPage() {
  const deviceId = useDeviceId()
  const { print } = usePrinter({
    width: '58mm',
    copies: 2,
    businessName: 'Agave Maria 🍹'
  })
  const { cart, addToCart, removeFromCart, total, clearCart } = useCart();
  const { createOrder } = useOrders();

  const handleCheckout = async () => {
    if (!cart.length || !deviceId) return;

    const order: Order = {
      id: generateId(),
      deviceId,
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

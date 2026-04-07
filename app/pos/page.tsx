/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { LABELS } from "@/utils/constants";

import { useCart } from "@/hooks/useCart";
import { useOrders } from "@/hooks/useOrders";
import { useBluetooth } from "@/hooks/useBluetooth";
import { useToast } from "@/hooks/useToast";
import { Order } from "@/lib/types";
import { usePrinter } from '@/hooks/usePrinter'
import { generateId } from "@/utils/utils";
import BluetoothStatus from "@/components/BluetoothStatus";

const PRODUCTS = [
  { id: "1", name: "Pulque Natural", price: 100 },
  { id: "2", name: "Pulque Curado", price: 120 },
  { id: "3", name: "Pócima", price: 150 },
  { id: "4", name: "Tejuichela", price: 100 },
];

export default function POSPage() {
  const { deviceId, isConnected } = useBluetooth()
  const { addToast } = useToast()
  const { print } = usePrinter({
    width: '58mm',
    copies: 2,
    businessName: 'Agave Maria 🍹'
  })
  const { cart, addToCart, removeFromCart, total, clearCart } = useCart();
  const { createOrder } = useOrders();

  const handleCheckout = async () => {
    if (!cart.length) return;

    const order: Order = {
      id: generateId(),
      deviceId: deviceId || generateId(), // Usar ID generado si no hay dispositivo
      items: cart,
      total,
      createdAt: new Date().toISOString(),
    };

    await createOrder(order);
    
    // Solo imprimir si está conectado
    if (isConnected) {
      print(order);
    }
    
    clearCart();
    addToast(`✅ Venta registrada - Total: $${total.toFixed(2)}`, 'success', 3000);
  };

  return (
    <>
      <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <BluetoothStatus />
      </div>

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
        disabled={!cart.length}
        className="w-full h-20 bg-green-600 text-white mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {LABELS.checkout}
      </button>
    </>
  );
}

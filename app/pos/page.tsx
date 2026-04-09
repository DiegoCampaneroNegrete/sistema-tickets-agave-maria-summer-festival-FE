/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { LABELS, PRODUCTS } from "@/utils/constants";

import { useCart } from "@/hooks/useCart";
import { useOrders } from "@/hooks/useOrders";
import { useBluetooth } from "@/hooks/useBluetooth";
import { useToast } from "@/hooks/useToast";
import { generateId } from "@/utils/utils";
import BluetoothStatus from "@/components/BluetoothStatus";
import { useEffect } from "react";
import { buildTicket } from "@/utils/ticketBuilder";

export default function POSPage() {
  const { addToast } = useToast();

  useEffect(() => {}, []);
  const { cart, addToCart, removeFromCart, total, clearCart } = useCart();
  const { createOrder } = useOrders();

  const {
    deviceId,
    isConnected,
    connect,
    autoDetectPrinter,
    print,
    printMessage,
  } = useBluetooth();

  const handleCheckout = async () => {
    printMessage();
    if (!cart.length) return;

    const order = {
      id: generateId(),
      items: cart,
      deviceId: deviceId || generateId(), // Usar ID generado si no hay dispositivo
      total,
      createdAt: new Date().toISOString(),
    };

    await createOrder(order);

    const ticket = buildTicket(order);

    try {
      await print(ticket);
      // addToast({ id: generateId(), message: '¡Venta realizada e impresa con éxito!', type: 'success' })
      addToast("¡Venta realizada con éxito! Imprimiendo...", "success");
    } catch (err) {
      console.error("Error al imprimir",err);
      addToast("Error al imprimir", "error");
      // alert("Error al imprimir");
      // alert()
    }

    clearCart();
  };

  return (
    <>
      <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <BluetoothStatus />
        <button
          onClick={async () => {
            await autoDetectPrinter();
          }}
          className="w-full h-16 bg-blue-600 text-white rounded-2xl"
        >
          Buscar impresora
        </button>
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

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { LABELS, PRODUCTS } from "@/utils/constants";
import { BUTTON_STYLES, CARD_STYLES, GRID_STYLES, FLEX_STYLES } from '@/styles/constants'


import { useCart } from "@/hooks/useCart";
import { useOrders } from "@/hooks/useOrders";
import { useBluetooth } from "@/hooks/useBluetooth";
import { useToast } from "@/hooks/useToast";
import { generateId } from "@/utils/utils";
import BluetoothStatus from "@/components/BluetoothStatus";
import { useEffect } from "react";
import { buildTwoTicket } from "@/utils/ticketBuilder";

export default function POSPage() {
  const { addToast } = useToast();

  useEffect(() => { }, []);
  const { cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, total, clearCart } = useCart();
  const { createOrder } = useOrders();

  const {
    deviceId,
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

    const ticket = buildTwoTicket(order, "TICKET DE VENTA");

    try {
      await print(ticket);
      addToast("¡Venta realizada con éxito! Imprimiendo...", "success");
    } catch (err) {
      console.error("Error al imprimir", err);
      addToast("Error al imprimir", "error");
    }

    clearCart();
  };

  return (
    <>
      <div className={`mb-4 p-4 ${CARD_STYLES.light} rounded-lg`}>
        <BluetoothStatus />
      </div>

      <div className={GRID_STYLES.cols2gap3}>
        {PRODUCTS.map((p) => (
          <button
            key={p.id}
            onClick={() => addToCart(p)}
            className={`h-24 rounded-2xl bg-black text-white`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {cart.map((item: any) => (
          <div key={item.id} className={`${FLEX_STYLES.between} p-2 bg-gray-50 dark:bg-gray-700 rounded mb-2`}>
            <div className="flex-1">
              <div>{item.name} - ${item.price.toFixed(2)}</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => decrementQuantity(item.id)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                −
              </button>

              <span className="w-8 text-center font-semibold">
                {item.quantity}
              </span>

              <button
                onClick={() => incrementQuantity(item.id)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                +
              </button>

              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                {LABELS.remove}
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleCheckout}
        disabled={!cart.length}
        className={`w-full h-20 ${!cart.length ? BUTTON_STYLES.disabled : BUTTON_STYLES.success} text-white mt-4`}
      >
        {LABELS.checkout}
      </button>
    </>
  );
}

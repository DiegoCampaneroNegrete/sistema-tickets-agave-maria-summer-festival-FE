"use client";
import { LABELS } from "@/utils/constants";
import { useOrders } from "@/hooks/useOrders";
import { db } from "@/lib/db";

export default function DashboardPage() {
  const { totalSales, totalOrders, productCount, orders } = useOrders();
  const salesByDevice = {};

  // orders.forEach(order => {
  // salesByDevice[order.deviceId] =
  //     (salesByDevice[order.deviceId] || 0) + order.total
  // })

  const backupAndReset = async () => {
    const confirmReset = confirm(
      "¿Seguro que quieres borrar TODAS las ventas?",
    );

    if (!confirmReset) return;
    const data = await db.table("orders").toArray();

    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `backup-${Date.now()}.json`;
    a.click();

    await db.table("orders").clear();
  };

  const clearOrders = async () => {
    if (!confirm("¿Borrar todas las órdenes?")) return;

    await db.table("orders").clear();
  };

  const exportOrders = async () => {
    const data = await db.table("orders").toArray();

    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${Date.now()}.json`;
    a.click();
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-gray-600 dark:text-gray-400 text-sm">
            {LABELS.totalSales}
          </h2>
          <p className="text-3xl font-bold mt-2">${totalSales}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-gray-600 dark:text-gray-400 text-sm">
            Total Órdenes
          </h2>
          <p className="text-3xl font-bold mt-2">{totalOrders}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-gray-600 dark:text-gray-400 text-sm">
            Productos Vendidos
          </h2>
          <p className="text-3xl font-bold mt-2">
            {Object.values(productCount).reduce((a, b) => a + b, 0)}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4">Desglose por Producto</h3>
        <div className="space-y-2">
          {Object.entries(productCount).map(([product, count]) => (
            <div key={product} className="flex justify-between">
              <span>{product}</span>
              <span className="font-semibold">{count} vendidos</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <button
          onClick={exportOrders}
          className="w-full h-16 bg-red-600 text-white rounded-2xl mt-4"
        >
          Exportar Ventas
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <button
          onClick={clearOrders}
          className="w-full h-16 bg-red-600 text-white rounded-2xl mt-4"
        >
            Limpiar ordenes
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <button
          onClick={backupAndReset}
          className="w-full h-16 bg-red-600 text-white rounded-2xl mt-4"
        >
          Resetear base de datos
        </button>
      </div>
    </div>
  );
}

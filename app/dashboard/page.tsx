"use client";
import { LABELS } from "@/utils/constants";
import { CARD_STYLES, GRID_STYLES, BUTTON_STYLES, BUTTON_SIZES } from '@/styles/constants'
import { useOrders } from "@/hooks/useOrders";
import { db } from "@/lib/db";
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'

export default function DashboardPage() {
  const { totalSales, totalOrders, productCount } = useOrders();

  const backupAndReset = async () => {
    const confirmReset = confirm(
      "¿Seguro que quieres borrar TODAS las ventas?",
    );

    if (!confirmReset) return;
    const data = await db.table("orders").toArray();

    const json = JSON.stringify(data, null, 2)

    const fileName = `orders-${Date.now()}.json`

    await Filesystem.writeFile({
      path: fileName,
      data: json,
      directory: Directory.Documents,
      encoding: Encoding.UTF8
    })

    alert('📁 Archivo exportado en Documents')
    await db.table("orders").clear();
  };

  const clearOrders = async () => {
    if (!confirm("¿Borrar todas las órdenes?")) return;

    await db.table("orders").clear();
  };

  const exportOrders = async () => {
    try {
      const data = await db.table("orders").toArray()

      const json = JSON.stringify(data, null, 2)

      const fileName = `backup-${Date.now()}.json`

      await Filesystem.writeFile({
        path: fileName,
        data: json,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      })

      alert('📁 Archivo exportado en Documents')
    } catch (error) {
      console.error('❌ Export error:', error)
      alert('Error al exportar')
    }
  }

  return (
    <div className={GRID_STYLES.cols3gap4}>
      <div className={CARD_STYLES.darkLarge}>
        <h2 className="text-gray-400 text-sm">
          {LABELS.totalSales}
        </h2>
        <p className="text-3xl font-bold mt-2">${totalSales}</p>
      </div>

      <div className={CARD_STYLES.darkLarge}>
        <h2 className="text-gray-400 text-sm">
          Total Órdenes
        </h2>
        <p className="text-3xl font-bold mt-2">{totalOrders}</p>
      </div>

      <div className={CARD_STYLES.darkLarge}>
        <h2 className="text-gray-400 text-sm">
          Productos Vendidos
        </h2>
        <p className="text-3xl font-bold mt-2">
          {Object.values(productCount).reduce((a, b) => a + b, 0)}
        </p>
      </div>

      <div className={`${CARD_STYLES.darkLarge} col-span-full`}>
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

      <div className={`${CARD_STYLES.darkLarge} col-span-full`}>
        <button
          onClick={exportOrders}
          className={`w-full ${BUTTON_STYLES.danger} ${BUTTON_SIZES.xl}`}
        >
          Exportar Ventas
        </button>
      </div>

      <div className={`${CARD_STYLES.darkLarge} col-span-full`}>
        <button
          onClick={clearOrders}
          className={`w-full ${BUTTON_STYLES.danger} ${BUTTON_SIZES.xl}`}
        >
          Limpiar ordenes
        </button>
      </div>

      <div className={`${CARD_STYLES.darkLarge} col-span-full`}>
        <button
          onClick={backupAndReset}
          className={`w-full ${BUTTON_STYLES.danger} ${BUTTON_SIZES.xl}`}
        >
          Resetear base de datos
        </button>
      </div>
    </div>
  );
}

'use client'
import { useOrders } from '@/hooks/useOrders'

export default function HomePage() {
  const { totalSales, totalOrders } = useOrders()

  return (
    <div className="space-y-6">
      {/* Resumen rápido */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-gray-600 dark:text-gray-400 text-sm font-semibold">Ventas Totales</h3>
          <p className="text-3xl font-bold mt-2">${totalSales}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-gray-600 dark:text-gray-400 text-sm font-semibold">Órdenes Totales</h3>
          <p className="text-3xl font-bold mt-2">{totalOrders}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-gray-600 dark:text-gray-400 text-sm font-semibold">Ticket Promedio</h3>
          <p className="text-3xl font-bold mt-2">${totalOrders > 0 ? (totalSales / totalOrders).toFixed(2) : 0}</p>
        </div>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfica de ventas por período */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Ventas por Período</h3>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-gray-500">
            [Gráfica de líneas]
          </div>
        </div>

        {/* Gráfica de productos más vendidos */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Productos Más Vendidos</h3>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-gray-500">
            [Gráfica de barras]
          </div>
        </div>

        {/* Gráfica de distribución de ventas */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Distribución de Ventas</h3>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-gray-500">
            [Gráfica de pastel]
          </div>
        </div>

        {/* Gráfica de tendencias */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Tendencias</h3>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-gray-500">
            [Gráfica de área]
          </div>
        </div>
      </div>

      {/* Tabla de órdenes recientes */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Órdenes Recientes</h3>
        <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-gray-500">
          [Tabla de órdenes]
        </div>
      </div>
    </div>
  )
}

'use client'
import { LABELS } from '@/utils/constants'
import { useOrders } from '@/hooks/useOrders'

export default function DashboardPage() {
  const { totalSales, totalOrders, productCount } = useOrders()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-gray-600 dark:text-gray-400 text-sm">{LABELS.totalSales}</h2>
          <p className="text-3xl font-bold mt-2">${totalSales}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-gray-600 dark:text-gray-400 text-sm">Total Órdenes</h2>
          <p className="text-3xl font-bold mt-2">{totalOrders}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-gray-600 dark:text-gray-400 text-sm">Productos Vendidos</h2>
          <p className="text-3xl font-bold mt-2">{Object.values(productCount).reduce((a, b) => a + b, 0)}</p>
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
    </div>
  )
}
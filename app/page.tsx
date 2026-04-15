'use client'
import { useOrders } from '@/hooks/useOrders'
import { CARD_STYLES, GRID_STYLES, SPACING } from '@/styles/constants'

export const dynamic = 'force-static';
export default function HomePage() {
  const { totalSales, totalOrders } = useOrders()

  return (
    <div className={SPACING.lg}>
      {/* Resumen rápido */}
      <div className={GRID_STYLES.responsiveItems}>
        <div className={`${CARD_STYLES.darkLarge} shadow`}>
          <h3 className="text-gray-400 text-sm font-semibold">Ventas Totales</h3>
          <p className="text-3xl font-bold mt-2">${totalSales}</p>
        </div>

        <div className={`${CARD_STYLES.darkLarge} shadow`}>
          <h3 className="text-gray-400 text-sm font-semibold">Órdenes Totales</h3>
          <p className="text-3xl font-bold mt-2">{totalOrders}</p>
        </div>

        <div className={`${CARD_STYLES.darkLarge} shadow`}>
          <h3 className="text-gray-400 text-sm font-semibold">Ticket Promedio</h3>
          <p className="text-3xl font-bold mt-2">${totalOrders > 0 ? (totalSales / totalOrders).toFixed(2) : 0}</p>
        </div>
      </div>

      {/* Gráficas */}
      <div className={GRID_STYLES.responsiveDashboard}>
        {/* Gráfica de ventas por período */}
        <div className={CARD_STYLES.darkLarge}>
          <h3 className="text-lg font-semibold mb-4">Ventas por Período</h3>
          <div className="h-64 bg-gray-700 rounded flex items-center justify-center text-gray-500">
            [Gráfica de líneas]
          </div>
        </div>

        {/* Gráfica de productos más vendidos */}
        <div className={CARD_STYLES.darkLarge}>
          <h3 className="text-lg font-semibold mb-4">Productos Más Vendidos</h3>
          <div className="h-64 bg-gray-700 rounded flex items-center justify-center text-gray-500">
            [Gráfica de barras]
          </div>
        </div>

        {/* Gráfica de distribución de ventas */}
        <div className={CARD_STYLES.darkLarge}>
          <h3 className="text-lg font-semibold mb-4">Distribución de Ventas</h3>
          <div className="h-64 bg-gray-700 rounded flex items-center justify-center text-gray-500">
            [Gráfica de pastel]
          </div>
        </div>

        {/* Gráfica de tendencias */}
        <div className={CARD_STYLES.darkLarge}>
          <h3 className="text-lg font-semibold mb-4">Tendencias</h3>
          <div className="h-64 bg-gray-700 rounded flex items-center justify-center text-gray-500">
            [Gráfica de área]
          </div>
        </div>
      </div>

      {/* Tabla de órdenes recientes */}
      <div className={CARD_STYLES.darkLarge}>
        <h3 className="text-lg font-semibold mb-4">Órdenes Recientes</h3>
        <div className="h-64 bg-gray-700 rounded flex items-center justify-center text-gray-500">
          [Tabla de órdenes]
        </div>
      </div>
    </div>
  )
}

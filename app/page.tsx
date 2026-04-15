'use client'
import { CARD_STYLES, GRID_STYLES, SPACING } from '@/styles/constants'
import { useSalesAnalytics } from '@/hooks/useSalesAnalytics'
import { SalesLineChart } from '@/components/charts/SalesLineChart'
import { ProductsBarChart } from '@/components/charts/ProductsBarChart'
import { SalesPieChart } from '@/components/charts/SalesPieChart'
import { SalesAreaChart } from './components/charts/SalesAreaChart'
import { useDateFilter } from '@/hooks/useDateFilter'
import { DateFilter } from '@/components/DateFilter'

import { useOrderSearch } from '@/hooks/useOrderSearch'
import { OrderSearchInput } from '@/components/OrderSearchInput'
import { OrdersTable } from '@/components/OrdersTable'

export const dynamic = 'force-static';
export default function HomePage() {
  // const { totalSales, totalOrders } = useOrders()
  const { filter, setFilter, customRange, setCustomRange } = useDateFilter()
  const { query, setQuery, filteredOrders } = useOrderSearch()
  const {
    totalSales,
    totalOrders,
    salesByDay,
    topProducts,
    salesDistribution
  } = useSalesAnalytics(filter, customRange)

  const top = topProducts[0]

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

      <div className="text-xs text-gray-400">
        Top: {top?.name} ({top?.quantity})
      </div>

      <DateFilter
        filter={filter}
        setFilter={setFilter}
        setCustomRange={setCustomRange}
      />

      {/* Gráficas */}
      <div className={GRID_STYLES.responsiveDashboard}>
        {/* Gráfica de ventas por período */}
        <div className={CARD_STYLES.darkLarge}>
                    <h3 className="text-lg font-semibold mb-4">Ventas Por Periodo</h3>
          <div className="h-64">
            <SalesLineChart data={salesByDay} />
          </div>
        </div>

        {/* Gráfica de productos más vendidos */}
        <div className={CARD_STYLES.darkLarge}>
          <h3 className="text-lg font-semibold mb-4">Productos Más Vendidos</h3>
          <div className="h-64">
            <ProductsBarChart data={topProducts} />
          </div>
        </div>

        {/* Gráfica de distribución de ventas */}
        <div className={CARD_STYLES.darkLarge}>
          <h3 className="text-lg font-semibold mb-4">Distribución de Ventas</h3>
          <div className="h-64">
            <SalesPieChart data={salesDistribution} />
          </div>
        </div>

        {/* Gráfica de tendencias */}
        <div className={CARD_STYLES.darkLarge}>
          <h3 className="text-lg font-semibold mb-4">Tendencias</h3>
          <div className="h-64">
            <SalesAreaChart data={salesByDay} />
          </div>
        </div>


        {/* Gráfica de tendencias */}
        <div className={CARD_STYLES.darkLarge}>
          <h3 className="text-lg font-semibold mb-4">Tendencias</h3>
          <div className="h-64">
            <SalesPieChart data={salesDistribution} />
          </div>
        </div>
      </div>

      {/* Tabla de órdenes recientes */}
      <div className={CARD_STYLES.darkLarge}>
        <h3 className="text-lg font-semibold mb-4">Órdenes Recientes</h3>
        <div className="mb-3">
          <OrderSearchInput value={query} onChange={setQuery} />
        </div>
        <OrdersTable orders={filteredOrders.slice(0, 50).reverse()} />
      </div>
    </div>
  )
}


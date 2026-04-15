'use client'

import { useMemo } from 'react'
import { useOrders } from './useOrders'
import { FilterType } from './useDateFilter'

export function useSalesAnalytics(filter: FilterType, range?: { start: Date | null, end: Date | null }) {
  const { orders } = useOrders()

  const filteredOrders = useMemo(() => {
    const now = new Date()

    return orders.filter(order => {
      const date = new Date(order.createdAt)

      if (filter === 'day') {
        return date.toDateString() === now.toDateString()
      }

      if (filter === 'week') {
        const startOfWeek = new Date()
        startOfWeek.setDate(now.getDate() - 7)
        return date >= startOfWeek
      }

      if (filter === 'event' && range?.start && range?.end) {
        return date >= range.start && date <= range.end
      }

      return true
    })
  }, [orders, filter, range])

  // 🔁 Reusar lógica con filteredOrders

  const totalSales = filteredOrders.reduce((sum, o) => sum + o.total, 0)
  const totalOrders = filteredOrders.length

  const salesByDay = useMemo(() => {
    const map: Record<string, number> = {}

    filteredOrders.forEach(order => {
      const date = new Date(order.createdAt).toLocaleDateString()
      map[date] = (map[date] || 0) + order.total
    })

    return Object.entries(map).map(([date, total]) => ({ date, total }))
  }, [filteredOrders])

  const topProducts = useMemo(() => {
    const map: Record<string, number> = {}

    filteredOrders.forEach(order => {
      order.items.forEach(item => {
        map[item.name] = (map[item.name] || 0) + item.quantity
      })
    })

    return Object.entries(map).map(([name, quantity]) => ({ name, quantity }))
  }, [filteredOrders])

  const salesDistribution = useMemo(() => {
    const map: Record<string, number> = {}

    filteredOrders.forEach(order => {
      order.items.forEach(item => {
        map[item.name] = (map[item.name] || 0) + item.price * item.quantity
      })
    })

    return Object.entries(map).map(([name, value]) => ({ name, value }))
  }, [filteredOrders])

  return {
    totalSales,
    totalOrders,
    salesByDay,
    topProducts,
    salesDistribution
  }
}
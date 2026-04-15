'use client'

import { useMemo, useState } from 'react'
import { useOrders } from './useOrders'

export function useOrderSearch() {
  const { orders } = useOrders()
  const [query, setQuery] = useState('')

  const filteredOrders = useMemo(() => {
    if (!query) return orders

    const q = query.toLowerCase()

    return orders.filter(order => {
      const inId = order.id.toLowerCase().includes(q)

      const inProducts = order.items.some(item =>
        item.name.toLowerCase().includes(q)
      )

      return inId || inProducts
    })
  }, [orders, query])

  return {
    query,
    setQuery,
    filteredOrders
  }
}
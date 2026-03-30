/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { db } from '@/lib/db'
import { Order } from '@/lib/types'

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])

  const loadOrders = async () => {
    const data = await db.table('orders').toArray()
    setOrders(data)
  }

  const createOrder = async (order: Order) => {
    await db.table('orders').add(order)
    await loadOrders()
  }

  const totalSales = orders.reduce((acc, o) => acc + o.total, 0)

  const totalOrders = orders.length

  const productCount: Record<string, number> = {}

  orders.forEach(order => {
    order.items.forEach((item: any) => {
      productCount[item.name] = (productCount[item.name] || 0) + item.quantity
    })
  })

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await db.table('orders').toArray()
      setOrders(data)
    }
    fetchOrders()
  }, [])

  return {
    orders,
    loadOrders,
    createOrder,
    totalSales,
    totalOrders,
    productCount
  }
}

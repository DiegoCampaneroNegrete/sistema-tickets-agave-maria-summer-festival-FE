/* eslint-disable @typescript-eslint/no-explicit-any */
// 🧾 Agave Maria POS - Merge automático de ventas (Multi-caja)
// Nueva página: /app/merge/page.tsx

'use client'

import { BUTTON_STYLES, CARD_STYLES, SPACING } from '@/styles/constants'
import { useState } from 'react'

export default function MergePage() {
  const [filesData, setFilesData] = useState<any[]>([])
  const [merged, setMerged] = useState<any[]>([])

  const handleFiles = async (e: any) => {
    const files = Array.from(e.target.files)

    const data = await Promise.all(
      files.map(async (file: any) => {
        const text = await file.text()
        return JSON.parse(text)
      })
    )

    setFilesData(data)
  }

  const mergeData = () => {
    const allOrders = filesData.flat()

    // evitar duplicados por ID
    const uniqueMap: Record<string, any> = {}

    allOrders.forEach(order => {
      uniqueMap[order.id] = order
    })

    const result = Object.values(uniqueMap)

    setMerged(result)
  }

  const downloadMerged = () => {
    const blob = new Blob([JSON.stringify(merged, null, 2)], {
      type: 'application/json'
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ventas-merged.json'
    a.click()
  }

  // métricas
  const totalSales = merged.reduce((acc, o) => acc + o.total, 0)

  const salesByDevice: Record<string, number> = {}

  merged.forEach(order => {
    const device = order.deviceId || 'UNKNOWN'
    salesByDevice[device] = (salesByDevice[device] || 0) + order.total
  })

  return (
    <div className={`p-4 ${SPACING.md}`}>
      <h1 className="text-xl font-bold">Merge de ventas</h1>

      <input
        type="file"
        multiple
        accept="application/json"
        onChange={handleFiles}
        className="block"
      />

      <button
        onClick={mergeData}
        className={`w-full h-14 ${BUTTON_STYLES.primary} rounded-xl`}
      >
        Unir archivos
      </button>

      {merged.length > 0 && (
        <>
          <div className={`p-4 ${CARD_STYLES.dark} rounded-xl`}>
            <p>Total ventas: ${totalSales}</p>
            <p>Total órdenes: {merged.length}</p>
          </div>

          <div className={`p-4 ${CARD_STYLES.dark} rounded-xl`}>
            <h2 className="font-bold">Ventas por caja</h2>
            {Object.entries(salesByDevice).map(([device, total]) => (
              <div key={device} className="flex justify-between">
                <span>{device}</span>
                <span>${total}</span>
              </div>
            ))}
          </div>

          <button
            onClick={downloadMerged}
            className={`w-full h-14 ${BUTTON_STYLES.success} rounded-xl`}
          >
            Descargar merge
          </button>
        </>
      )}
    </div>
  )
}

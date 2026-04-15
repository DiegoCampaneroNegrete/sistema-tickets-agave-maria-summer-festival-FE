/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  PieChart, Pie, Tooltip, ResponsiveContainer, Cell
} from 'recharts'
import { getColor } from '@/utils/chartColors'

export function SalesPieChart({ data }: { data: any[] }) {
  return (
    <div className="flex flex-col h-full">
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            label={({ percent }) =>
              `${(percent != null ? (percent * 100).toFixed(0) : 0)}%`
            }
          >
            {data.map((_: any, index: number) => (
              <Cell key={index} fill={getColor(index)} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* 🧠 Leyenda manual (MEJOR en móvil) */}
      <div className="text-xs mt-2 space-y-1">
        {data.map((item: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ background: getColor(i) }}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
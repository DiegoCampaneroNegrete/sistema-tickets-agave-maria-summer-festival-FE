/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'

export function SalesAreaChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} />

        <Tooltip />

        <Area
          type="monotone"
          dataKey="total"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
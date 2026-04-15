/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'

export function SalesLineChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

        <XAxis
          dataKey="date"
          tick={{ fontSize: 10 }}
        />

        <YAxis
          tick={{ fontSize: 10 }}
        />

        <Tooltip
          contentStyle={{
            borderRadius: 12,
            fontSize: 12
          }}
        />

        <Line
          type="monotone"
          dataKey="total"
          stroke="#22c55e"
          strokeWidth={3}
          dot={{ r: 3 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts'
import { getColor } from '@/utils/chartColors'

export function ProductsBarChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          tick={{ fontSize: 10 }}
          interval={0}
        />

        <YAxis tick={{ fontSize: 10 }} />

        <Tooltip />

        <Bar dataKey="quantity" radius={[6, 6, 0, 0]}>
          {data.map((_: any, index: number) => (
            <Cell key={index} fill={getColor(index)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
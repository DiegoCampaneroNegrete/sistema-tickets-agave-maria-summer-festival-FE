'use client'

import { useState } from 'react'

export type FilterType = 'day' | 'week' | 'event'

export function useDateFilter() {
  const [filter, setFilter] = useState<FilterType>('day')
  const [customRange, setCustomRange] = useState<{
    start: Date | null
    end: Date | null
  }>({
    start: null,
    end: null
  })

  return {
    filter,
    setFilter,
    customRange,
    setCustomRange
  }
}
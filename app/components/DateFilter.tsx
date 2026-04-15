/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { FilterType } from '@/hooks/useDateFilter'

export function DateFilter({
    filter,
    setFilter,
    setCustomRange
}: {
    filter: FilterType
    setFilter: (f: FilterType) => void
    setCustomRange: any
}) {
    return (
        <div className="flex flex-col justify-stretch gap-2 mb-4">
            <div className="flex flex-row justify-around items-center gap-2 mb-4">
                <button
                    onClick={() => setFilter('day')}
                    className={`px-4 py-2 rounded ${filter === 'day' ? 'bg-blue-600' : 'bg-gray-700'}`}
                >
                    Hoy
                </button>

                <button
                    onClick={() => setFilter('week')}
                    className={`px-4 py-2 rounded ${filter === 'week' ? 'bg-blue-600' : 'bg-gray-700'}`}
                >
                    Semana
                </button>

                <button
                    onClick={() => setFilter('event')}
                    className={`px-4 py-2 rounded ${filter === 'event' ? 'bg-blue-600' : 'bg-gray-700'}`}
                >
                    Evento
                </button>
            </div>

            <div className="flex flex-row justify-around items-center gap-2 mb-4">
                {filter === 'event' && (
                    <div className="flex justify-between items-center gap-2 mb-4">
                        <input
                            className='text-white dark:scheme-dark'
                            type="date"
                            onChange={(e) =>
                                setCustomRange((prev: any) => ({
                                    ...prev,
                                    start: new Date(e.target.value)
                                }))
                            }
                        />
                        <input
                            className='text-white dark:scheme-dark'
                            type="date"
                            onChange={(e) =>
                                setCustomRange((prev: any) => ({
                                    ...prev,
                                    end: new Date(e.target.value)
                                }))
                            }
                        />
                    </div>
                )}
            </div>



        </div>
    )
}
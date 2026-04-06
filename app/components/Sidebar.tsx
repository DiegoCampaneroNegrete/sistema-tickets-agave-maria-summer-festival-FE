'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LABELS } from '@/utils/constants'

interface SidebarProps {
  dark: boolean
  onToggleDark: () => void
}

export default function Sidebar({ dark, onToggleDark }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700"
      >
        ☰
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-gray-100 dark:bg-gray-800 shadow-lg transform transition-transform duration-300 z-40 md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 space-y-4">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full text-right text-2xl"
          >
            ✕
          </button>
          <button
            onClick={() => {
              router.push('/pos')
              setIsOpen(false)
            }}
            className="w-full px-4 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600"
          >
            {LABELS.pos}
          </button>

          <button
            onClick={() => {
              router.push('/dashboard')
              setIsOpen(false)
            }}
            className="w-full px-4 py-3 rounded-lg bg-purple-500 text-white font-semibold hover:bg-purple-600"
          >
            {LABELS.dashboard}
          </button>

          <button
            onClick={() => {
              router.push('/merge')
              setIsOpen(false)
            }}
            className="w-full px-4 py-3 rounded-lg bg-purple-500 text-white font-semibold hover:bg-purple-600"
          >
            {LABELS.mergeLabel}
          </button>
          <button
            onClick={() => {
              onToggleDark()
              setIsOpen(false)
            }}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {dark ? '☀️ Tema Claro' : '🌙 Tema Oscuro'}
          </button>
        </div>
      </div>

      {/* Menú desktop */}
      <div className="hidden md:flex gap-2">
        <button
          onClick={() => router.push('/pos')}
          className="px-3 py-2 rounded-lg bg-blue-500 text-white"
        >
          {LABELS.pos}
        </button>

        <button
          onClick={() => router.push('/dashboard')}
          className="px-3 py-2 rounded-lg bg-purple-500 text-white"
        >
          {LABELS.dashboard}
        </button>

        <button
          onClick={onToggleDark}
          className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700"
        >
          {dark ? '☀️' : '🌙'}
        </button>
      </div>
    </>
  )
}

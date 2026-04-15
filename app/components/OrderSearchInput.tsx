'use client'

export function OrderSearchInput({
  value,
  onChange
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <input
      type="text"
      placeholder="Buscar por ID o producto..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-12 px-4 rounded-xl bg-gray-800 text-white outline-none text-sm"
    />
  )
}
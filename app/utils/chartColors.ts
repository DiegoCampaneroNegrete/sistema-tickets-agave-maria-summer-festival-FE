export const CHART_COLORS = [
  '#22c55e', // verde
  '#3b82f6', // azul
  '#f59e0b', // amarillo
  '#ef4444', // rojo
  '#a855f7', // morado
]

export const getColor = (index: number) =>
  CHART_COLORS[index % CHART_COLORS.length]
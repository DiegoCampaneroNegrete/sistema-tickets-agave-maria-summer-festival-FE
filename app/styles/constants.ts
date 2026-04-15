/**
 * 🎨 Constantes de estilos Tailwind homologados
 * Evita repetición de clases CSS en componentes
 */

// ============= BOTONES =============
export const BUTTON_STYLES = {
  primary: 'bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition',
  success: 'bg-green-600 text-white rounded-xl hover:bg-green-700 transition',
  danger: 'bg-red-600 text-white rounded-2xl hover:bg-red-700 transition',
  warning: 'bg-yellow-500 text-white rounded hover:bg-yellow-600 transition',
  disabled: 'bg-gray-400 text-white rounded-xl cursor-not-allowed',
}

export const BUTTON_SIZES = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6',
  lg: 'h-14 px-6',
  xl: 'h-16 px-8',
  full: 'h-20 w-full',
}

// ============= CARDS / CONTENEDORES =============
export const CARD_STYLES = {
  dark: 'p-4 bg-gray-800 rounded-lg',
  darkLarge: 'p-6 bg-gray-800 rounded-lg',
  light: 'p-4 bg-gray-100 dark:bg-gray-800 rounded-lg',
  lightItem: 'p-2 bg-gray-50 dark:bg-gray-700 rounded',
  input: 'bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2',
}

// ============= GRILLAS =============
export const GRID_STYLES = {
  cols2gap3: 'grid grid-cols-2 gap-3',
  cols2gap4: 'grid grid-cols-2 gap-4',
  cols3gap4: 'grid grid-cols-3 gap-4',
  responsiveItems: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
  responsiveDashboard: 'grid grid-cols-1 lg:grid-cols-2 gap-6',
}

// ============= TIPOGRAFÍA =============
export const TEXT_STYLES = {
  title: 'text-xl font-bold',
  heading: 'text-lg font-semibold',
  subtitle: 'text-gray-600 dark:text-gray-400 text-sm',
  label: 'text-sm font-semibold',
  body: 'text-base',
}

// ============= ESPACIADO =============
export const SPACING = {
  xs: 'space-y-2',
  sm: 'space-y-3',
  md: 'space-y-4',
  lg: 'space-y-6',
}

// ============= FLEXBOX =============
export const FLEX_STYLES = {
  center: 'flex items-center justify-center',
  between: 'flex items-center justify-between',
  startCenter: 'flex items-center',
  between_mb2: 'flex justify-between items-center mb-2',
  between_p2: 'flex justify-between items-center p-2',
}

// ============= UTILIDADES =============
export const UTILITIES = {
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-blue-500',
  transition: 'transition-all duration-200 ease-in-out',
  shadowMd: 'shadow-md',
  shadowLg: 'shadow-lg',
}

// ============= COMPOSICIONES COMUNES =============
export const COMPOSITIONS = {
  // Botón primario completo
  buttonPrimaryFull: `${BUTTON_STYLES.primary} ${BUTTON_SIZES.full}`,
  // Botón primario grande
  buttonPrimaryLg: `${BUTTON_STYLES.primary} ${BUTTON_SIZES.lg}`,
  // Botón éxito completo
  buttonSuccessFull: `${BUTTON_STYLES.success} ${BUTTON_SIZES.full}`,
  // Botón peligro grande
  buttonDangerLg: `${BUTTON_STYLES.danger} ${BUTTON_SIZES.lg}`,
  // Card con espaciado
  cardWithSpacing: `${CARD_STYLES.darkLarge} ${SPACING.sm}`,
  // Item de lista
  listItem: `${FLEX_STYLES.between_p2} ${CARD_STYLES.lightItem}`,
}

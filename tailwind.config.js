/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        success: '#16a34a',
        danger: '#dc2626',
        warning: '#eab308',
      },
      borderRadius: {
        button: '8px',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        // ============= BOTONES =============
        '.btn-primary': {
          '@apply': 'bg-blue-600 text-white rounded-xl px-4 py-2 hover:bg-blue-700 transition-all duration-200 font-medium',
        },
        '.btn-primary-lg': {
          '@apply': 'btn-primary h-14 w-full',
        },
        '.btn-primary-xl': {
          '@apply': 'btn-primary h-20 w-full text-lg',
        },
        '.btn-success': {
          '@apply': 'bg-green-600 text-white rounded-xl px-4 py-2 hover:bg-green-700 transition-all duration-200 font-medium',
        },
        '.btn-success-lg': {
          '@apply': 'btn-success h-14 w-full',
        },
        '.btn-success-xl': {
          '@apply': 'btn-success h-16 w-full',
        },
        '.btn-danger': {
          '@apply': 'bg-red-600 text-white rounded-2xl px-4 py-2 hover:bg-red-700 transition-all duration-200 font-medium',
        },
        '.btn-danger-lg': {
          '@apply': 'btn-danger h-16 w-full',
        },
        '.btn-warning': {
          '@apply': 'bg-yellow-500 text-white rounded px-3 py-1 hover:bg-yellow-600 transition-all duration-200',
        },
        '.btn-disabled': {
          '@apply': 'bg-gray-400 text-white rounded-xl cursor-not-allowed opacity-60',
        },

        // ============= CARDS =============
        '.card-dark': {
          '@apply': 'p-6 bg-gray-800 rounded-lg',
        },
        '.card-dark-sm': {
          '@apply': 'p-4 bg-gray-800 rounded-lg',
        },
        '.card-light': {
          '@apply': 'p-4 bg-gray-800 rounded-lg',
        },
        '.card-item': {
          '@apply': 'p-2 bg-gray-700 rounded',
        },

        // ============= GRILLAS =============
        '.grid-cols-2-gap-3': {
          '@apply': 'grid grid-cols-2 gap-3',
        },
        '.grid-cols-2-gap-4': {
          '@apply': 'grid grid-cols-2 gap-4',
        },
        '.grid-cols-3-gap-4': {
          '@apply': 'grid grid-cols-3 gap-4',
        },

        // ============= FLEXBOX =============
        '.flex-between': {
          '@apply': 'flex items-center justify-between',
        },
        '.flex-center': {
          '@apply': 'flex items-center justify-center',
        },
        '.flex-start-center': {
          '@apply': 'flex items-center',
        },

        // ============= TIPOGRAFÍA =============
        '.text-title': {
          '@apply': 'text-xl font-bold',
        },
        '.text-heading': {
          '@apply': 'text-lg font-semibold',
        },
        '.text-subtitle': {
          '@apply': 'text-gray-400 text-sm',
        },

        // ============= UTILIDADES =============
        '.focus-ring': {
          '@apply': 'focus:outline-none focus:ring-2 focus:ring-blue-500',
        },
        '.shadow-smooth': {
          '@apply': 'shadow-md transition-all duration-200',
        },
      })
    },
  ],
}


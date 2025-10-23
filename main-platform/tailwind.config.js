/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        culture: {
          light: '#FFF7ED',
          DEFAULT: '#F97316',
          dark: '#C2410C',
        },
        christianity: {
          light: '#EFF6FF',
          DEFAULT: '#3B82F6',
          dark: '#1E40AF',
        },
        bibleKnow: {
          light: '#F0FDF4',
          DEFAULT: '#22C55E',
          dark: '#15803D',
        },
        churchAdmin: {
          light: '#FAF5FF',
          DEFAULT: '#A855F7',
          dark: '#7E22CE',
        },
      },
      keyframes: {
        'spin-to-upright': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.5' },
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
      },
      animation: {
        'spin-to-upright': 'spin-to-upright 2s ease-in-out forwards',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'fade-in-down': 'fade-in-down 1s ease-out',
        'fade-in-up': 'fade-in-up 1s ease-out',
      },
    },
  },
  plugins: [],
}

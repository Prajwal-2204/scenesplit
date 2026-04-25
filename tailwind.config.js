/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07070A',
          900: '#0B0B10',
          850: '#0F1018',
          800: '#151727',
          700: '#242842',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(168, 85, 247, 0.30), 0 0 40px rgba(168, 85, 247, 0.12)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-30%)' },
          '100%': { transform: 'translateX(30%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 500ms ease-out both',
        shimmer: 'shimmer 1200ms ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}


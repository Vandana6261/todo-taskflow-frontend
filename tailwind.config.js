/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'progress-loading': {
          '0%': { width: '0%', transform: 'translateX(-10%)' },
          '50%': { width: '70%' },
          '100%': { width: '100%', transform: 'translateX(0%)' },
        }
      },
      animation: {
        'progress-loading': 'progress-loading 3s infinite ease-in-out',
      }
    },
  },
  plugins: [],
}
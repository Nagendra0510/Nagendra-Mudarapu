/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#ffffff',
          dark: '#1a1f35',
        },
        secondary: {
          light: '#f3f4f6',
          dark: '#111827',
        },
        accent: {
          light: '#3b82f6',
          dark: '#60a5fa',
        },
         // Ocean theme
         ocean: {
          light: '#45b1e8',
          DEFAULT: '#0ea5e9',
          dark: '#0369a1',
        },
        // Nature theme
        nature: {
          light: '#86efac',
          DEFAULT: '#22c55e',
          dark: '#15803d',
        },
        // Sunset theme
        sunset: {
          light: '#fdba74',
          DEFAULT: '#f97316',
          dark: '#c2410c',
        },
        // Rose theme
        rose: {
          light: '#fda4af',
          DEFAULT: '#f43f5e',
          dark: '#be123c',
        },
        // Custom gradients
        gradient: {
          'blue-purple': 'linear-gradient(to right, #3b82f6, #8b5cf6)',
          'green-emerald': 'linear-gradient(to right, #4ade80, #10b981)',
          'orange-red': 'linear-gradient(to right, #fb923c, #ef4444)',
          'teal-cyan': 'linear-gradient(to right, #2dd4bf, #06b6d4)',
          'rose-pink': 'linear-gradient(to right, #fb7185, #ec4899)',
        }
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          light: '#3b82f6',
          dark: '#1d4ed8'
        },
        secondary: {
          DEFAULT: '#059669',
          light: '#10b981',
          dark: '#047857'
        },
        accent: {
          DEFAULT: '#d97706',
          light: '#f59e0b',
          dark: '#b45309'
        },
        background: {
          DEFAULT: '#f3f4f6',
          dark: '#e5e7eb'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
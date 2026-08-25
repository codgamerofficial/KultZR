/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          950: '#0b132b',
          900: '#172554',
          800: '#1e3a8a',
          600: '#2563eb',
        },
        brand: {
          indigo: '#172554',
          blue: '#2563EB',
          saffron: '#FF7A00',
          yellow: '#FFC107',
          green: '#16A34A',
          bg: '#F8FAFC',
          text: '#0F172A',
          muted: '#64748B',
          border: '#E2E8F0',
          danger: '#DC2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-saffron': '0 0 25px -5px rgba(255, 122, 0, 0.4)',
        'glow-blue': '0 0 25px -5px rgba(37, 99, 235, 0.4)',
        'glow-green': '0 0 25px -5px rgba(22, 163, 74, 0.4)',
        'card-hover': '0 10px 30px -10px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  plugins: [],
}

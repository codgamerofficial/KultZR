import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0A0A0C',
          charcoal: '#141418',
          card: '#1E1E26',
          gold: '#D4AF37',
          amber: '#FFC107',
          pearl: '#FAFAFA',
          muted: '#A1A1AA',
          crimson: '#E54D42',
          border: '#272730',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        mono: ['monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(to right bottom, rgba(10, 10, 12, 0.9), rgba(20, 20, 24, 0.95))',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.3))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(212, 175, 55, 0.6))' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        glow: 'pulseGlow 3s infinite ease-in-out',
      }
    },
  },
  plugins: [],
}
export default config

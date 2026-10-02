/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Outfit"', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
      },
      colors: {
        futuristic: {
          bg: '#031A14',
          deep: '#01120D',
          dark: '#05231B',
          card: 'rgba(255, 255, 255, 0.05)',
          cardHover: 'rgba(255, 255, 255, 0.08)',
          border: 'rgba(255, 255, 255, 0.12)',
          borderGlow: 'rgba(0, 208, 132, 0.35)',
        },
        agri: {
          emerald: '#00D084',
          mint: '#67F5C2',
          cyan: '#38BDF8',
          deep: '#064e3b',
          dark: '#022c22',
          forest: '#065f46',
          light: '#10b981',
          pale: '#ecfdf5',
          bg: '#031A14',
          card: '#0a2318',
          border: 'rgba(255, 255, 255, 0.12)',
          text: '#F1F5F9',
          muted: '#94A3B8',
        },
        darkbg: {
          900: '#031A14',
          800: '#06261E',
          700: '#0A3328',
          600: '#104335',
          card: '#08251D',
          border: 'rgba(255, 255, 255, 0.12)',
        },
        accent: {
          amber: '#F59E0B',
          orange: '#EA580C',
          yellow: '#FACC15',
          red: '#EF4444',
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'neon-emerald': '0 0 25px rgba(0, 208, 132, 0.35)',
        'neon-mint': '0 0 35px rgba(103, 245, 194, 0.4)',
        'neon-cyan': '0 0 30px rgba(56, 189, 248, 0.35)',
        'card': '0 10px 30px -4px rgba(0, 0, 0, 0.4), 0 4px 10px -2px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 25px rgba(0, 208, 132, 0.4)',
        'glow-lg': '0 0 50px rgba(0, 208, 132, 0.55)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spinReverse 25s linear infinite',
        'radar': 'radar 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}

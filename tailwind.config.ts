import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary_navy: {
          50: '#f0f5ff',
          100: '#e0e9ff',
          200: '#b8cfff',
          300: '#8da8ff',
          400: '#6083ff',
          500: '#335eff',
          600: '#1C3D75',
          700: '#0F1E36',
          800: '#070e1a',
          900: '#03070d'
        },
        accent_gold: {
          50: '#fff9e6',
          100: '#fff2cc',
          200: '#ffe599',
          300: '#ffd866',
          400: '#ffcb33',
          500: '#FFD100',
          600: '#cc9900',
          700: '#997300',
          800: '#664d00',
          900: '#332600'
        },
        vibrant_blue: {
          50: '#f0f5ff',
          100: '#e0e9ff',
          200: '#b8cfff',
          300: '#8da8ff',
          400: '#6083ff',
          500: '#335eff',
          600: '#1C3D75',
          700: '#0F1E36',
          800: '#070e1a',
          900: '#03070d'
        }
      },
      fontFamily: {
        sans: ['Outfit', ...defaultTheme.fontFamily.sans],
        body: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      backdropBlur: {
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px'
      },
      backgroundOpacity: {
        5: '0.05',
        10: '0.1',
        15: '0.15',
        20: '0.2',
        25: '0.25'
      },
      animation: {
        'pulse-gold': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.4s ease both'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
} satisfies Config
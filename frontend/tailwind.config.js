// Bep Hue - Tailwind CSS Configuration
// Authentic Vietnamese Restaurant Theme
// Based on brand analysis of imperial Hue cuisine

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        'bep-red': {
          DEFAULT: '#D44638',
          light: '#E05A4C',
          dark: '#B73529',
        },
        'bep-cream': {
          DEFAULT: '#F5EBD9',
          light: '#FAF3E7',
          dark: '#EBD9BC',
        },
        'bep-brown': {
          DEFAULT: '#4A3829',
          light: '#6B5444',
          dark: '#2C1810',
        },

        // Secondary Colors
        'bep-terracotta': {
          DEFAULT: '#C67946',
          light: '#D4925E',
          dark: '#A5612E',
        },
        'bep-ceramic': {
          DEFAULT: '#2F4F6F',
          light: '#4A6B8A',
          dark: '#1E3346',
        },
        'bep-herb': {
          DEFAULT: '#7CB342',
          light: '#95C465',
          dark: '#629230',
        },

        // Accent Colors
        'bep-bamboo': {
          DEFAULT: '#D4A574',
          light: '#E0B98C',
          dark: '#BC8E5C',
        },
        'bep-chili': {
          DEFAULT: '#B71C1C',
          light: '#D32F2F',
          dark: '#8B0000',
        },

        // Neutrals
        'bep-charcoal': {
          DEFAULT: '#2C2C2C',
          light: '#4A4A4A',
          dark: '#1A1A1A',
        },
        'bep-white': {
          DEFAULT: '#FFFFFF',
          warm: '#FFF8F0',
        },

        // Keep existing primary/secondary for backwards compatibility
        primary: {
          DEFAULT: '#D44638',
          hover: '#B73529',
        },
      },

      fontFamily: {
        // Vietnamese-compatible fonts
        'heading': ['Playfair Display', 'Georgia', 'serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Cormorant', 'Georgia', 'serif'],
      },

      fontSize: {
        // Scale optimized for Vietnamese diacritics
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.4rem' }],
        'base': ['1rem', { lineHeight: '1.6rem' }],
        'lg': ['1.125rem', { lineHeight: '1.8rem' }],
        'xl': ['1.25rem', { lineHeight: '2rem' }],
        '2xl': ['1.5rem', { lineHeight: '2.2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.5rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.8rem' }],
        '5xl': ['3rem', { lineHeight: '3.4rem' }],
      },

      spacing: {
        // Traditional proportions inspired by Vietnamese architecture
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },

      boxShadow: {
        // Warm, soft shadows
        'bep-sm': '0 1px 2px 0 rgba(74, 56, 41, 0.05)',
        'bep': '0 4px 6px -1px rgba(74, 56, 41, 0.1), 0 2px 4px -1px rgba(74, 56, 41, 0.06)',
        'bep-md': '0 10px 15px -3px rgba(74, 56, 41, 0.1), 0 4px 6px -2px rgba(74, 56, 41, 0.05)',
        'bep-lg': '0 20px 25px -5px rgba(74, 56, 41, 0.1), 0 10px 10px -5px rgba(74, 56, 41, 0.04)',
        'bep-xl': '0 25px 50px -12px rgba(74, 56, 41, 0.25)',
        'bep-glow': '0 0 15px rgba(212, 70, 56, 0.3)',
      },

      borderRadius: {
        // Slightly softer than default
        'bep-sm': '0.25rem',
        'bep': '0.5rem',
        'bep-md': '0.625rem',
        'bep-lg': '0.75rem',
        'bep-xl': '1rem',
      },

      backdropBlur: {
        'bep': '8px',
      },

      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },

      backgroundImage: {
        'bamboo-texture': "url('/images/patterns/bamboo-texture.svg')",
        'vietnamese-pattern': "url('/images/patterns/vietnamese-pattern.svg')",
        'warm-gradient': 'linear-gradient(135deg, #F5EBD9 0%, #EBD9BC 100%)',
        'red-gradient': 'linear-gradient(135deg, #D44638 0%, #B73529 100%)',
      },

      transitionDuration: {
        '400': '400ms',
      },

      transitionTimingFunction: {
        'bep': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    // Custom plugin for Bep Hue utilities
    function({ addUtilities }) {
      const newUtilities = {
        '.bg-bamboo-pattern': {
          'background-image': 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212, 165, 116, 0.05) 10px, rgba(212, 165, 116, 0.05) 20px)',
        },
        '.hover-lift': {
          'transition': 'transform 0.3s ease, box-shadow 0.3s ease',
        },
        '.hover-lift:hover': {
          'transform': 'translateY(-4px) scale(1.02)',
          'box-shadow': '0 12px 24px -6px rgba(74, 56, 41, 0.15)',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}

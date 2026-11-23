/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#171717',
          hover: '#262626',
          dark: '#0e0e0e'
        },
        secondary: {
          DEFAULT: '#F7F5F0',
          hover: '#eeebe3'
        },
        accent: {
          DEFAULT: '#C6A477',
          hover: '#B39164',
          light: '#F5EDE1',
          subtle: 'rgba(198, 164, 119, 0.15)'
        },
        surface: {
          DEFAULT: '#F3F1ED',
          hover: '#ECE9E3',
          card: '#FFFFFF'
        },
        darkText: '#202020',
        mutedText: '#777777',
        borderSubtle: '#E9E6E0',
        borderDark: '#D4D0C7',
        success: {
          DEFAULT: '#23865B',
          bg: '#EAF5EF'
        },
        error: {
          DEFAULT: '#D94A4A',
          bg: '#FDEEEE'
        },
        warning: {
          DEFAULT: '#E08C2A',
          bg: '#FDF5EA'
        }
      },
      fontFamily: {
        heading: ['var(--font-manrope)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif']
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.04)',
        'card': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'hover': '0 12px 30px rgba(0, 0, 0, 0.08)',
        'drawer': '-10px 0 40px rgba(0, 0, 0, 0.12)'
      },
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px'
      }
    },
  },
  plugins: [],
};

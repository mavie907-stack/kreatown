/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange:      '#f4732a',
          'orange-light': '#ff9555',
          'orange-pale':  '#fff0e6',
          yellow:      '#fbbf24',
          'yellow-pale':  '#fffbeb',
          cream:       '#fffbf5',
          'cream-2':   '#fff8ee',
          brown:       '#2d2118',
          muted:       '#9c8878',
        },
      },
      fontFamily: {
        display: ['Cabinet Grotesk', 'sans-serif'],
        body:    ['Nunito', 'sans-serif'],
        mono:    ['DM Mono', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        brand:    '0 4px 24px rgba(244,115,42,0.08)',
        'brand-lg': '0 12px 48px rgba(244,115,42,0.14)',
      },
    },
  },
  plugins: [],
}

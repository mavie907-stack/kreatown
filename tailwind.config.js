// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream:   { DEFAULT: '#fffbf5', dark: '#f5efe3' },
        brown:   { DEFAULT: '#1a1612', mid: '#4a3728' },
        muted:   '#9c8878',
        orange:  { DEFAULT: '#f4732a', light: '#ff9555', pale: '#fff0e6' },
        gold:    { DEFAULT: '#c9952a', light: '#f5d58a', pale: '#fdf4dc' },
        silver:  '#8fa3b5',
        palace:  { DEFAULT: '#7c5cbf', light: '#b8a0e8', pale: '#f2eefb' },
        emerald: '#2dab80',
        // Dark dashboard
        dark:    { DEFAULT: '#0e0c0a', 2: '#161310', 3: '#1e1a16', 4: '#252018' },
      },
      fontFamily: {
        sans:    ['var(--font-dm-sans)', 'DM Sans', 'sans-serif'],
        display: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        mono:    ['var(--font-dm-mono)', 'DM Mono', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'orange': '0 4px 20px rgba(244,115,42,0.3)',
        'orange-lg': '0 8px 36px rgba(244,115,42,0.4)',
        'palace': '0 4px 20px rgba(124,92,191,0.3)',
        'gold': '0 4px 20px rgba(201,149,42,0.3)',
      },
      animation: {
        'float':       'float 3s ease-in-out infinite',
        'bounce-slow': 'avatarBounce 3s ease-in-out infinite',
        'wave-flag':   'waveFlag 1.5s ease-in-out infinite',
        'fill-bar':    'fillBar 1.5s ease forwards',
        'fade-up':     'fadeUp 0.6s ease both',
        'pop-in':      'popIn 0.5s cubic-bezier(.34,1.56,.64,1) both',
        'pulse-dot':   'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        float:       { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        avatarBounce:{ '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-7px)' } },
        waveFlag:    { '0%,100%': { transform: 'skewX(0deg)' }, '50%': { transform: 'skewX(-8deg)' } },
        fillBar:     { from: { width: '0' }, to: { width: 'var(--fill-width)' } },
        fadeUp:      { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        popIn:       { from: { transform: 'scale(0)' }, to: { transform: 'scale(1)' } },
        pulseDot:    { '0%,100%': { transform: 'scale(1)', opacity: '1' }, '50%': { transform: 'scale(1.3)', opacity: '0.7' } },
      },
    },
  },
  plugins: [],
}

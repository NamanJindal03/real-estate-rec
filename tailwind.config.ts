import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        foreground: 'var(--text)',
        muted: 'var(--muted)',
        gold: 'var(--gold)',
        teal: 'var(--teal)',
      },
      fontFamily: {
        display: ['Space Grotesk Variable', 'sans-serif'],
        sans: ['Inter Variable', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 70px rgba(0, 0, 0, 0.25)',
      },
    },
  },
}

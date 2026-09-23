export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: true,
  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint'],

  css: ['~/assets/css/main.css'],

  typescript: {
    strict: true,
    typeCheck: true,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'theme-color', content: '#09090b' },
        {
          name: 'description',
          content: 'Explore Berkeley Square North with Rechitta, your personal property guide.',
        },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/images/figma/logo.png' }],
    },
  },

  routeRules: {
    '/api/**': { headers: { 'Cache-Control': 'no-store' } },
    '/images/**': { headers: { 'Cache-Control': 'public, max-age=300, s-maxage=300' } },
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
  },
})

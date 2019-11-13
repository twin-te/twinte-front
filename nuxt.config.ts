import { Configuration } from '@nuxt/types'

const nuxtConfig: Configuration = {
  buildModules: ['@nuxt/typescript-build'],
  mode: 'universal',
  srcDir: 'src/',
  server: {
    port: 5000,
    host: 'localhost',
  },
  head: {
    titleTemplate: 'Twinte',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'noindex' },
    ],
  },
  loading: {
    color: 'teal',
    height: '5px',
  },
  css: ['@/assets/css/main.scss'],
  modules: [
    '@nuxtjs/pwa',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-133970007-1',
      },
    ],
  ],
  plugins: [],
  workbox: {
    dev: false,
  },
  build: {
    analyze: true,
  },
  meta: {
    mobileAppIOS: true,
    appleStatusBarStyle: false,
    lang: 'ja',
    nativeUI: true,
  },
  manifest: {
    name: 'Twin:te',
    short_name: 'Twin:te',
    lang: 'ja',
    start_url: '/',
    display: 'standalone',
  },
  features: {
    store: true,
    layouts: true,
    meta: true,
    middleware: false,
    transitions: true,
    deprecations: true,
    validate: false,
    asyncData: false,
    fetch: true,
    clientOnline: true,
    clientPrefetch: true,
    clientUseUrl: true,
    componentAliases: true,
    componentClientOnly: true,
  },
}

module.exports = nuxtConfig

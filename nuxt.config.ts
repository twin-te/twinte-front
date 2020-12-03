import { NuxtConfig } from '@nuxt/types'

const baseName = process.env.BASE_NAME || 'Twin:te'
const baseDesc =
  process.env.BASE_DISC || '筑波大学専用の時間割アプリケーションです'
const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
const baseDir = process.env.BASE_DIR || '/'

const nuxtConfig: NuxtConfig = {
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    '@nuxtjs/stylelint-module',
  ],
  ssr: true,
  srcDir: 'src',
  fetchOnServer: false,
  env: {
    baseName,
    baseDesc,
    baseUrl,
  },
  router: {
    base: baseDir,
  },
  server: {
    port: process.env.PORT || 5000,
    host: 'localhost',
  },
  head: {
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#',
    },
    title: baseName,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: baseDesc },
      { hid: 'og:site_name', property: 'og:site_name', content: baseName },
      { hid: 'og:type', property: 'og:type', content: 'summary_large_image' },
      { hid: 'og:url', property: 'og:url', content: baseUrl },
      { hid: 'og:title', property: 'og:title', content: baseName },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://www.twinte.net/ogp.jpg',
      },
      { hid: 'og:description', property: 'og:description', content: baseDesc },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${baseUrl}/icon.png`,
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      { hid: 'twitter:site', name: 'twitter:site', content: '@te_twin' },
    ],
  },
  typescript: {
    typeCheck: true,
  },
  loadingIndicator: {
    name: 'cube-grid',
    color: 'teal',
    color2: 'grey',
    background: 'white',
  },
  loading: {
    color: 'teal',
    height: '5px',
  },
  css: ['@/web/assets/css/main'],
  styleResources: {
    scss: ['@/web/assets/css/variable.scss'],
  },
  stylelint: {
    fix: true,
    formatter: 'prettier-stylelint',
  },
  plugins: [
    { src: '@/plugins/ga.js', mode: 'client' },
    '@/plugins/api',
    '@/plugins/dependencies',
  ],
  modules: ['@nuxtjs/pwa', '@nuxtjs/sentry', '@nuxtjs/dayjs', '@nuxtjs/axios'],
  axios: {
    baseURL: process.env.API_URL || 'https://api.twinte.net/v1',
  },
  sentry: {
    dsn: process.env.SENTRY_DSN || '',
    disabled: process.env.NODE_ENV != 'production',
  },
  dayjs: {
    locales: ['ja'],
  },
  workbox: {
    dev: false,
    runtimeCaching: [
      {
        urlPattern: '^https://fonts.(?:googleapis|gstatic).com/(.*)',
        handler: 'cacheFirst',
      },
      {
        urlPattern: baseDir + 'lib/.*',
        handler: 'cacheFirst',
        strategyOptions: {
          cacheName: 'image-cache',
          cacheExpiration: {
            maxEntries: 20,
            maxAgeSeconds: 24 * 60 * 60 * 30,
          },
        },
      },
    ],
  },
  build: {
    analyze: false,
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
  dir: {
    app: 'app',
    middleware: 'middleware',
    store: 'adapter/store',
    assets: 'web/assets',
    layouts: 'web/layouts',
    pages: 'web/pages',
    static: 'web/static',
  },
}

module.exports = nuxtConfig

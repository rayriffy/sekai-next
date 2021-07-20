const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

const withPlugins = require('next-compose-plugins')

// const withOffline = require('next-offline')
const withPreact = require('next-plugin-preact')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

dayjs.extend(utc)
dayjs.extend(timezone)

module.exports = withPlugins(
  [
    [withPreact],
    [withBundleAnalyzer],
  ],
  {
    target: 'serverless',
    analyticsId: '8IiZe32S3qEvfNoZOPXTkEuio2C',
    env: {
      buildNumber: dayjs.tz(dayjs(), 'Asia/Tokyo').format('YYYYMMDD.HH'),
    },
    future: {
      excludeDefaultMomentLocales: true,
    },
    images: {
      deviceSizes: [
        200,
        250,
        300,
        350,
        400,
        450,
        500,
        550,
        600,
        640,
        750,
        828,
        1080,
        1200,
        1920,
        2048,
        3840,
      ],
      domains: ['sekai-res.dnaroma.eu'],
    },
    experimental: {
      modern: true,
      polyfillsOptimization: true,
      scrollRestoration: true,
    },
    // next-offline configuration
    async rewrites() {
      return [
        {
          source: '/service-worker.js',
          destination: '/_next/static/service-worker.js',
        },
        {
          source: '/subscribe/virtual-lives.ics',
          destination: '/api/virtualLiveFeed',
        },
        {
          source: '/sitemap.xml',
          destination: '/api/generateSitemap',
        },
        {
          source: '/static/chart/:chartId/:difficulty.svg',
          destination: `/api/generateChart/:chartId/:difficulty`,
        },
      ]
    },
    async redirects() {
      return [
        {
          source: '/public/:slug*',
          destination: '/:slug*',
          permanent: true,
        },
      ]
    },
    dontAutoRegisterSw: true,
    workboxOpts: {
      swDest: process.env.NEXT_EXPORT
        ? 'service-worker.js'
        : 'static/service-worker.js',
      runtimeCaching: [
        // if you are customizing your runtime cache rules, please note that the
        // first item in the runtime cache configuration array MUST be "start-url"
        {
          // MUST be the same as "start_url" in manifest.json
          urlPattern: '/',
          // use NetworkFirst or NetworkOnly if you redirect un-authenticated user to login page
          // use StaleWhileRevalidate if you want to prompt user to reload when new version available
          handler: 'NetworkFirst',
          options: {
            // don't change cache name
            cacheName: 'start-url',
          },
        },
        {
          urlPattern: /\/_next\/image\?url/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'next-image-assets',
          },
        },
        {
          urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts',
          },
        },
        {
          urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'static-font-assets',
          },
        },
        {
          urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'static-image-assets',
          },
        },
        {
          urlPattern: /\.(?:js)$/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'static-js-assets',
          },
        },
        {
          urlPattern: /\.(?:css|less)$/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'static-style-assets',
          },
        },
        {
          urlPattern: /\.(?:json|xml|csv)$/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'static-data-assets',
          },
        },
        {
          urlPattern: /.*/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'others',
            expiration: {
              maxEntries: 32,
              maxAgeSeconds: 24 * 60 * 60, // 24 hours
            },
            networkTimeoutSeconds: 10,
          },
        },
      ],
    },
  }
)

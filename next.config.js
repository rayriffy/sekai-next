const moment = require('moment-timezone')

const withPlugins = require('next-compose-plugins')

const withWorkers = require('@zeit/next-workers')
// const withOffline = require('next-offline')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins(
  [
    // [withOffline],
    [withWorkers],
    [withBundleAnalyzer],
  ],
  {
    target: 'serverless',
    analyticsId: '8IiZe32S3qEvfNoZOPXTkEuio2C',
    env: {
      buildNumber: moment().tz('Asia/Tokyo').format('YYYYMMDD.HH'),
    },
    future: {
      excludeDefaultMomentLocales: true,
    },
    images: {
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

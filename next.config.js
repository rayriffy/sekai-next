const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

const withPlugins = require('next-compose-plugins')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

dayjs.extend(utc)
dayjs.extend(timezone)

module.exports = withPlugins([[withBundleAnalyzer]], {
  env: {
    buildNumber: dayjs.tz(dayjs(), 'Asia/Tokyo').format('YYYYMMDD.HH'),
  },
  future: {
    excludeDefaultMomentLocales: true,
  },
  images: {
    domains: ['minio.dnaroma.eu'],
  },
  async rewrites() {
    return [
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
})

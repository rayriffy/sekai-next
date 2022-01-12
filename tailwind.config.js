const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  content: [
    './src/**/*.html',
    './src/**/*.tsx',
    './src/**/*.ts',
    './src/**/*.jsx',
    './src/**/*.js',
  ],
  theme: {
    filter: {
      none: 'none',
      blur: 'blur(15px)',
    },
    backdropFilter: {
      none: 'none',
      blur: 'blur(5px)',
      'blur-heavy': 'blur(20px)',
    },
    extend: {
      colors: {
        white: '#FFFFFF',
        black: '#000000',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      backgroundColor: {
        'black-overlay': 'rgba(0, 0, 0, 0.60)',
      },
      zIndex: {
        hide: -1,
      },
      scale: {
        102: '1.02',
      },
      width: {
        '1/13': '7.6923077%',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-filters'),
  ],
}

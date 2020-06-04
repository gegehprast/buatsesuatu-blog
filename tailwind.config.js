/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const _ = require('lodash')
var flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default

module.exports = {
    purge: {
        enabled: process.env.NODE_ENV === 'production',
        content: ['./components/**/*.tsx', './pages/**/*.tsx'],
    },
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    'Inter',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    'Roboto',
                    '"Helvetica Neue"',
                    'Arial',
                    '"Noto Sans"',
                    'sans-serif',
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    '"Noto Color Emoji"',
                ],
            },
        },
    },
    variants: {},
    plugins: [
        function({ addUtilities, e, theme, variants }) {
            const colors = flattenColorPalette(theme('borderColor'))

            const utilities = _.flatMap(_.omit(colors, 'default'), (value, modifier) => ({
                [`.${e(`border-t-${modifier}`)}`]: { borderTopColor: `${value}` },
                [`.${e(`border-r-${modifier}`)}`]: { borderRightColor: `${value}` },
                [`.${e(`border-b-${modifier}`)}`]: { borderBottomColor: `${value}` },
                [`.${e(`border-l-${modifier}`)}`]: { borderLeftColor: `${value}` },
            }))

            addUtilities(utilities, variants('borderColor'))
        }
    ],
    corePlugins: {
        backgroundOpacity: false,
        textOpacity: false,
    }
}

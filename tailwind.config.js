/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const _ = require('lodash')
var flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default

module.exports = {
    content: [
        './components/**/*.tsx', './pages/**/*.tsx',
    ],
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
            screens: {
                'xxl-1344': '1344px',
                'xxl-1920': '1920px',
                'xxl-4k': '2560px',
            },
            spacing: {
                '190-px': '190px',
                '210-px': '210px',
                '480-px': '480px',
            },
            minHeight: {
                '20': '20rem',
                '24': '24rem',
                '28': '28rem',
                '32': '32rem',
                '38': '38rem',
                '42': '42rem',
                '46': '46rem',
                '320-px': '320px',
                '400-px': '400px',
                '480-px': '480px',
                '80-screen': '80vh',
            },
            maxHeight: {
                '20': '20rem',
                '24': '24rem',
                '28': '28rem',
                '32': '32rem',
                '38': '38rem',
                '42': '42rem',
                '46': '46rem',
                '320-px': '320px',
                '400-px': '400px',
                '480-px': '480px',
                '80-screen': '80vh',
            },
            boxShadow: {
                'bs': '0 0px 15px 0px rgba(0, 0, 0, 0.20), 0 5px 10px 0px rgba(0, 0, 0, 0.20)',
            }
        },
    },
    variants: {
        backgroundColor: ['responsive', 'hover', 'focus', 'active'],
        textColor: ['responsive', 'hover', 'focus', 'visited'],
    },
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
    ]
}

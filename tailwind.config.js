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
            keyframes: {
                drop: {
                    '0%': {
                        transform: 'translateY(-1000px)',
                        opacity: 3,
                    },
                    '80%': {
                        transform: 'translateY(0)',
                        opacity: 3,
                    },
                    '100%': {
                        transform: 'translateY(-40px)',
                        opacity: 3,
                    },
                },
                ripple: {
                    '0%': {
                        transform: 'translate(-50%, -50%) rotateX(90deg) scale(0) translateZ(-37px)',
                        opacity: 2,
                    },
                    '100%': {
                        transform: 'translate(-50%, -50%) rotateX(90deg) scale(2) translateZ(-37px)',
                        opacity: 0,
                    }
                },
                rotation: {
                    '0%': {
                        transform: 'rotateY(0deg)'
                    },
                    '100%': {
                        transform: 'rotateY(360deg)'
                    }
                }
            },
            animation: {
                drop: 'drop 5000ms linear infinite',
                ripple: 'ripple 5000ms ease-out infinite',
                rotation: 'rotation linear infinite',
            },
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

        fontFamily: {
            'lovely': ['lovely'],
            'ayuku': ['ayuku'],
            'LoveConchetta': ['"Love Conchetta"'],
        }
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

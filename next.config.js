/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    images: {
        domains: ['i.imgur.com'],
    },
    rewrites: async () => {
        return [
            {
                source: '/sesuatu/:customPage',
                destination: '/sesuatu/:customPage/index.html',
            },
            {
                source: '/sesuatu/:customPage/js/:jsFile',
                destination: '/sesuatu/:customPage/js/:jsFile',
            },
            {
                source: '/sesuatu/:customPage/img/:imgFile',
                destination: '/sesuatu/:customPage/img/:imgFile',
            },
        ]
    }
}

// eslint-disable-next-line no-undef
module.exports = nextConfig
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
        ]
    }
}

// eslint-disable-next-line no-undef
module.exports = nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ['en', 'es-ES'],
        defaultLocale: 'es-ES',
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/dashboard',
                permanent: true,
            },
        ]
    }
}

module.exports = nextConfig

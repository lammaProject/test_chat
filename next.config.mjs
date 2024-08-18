/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 64],
        minimumCacheTTL: 1200,
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/chat',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;

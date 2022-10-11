/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    devIndicators: {
        buildActivity: true,
    },
    output: 'standalone',
};

module.exports = nextConfig;

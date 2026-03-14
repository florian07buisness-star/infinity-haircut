/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/infinity-haircut',
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
};

export default nextConfig;

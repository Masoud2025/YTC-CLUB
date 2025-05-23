/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: { watchOptions: { ignored: string[] } }) => {
    config.watchOptions = {
      ignored: [
        '**/Application Data/**',
        '**/AppData/**',
        '**/node_modules/**',
      ],
    };
    return config;
  },
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;

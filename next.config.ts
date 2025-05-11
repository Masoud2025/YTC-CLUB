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
};

module.exports = nextConfig;

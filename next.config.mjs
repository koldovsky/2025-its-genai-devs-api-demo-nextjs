/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        '*.app.github.dev',
        'expert-space-train-jqx5gg4vjx35rgv-3000.app.github.dev'
      ]
    }
  }
};

export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com', // ЭТОТ КОД РАЗРЕШАЕТ ПОКАЗ ФОТО
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

// env: {
//     DATABASE_URL: - использую из самого Versel
//     },

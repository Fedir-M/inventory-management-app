import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    DATABASE_URL:
      'postgresql://neondb_owner:npg_pTmEyo3F7DiM@ep-steep-smoke-algkp36f-pooler.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require',
  },
};

export default nextConfig;

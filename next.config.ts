import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  // IMPORTANTE para Capacitor
  images: {
    unoptimized: true,
  },

  // Opcional pero recomendado
  trailingSlash: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  // Configuración para Turbopack (Next.js 16)
  turbopack: {},
  // Headers para PWA
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate'
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/'
          }
        ]
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json'
          }
        ]
      }
    ]
  }
};

export default nextConfig;

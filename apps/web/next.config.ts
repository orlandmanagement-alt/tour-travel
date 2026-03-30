/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // <--- BARIS PALING PENTING
  distDir: 'out',   // Memastikan folder output bernama 'out'
  images: {
    unoptimized: true, // Wajib ada untuk mode export statis
  },
};

module.exports = nextConfig;
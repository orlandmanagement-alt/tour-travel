/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Ini akan memaksa Next.js menghasilkan folder 'out'
  images: {
    unoptimized: true, // Wajib jika menggunakan output: export
  },
};

module.exports = nextConfig;
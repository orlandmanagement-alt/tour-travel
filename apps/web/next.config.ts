/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',      // <--- WAJIB: Ini yang membuat folder 'out' muncul
  trailingSlash: true,   // Membantu routing di Cloudflare Pages
  images: {
    unoptimized: true,   // Wajib untuk mode export
  },
};

module.exports = nextConfig;
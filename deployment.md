🚀 Antigravity Deployment Standard Operating Procedure (SOP)Dokumen ini berisi aturan wajib untuk deployment aplikasi berbasis Next.js, Cloudflare Workers, dan D1 Database dalam struktur monorepo.1. Konfigurasi Next.js (Cloudflare Pages)Untuk menghindari error 404 Not Found dan kegagalan prerendering, aturan berikut wajib dipatuhi:A. Output Statis (Wajib untuk Pages)Setiap next.config.js di dalam folder apps/* harus menggunakan mode export statis kecuali jika menggunakan adapter @cloudflare/next-on-pages.JavaScript// next.config.js
const nextConfig = {
  output: 'export',    // Menghasilkan folder 'out'
  trailingSlash: true, // Wajib agar routing sub-folder tidak 404
  images: {
    unoptimized: true, // Mode export tidak mendukung optimasi gambar default Next.js
  },
};
B. Penanganan Route Dinamis ([id])Dilarang membiarkan route dinamis tanpa fallback statis. Tambahkan fungsi berikut di setiap page.tsx yang menggunakan parameter:TypeScriptexport function generateStaticParams() {
  return []; // Return array kosong untuk bypass build-time generation
}
export const dynamicParams = false; // Wajib false untuk mode 'output: export'
C. Penanganan searchParamsNext.js 15+ akan error saat build jika membaca searchParams langsung di Server Component tanpa Suspense.Aturan: Bungkus komponen yang membaca URL params dengan <Suspense>.2. Cloudflare Pages Dashboard SettingsSaat membuat project baru di Dashboard Cloudflare, gunakan pengaturan ini:FieldSettingFramework PresetNone (Jangan pilih Next.js agar tidak konflik dengan Turbo)Build Commandnpx turbo run build --filter=<NAMA_APP> -- --webpackBuild Output Directoryapps/<NAMA_APP>/outRoot Directory/ (Biarkan kosong/root monorepo)Environment Variables Wajib:NODE_VERSION: 22.16.0 (atau versi terbaru stabil).NEXT_TURBOPACK_BUILD: false (Gunakan Webpack untuk stabilitas build monorepo).3. Cloudflare Workers & D1 DatabaseA. Binding DatabaseJangan pernah hardcode database_id yang bersifat sementara. Selalu cek ID terbaru melalui CLI sebelum push.Bash# Cek ID database aktif
npx wrangler d1 list
B. Struktur wrangler.tomlPastikan preview_database_id juga diisi jika menggunakan environment preview.Ini, TOML[[d1_databases]]
binding = "DB"
database_name = "nusantaratrip_db"
database_id = "xxxx-xxxx-xxxx" # Pastikan sinkron dengan Cloudflare Dashboard
4. Manajemen Dependensi (Monorepo)A. Masalah "Module Not Found"Jika build Cloudflare mengeluh enhanced-resolve atau postcss tidak ditemukan:Hapus package-lock.json di lokal.Jalankan npm install <package> -D di level root monorepo (bukan di dalam apps).Push ulang package-lock.json yang baru.B. Urutan Pembersihan CacheJika build gagal tanpa alasan jelas setelah perubahan kode:Dashboard Cloudflare > Deployments > Clear Cache.Lokal: rd /s /q .turbo dan npm install.5. Checklist Sebelum Git Push[ ] npm install sudah dijalankan di root dan package-lock.json terupdate.[ ] Tidak ada referensi localhost:8787 (Gunakan process.env.NEXT_PUBLIC_API_URL).[ ] Fungsi generateStaticParams() sudah ada di semua route dinamis.[ ] next.config.js sudah memiliki output: 'export'.[ ] File package.json tidak memiliki karakter aneh/invalid version (cek baris packageManager).Antigravity Dev Team Last Updated: 2026-03-30


Simpan kode di bawah ini sebagai file .gitignore di folder paling luar (root) tour-travel/:

Code snippet
# --- Dependencies ---
node_modules/
.npm
/.pnp
.pnp.js

# --- Next.js Build Output ---
.next/
out/
build/

# --- Turborepo & Build Tools ---
.turbo/
dist/
.cache/

# --- Cloudflare & Wrangler ---
.wrangler/
.dev.vars
wrangler-debug.log*
.miniflare/

# --- Databases (SQLite/D1 Local) ---
.sqlite
*.db
*.db-journal

# --- Environment Variables ---
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.env*.local

# --- Operating System ---
.DS_Store
Thumbs.db
desktop.ini

# --- IDE & Editors ---
.vscode/
.idea/
*.swp
*.swo
.project
.classpath
.settings/

# --- Logs ---
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
Mengapa file ini penting untuk Antigravity?
Mencegah Konflik Cache: Folder .turbo dan .next menyimpan hasil build komputer kamu. Jika terupload, Cloudflare bisa bingung karena mencoba menggunakan cache Windows di server Linux mereka.

Keamanan API & DB: File .env.local dan .dev.vars biasanya berisi password database atau API Key. Sangat berbahaya jika sampai bocor ke publik di GitHub.

Wrangler State: Folder .wrangler menyimpan database D1 versi lokal. Kita ingin Cloudflare membuat database-nya sendiri secara fresh di server, bukan mengambil database testing dari PC kamu.
# NusantaraTrip Travel Platform 🇮🇩

Platform pemesanan tour travel modern untuk destinasi wisata di Indonesia. Dibangun dengan menggunakan arsitektur monorepo (Next.js & Cloudflare Workers).

---

## ✅ Checklist Fitur yang Sudah Selesai

- [x] **Monorepo Setup**: Konfigurasi Turborepo, `apps/web`, `apps/admin`, `apps/api`.
- [x] **Database (Cloudflare D1)**: Schema database lengkap 12 tabel (Tours, Surcharges, Bookings, Categories, dll).
- [x] **Backend API (Cloudflare Workers)**: Controller untuk Routing API (`/api/tours`, `/api/bookings`, `/api/custom-trips`, `/api/admin/metrics`).
- [x] **Web Customer (`apps/web`)**: 
  - Landing Page Dinamis dengan Filter Search.
  - Katalog Tour dengan filter sidebar.
  - Detail Page dengan Kalkulator Harga dinamis (memperhitungkan addons & pajak).
  - Multi-step Checkout & Bukti Booking.
  - Tracker Order & Custom Trip Request Builder.
- [x] **Admin Portal (`apps/admin`)**:
  - Dashboard statistik pendapatan & order.
  - Multi-tab UI untuk Master Data Management (CRUD tabel dasar).
  - Wizard 4-Step untuk membuat paket Tour baru.
  - Manajemen Booking (Approve pembayaran).
  - CRM Custom Trip Requests.

---

## 🚀 Tasks Finalisasi (Siap Deploy Production)

Daftar pekerjaan berikut adalah proses terakhir sebelum merilis aplikasi ke publik (Production di Cloudflare):

- [ ] **Binding URL Frontend ke API Worker**: Ubah *hardcoded* URL `http://127.0.0.1:8787` di `apps/web` dan `apps/admin` dengan URL Production Cloudflare Worker kamu (cth: `https://api.nusantaratrip.workers.dev`).
- [ ] **Setup Cloudflare R2 (Storage Gambar)**: Konfigurasi Bucket R2 untuk mengupload foto asli Tour dan mengintegrasikannya ke Admin Wizard. Saat ini sistem masih menggunakan gambar placeholder statis.
- [ ] **Aktifkan Autentikasi JWT Auth Asli**: Sambungkan fungsi `AdminController` Login ke Next.js Middleware di `apps/admin`. Saat ini masih menggunakan *client-side mock*.
- [ ] **Integrasi API Payment Gateway (Midtrans/Xendit)**: Ganti sistem konfirmasi "Manual Bank Transfer" dengan Webhook dari Midtrans agar status di tabel `bookings` D1 berubah secara otomatis.
- [ ] **Notifikasi Real-time WhatsApp**: Mengaktifkan script API Fonnte/Twilio di Cloudflare Workers agar setiap order baru atau PDF invoice otomatis dikirimkan ke WhatsApp API pelanggan.
- [ ] **Optimasi SEO & Next.js Caching**: Konfigurasi ISR (Incremental Static Regeneration) NextRouter agar katalog Tour di-cache CDN dan meminimalisir read data beruntun ke Cloudflare D1.

---

## 🛠 Panduan Setup & Deploy ke Cloudflare

Projek ini menggunakan **Cloudflare Workers** untuk backend API dan **Cloudflare D1** untuk relational database.

### 1. Prasyarat & Login Cloudflare
Pastikan kamu telah menginstall `nodema` & `wrangler` secara global, kemudian login ke akun Cloudflare kamu:
```bash
npm install -g wrangler
npx wrangler login
```

### 2. Setup Database D1
Buat database D1 baru di Cloudflare:
```bash
npx wrangler d1 create nusantaratrip-db
```
*(Wrangler akan mengembalikan `database_name` dan `database_id`. Copy nilai tersebut).*

Buka file `apps/api/wrangler.toml` dan update ID database kamu:
```toml
[[d1_databases]]
binding = "DB"
database_name = "nusantaratrip-db"
database_id = "ISI_DENGAN_ID_DATABASE_CLOUDFLARE_KAMU_DISINI"
```

### 3. Eksekusi Skema & Seed Data
Jalankan perintah berikut pada terminal untuk membuat tabel dan mengisi data dummy ke dalam database lokal maupun production Cloudflare:

**Local D1 (Untuk testing dev)**:
```bash
npx wrangler d1 execute nusantaratrip-db --local --file=./apps/api/src/db/schema.sql
npx wrangler d1 execute nusantaratrip-db --local --file=./apps/api/src/db/seed.sql
```

**Production D1 (Remote Cloudflare)**:
```bash
npx wrangler d1 execute nusantaratrip-db --remote --file=./apps/api/src/db/schema.sql
npx wrangler d1 execute nusantaratrip-db --remote --file=./apps/api/src/db/seed.sql
```

### 4. Menjalankan Aplikasi Lokal
Jalankan seluruh services (Backend, Web Frontend, Admin Portal) secara bersamaan menggunakan Turborepo (pastikan berada di *root* folder):
```bash
npm install
npm run dev
```

Platform akan berjalan pada:
- **API Worker**: `http://localhost:8787`
- **Customer Web**: `http://localhost:3000`
- **Admin Portal**: `http://localhost:3001` *(Tergantung port spesifik nextjs)*

---

## 🔒 Konfigurasi Environment Variables & Secrets

Untuk API pihak ketiga seperti gateway pembayaran (Midtrans/Xendit) atau Notifikasi WhatsApp (Fonnte), kita gunakan Cloudflare Secrets.

Tambahkan secrets berikut ke Workers kamu:
```bash
npx wrangler secret put MIDTRANS_SERVER_KEY
npx wrangler secret put WA_API_KEY
npx wrangler secret put JWT_SECRET
```
*Untuk testing lokal, kamu dapat membuat file `.dev.vars` di dalam `apps/api/` berupa:*
```env
MIDTRANS_SERVER_KEY=SB-Mid-server-XXXX
WA_API_KEY=XXXXX
JWT_SECRET=super_secret_dev_key
```

---

## 👨‍💼 Akses Login Admin Portal

Karena saat ini API Auth untuk JWT belum disambungkan secara penuh (sedang menggunakan Mock/Dummy Authentication), kamu langsung dapat mengakses halaman web Admin dengan konfigurasi berikut:

- **URL Admin Portal**: `http://localhost:3001` (Cek port pada log `npm run dev`)
- **Email**: `admin@nusantaratrip.com`
- **Password**: `admin123`

### Cara Membuat Admin Pertama Kali (Jika Database sudah Online)
Saat ini Role-based Access Control (RBAC) pada D1 sudah disediakan (tabel `users`). Apabila nanti fitur Register sudah diaktifkan, kamu dapat membuat Super Admin pertama kali menggunakan query SQL langsung via *Cloudflare Dashboard -> D1 SQL Console*:

```sql
INSERT INTO users (email, password_hash, role, full_name, is_active) 
VALUES ('admin@nusantaratrip.com', '$2y$10$YourHashedPasswordHere', 'admin', 'Super Administrator', 1);
```
*(Catatan: pastikan `password_hash` sudah berupa hash Bcrypt dari password yang ingin kamu tentukan).*

PACK 5: Conversion-Optimized Checkout Flow (Frontend)
Area checkout adalah tempat di mana banyak pelanggan membatalkan pesanan. Desain Enterprise harus memberikan rasa aman, cepat, dan transparan.

Plaintext
Act as an Elite Conversion Rate Optimization (CRO) Frontend Engineer. Your task is to build a high-converting, Enterprise SaaS Checkout Flow for the Tour & Travel application (`app/checkout/[tourId]/page.tsx`).

Style Guide: Ultra-clean, high-contrast, Trust-inducing (Navy blue headers, green for success/savings, strict validation states).

Requirements:
1. Multi-Step Layout (No Page Reloads):
   - Create a horizontal stepper: Step 1: Customer Info -> Step 2: Add-ons & Pax -> Step 3: Payment.
   - Use React Hook Form + Zod for strict, instant inline validation (red borders for errors, green checks for valid inputs).
2. Sticky Order Summary (Right Column):
   - A sticky widget that updates instantly as the user changes Pax or selects Add-ons.
   - Must clearly show: Base Price x Pax, Selected Add-ons, Subtotal, Taxes/Fees, and Grand Total.
   - Include a psychological trigger: A subtle "High Demand" or "Hold Timer" (e.g., "We are holding this price for 10:00 minutes") to create urgency.
3. Trust Signals & Payment UX:
   - In Step 3, show mock Payment Gateway options (Virtual Account, Credit Card, QRIS) using interactive, selectable box cards.
   - Include visual trust badges (Secure Checkout, SSL icons) near the "Confirm & Pay" button.
4. State Management: Keep all checkout data in a global state (Zustand) or Context so if the user clicks 'Back', their data is not lost.

Generate `app/checkout/[tourId]/page.tsx`, `components/CheckoutStepper.tsx`, and `components/OrderSummaryWidget.tsx`.
📦 PACK 6: Customer Self-Service Portal (Frontend)
Aplikasi Enterprise mengurangi beban Customer Service dengan memberikan portal mandiri yang canggih bagi pelanggan.

Plaintext
Act as a Senior UX/UI Engineer. Create a Customer Dashboard / Self-Service Portal for users who have booked a tour (`app/dashboard/page.tsx`).

Style Guide: SaaS User Dashboard, clean sidebar navigation, card-based layout for data.

Requirements:
1. Layout:
   - Left Sidebar Menu: "My Bookings", "Profile", "Settings".
   - Main Content Area: Tabbed interface for Bookings ("Upcoming", "Completed", "Cancelled").
2. "My Bookings" Interface:
   - List bookings using beautiful horizontal cards. Each card shows: Tour Image, Tour Name, Dates, Booking Status (Badge: PAID, PENDING, CANCELLED), and Grand Total.
   - Action Buttons: "Download E-Ticket" (triggers a mock PDF download/modal), "Contact Guide" (WhatsApp link), and "Cancel Booking" (opens a danger-zone confirmation modal).
3. Booking Detail Modal:
   - Clicking a booking card opens a Slide-over Drawer or Modal showing the full breakdown: Itinerary reminder, Meeting Point map link, and breakdown of passengers.
4. Skeleton States: Implement robust Skeleton UI for the dashboard while fetching user booking history from the API.

Generate `app/dashboard/page.tsx`, `components/BookingCard.tsx`, and `components/TicketModal.tsx`.
📦 PACK 7: Admin Analytics & Security Audit (Backend/Admin)
Dashboard admin yang baik tidak hanya untuk input data, tapi untuk melihat "Kesehatan Bisnis" dan melacak siapa yang melakukan perubahan.

Plaintext
Act as a Senior SaaS Data Architect. Upgrade the Tour Admin Panel by adding Data Visualization and Security Audit modules.

Requirements:
1. Dashboard Overview (Analytics):
   - Update `app/admin/dashboard/page.tsx`.
   - Integrate a lightweight charting library (like Recharts or Chart.js).
   - Top Section: 4 Summary Cards (Total Revenue, New Bookings, Active Tours, Pending Actions) with percentage changes (e.g., "+12% from last month" in green).
   - Middle Section: A line chart showing "Revenue over the last 7 days" and a donut chart showing "Popular Destinations".
   - Bottom Section: A real-time data table of "Recent Transactions" with status badges.
2. Security & Audit Trail (System Logs):
   - Create a new page `app/admin/audit-logs/page.tsx`.
   - Enterprise SaaS requires accountability. Build a data grid that displays mock system logs (e.g., "Admin A updated Tour Price for Bromo", "Admin B deleted a Category").
   - Columns: Timestamp, User, Action Type (Badge: CREATE, UPDATE, DELETE), Target, and IP Address.
   - Include advanced filters: Filter by Date Range and Action Type.
3. Export Functionality: Add a "Download CSV" button on all data tables (Bookings, Master Data, Audit Logs) that converts the current table state into a downloadable CSV file using basic JavaScript Blob logic.

Generate `app/admin/dashboard/page.tsx` (with charts) and `app/admin/audit-logs/page.tsx`.

Mengapa Fitur Tambahan Ini Penting?
Checkout dengan Zod & React Hook Form (Pack 5): Validasi di sisi klien yang instan mencegah pengguna frustrasi karena error saat menekan tombol submit. Ini standar baku e-commerce modern.

Timer & Trust Badge (Pack 5): Elemen psikologis. Timer (meskipun hanya visual) mendorong pengguna untuk segera menyelesaikan pembayaran.

Portal Pelanggan (Pack 6): Pelanggan bisa melihat E-Ticket mereka sendiri. Ini memberi kesan bahwa agensi Anda sangat profesional dan berbasis teknologi.

Audit Trail (Pack 7): Jika ada tim admin yang tidak sengaja menghapus harga tour atau mengubah data, Anda bisa melacaknya di Audit Logs. Ini adalah syarat mutlak untuk aplikasi level Enterprise/Gov.


Daftar Validasi "Wajib" untuk Ekosistem SaaS Travel
Agar sistem tidak jebol dan data tidak kacau, ini daftar validasi yang wajib diterapkan baik di Frontend (untuk UX) maupun Backend (untuk Keamanan):

Timezone-Aware Date Validation: Mencegah booking di masa lalu. Harus menggunakan zona waktu lokal (WIB/Batu) sebagai acuan, bukan UTC server. Tambahkan Cut-off Time (misal: Tour Bromo tidak bisa dibooking H-1 di atas jam 17:00).

Server-Side Price Recalculation (Anti-Tampering): Frontend BUKAN penentu harga. Jika user mengirim payload { tourId: 1, total_price: 1000 } (diubah via Inspect Element), backend D1 wajib mengabaikan harga dari user dan menghitung ulang dari Master Data.

Capacity Constraint (Overbooking Prevention): Validasi pax (jumlah orang) tidak melebihi sisa kuota tour pada tanggal tersebut.

Idempotency (Anti Double-Booking): Jika user nge-klik tombol "Pay" berkali-kali karena lag, sistem harus mendeteksi request duplikat dan tidak membuat 2 tagihan beruntun.

Soft Deletes di Master Data: Jika sebuah "Lokasi" atau "Kategori" dihapus, data histori transaksi (Booking lama) tidak boleh error. Master data tidak boleh di-Delete permanen, melainkan hanya di- hide (is_active = false).

💎 2. Saran Tambahan yang Belum Disentuh (Next-Level SaaS)
Backend (Cloudflare D1/Workers):

Rate Limiting: Lindungi API pendaftaran dan checkout dari serangan bot/spam menggunakan Cloudflare Rate Limiting.

Batch Database Operations: Saat mengimpor 1000 baris CSV, jangan lakukan 1000x request ke D1. Gunakan D1 db.batch() agar selesai dalam 1 detik.

Frontend (Next.js):

Optimistic UI: Saat admin mengklik "Hapus/Ubah Status", tampilan web langsung berubah instan sebelum server membalas "Sukses". Ini membuat web terasa 10x lebih cepat.

Magic Link Login / Google SSO: User malas mengingat password. Untuk B2C Travel, login pakai akun Google atau link OTP ke email/WhatsApp akan menaikkan tingkat konversi.

📦 MASTER PROMPT AI UNTUK ANTIGRAVITY
Copy-paste prompt di bawah ini secara bertahap ke AI Anda.

📦 PACK 8: The "Bulk Engine" & Relational Master Data (Admin)
Fokus: Mengolah CSV langsung di browser tanpa membebani server, dan CRUD ringan yang saling berelasi.

Plaintext
Act as an Elite SaaS Data Architect. Upgrade the Tour Admin Panel to handle Bulk Imports and strictly relational Master Data.

Requirements:
1. Bulk CSV Engine (Client-Side Parsing):
   - Create a `BulkTourImport.tsx` component.
   - Use standard Web APIs or lightweight logic to parse an uploaded CSV/Excel file in the browser (Zero Server Load during parse).
   - Display a preview Data Grid of the parsed CSV so the admin can verify columns (Code, Name, Price, Destination) before clicking "Sync to Database".
   - The sync function must send the data in a clean JSON array to the Cloudflare Worker. The Worker MUST use D1 Batching (`db.batch()`) for lightning-fast inserts.
2. Lightweight Master Data UI & Relations:
   - Upgrade the Master Data tables using a lightweight UI strategy (e.g., TanStack Table style but CSS-only/Tailwind for speed).
   - Implement "Soft Deletes": Never use SQL `DELETE`. Add an `is_active` boolean toggle. If deactivated, it disappears from the "Create Tour" dropdowns but keeps past Booking records intact.
   - Enforce Relations: If a Location changes its name, all Tours referencing it must automatically reflect the change (via foreign keys or relational queries).

Generate `components/BulkTourImport.tsx` and provide the D1 SQL schema update for Soft Deletes.
📦 PACK 9: High-Conversion Registration & Auth (Frontend)
Fokus: Tampilan register yang sangat bersih, cepat, dan membuat user merasa aman.

Plaintext
Act as a SaaS Growth Hacker & UI Engineer. Create a High-Conversion Registration page (`app/register/page.tsx`).

Style Guide: Minimalist, Trust-inducing (white background, subtle shadows, enterprise typography). 

Requirements:
1. UI Layout:
   - Split screen on Desktop: Left side is a beautiful visual/testimonial from a happy traveler. Right side is the clean registration form.
2. The Form (Frictionless):
   - Only ask for essentials: Full Name, WhatsApp Number, Email, Password.
   - Add a mock "Sign up with Google" button with a sleek SVG icon (visually prominent).
3. Client-Side Validation (Instant Feedback):
   - Use Zod + React Hook Form.
   - Password strength meter (bars that turn green as length/complexity increases).
   - Instant inline error if email format is wrong.
4. State: Upon clicking register, show a spinner on the button, and transition to a beautiful "Success/Check your Email" state without a harsh page reload.

Generate `app/register/page.tsx` and its specific form components using Tailwind CSS.
📦 PACK 10: The Ironclad Validation Layer (Fullstack Safety)
Fokus: Melindungi ekosistem aplikasi dari input jahat, booking kadaluarsa, dan error harga.

Plaintext
Act as a Senior Security & Logic Engineer. We need to build an "Ironclad Validation Layer" for our Next.js + Cloudflare Workers SaaS.

Requirements:
1. Shared Zod Validation Schema (`lib/validations.ts`):
   - Create Zod schemas that will be used by BOTH the Frontend (React Hook Form) and Backend (Worker API) to ensure single-source-of-truth validation.
   - Define a `BookingSchema`.
2. Strict Date Constraints (Timezone-Aware):
   - Inside the schema, add a highly specific date validation: The `booking_date` MUST be strictly greater than `Date.now() + 24 hours` (Minimum 1-day lead time). 
   - Ensure the logic accounts for the local timezone (WIB/Asia_Jakarta) so a user booking at 11:59 PM doesn't crash the system.
3. Price Anti-Tampering Logic (Backend Mock):
   - Write a mock API handler function `processBooking(payload)`.
   - Explicitly comment and code the logic where the backend IGNORES the `total_price` sent by the client. The backend MUST query the D1 Database for the `base_price` of the `tour_id`, multiply by `pax`, add `addons`, and generate the final price server-side.
4. Capacity Check: Add a mock logic block checking if `current_pax + requested_pax > tour_max_capacity` before confirming.

Generate `lib/validations.ts` and the mock `api/checkout/route.ts` demonstrating the Ironclad logic.
Cara Mengeksekusi:
Mulai dari Pack 10 (Validasi): Suruh AI membuat file validasinya dulu. Kenapa? Karena logika pendaftaran dan checkout nanti akan sangat bergantung pada aturan yang dibuat di Pack 10.

Lanjut ke Pack 9 (Register): Buat antarmukanya.

Terakhir Pack 8 (Admin CSV): Karena fitur ini paling kompleks, kerjakan di akhir agar tidak mengganggu flow pelanggan utama.


PACK 11: The "Notion-Style" Itinerary Builder (Admin)
Fokus: Mengganti form input biasa menjadi pengalaman drag-and-drop yang intuitif untuk membuat jadwal perjalanan.

Plaintext
Act as an Elite SaaS UI/UX Engineer specializing in complex data entry interfaces. Your task is to upgrade the Tour Creation process in the Admin Panel by building a "Notion-Style" Itinerary Builder (`components/ItineraryBuilder.tsx`).

Style Guide: Extremely clean, drag-and-drop friendly, minimal borders, inline-editing focus (Enterprise SaaS).

Requirements:
1. Interactive Day/Activity Blocks:
   - Create a UI where an Admin can add a "Day" block. Inside each "Day", they can add multiple "Activity" blocks.
   - Activity Blocks must have inline editable fields (Time Start, Time End, Title, Description) that feel like editing a text document, not filling out a clunky form.
2. Drag and Drop Reordering:
   - Implement `dnd-kit` or `@hello-pangea/dnd` to allow admins to drag activities to reorder them within a day, or drag an activity to a different day.
3. Rapid Entry Mode & Utilities:
   - Add a "Duplicate Day" button to instantly copy a full day's itinerary.
   - Include a visual "Timeline Preview" toggle next to the builder so the admin can instantly see how the itinerary will look to the customer.
4. State Management:
   - Manage the complex nested array state (Days -> Activities) efficiently using React Hook Form's `useFieldArray` or a dedicated Zustand store to prevent unnecessary re-renders during drag-and-drop.

Generate `components/ItineraryBuilder.tsx` and ensure it outputs a clean JSON structure ready for the D1 Database.
📦 PACK 12: Interactive "Custom Trip" Wizard (Frontend)
Fokus: Membuat form permintaan perjalanan kustom (Custom Trip) yang interaktif, multi-step, dan mengumpulkan data secara cerdas (Lead Generation).

Plaintext
Act as a Senior Conversion Rate Optimization (CRO) Developer. Your task is to build an interactive, high-converting "Custom Trip Request" Wizard (`app/custom-trip/page.tsx`).

Style Guide: Consumer-facing SaaS, highly engaging, step-by-step progressive disclosure, large clickable interactive cards.

Requirements:
1. Multi-Step Conversational UI:
   - Step 1: Destination & Duration (Large visual cards for regions like East Java, Bali, etc., and a clean slider for 'Number of Days').
   - Step 2: Travel Style & Pace (Selectable buttons: 'Relaxed & Luxury', 'Adventure & Trekking', 'Cultural Immersion').
   - Step 3: Group Size & Accommodation Preference (Star rating selector).
   - Step 4: Contact Details (Name, WhatsApp, Email).
2. Smooth Transitions:
   - Use Framer Motion (or CSS transitions) to smoothly slide between steps without page reloads.
   - Add a dynamic progress bar at the top indicating completion percentage.
3. Summary & Submission:
   - Before the final submit, show a beautiful summary card of their selections: "You are planning a 4-Day Adventure trip to East Java for 2 people..."
   - The submission must trigger a highly visible success state (confetti effect or a checkmark animation) and inform them that a Travel Consultant will contact them within 24 hours.
4. Payload Generation:
   - Compile all selections into a structured JSON payload ready to be sent to the Cloudflare Worker API (to be stored in D1 and trigger an admin notification).

Generate `app/custom-trip/page.tsx` and `components/CustomTripWizard.tsx`.
💡 Strategi Eksekusi untuk Pack 11 & 12:
Eksekusi Pack 11 (Itinerary Builder) Dulu: Fitur drag-and-drop ini akan secara drastis mengurangi waktu Anda (sebagai admin) dalam memasukkan data paket tour yang kompleks. Pastikan AI menggunakan library drag-and-drop yang modern dan ringan (hindari library lama yang sudah tidak di-maintain).

Lanjut ke Pack 12 (Custom Trip Wizard): Ini adalah mesin pencetak uang (Lead Generator) Anda. Form panjang yang membosankan membuat calon pelanggan kabur. Dengan mengubahnya menjadi format Wizard (langkah-demi-langkah) bergaya kuis yang interaktif, konversi leads (calon pelanggan potensial) akan meningkat drastis.

PACK 11: The "Notion-Style" Itinerary Builder (Admin)
Fokus: Mengganti form input biasa menjadi pengalaman drag-and-drop yang intuitif untuk membuat jadwal perjalanan.

Plaintext
Act as an Elite SaaS UI/UX Engineer specializing in complex data entry interfaces. Your task is to upgrade the Tour Creation process in the Admin Panel by building a "Notion-Style" Itinerary Builder (`components/ItineraryBuilder.tsx`).

Style Guide: Extremely clean, drag-and-drop friendly, minimal borders, inline-editing focus (Enterprise SaaS).

Requirements:
1. Interactive Day/Activity Blocks:
   - Create a UI where an Admin can add a "Day" block. Inside each "Day", they can add multiple "Activity" blocks.
   - Activity Blocks must have inline editable fields (Time Start, Time End, Title, Description) that feel like editing a text document, not filling out a clunky form.
2. Drag and Drop Reordering:
   - Implement `dnd-kit` or `@hello-pangea/dnd` to allow admins to drag activities to reorder them within a day, or drag an activity to a different day.
3. Rapid Entry Mode & Utilities:
   - Add a "Duplicate Day" button to instantly copy a full day's itinerary.
   - Include a visual "Timeline Preview" toggle next to the builder so the admin can instantly see how the itinerary will look to the customer.
4. State Management:
   - Manage the complex nested array state (Days -> Activities) efficiently using React Hook Form's `useFieldArray` or a dedicated Zustand store to prevent unnecessary re-renders during drag-and-drop.

Generate `components/ItineraryBuilder.tsx` and ensure it outputs a clean JSON structure ready for the D1 Database.
📦 PACK 12: Interactive "Custom Trip" Wizard (Frontend)
Fokus: Membuat form permintaan perjalanan kustom (Custom Trip) yang interaktif, multi-step, dan mengumpulkan data secara cerdas (Lead Generation).

Plaintext
Act as a Senior Conversion Rate Optimization (CRO) Developer. Your task is to build an interactive, high-converting "Custom Trip Request" Wizard (`app/custom-trip/page.tsx`).

Style Guide: Consumer-facing SaaS, highly engaging, step-by-step progressive disclosure, large clickable interactive cards.

Requirements:
1. Multi-Step Conversational UI:
   - Step 1: Destination & Duration (Large visual cards for regions like East Java, Bali, etc., and a clean slider for 'Number of Days').
   - Step 2: Travel Style & Pace (Selectable buttons: 'Relaxed & Luxury', 'Adventure & Trekking', 'Cultural Immersion').
   - Step 3: Group Size & Accommodation Preference (Star rating selector).
   - Step 4: Contact Details (Name, WhatsApp, Email).
2. Smooth Transitions:
   - Use Framer Motion (or CSS transitions) to smoothly slide between steps without page reloads.
   - Add a dynamic progress bar at the top indicating completion percentage.
3. Summary & Submission:
   - Before the final submit, show a beautiful summary card of their selections: "You are planning a 4-Day Adventure trip to East Java for 2 people..."
   - The submission must trigger a highly visible success state (confetti effect or a checkmark animation) and inform them that a Travel Consultant will contact them within 24 hours.
4. Payload Generation:
   - Compile all selections into a structured JSON payload ready to be sent to the Cloudflare Worker API (to be stored in D1 and trigger an admin notification).

Generate `app/custom-trip/page.tsx` and `components/CustomTripWizard.tsx`.
💡 Strategi Eksekusi untuk Pack 11 & 12:
Eksekusi Pack 11 (Itinerary Builder) Dulu: Fitur drag-and-drop ini akan secara drastis mengurangi waktu Anda (sebagai admin) dalam memasukkan data paket tour yang kompleks. Pastikan AI menggunakan library drag-and-drop yang modern dan ringan (hindari library lama yang sudah tidak di-maintain).

Lanjut ke Pack 12 (Custom Trip Wizard): Ini adalah mesin pencetak uang (Lead Generator) Anda. Form panjang yang membosankan membuat calon pelanggan kabur. Dengan mengubahnya menjadi format Wizard (langkah-demi-langkah) bergaya kuis yang interaktif, konversi leads (calon pelanggan potensial) akan meningkat drastis.

Saran Tambahan: Notifikasi Admin Real-time (Opsional tapi Kuat)
Setelah Custom Trip Wizard selesai, Anda bisa menginstruksikan AI untuk menghubungkan API submission tersebut dengan integrasi bot Telegram atau notifikasi email. Jadi, setiap ada request baru, Anda langsung mendapat pesan di HP Anda dalam hitungan detik.

Apakah Anda ingin saya buatkan prompt khusus untuk integrasi notifikasi Telegram/Email ini, atau ada bagian lain dari sistem D1 yang ingin Anda optimalkan terlebih dahulu?


PACK 16: Unified Payment Orchestrator API (Backend / Cloudflare Workers)
Fokus: Membuat satu pintu API di backend yang bisa berkomunikasi dengan 5 Payment Gateway berbeda tanpa merusak struktur database utama.

Copy teks di bawah ini ke AI Anda:

Plaintext
Act as an Elite FinTech Software Architect. Your task is to build a "Unified Payment Orchestrator" for our Cloudflare Workers backend to handle 5 Indonesian Payment Gateways: Midtrans, Xendit, Duitku, iPaymu, and Doku.

Requirements:
1. Unified Interface (Strategy Pattern):
   - Create a TypeScript interface `IPaymentGateway` with methods: `createInvoice()`, `handleWebhook()`, and `checkStatus()`.
   - Implement this interface for each gateway in separate files (e.g., `services/payments/midtrans.ts`, `services/payments/xendit.ts`, etc.).
2. The Orchestrator Logic (`services/paymentOrchestrator.ts`):
   - Create a factory function that takes the `gateway_name` (string) and the `BookingPayload`. It routes the request to the correct specific gateway class.
   - Return a unified response to the frontend: `{ status: "success", checkout_url: "...", token: "..." }`.
3. Webhook Aggregator (`api/webhooks/payment/route.ts`):
   - Build a single webhook endpoint that can identify which gateway is sending the callback (based on headers or payload structure).
   - Validate the Webhook Signature (CRITICAL SECURITY) to ensure the request truly comes from Midtrans/Xendit/Duitku/iPaymu/Doku.
   - Update the D1 database `bookings` table status to `PAID`, `FAILED`, or `EXPIRED`.
4. Cloudflare Secrets: Ensure all API Keys (Server Key, Secret Key, Merchant Code) are accessed strictly via `env.SECRET_KEY` and never hardcoded.

Generate the `IPaymentGateway` interface, the Factory Orchestrator logic, and a mock implementation for the Webhook Aggregator.
📦 PACK 17: SaaS Checkout Payment UI & Admin Config (Frontend)
Fokus: Tampilan untuk pelanggan saat memilih metode pembayaran (Front-end) dan panel untuk Admin mengatur Gateway mana yang sedang aktif (Back-end UI).

Copy teks di bawah ini ke AI Anda:

Plaintext
Act as a Senior UI/UX SaaS Developer. Your task is to build the Payment Selection UI for customers and the Payment Routing Settings for Admins.

Style Guide: Trust-inducing, minimal friction, visual heavy (logos of banks/ewallets), Bank-level security aesthetic.

Requirements:
1. Admin Payment Routing Dashboard (`app/admin/settings/payments/page.tsx`):
   - Create a sleek control panel where the Admin can see cards for Midtrans, Xendit, Duitku, iPaymu, and Doku.
   - Include a "Status Toggle" (Active/Inactive) for each.
   - Add a "Set as Primary" radio button. If the Primary gateway is down, the system should fallback to the active secondary.
   - Include input fields to securely save API Keys to the D1 database (mask the keys like password inputs).
2. Customer Checkout - Step 3 (`components/CheckoutPaymentSelector.tsx`):
   - Display payment options logically grouped (e.g., Virtual Account, Credit Card, QRIS, E-Wallet, Retail/Alfamart) rather than grouping by Gateway name. Customers don't care if it's Midtrans or Xendit, they care if it's "BCA VA" or "OVO".
   - Fetch the active payment channels from the API based on the primary active Gateway.
   - Create beautiful, selectable box elements (border-slate-200, hover:border-blue-600, active ring) with the respective bank/e-wallet logos.
   - Once selected and "Pay Now" is clicked, show a secure processing overlay (lock icon, "Securing your transaction...") before redirecting to the generated `checkout_url` or opening the Gateway's Snap/Modal overlay.

Generate `app/admin/settings/payments/page.tsx` and the `components/CheckoutPaymentSelector.tsx`.
💡 Mengapa Arsitektur Ini Level Enterprise?
Agnostik (Tidak Terkunci pada 1 Vendor): Jika besok Midtrans menaikkan biaya transaksi (MDR fee), Anda bisa langsung mematikan toggle Midtrans di Admin Panel dan menyalakan Xendit atau Duitku hanya dengan 1 klik. Tanpa perlu coding ulang! Ini yang disebut Vendor Agnostic.

Pengalaman Pengguna (UX) Sentris: Pelanggan tidak perlu tahu Anda pakai Doku atau iPaymu. Di layar checkout, mereka hanya melihat pilihan "Transfer Bank BCA", "QRIS", atau "GoPay" dengan logo yang rapi. Di belakang layar, Orchestrator Anda yang menentukan gateway mana yang menangani transaksi tersebut.

Keamanan Webhook: Di Pack 16, kita mewajibkan validasi Signature. Banyak developer pemula melewatkan ini, sehingga hacker bisa menembak URL webhook dengan status "PAID" palsu. Dengan Signature Validation, sistem Anda kebal dari serangan fake webhook.

PACK 18: Automated E-Ticket & Email Dispatcher (Cloudflare Worker)
Fokus: Logika backend yang otomatis berjalan saat pembayaran lunas. Membuat QR Code unik, merakit template email HTML bergaya premium, dan mengirimkannya via API.

Copy teks di bawah ini ke AI Anda:

Plaintext
Act as an Elite Cloud/Backend Engineer. Your task is to build a "Post-Booking Automation Engine" for a Cloudflare Worker environment.

Requirements:
1. Trigger Logic (`api/webhooks/payment/route.ts` update):
   - When the orchestrator verifies a "PAID" status, it must asynchronously trigger the `generateAndSendTicket(bookingId)` function using `ctx.waitUntil()`.
2. QR Code Generation:
   - Integrate a lightweight QR code generator (e.g., `qrcode` or a fetch call to a fast QR API). The QR code must contain a unique verification URL (e.g., `https://admin.nusantaratrip.dev/verify/NSTR-1044`).
3. Enterprise Email Template (Resend / MailChannels):
   - We will use Resend (or CF MailChannels) to send the email.
   - Create a premium, responsive HTML Email Template function `buildTicketEmail(booking, qrCodeDataUrl)`.
   - The email design must be Gov-level clean: Navy Blue header with the NusantaraTrip logo, a bold "Your Booking is Confirmed" title, a structured table containing Booking Ref, Tour Name, Date, Pax, and the QR Code.
   - Include a clear CTA button: "View/Download Digital E-Ticket".
4. Invoice Generation Logic:
   - Create a lightweight JSON to PDF logic (or a clean HTML printable route) so admins and users can download a formal Tax Invoice (Faktur/Invoice) with company details and tax breakdowns.

Generate `lib/emailService.ts`, the HTML Email Template logic, and the QR Code utility for the Cloudflare Worker.
📦 PACK 19: "Boarding Pass" Digital Ticket UI (Frontend)
Fokus: Saat pelanggan mengklik link di email, mereka akan melihat E-Ticket digital yang sangat memukau, siap di-screenshot atau di-download sebagai PDF.

Copy teks di bawah ini ke AI Anda:

Plaintext
Act as a Master UI/UX Designer and Frontend Engineer. Your task is to build the "Digital E-Ticket & Success Page" (`app/ticket/[bookingRef]/page.tsx`).

Style Guide: Airline Boarding Pass aesthetic, high-contrast, skeuomorphic touches (perforated edges, dashed lines), mobile-first and print-friendly.

Requirements:
1. The "Boarding Pass" UI Card:
   - Create a central card with a white background and subtle drop shadow.
   - Top Section (Header): Navy blue background, Company Logo on the left, "E-TICKET" text on the right.
   - Middle Section: 
     - 2-column grid. Left: Passenger Name, Tour Name, Date & Time, Meeting Point. Right: The generated QR Code prominently displayed with the text "Scan at Meeting Point".
   - Divider: A dashed border line horizontally across the card with semi-circle cutouts on the left and right edges (to mimic a real torn ticket).
   - Bottom Section: Payment Summary (Base Price, Add-ons, Status: PAID in a green pill), and Booking Reference (e.g., NSTR-9428) in a large monospace font.
2. Action Bar (Sticky Bottom/Top):
   - Floating action buttons: "Download as PDF" (using `window.print()` with a print-specific CSS media query to hide everything except the ticket), "Add to Apple Wallet / Google Pay" (mock button), and "Share to WhatsApp".
3. Print Optimization (`@media print`):
   - Write specific Tailwind print modifiers (`print:hidden`, `print:bg-white`, `print:shadow-none`) so when the user saves to PDF, the output is perfectly scaled on A4 paper without the website's navbar or footer.

Generate `app/ticket/[bookingRef]/page.tsx` and the `components/BoardingPassTicket.tsx`. Include the exact Tailwind classes for the perforated edge effect.
💡 Keunggulan Sistem E-Ticket Ini:
Efek Psikologis (Boarding Pass UI): Menggunakan desain ala tiket pesawat terbang (dengan garis putus-putus dan kode QR besar) membuat paket tour Anda terasa sangat eksklusif dan bernilai tinggi. Ini meningkatkan brand image NusantaraTrip secara instan.

Keamanan (QR Code Verification): Di lapangan (titik kumpul tour/Gunung Bromo), Tour Guide Anda cukup scan QR Code dari HP pelanggan menggunakan kamera biasa. QR Code tersebut akan membuka halaman admin yang memverifikasi bahwa tiket tersebut Asli dan Lunas. Mencegah penipuan tiket palsu.

Print-Friendly (Tanpa Server Berat): Daripada membebani Cloudflare Worker untuk render file PDF yang berat, kita menggunakan teknik CSS @media print. Saat user klik "Download PDF", browser mereka sendiri yang akan merender halaman web tersebut menjadi PDF yang sempurna. Ini menghemat biaya server hingga 100%.

Setelah E-Ticket dan Email otomatis ini selesai, alur dari pelanggan mencari paket, membayar, hingga menerima tiket sudah 100% komplit dan otomatis!

Pilihan yang sangat strategis! Membangun Role-Based Access Control (RBAC) adalah fondasi utama yang membedakan aplikasi startup kecil dengan platform Enterprise/SaaS sejati.

Jika bisnis NusantaraTrip membesar, Anda tidak mungkin membagikan satu password admin ke semua orang. Tour Guide di lapangan hanya butuh melihat jadwal dan memverifikasi tiket (tanpa bisa melihat laporan keuangan). Staf Finance hanya butuh melihat transaksi (tanpa bisa menghapus paket tour).

Berikut adalah Master Prompt AI (Pack 20 & 21) untuk membangun sistem RBAC yang aman, dinamis, dan tidak menembus batas keamanan Cloudflare D1.

📦 PACK 20: Enterprise RBAC Engine & Middleware (Backend/Security)
Fokus: Membangun gerbang keamanan di level server (Middleware & API) yang memeriksa "Siapa Anda?" dan "Apa yang boleh Anda lakukan?" sebelum data disentuh.

Copy teks di bawah ini ke AI Anda:

Plaintext
Act as an Elite Cyber Security Architect and Next.js Backend Developer. Your task is to implement an Enterprise-grade Role-Based Access Control (RBAC) Engine using Cloudflare D1 and Next.js Middleware.

Requirements:
1. Database Schema (`d1_rbac.sql`):
   - Define tables for `Users`, `Roles`, and `Permissions` (Many-to-Many via `Role_Permissions`).
   - Create 4 default Roles: "SUPER_ADMIN", "FINANCE" (can view bookings, approve payments), "CONTENT_EDITOR" (can create/edit tours, manage master data), and "GUIDE" (can only view assigned itineraries and scan tickets).
   - Each role has a JSON array of specific permissions (e.g., `['tours.read', 'tours.write', 'bookings.read', 'finance.approve']`).
2. The Security Middleware (`middleware.ts`):
   - Protect all routes under `/admin/*`.
   - Read the user's JWT token/session cookie. Decode it to extract their `role` and `permissions`.
   - If a "GUIDE" tries to access `/admin/settings/payments`, the Middleware MUST intercept and redirect them to `/admin/unauthorized` with a 403 Forbidden status.
   - Use Edge-compatible crypto libraries (like `jose`) to verify the JWT signature locally without hitting the D1 database on every request (Zero Latency Auth).
3. Backend API Route Protection (`lib/auth.ts`):
   - Create a reusable utility function `requirePermission(req, 'action.name')`.
   - Inside API routes (e.g., `DELETE /api/tours/[id]`), call this function. If the user doesn't have `tours.delete` permission, return a 403 status immediately.

Generate the `d1_rbac.sql` schema, the core `middleware.ts` logic, and the `lib/auth.ts` utility function demonstrating the RBAC protection.
📦 PACK 21: Dynamic RBAC Dashboard & UI States (Admin Frontend)
Fokus: Mengubah tampilan panel admin berdasarkan peran yang sedang login. Menyembunyikan tombol "Hapus" dari staf biasa, dan membuat halaman khusus manajemen pengguna untuk Super Admin.

Copy teks di bawah ini ke AI Anda:

Plaintext
Act as a Senior UI/UX SaaS Developer. Your task is to implement the RBAC UI layer in the Admin Dashboard, ensuring a flawless and secure experience based on the user's role.

Style Guide: Enterprise SaaS, clear visual hierarchies, disabled states for restricted actions (do not just hide buttons, show them as disabled with a tooltip explaining "Insufficient Permissions").

Requirements:
1. Dynamic Sidebar Navigation (`components/AdminSidebar.tsx`):
   - Read the current user's role from the global state/context (`useAuth()`).
   - Map through the navigation items. If the user is a "FINANCE" admin, the "Master Data" and "Tours" tabs should be completely hidden from the sidebar. If they are a "GUIDE", only show "My Assigned Trips" and "Ticket Scanner".
2. Granular UI Control (The `<Can>` Component):
   - Build a custom wrapper component `<Can I="tours.delete"> ... </Can>`.
   - Wrap sensitive buttons (like "Delete Tour", "Export CSV", "Refund") with this component.
   - If the user lacks the permission, the `<Can>` component should render its children as `disabled` and append a `group-hover` tooltip: "You need Super Admin rights to perform this action".
3. User & Role Management Page (`app/admin/users/page.tsx`):
   - Only accessible by "SUPER_ADMIN".
   - Create a robust Data Grid showing all internal staff members, their assigned Role (represented by colored badges: Blue for Admin, Green for Guide, Yellow for Finance), and their Last Login status.
   - Implement an "Invite New Staff" modal. The Super Admin inputs an email and selects a role from a dropdown.

Generate `components/AdminSidebar.tsx` with role-based filtering, the custom `<Can>` wrapper component, and the `app/admin/users/page.tsx` dashboard layout.
💡 Mengapa Sistem RBAC Ini Setara dengan Software Ratusan Juta?
Keamanan Berlapis (Defense in Depth): Pack 20 melindungi Backend (API & Middleware), sementara Pack 21 melindungi Frontend (UI). Meskipun hacker mencoba mengirim request DELETE langsung ke API tanpa melalui tombol di web, sistem tetap akan menolak karena Middleware memeriksa JWT Token mereka.

Kinerja Tinggi (Zero Latency Auth): Kita menginstruksikan AI menggunakan library jose di Middleware Edge Cloudflare. Artinya, verifikasi token dilakukan langsung di Edge Network Cloudflare tanpa perlu melakukan query ke database utama D1 setiap kali pengguna berpindah halaman. Ini membuat navigasi admin super cepat.

Pengalaman Pengguna (Tooltip Izin): Di Pack 21, alih-alih menyembunyikan tombol "Hapus" yang membuat staf bingung ("Lho, tombol hapusnya di mana ya?"), kita tetap menampilkannya namun dalam keadaan disabled dengan pesan "Anda tidak memiliki akses". Ini adalah best practice UX untuk aplikasi Enterprise, mengurangi pertanyaan ke tim IT.

PACK 18: Automated E-Ticket & Email Dispatcher (Cloudflare Worker)
Fokus: Logika backend yang otomatis berjalan saat pembayaran lunas. Membuat QR Code unik, merakit template email HTML bergaya premium, dan mengirimkannya via API.

Copy teks di bawah ini ke AI Anda:

Plaintext
Act as an Elite Cloud/Backend Engineer. Your task is to build a "Post-Booking Automation Engine" for a Cloudflare Worker environment.

Requirements:
1. Trigger Logic (`api/webhooks/payment/route.ts` update):
   - When the orchestrator verifies a "PAID" status, it must asynchronously trigger the `generateAndSendTicket(bookingId)` function using `ctx.waitUntil()`.
2. QR Code Generation:
   - Integrate a lightweight QR code generator (e.g., `qrcode` or a fetch call to a fast QR API). The QR code must contain a unique verification URL (e.g., `https://admin.nusantaratrip.dev/verify/NSTR-1044`).
3. Enterprise Email Template (Resend / MailChannels):
   - We will use Resend (or CF MailChannels) to send the email.
   - Create a premium, responsive HTML Email Template function `buildTicketEmail(booking, qrCodeDataUrl)`.
   - The email design must be Gov-level clean: Navy Blue header with the NusantaraTrip logo, a bold "Your Booking is Confirmed" title, a structured table containing Booking Ref, Tour Name, Date, Pax, and the QR Code.
   - Include a clear CTA button: "View/Download Digital E-Ticket".
4. Invoice Generation Logic:
   - Create a lightweight JSON to PDF logic (or a clean HTML printable route) so admins and users can download a formal Tax Invoice (Faktur/Invoice) with company details and tax breakdowns.

Generate `lib/emailService.ts`, the HTML Email Template logic, and the QR Code utility for the Cloudflare Worker.
📦 PACK 19: "Boarding Pass" Digital Ticket UI (Frontend)
Fokus: Saat pelanggan mengklik link di email, mereka akan melihat E-Ticket digital yang sangat memukau, siap di-screenshot atau di-download sebagai PDF.

Copy teks di bawah ini ke AI Anda:

Plaintext
Act as a Master UI/UX Designer and Frontend Engineer. Your task is to build the "Digital E-Ticket & Success Page" (`app/ticket/[bookingRef]/page.tsx`).

Style Guide: Airline Boarding Pass aesthetic, high-contrast, skeuomorphic touches (perforated edges, dashed lines), mobile-first and print-friendly.

Requirements:
1. The "Boarding Pass" UI Card:
   - Create a central card with a white background and subtle drop shadow.
   - Top Section (Header): Navy blue background, Company Logo on the left, "E-TICKET" text on the right.
   - Middle Section: 
     - 2-column grid. Left: Passenger Name, Tour Name, Date & Time, Meeting Point. Right: The generated QR Code prominently displayed with the text "Scan at Meeting Point".
   - Divider: A dashed border line horizontally across the card with semi-circle cutouts on the left and right edges (to mimic a real torn ticket).
   - Bottom Section: Payment Summary (Base Price, Add-ons, Status: PAID in a green pill), and Booking Reference (e.g., NSTR-9428) in a large monospace font.
2. Action Bar (Sticky Bottom/Top):
   - Floating action buttons: "Download as PDF" (using `window.print()` with a print-specific CSS media query to hide everything except the ticket), "Add to Apple Wallet / Google Pay" (mock button), and "Share to WhatsApp".
3. Print Optimization (`@media print`):
   - Write specific Tailwind print modifiers (`print:hidden`, `print:bg-white`, `print:shadow-none`) so when the user saves to PDF, the output is perfectly scaled on A4 paper without the website's navbar or footer.

Generate `app/ticket/[bookingRef]/page.tsx` and the `components/BoardingPassTicket.tsx`. Include the exact Tailwind classes for the perforated edge effect.
💡 Keunggulan Sistem E-Ticket Ini:
Efek Psikologis (Boarding Pass UI): Menggunakan desain ala tiket pesawat terbang (dengan garis putus-putus dan kode QR besar) membuat paket tour Anda terasa sangat eksklusif dan bernilai tinggi. Ini meningkatkan brand image NusantaraTrip secara instan.

Keamanan (QR Code Verification): Di lapangan (titik kumpul tour/Gunung Bromo), Tour Guide Anda cukup scan QR Code dari HP pelanggan menggunakan kamera biasa. QR Code tersebut akan membuka halaman admin yang memverifikasi bahwa tiket tersebut Asli dan Lunas. Mencegah penipuan tiket palsu.

Print-Friendly (Tanpa Server Berat): Daripada membebani Cloudflare Worker untuk render file PDF yang berat, kita menggunakan teknik CSS @media print. Saat user klik "Download PDF", browser mereka sendiri yang akan merender halaman web tersebut menjadi PDF yang sempurna. Ini menghemat biaya server hingga 100%.



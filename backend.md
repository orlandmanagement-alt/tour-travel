Act as an Elite SaaS Backend UI/UX Engineer and Cloudflare D1 Database Architect. Your task is to upgrade a Next.js Tour & Travel Admin Panel into a highly interconnected, Enterprise-grade SaaS application. 

### 📐 SAAS ARCHITECTURE & UX PRINCIPLES
1. Deep Interconnection: Master data (Locations, Destinations, Add-ons, Categories) must be tightly coupled with transactional data (Tours, Bookings).
2. Context Retention (Inline Actions): Users must NEVER be forced to leave a form to create missing Master Data. Implement "Creatable Selects" that open Slide-over Drawers or Modals to add/edit Master Data on the fly.
3. Multi-Method Input: Complex data entry (like Itineraries) must support standard UI forms PLUS bulk operations (Copy/Paste from Excel, CSV Drag & Drop).
4. Auto-Generation: System should auto-generate standardized ID codes based on relations (e.g., Destination Code + Sequence).
5. Robust CRUD: Every table must have functioning Create, Read (with Search/Filter), Update (Inline editing for typos), and Delete. Include Toast notifications for all actions.

### 🛠️ DELIVERABLES (Generate these specific modules step-by-step)

**MODULE 1: Relational Master Data & Global UI System**
- Create robust CRUD components for `Master Data` (Locations, Destinations, Categories, Add-ons). 
- Add-ons System: Build a specific Master Data table for "Add-ons". Add-ons MUST be relational to "Locations" (e.g., "Jeep Rental" in Bromo = Rp 500.000, "Jeep Rental" in Merapi = Rp 350.000).
- Inline Editing: In the Master Data tables, clicking a text field should allow inline editing to quickly fix typos without opening a full form.
- Global Filters: All data tables must feature a modern SaaS data-table UI (like TanStack Table) with column filtering, global search, and pagination.

**MODULE 2: The "Smart" Tour Builder (Basic Info & Pricing)**
- Update the `Create New Tour` page (Step 1 & Step 3).
- Auto-Code Generator: When a user selects a Destination (e.g., Bromo), auto-generate the `Tour Code` by fetching the latest count from D1 and appending a sequence (e.g., `BMO-000002`).
- Inline Master Creation: For "Location" and "Destination" dropdowns, use a Creatable Combobox. If the typed text doesn't exist, show an "+ Add [Text]" option. Clicking it opens a small modal to save the new Master Data to D1 immediately, updates the state, and auto-selects it.
- Relational Pricing/Add-ons (Step 3): When setting up pricing, auto-populate available Add-ons based on the selected Destination from Step 1.

**MODULE 3: Multi-Method Itinerary Engine (Step 2)**
- Redesign the Itinerary input into a "Multi-Method Input Engine".
- Method A (Standard): A beautiful UI to add day-by-day forms.
- Method B (Bulk/Spreadsheet): Build a data-grid component that accepts raw copy-paste data directly from Excel/Google Sheets (TSV format). 
- Method C (File): Add a Dropzone to import CSV files.
- Utility Buttons: Add action buttons: "Clear All", "Copy to Clipboard" (exports current itinerary to TSV), and "Paste from Clipboard".

**MODULE 4: Publish Engine & Visual Preview (Step 4)**
- Before saving to the D1 Database, provide a "Visual Preview" step.
- The preview must NOT look like a boring JSON dump or admin form. It must render a beautiful, mock-frontend layout of the Tour Page so the admin sees EXACTLY what the customer will see.
- Include a "Save Draft" and "Publish to D1" button. Ensure the save function builds the complex relational JSON payload correctly for the Cloudflare Worker API.

Ensure all React components use Tailwind CSS, are strictly typed (TypeScript), and simulate API calls using standard async functions ready to be connected to Cloudflare Workers.

Panduan Eksekusi untuk Antigravity (Tips AI):
Mulai dari Database (Modul 1): Suruh AI mengerjakan Modul 1 dulu. Mengapa? Karena fitur canggih seperti Auto-Code dan Inline Creation di Modul 2 tidak akan jalan jika fondasi Master Data (terutama struktur Add-ons yang bergantung pada Lokasi) belum ada.

Fokus pada Modul 3 (Itinerary Engine): Membangun fitur copy-paste dari Excel ke web butuh ketelitian. Jika AI memberikan grid yang buggy, berikan instruksi tambahan: "Gunakan logika parsing TSV (Tab-Separated Values) sederhana saat user memicu event onPaste pada area teks."

Komponen Creatable Combobox: Jika AI menggunakan elemen HTML <select> standar, tegur AI-nya. Arahkan untuk menggunakan Headless UI, Radix UI, atau komponen Dropdown kustom berbasis div dan input agar bisa mendeteksi teks yang diketik pengguna yang belum ada di database.
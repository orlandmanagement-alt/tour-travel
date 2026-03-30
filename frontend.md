# PACK 1: Global UI System, Theme, & Layout (Navbar/Footer)
Act as a Senior Frontend Fullstack Engineer specializing in Enterprise SaaS and Government-level UI/UX. We are revamping a Next.js (App Router) Tour & Travel application using Tailwind CSS. 

Objective: Create the Global UI System, Layout, Navbar, and Footer.
Style Guide: "Enterprise SaaS" - Clean, highly accessible, structured box/glossary layouts, high contrast (Navy/Slate primary colors with Indigo/Teal accents). Font: Inter or similar sans-serif.

Requirements:
1. Update `tailwind.config.ts` to include an enterprise color palette (primary: slate-900, accent: indigo-600, surface: slate-50). Add custom animations (e.g., fade-in, slide-up).
2. Create a fully responsive Navbar. 
   - Desktop: Clean menu links with animated hover underlines. A prominent "Book Now" CTA button with a subtle pulse or glow hover effect.
   - Mobile: A smooth sliding hamburger menu (usable on standard phones, iPads, and iPods).
3. Create an Enterprise-grade Footer with multi-column links (Company, Destinations, Legal), a newsletter subscription input, and social icons.
4. Ensure all interactive elements have `transition-all duration-300 ease-in-out`.
5. Ensure strict TypeScript types for any layout props.

Generate the code for `tailwind.config.ts`, `components/Navbar.tsx`, `components/Footer.tsx`, and the main `app/layout.tsx`.

## PACK 2: Homepage & Explore Module
Continuing our Enterprise SaaS Tour website, let's build the Homepage (`app/page.tsx`).

Requirements:
1. Hero Section: 
   - A wide, cinematic hero banner with a high-quality background image and a dark overlay for text readability.
   - Headline: "Find Your Next Adventure" (bold, enterprise typography).
   - A floating "Quick Search / Explore" bar overlapping the bottom of the hero image. It should look like a SaaS control panel (white box, shadow-lg, rounded-xl) with fields for Location, Type, and Date, plus a primary search button.
2. Trending Destinations Section:
   - A grid layout (1 column mobile, 2 columns tablet, 3 columns desktop).
   - "Box Glossary" style cards: White background, subtle border (`border-slate-200`), rounded corners, and soft shadow on hover (`hover:shadow-xl hover:-translate-y-1 transition-all`).
   - Cards must show a thumbnail image, destination name, a short description, and a tag showing "X Tours Available".
3. Responsive & Animations: Use Tailwind constraints (`max-w-7xl mx-auto`) and Framer Motion (or pure Tailwind group-hover) for entrance animations.
4. Keep the data mocked for now, but structure it so it can easily map an array of objects.

Generate `app/page.tsx` and the `components/DestinationCard.tsx`.

## PACK 3: Tour Catalog & ZERO-Server-Load Filtering
Now, let's build the Tour Catalog Page (`app/tours/page.tsx`) with a highly interactive, Zero-Server-Load Client-Side Filtering system.

Requirements:
1. Layout: 
   - Left Sidebar (25% width on Desktop, collapsible/drawer on Mobile) for Filters.
   - Right Content (75% width) for the Tour Grid (1 col mobile, 2 col tablet, 3 col desktop).
2. "Zero-Server-Load" Filter Logic:
   - Create a Client Component `TourCatalogClient.tsx`.
   - The server page (`page.tsx`) fetches the FULL list of tours ONCE from the API and passes it as initial props to the client component.
   - The Client Component uses React `useState` and `useMemo` to instantly filter the array based on Destination, Category, Trip Type (Open/Private), and Difficulty. NO router pushes or server re-fetching on filter change. The UI must update instantly.
3. Card Design (Enterprise SaaS):
   - Interactive Box Glossary style.
   - Elements to display clearly: Image, floating tags over image (e.g., 'Open Trip', '2D1N', 'Hot Deal'), Tour Title, Location Icon + Text, Category, and Bottom section with "Start From Rp XXX.XXX".
   - Cards must be clickable and route to `/tours/[id]`.
4. Empty State: Beautiful SaaS empty state if no tours match the filter.

Generate `app/tours/page.tsx`, `components/TourCatalogClient.tsx`, and `components/TourCard.tsx`.

## PACK 4: Tour Detail & Modern Itinerary
Finally, build the Tour Detail Page (`app/tours/[id]/page.tsx`). This page must display data clearly like a government/enterprise dashboard.

Requirements:
1. Layout Structure:
   - Top: Breadcrumbs, Title, Meta tags (Duration, Difficulty, Location) in a styled SaaS header bar.
   - Left Column (Main Content): Gallery (Grid or Carousel), Overview, Modern Itinerary, and Terms.
   - Right Column (Sticky): Pricing Card / Checkout Widget.
2. Modern Itinerary UI:
   - Do NOT use standard bullet points.
   - Build a Vertical Stepper / Timeline component.
   - Each step (day/activity) should have a distinct visual node (circle/icon), a connecting vertical line, time range pill (e.g., `08:00 - 10:00`), Title, and Description.
   - Hovering over a timeline step should highlight it slightly (SaaS interactive feel).
3. API Integration:
   - Ensure the page uses `generateStaticParams` returning `[]` and `dynamicParams = false` (or standard SSR if preferred) to fetch data from `process.env.NEXT_PUBLIC_API_URL/api/tours/[id]`.
   - Add a skeleton loading state.
4. Sticky Pricing Box: Must stay visible on desktop scroll, showing base price, a dynamic selector for pax/addons, and a clear "Book Now" CTA connected to an API handler.

Generate the code for `app/tours/[id]/page.tsx`, `components/ItineraryTimeline.tsx`, and `components/StickyBookingWidget.tsx`.


### 1. Detail Prompt: Zero-Server-Load Filter (TourCatalogClient.tsx)
Konsep UX SaaS: Kita mengambil data (fetch) 100% di awal (Server-Side) lalu mengopernya ke komponen ini (Client-Side). Semua filter (Kategori, Harga, Lokasi) diproses menggunakan useMemo di memori browser. Hasilnya? 0 ms latency. Perpindahan data terjadi secara instan tanpa loading spinner yang mengganggu.

Act as a Senior React & Tailwind Expert. Create a `TourCatalogClient.tsx` component.
This component receives an array of `tours` as a prop from the server. It must handle ALL filtering client-side for zero-latency UI (Zero-Server-Load).

Style Guide: Enterprise SaaS, clean borders (border-slate-200), subtle backgrounds (bg-slate-50), and highly accessible forms.

Requirements:
1. States: Create states for `searchTerm` (string), `selectedLocations` (string array), `selectedCategories` (string array), and `tripType` (string).
2. useMemo Logic: Create a `filteredTours` constant using `useMemo`. It should efficiently filter the `tours` prop based on all active states.
3. Layout (Grid):
   - Left Sidebar (w-1/4 on lg): Contains the filters. Use modern SaaS checkboxes (custom SVG checkmark or Tailwind `accent-blue-600`) and clear "Reset Filters" button.
   - Right Main Content (w-3/4 on lg): 
     - Top bar: Search input with a magnifying glass icon, showing "Showing X results".
     - Grid: CSS Grid (1 col mobile, 2 col tablet, 3 col desktop) to display the `TourCard` components.
4. Empty State: If `filteredTours.length === 0`, display a beautiful empty state with an SVG illustration (or styled text box), a message "No tours found matching your criteria", and a "Clear all filters" CTA button.
5. Animations: Wrap the mapped `TourCard` list in an `AnimatePresence` (Framer Motion) or use Tailwind `transition-all` to smoothly fade cards in/out when filters change.

Generate the full TypeScript code for `TourCatalogClient.tsx`.

### Detail Prompt: Modern Itinerary Timeline (ItineraryTimeline.tsx)
Konsep UX SaaS: Membaca jadwal perjalanan seringkali membingungkan. Di level enterprise, data disajikan dalam bentuk visual. Kita akan menggunakan desain Vertical Stepper (Garis Waktu Vertikal). Mata pengguna akan dengan mudah mengikuti alur perjalanan dari titik ke titik.

Act as a Senior UI/UX Frontend Engineer. Create an `ItineraryTimeline.tsx` component using Tailwind CSS. 
This component takes a prop `itineraries` (an array of objects containing: id, day_number, start_time, end_time, activity_title, activity_description).

Style Guide: Government/Enterprise SaaS dashboard style. Extremely clean, structured, and easy to scan.

Requirements:
1. Structure: Build a vertical timeline. 
   - A continuous vertical line `border-l-2 border-slate-200 dark:border-slate-700` running down the left side.
   - For each itinerary item, render a relative wrapper `group`.
2. Timeline Nodes (Dots):
   - Place an absolute dot on the vertical line for each item. 
   - Default state: `bg-white border-2 border-slate-300 w-4 h-4 rounded-full`.
   - Hover state (`group-hover`): The dot scales up slightly and the border color changes to `border-blue-600` (or primary brand color) with a smooth transition.
3. Content Card (Right of the line):
   - Wrap the text in a subtle card: `bg-slate-50 dark:bg-slate-800/50 p-4 ml-6 mb-6 rounded-xl border border-slate-100 hover:shadow-md transition-shadow`.
   - Top Header: A sleek pill showing the time (e.g., `08:00 - 10:00`) using `bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-md`. Next to it, the `activity_title` in `text-slate-900 font-bold`.
   - Body: The `activity_description` in readable `text-slate-600 text-sm leading-relaxed`.
4. Day Grouping (Optional but recommended): If there are multiple days, add a sticky or prominent "Day X" header badge above the respective timeline items.

Generate the full TypeScript code for `ItineraryTimeline.tsx` focusing on pixel-perfect Tailwind classes.

## The Ultimate Master Prompt: Enterprise Tour & Travel SaaS
Act as an Elite Fullstack Frontend Engineer specializing in Enterprise SaaS, Government-level UI/UX, and high-performance Next.js (App Router) applications.

Your task is to completely revamp a Tour & Travel website into a premium, highly trusted Enterprise platform. The design must be full color, interactive, and fully responsive across ALL screens (mobile, iPod, iPad, laptop, desktop/4K).

### 🎨 DESIGN SYSTEM & THEME
1. Enterprise Color Palette: Use Navy Blue (`slate-900` or `blue-950`) as the dominant background/text color to project "Trust & Authority" (Gov-level). Use vibrant Teal or Indigo (`indigo-600`, `teal-500`) purely for interactive elements (CTAs, tags, active states).
2. SaaS Typography: Strictly use the "Inter" or "Plus Jakarta Sans" font family. Ensure high legibility, proper line heights (`leading-relaxed`), and strong hierarchical font weights (e.g., `font-extrabold` for headers, `font-medium` for labels).
3. "Box Glossary" Style: Wrap logical content into distinct, clean cards with soft borders (`border-slate-200` or `border-slate-800` for dark mode), subtle backgrounds (`bg-white/bg-slate-50`), and generous padding (`p-6` or `p-8`).
4. Micro-interactions: Implement snappy, animated hover states globally (e.g., `hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out`).

### ⚡ TECHNICAL ARCHITECTURE (CRITICAL RULES)
1. Zero-Server-Load Filtering (Client-Side Strategy):
   - For the Tour Catalog page, the server must fetch the FULL master data catalog ONLY ONCE.
   - Pass this data to a Client Component.
   - Use React State/useMemo (or Zustand if requested) to filter the array instantly in the browser. 
   - THERE MUST BE NO SERVER LOAD, NO API CALLS, and NO ROUTER PUSHES when a user clicks a filter. The UI must react in 0ms latency.
2. Skeleton Loaders: Never use plain "Loading..." text. Always implement pulsing Skeleton UI blocks (`animate-pulse bg-slate-200 rounded-xl`) matching the exact shape of the expected content while waiting for initial API data.
3. API Integration: Ensure all buttons and dynamic content sections are wired to consume data via REST API (`fetch` calls using `process.env.NEXT_PUBLIC_API_URL`).
4. Comprehensive Components: Every visual element must clearly represent its data (e.g., 2D1N pill, location pin, trip type badge, title, detailed description).

### 🛠️ DELIVERABLES (Generate these specific modules)

**MODULE 1: Global Layout & Theme**
- Setup `tailwind.config.ts` reflecting the Enterprise Palette and fonts.
- Create a responsive Navbar (animated links, prominent "Book Now" CTA, mobile hamburger menu).
- Create a multi-column SaaS Footer.

**MODULE 2: Tour Catalog & Zero-Latency Filter**
- Build the `TourCatalogClient.tsx`. 
- Implement a Left Sidebar (Destinations, Category, Trip Type, Difficulty).
- Implement the Main Content Grid (1 col mobile, 3 col desktop) to display `TourCard` components.
- Ensure the filtering logic is handled purely via `useMemo` for instant updates. Include a beautiful "No results found" empty state.

**MODULE 3: Tour Detail & Modern Itinerary**
- Build the `TourDetailPage` layout. 
- Top Header: Clear titles and meta-data pills (Duration, Difficulty).
- Left Column: An Image Gallery/Carousel, Overview text, and a "Modern Itinerary".
- Right Column: A sticky, high-contrast Pricing & Booking Widget connected to the API.
- Modern Itinerary Timeline Component: Build a vertical stepper (`border-l-2`). Each day/activity is a node with a connecting line, time pill (`08:00 - 10:00`), bold title, and description. DO NOT use plain bullet points. Hovering a node should highlight it.

Ensure all code provided is production-ready, strictly typed (TypeScript), uses Tailwind CSS efficiently without bloat, and adheres to the Enterprise SaaS aesthetic.

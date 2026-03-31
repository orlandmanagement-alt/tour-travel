# 🚀 NusantaraTrip Go-Live Guide

Welcome to the production setup for NusantaraTrip! This guide will help you deploy the entire monorepo to **GitHub** and **Cloudflare** (Pages & Workers).

## 🛠️ Step 1: Push to GitHub
1.  Create a new repository on [GitHub](https://github.com/new).
2.  Run the following commands in your local project root:
    ```bash
    git init
    git add .
    git commit -m "Initial High-Fidelity UI Migration"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/tour-travel.git
    git push -u origin main
    ```

## ☁️ Step 2: Deploy the API (Cloudflare Workers + D1)
1.  **Create D1 Database**:
    Go to your [Cloudflare Dashboard](https://dash.cloudflare.com/) > Workers & Pages > D1 > **Create database**.
    Name it `nusantaratrip_db`.
2.  **Update `apps/api/wrangler.toml`**:
    Copy the `database_id` from the dashboard and paste it into your `wrangler.toml`.
3.  **Initialize Production Database**:
    Run these commands in `apps/api/` (ensure you are logged in via `npx wrangler login`):
    ```bash
    # Create Schema
    npx wrangler d1 execute nusantaratrip_db --remote --file=./src/db/schema.sql
    
    # Insert Seed Data
    npx wrangler d1 execute nusantaratrip_db --remote --file=./src/db/seed.sql
    ```
4.  **Deploy Worker**:
    ```bash
    npx wrangler deploy
    ```
    *Note your Worker's production URL (e.g., `https://nusantaratrip-api.username.workers.dev`).*

## 🌐 Step 3: Deploy the Frontends (Cloudflare Pages)
1.  Go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2.  Select your `tour-travel` repository.
3.  **Configure `apps/web` (User Portal)**:
    *   **Build command**: `npx turbo build --filter=web`
    *   **Build output directory**: `apps/web/out`
    *   **Environment Variables**:
        *   `NEXT_PUBLIC_API_URL`: `https://YOUR_WORKER_URL/api`
4.  **Configure `apps/admin` (Admin Portal)**:
    *   Repeat the same steps, but use `--filter=admin` and `apps/admin/out`.

## ✅ Final Verification
*   Visit your **User Portal** (`.pages.dev`) and check if the tours are loading from the live D1 database.
*   Visit the **Admin Dashboard** and verify that metrics (Revenue, Bookings) are reflecting the live data.

---
© 2026 PT Nusantara Trip System. Built with Next.js, Tailwind CSS, and Cloudflare.

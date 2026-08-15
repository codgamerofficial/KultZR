# KultZR – Wear Your Story 🖤✨
> Modern, zero-inventory luxury streetwear brand and bespoke 2D apparel studio built with Next.js 16, Tailwind CSS v4, Supabase, and Razorpay.

---

## 🌟 Executive Overview

**KultZR** operates on a zero-inventory, print-on-demand model. Every piece is crafted on 240 GSM 100% organic combed cotton with eco-friendly digital printing only after a customer places an order.

- **Bespoke 2D Customizer Studio**: Real-time canvas preview for custom text, story emblems, typography font selection, placement controls, and image graphic uploads.
- **Live Supabase Integration**: PostgreSQL cloud schema (`profiles`, `categories`, `products`, `customizations`, `orders`, `order_items`) with Row Level Security (RLS).
- **Authenticated Payments**: Official Razorpay Checkout SDK integration supporting UPI (GPay/PhonePe/Paytm), Cards, and NetBanking.
- **User Dashboard & Guest Tracking**: Real order history querying, profile updates, and guest parcel lookup by order reference.
- **Merchant Admin Portal**: Atelier order status management queue (`/admin/orders`) for print fulfillment updates.

---

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling & Design System**: Tailwind CSS v4 (`@tailwindcss/postcss`) + Vanilla CSS glassmorphism
- **Icons & Micro-Animations**: Lucide React + Canvas Confetti
- **Database & Authentication**: Supabase PostgreSQL (`@supabase/supabase-js`)
- **Payment Gateway**: Razorpay Node SDK & Client Popup Modal (`https://checkout.razorpay.com/v1/checkout.js`)
- **Hosting & CI/CD**: Vercel zero-config (`vercel.json`)

---

## 🚀 Quick Start (Local Development)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/codgamerofficial/KultZR.git
cd KultZR
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://thkztuyvpbwwwkppofuf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Razorpay Payment Gateway Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_TQ7Cdpi6W4Balz
RAZORPAY_KEY_SECRET=4w6VDRwpcsW7NKo4001pabPw

# Base Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ENV=development
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🗺️ Project Structure & Routes

```
src/
├── app/
│   ├── page.tsx               # Homepage (Hero, Pillars, Featured Drops, Customizer Teaser)
│   ├── shop/page.tsx          # Catalog Grid with Category Tabs & Sorting
│   ├── products/[slug]/       # Product Detail Page with 240 GSM Fabric Specs
│   ├── customize/page.tsx     # Full-Screen Bespoke 2D Design Studio
│   ├── cart/page.tsx          # Shopping Bag Overview
│   ├── checkout/page.tsx      # Multi-Step Address Form & Razorpay Trigger
│   ├── account/page.tsx       # User Profile & Real Order History Dashboard
│   ├── track/page.tsx         # Guest Real-Time Order Tracking Portal
│   ├── admin/orders/page.tsx  # Merchant Order Management Queue
│   ├── about/page.tsx         # About KultZR Philosophy
│   ├── story/page.tsx         # Zero-Inventory Brand Manifesto
│   ├── shipping/page.tsx      # Shipping & Delivery Timelines Policy
│   ├── guarantee/page.tsx     # 30-Day Quality & Wash Guarantee
│   ├── terms/page.tsx         # Terms of Service & GST Compliance
│   ├── privacy/page.tsx       # Privacy Policy & GDPR Rights
│   ├── sitemap.ts             # Dynamic XML Sitemap Generator
│   ├── robots.ts              # Search Engine Crawler Config
│   └── api/
│       ├── checkout/route.ts  # Razorpay Server-Side Order Endpoint
│       └── webhooks/pod/      # Print-on-Demand Fulfillment Webhook
├── components/
│   ├── Navbar.tsx             # Sticky Header with Cart Counter & Auth Badge
│   ├── Footer.tsx             # Footer with GSTIN Details & Policy Links
│   ├── ProductCard.tsx        # Catalog Card Component with Color Swatches
│   ├── CustomizerStudio.tsx   # Live 2D Canvas Typography & Emblem Editor
│   ├── CartDrawer.tsx         # Slide-Over Cart Drawer
│   ├── RazorpayModal.tsx      # Razorpay Payment Gateway Popup Modal
│   └── AuthModal.tsx          # Supabase Encrypted Registration & Login
└── lib/
    ├── authContext.tsx        # Supabase Authentication & Profile Context
    ├── cartContext.tsx        # Shopping Cart & LocalStorage Context
    ├── mockData.ts            # Seed Catalog & Brand Testimonials
    ├── supabase.ts            # Supabase Client Initialization
    └── types.ts               # TypeScript Interfaces
```

---

## 🗄️ Database Provisioning

Run [supabase/schema.sql](file:///d:/KultZR/supabase/schema.sql) in your Supabase SQL Editor to create database tables and Row Level Security policies:
```sql
-- Tables: profiles, categories, products, customizations, orders, order_items, newsletter_subscribers
-- RLS policies enabled for public product reads and secure order inserts.
```

To seed initial sample products:
```bash
node scripts/seedProducts.js
```

---

## 🚢 Deployment to Vercel

1. Push your repository to GitHub ([https://github.com/codgamerofficial/KultZR.git](https://github.com/codgamerofficial/KultZR.git)).
2. Import the project into Vercel.
3. Add environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`).
4. Click **Deploy**. Vercel will automatically detect `vercel.json` and build all routes.

---

## 📜 License & Compliance

© 2026 KultZR – Wear Your Story. All rights reserved. Registered GST Entity (GSTIN: `27AAACK1234F1Z9`).

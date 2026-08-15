-- KultZR Master Supabase PostgreSQL Database Schema
-- Comprehensive Schema for Qikink Open API Sync, AI Catalog Intelligence, Multidimensional Filters, and Order Engine

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =================================================═
-- 1. CATEGORIES & TAXONOMY (MEN, WOMEN, UNISEX, ACCESSORIES)
-- =================================================═
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    gender VARCHAR(50) DEFAULT 'Unisex', -- Men, Women, Unisex, Accessories
    parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =================================================═
-- 2. COLLECTIONS (New Drops, Essentials, Street Culture, Minimal, etc.)
-- =================================================═
CREATE TABLE IF NOT EXISTS public.collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =================================================═
-- 3. MASTER KULTZR PRODUCTS TABLE
-- =================================================═
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    short_description TEXT,
    description TEXT NOT NULL,
    gender VARCHAR(50) DEFAULT 'Unisex',
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    collection_id UUID REFERENCES public.collections(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'PUBLISHED', -- DISCOVERED, IMPORTING, NORMALIZING, AI_PROCESSING, VALIDATING, AI_REVIEW, APPROVED, PUBLISHED, REJECTED, UNAVAILABLE
    brand VARCHAR(100) DEFAULT 'KultZR',
    base_cost NUMERIC DEFAULT 0,
    selling_price NUMERIC NOT NULL,
    compare_at_price NUMERIC,
    currency VARCHAR(10) DEFAULT 'INR',
    fabric_details TEXT,
    story TEXT,
    is_customizable BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    rating NUMERIC DEFAULT 4.90,
    review_count INTEGER DEFAULT 18,
    seo_title VARCHAR(255),
    seo_description TEXT,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Product Images
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Product Variants (Size, Color, SKU)
CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    sku VARCHAR(255) NOT NULL UNIQUE,
    size VARCHAR(50) NOT NULL,
    color_name VARCHAR(100) NOT NULL,
    color_hex VARCHAR(20) DEFAULT '#0A0A0C',
    price NUMERIC NOT NULL,
    stock_status VARCHAR(50) DEFAULT 'AVAILABLE', -- AVAILABLE, LOW_AVAILABILITY, OUT_OF_STOCK, DISCONTINUED, SYNC_UNKNOWN
    inventory_qty INTEGER DEFAULT 999,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tags
CREATE TABLE IF NOT EXISTS public.tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.product_tags (
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, tag_id)
);

-- =================================================═
-- 4. PROVIDER MAPPING TABLES (Qikink / Printful)
-- =================================================═
CREATE TABLE IF NOT EXISTS public.providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE, -- QIKINK, PRINTFUL
    code VARCHAR(50) NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    config JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.provider_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_code VARCHAR(50) DEFAULT 'QIKINK',
    provider_product_id VARCHAR(255) NOT NULL,
    raw_payload JSONB,
    provider_status VARCHAR(50) DEFAULT 'ACTIVE',
    provider_updated_at TIMESTAMP WITH TIME ZONE,
    last_synced_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(provider_code, provider_product_id)
);

CREATE TABLE IF NOT EXISTS public.provider_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_product_id VARCHAR(255) NOT NULL,
    provider_variant_id VARCHAR(255) NOT NULL,
    provider_sku VARCHAR(255) NOT NULL,
    size VARCHAR(50) NOT NULL,
    color VARCHAR(100) NOT NULL,
    cost NUMERIC DEFAULT 0,
    availability VARCHAR(50) DEFAULT 'IN_STOCK',
    raw_payload JSONB,
    last_synced_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(provider_product_id, provider_variant_id)
);

CREATE TABLE IF NOT EXISTS public.product_provider_mappings (
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    provider_product_id VARCHAR(255) NOT NULL,
    provider_code VARCHAR(50) DEFAULT 'QIKINK',
    mapping_status VARCHAR(50) DEFAULT 'VERIFIED',
    last_verified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (product_id, provider_product_id)
);

-- =================================================═
-- 5. SYNC RUNS & LOGGING ENGINE
-- =================================================═
CREATE TABLE IF NOT EXISTS public.sync_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    run_number VARCHAR(100) NOT NULL UNIQUE,
    provider_name VARCHAR(50) DEFAULT 'QIKINK',
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'RUNNING', -- RUNNING, COMPLETED, FAILED
    products_scanned INTEGER DEFAULT 0,
    products_created INTEGER DEFAULT 0,
    products_updated INTEGER DEFAULT 0,
    products_removed INTEGER DEFAULT 0,
    products_failed INTEGER DEFAULT 0,
    error_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.sync_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    run_id UUID REFERENCES public.sync_runs(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    severity VARCHAR(20) DEFAULT 'INFO', -- INFO, WARNING, ERROR
    message TEXT NOT NULL,
    payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =================================================═
-- 6. AI JOBS & REVIEWS (NVIDIA NIM GLM-5.2 Engine)
-- =================================================═
CREATE TABLE IF NOT EXISTS public.ai_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    provider_product_id VARCHAR(255),
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, PROCESSING, COMPLETED, FAILED
    model_name VARCHAR(100) DEFAULT 'z-ai/glm-5.2',
    input_prompt TEXT,
    raw_response JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS public.ai_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    review_status VARCHAR(50) DEFAULT 'AI_REVIEW', -- AI_REVIEW, APPROVED, REJECTED
    confidence_score NUMERIC DEFAULT 0.95,
    ai_suggestions JSONB,
    reviewer_notes TEXT,
    approved_by VARCHAR(255),
    approved_at TIMESTAMP WITH TIME ZONE
);

-- =================================================═
-- 7. DETERMINISTIC PRICING ENGINE
-- =================================================═
CREATE TABLE IF NOT EXISTS public.pricing_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    target_profit_margin NUMERIC DEFAULT 300, -- Fixed or % margin
    shipping_fee_buffer NUMERIC DEFAULT 70,
    payment_fee_pct NUMERIC DEFAULT 2.36,
    tax_buffer_pct NUMERIC DEFAULT 5.0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.price_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    old_price NUMERIC NOT NULL,
    new_price NUMERIC NOT NULL,
    changed_by VARCHAR(255) DEFAULT 'SYSTEM_SYNC',
    reason TEXT,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =================================================═
-- 8. CUSTOMER & USER ACCOUNTS
-- =================================================═
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    avatar_url TEXT,
    phone VARCHAR(50),
    shipping_address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.customer_addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    country VARCHAR(50) DEFAULT 'IN',
    phone VARCHAR(50) NOT NULL,
    is_default BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =================================================═
-- 9. ORDERS, PAYMENTS & FULFILLMENT TRACKING
-- =================================================═
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(100) NOT NULL UNIQUE,
    user_id UUID,
    customer_email VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    shipping_address JSONB NOT NULL,
    total_amount NUMERIC NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, failed, refunded
    order_status VARCHAR(50) DEFAULT 'processing', -- PENDING_PAYMENT, PAID, FULFILLMENT_SUBMITTED, PROCESSING, SHIPPED, DELIVERED, CANCELLED
    razorpay_order_id VARCHAR(255),
    razorpay_payment_id VARCHAR(255),
    beneficiary_upi VARCHAR(100) DEFAULT 'kultzr@slc',
    pod_provider VARCHAR(50) DEFAULT 'QIKINK',
    pod_order_id VARCHAR(255),
    tracking_number VARCHAR(255),
    courier_name VARCHAR(100),
    tracking_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID,
    product_title VARCHAR(255) NOT NULL,
    product_image TEXT NOT NULL,
    quantity INTEGER DEFAULT 1 NOT NULL,
    size VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL,
    unit_price NUMERIC NOT NULL,
    customization_details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.tracking_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    pod_order_id VARCHAR(255),
    status VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    description TEXT,
    event_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =================================================═
-- 10. SYSTEM SETTINGS & AUDIT LOGS
-- =================================================═
CREATE TABLE IF NOT EXISTS public.system_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(255),
    action VARCHAR(255) NOT NULL,
    resource VARCHAR(255) NOT NULL,
    resource_id VARCHAR(255),
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =================================================═
-- 11. ROW LEVEL SECURITY (RLS) POLICIES
-- =================================================═
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to categories" ON public.categories FOR SELECT USING (TRUE);
CREATE POLICY "Allow public read access to collections" ON public.collections FOR SELECT USING (TRUE);
CREATE POLICY "Allow public read access to products" ON public.products FOR SELECT USING (TRUE);
CREATE POLICY "Allow public read access to product_variants" ON public.product_variants FOR SELECT USING (TRUE);
CREATE POLICY "Allow public read access to product_images" ON public.product_images FOR SELECT USING (TRUE);
CREATE POLICY "Allow public insert for orders" ON public.orders FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Allow public insert for order_items" ON public.order_items FOR INSERT WITH CHECK (TRUE);

-- KultZR Supabase PostgreSQL Database Schema
-- Execute in Supabase SQL Editor to provision tables, provider mappings, and Row Level Security (RLS)

CREATE TABLE public.profiles (
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    avatar_url TEXT,
    phone VARCHAR(50),
    shipping_address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category_slug VARCHAR(255) NOT NULL,
    gender VARCHAR(50) NOT NULL,
    price NUMERIC NOT NULL,
    original_price NUMERIC,
    description TEXT NOT NULL,
    story TEXT,
    fabric_details TEXT,
    images TEXT NOT NULL,
    colors JSONB,
    sizes TEXT,
    is_customizable BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    rating NUMERIC DEFAULT 4.90,
    review_count INTEGER DEFAULT 18,
    ai_status VARCHAR(50) DEFAULT 'PUBLISHED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- POD Provider Mapping Table (Qikink / Printful / Printify)
CREATE TABLE public.product_provider (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    provider_name VARCHAR(50) DEFAULT 'QIKINK',
    provider_product_id VARCHAR(255) NOT NULL,
    provider_sku VARCHAR(255) NOT NULL,
    base_cost NUMERIC NOT NULL,
    size VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.customizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    product_id UUID,
    custom_text TEXT,
    font_family VARCHAR(100),
    text_color VARCHAR(50),
    graphic_url TEXT,
    garment_color VARCHAR(50),
    placement VARCHAR(50),
    preview_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(100) NOT NULL,
    user_id UUID,
    customer_email VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    shipping_address JSONB NOT NULL,
    total_amount NUMERIC NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    payment_status VARCHAR(50) DEFAULT 'pending',
    order_status VARCHAR(50) DEFAULT 'processing',
    razorpay_order_id VARCHAR(255),
    razorpay_payment_id VARCHAR(255),
    pod_provider VARCHAR(50) DEFAULT 'QIKINK',
    pod_order_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.order_items (
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

CREATE TABLE public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- PostgreSQL / Supabase Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_provider ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to products" ON public.products FOR SELECT USING (TRUE);
CREATE POLICY "Allow public read access to categories" ON public.categories FOR SELECT USING (TRUE);
CREATE POLICY "Allow public read access to product_provider" ON public.product_provider FOR SELECT USING (TRUE);
CREATE POLICY "Public order creation" ON public.orders FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public customization creation" ON public.customizations FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public newsletter subscription" ON public.newsletter_subscribers FOR INSERT WITH CHECK (TRUE);

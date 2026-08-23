-- KultZR incremental hardening migration
-- Run after the existing schema.sql

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS payment_verified_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS fulfillment_status VARCHAR(50) DEFAULT 'PENDING',
  ADD COLUMN IF NOT EXISTS fulfillment_attempts INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS fulfillment_error TEXT;

ALTER TABLE public.order_items
  ADD COLUMN IF NOT EXISTS provider_sku VARCHAR(255),
  ADD COLUMN IF NOT EXISTS provider_product_id VARCHAR(255),
  ADD COLUMN IF NOT EXISTS provider_variant_id VARCHAR(255),
  ADD COLUMN IF NOT EXISTS provider_cost NUMERIC DEFAULT 0;

CREATE UNIQUE INDEX IF NOT EXISTS orders_razorpay_order_id_unique
  ON public.orders(razorpay_order_id)
  WHERE razorpay_order_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS order_items_provider_sku_idx
  ON public.order_items(provider_sku);

CREATE INDEX IF NOT EXISTS orders_fulfillment_status_idx
  ON public.orders(fulfillment_status);

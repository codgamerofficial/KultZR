-- ==========================================================
-- DEALSATHI — UNIVERSAL ANSI SQL DATABASE SCHEMA (PHASE 4)
-- ==========================================================

-- 1. USERS & PREFERENCES
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  role VARCHAR(50) DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN', 'EDITOR', 'ANALYST', 'SUPER_ADMIN')),
  country VARCHAR(2) DEFAULT 'IN',
  currency VARCHAR(3) DEFAULT 'INR',
  locale VARCHAR(10) DEFAULT 'en-IN',
  timezone VARCHAR(50) DEFAULT 'Asia/Kolkata',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_preferences (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  preferred_currency VARCHAR(3) DEFAULT 'INR',
  preferred_brands JSON,
  blocked_brands JSON,
  shopping_preferences JSON,
  notification_preferences JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. MERCHANTS & SOURCES
CREATE TABLE merchants (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  country VARCHAR(2) DEFAULT 'IN',
  website TEXT NOT NULL,
  logo_url TEXT,
  status VARCHAR(50) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'PAUSED', 'DISABLED')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE merchant_sources (
  id VARCHAR(36) PRIMARY KEY,
  merchant_id VARCHAR(36) NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  source_type VARCHAR(50) NOT NULL,
  api_status VARCHAR(50) DEFAULT 'HEALTHY',
  last_success_at TIMESTAMP,
  last_failure_at TIMESTAMP,
  rate_limit INTEGER DEFAULT 100,
  configuration JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. PRODUCTS & IDENTIFIERS
CREATE TABLE categories (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  parent_id VARCHAR(36) REFERENCES categories(id)
);

CREATE TABLE brands (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  logo_url TEXT
);

CREATE TABLE products (
  id VARCHAR(36) PRIMARY KEY,
  canonical_name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  brand_id VARCHAR(36) NOT NULL REFERENCES brands(id),
  category_id VARCHAR(36) NOT NULL REFERENCES categories(id),
  description TEXT,
  image_url TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'DRAFT', 'ARCHIVED')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_identifiers (
  id VARCHAR(36) PRIMARY KEY,
  product_id VARCHAR(36) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  identifier_type VARCHAR(50) NOT NULL,
  identifier_value VARCHAR(255) NOT NULL,
  source VARCHAR(50) NOT NULL,
  confidence DECIMAL(5,2) DEFAULT 1.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_identifier UNIQUE (identifier_type, identifier_value)
);

-- 4. VARIANTS & OFFERS
CREATE TABLE product_variants (
  id VARCHAR(36) PRIMARY KEY,
  product_id VARCHAR(36) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  variant_key VARCHAR(255) NOT NULL,
  color VARCHAR(100),
  size VARCHAR(100),
  storage VARCHAR(100),
  ram VARCHAR(100),
  condition VARCHAR(50) DEFAULT 'NEW' CHECK (condition IN ('NEW', 'REFURBISHED', 'USED')),
  attributes JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE offers (
  id VARCHAR(36) PRIMARY KEY,
  product_id VARCHAR(36) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  variant_id VARCHAR(36) REFERENCES product_variants(id),
  merchant_id VARCHAR(36) NOT NULL REFERENCES merchants(id),
  external_offer_id VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  affiliate_url TEXT NOT NULL,
  seller_name VARCHAR(255) NOT NULL,
  seller_rating DECIMAL(3,2) DEFAULT 4.5,
  condition VARCHAR(50) DEFAULT 'NEW' CHECK (condition IN ('NEW', 'REFURBISHED', 'USED')),
  availability VARCHAR(50) DEFAULT 'IN_STOCK' CHECK (availability IN ('IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK', 'UNKNOWN')),
  base_price DECIMAL(12,2) NOT NULL,
  shipping_cost DECIMAL(12,2) DEFAULT 0.00,
  coupon_discount DECIMAL(12,2) DEFAULT 0.00,
  bank_discount DECIMAL(12,2) DEFAULT 0.00,
  final_true_price DECIMAL(12,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'INR',
  last_seen_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. PRICE OBSERVATIONS & SNAPSHOTS
CREATE TABLE price_observations (
  id VARCHAR(36) PRIMARY KEY,
  offer_id VARCHAR(36) NOT NULL REFERENCES offers(id) ON DELETE CASCADE,
  product_id VARCHAR(36) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  price DECIMAL(12,2) NOT NULL,
  shipping_cost DECIMAL(12,2) DEFAULT 0.00,
  discount DECIMAL(12,2) DEFAULT 0.00,
  currency VARCHAR(3) DEFAULT 'INR',
  observed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  source VARCHAR(50) NOT NULL,
  confidence DECIMAL(5,2) DEFAULT 1.00
);

CREATE INDEX idx_price_observations_prod_date ON price_observations(product_id, observed_at);

-- 6. DEAL SCORES & RECOMMENDATIONS
CREATE TABLE deal_scores (
  id VARCHAR(36) PRIMARY KEY,
  product_id VARCHAR(36) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  offer_id VARCHAR(36) REFERENCES offers(id),
  overall_score INTEGER NOT NULL,
  price_score INTEGER NOT NULL,
  fit_score INTEGER NOT NULL,
  review_score INTEGER NOT NULL,
  seller_score INTEGER NOT NULL,
  history_score INTEGER NOT NULL,
  verdict VARCHAR(50) NOT NULL CHECK (verdict IN ('BUY', 'WAIT', 'AVOID')),
  model_version VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. AFFILIATE CLICKS
CREATE TABLE affiliate_clicks (
  id VARCHAR(36) PRIMARY KEY,
  offer_id VARCHAR(36) NOT NULL REFERENCES offers(id),
  user_id VARCHAR(36) REFERENCES users(id),
  session_id VARCHAR(255) NOT NULL,
  referrer TEXT,
  device VARCHAR(50),
  country VARCHAR(2) DEFAULT 'IN',
  clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

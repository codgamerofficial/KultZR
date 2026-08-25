# DealSathi — Real Data Audit & System Ingestion Protocol 📊

## Executive Summary

This document audits all data sources across DealSathi, establishing strict boundaries between **Verified Real Data**, **Development Mocks**, and **Fallback Protocols**. Production environments fail closed when required credentials or authorized feeds are missing.

---

## Data Source Audit Matrix

| Feature | Current Source | Status | Required API / Credential | Backend Service | AI Role | Production Behavior |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Product Search** | Database / Merchant Adapters | Real Ingestion | Amazon Creators API / Flipkart Partner Feed | `searchAndScoreProducts` | Intent Parsing & Explanation | Returns verified products or "Not Verified" |
| **Product Prices** | Ingestion Engine | Real Observations | Merchant Affiliate Feeds | `PriceEngine` | Explain price trend | Shows "Price Data Unavailable" if unverified |
| **URL Analysis** | URL Resolution Gateway | Live Endpoint | Supported Merchant URL | `analyzeUrlService` | Summarize specs | Returns "Unable to verify this URL" if unapproved |
| **Deal Score** | Deterministic Engine | Real Calculation | 8-Factor Weighted Scoring Algorithm | `dealScoreCalculator` | Explain score factors | Server-side calculation only |
| **Reviews & Sentiment** | Review Aggregator | Real Synthesis | Authorized Review Feeds | `ReviewEngine` | Summarize pros/cons | Displays total analyzed count or "No Reviews" |
| **Price Watch** | Worker Queue | Scheduled Evaluation | User Database & Email Gateway | `WatchEvaluator` | Interpret drop event | Triggers ONLY on verified threshold breach |
| **Shopping Missions** | Multi-Day Worker | Scheduled Research | User Database & Cron Scheduler | `MissionEvaluator` | Evaluate candidates | Shows "No active missions yet" if empty |
| **Affiliate Links** | Server Gateway | Real Attribution | Amazon Associates Tag / Flipkart Affiliate ID | `AffiliateTracker` | Out-of-band only | Isolated from Deal Score calculation |
| **AI Gateway** | TokenRouter Gateway | Real Gateway | `TOKENROUTER_API_KEY` | `TokenRouterGateway` | Reasoning & Vision | Server-side only via `api.tokenrouter.io/v1` |

---

## Strict Production Rules

1. **No Hallucinated Commerce Facts**: Prices, MRPs, discounts, ratings, seller confidence, and stock statuses must originate from verified database records or live APIs.
2. **Fail Closed**: If a product URL cannot be resolved or a merchant feed is unconfigured, DealSathi returns `"Unable to verify this information right now"` — it **NEVER** substitutes a random fallback product.
3. **Honest Empty States**: If a new user has no active price watches or shopping missions, the UI renders an honest empty state (`"No active shopping missions yet"`) instead of fake mock cards.
4. **Development Labeling**: Development/sandbox datasets are explicitly flagged with `"Partially Verified (Development Dataset)"`.

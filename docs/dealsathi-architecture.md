# DealSathi — Production System Architecture & Execution Protocol 🛠️

## Executive Summary

DealSathi is an **Autonomous AI Shopping Agent** built on Next.js 14 App Router, TypeScript, Tailwind CSS, Zod, and Supabase ANSI SQL. This document defines the formal architecture, data boundaries, and 13-step controlled execution protocol.

---

## 1. System Architecture & Layer Boundaries

```text
                                USER REQUEST
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           │                         │                         │
      WEB APPLICATION        BROWSER EXTENSION            ANDROID APP
           │                         │                         │
           └─────────────────────────┼─────────────────────────┘
                                     │
                         SLIDING-WINDOW RATE LIMITER
                           (RateLimitingService)
                                     │
                        SECURITY & PROMPT FILTER
                            (SecurityFilter)
                                     │
                         MULTI-AGENT SATHI BRAIN
                           (SathiOrchestrator)
                                     │
              ┌──────────────────────┼──────────────────────┐
              │                      │                      │
       INTENT ENGINE          PRICE CALCULATOR        DEEP RESEARCH
       (aiOrchestrator)        (priceEngine)       (deepResearchAgent)
              │                      │                      │
              └──────────────────────┼──────────────────────┘
                                     │
                          EVIDENCE VERIFICATION
                            (EvidenceVerifier)
                                     │
                       RECOMMENDATION FIREWALL
                           (verdictEngine)
                                     │
            ┌────────────────────────┴────────────────────────┐
            │                                                 │
  SATHI SCORECARD (0-100)                             SATHI PRO & AFFILIATES
 (price, fit, reviews, seller)                   (Out-of-Band Attribution & Razorpay)
```

---

## 2. Security & AI Data Isolation Boundaries

To prevent prompt injection, hallucinated commerce facts, and financial bias:

1. **Untrusted Data Boundary**: All external merchant HTML, review text, product descriptions, and user inputs are sanitized by `SecurityFilter` before reaching LLMs.
2. **Deterministic Calculation Firewall**: LLMs explain facts; they **never compute prices, discounts, or ratings**. All numbers originate from deterministic TypeScript engines (`priceEngine`, `verdictEngine`, `dealScoreEngine`).
3. **Recommendation Isolation Firewall**: Merchant affiliate commissions are logged completely out-of-band (`affiliateTracker`) and **NEVER enter recommendation context arrays**.

---

## 3. 13-Step Controlled Execution Protocol

1. **Step 1 — Scaffolding & Foundation**: Next.js 14 App Router, TypeScript, Tailwind CSS design system.
2. **Step 2 — Canonical Product Graph**: Product, ProductVariant, Brand, Category, Merchant, Offer models.
3. **Step 3 — Price Engine & Observations**: Itemized `PriceComponent[]` distinguishing CONFIRMED payable prices from CONDITIONAL card offers.
4. **Step 4 — Deterministic Deal Score**: 0–100 weighted scoring algorithm (Price 25%, Fit 20%, Reviews 15%, Seller 10%, History 10%, Specs 10%, Warranty 5%, Availability 5%).
5. **Step 5 — Sathi Multi-Agent Brain**: Intent parsing, parallel tool calling, evidence verification, and verdict generation.
6. **Step 6 — Price Watch Surveillance**: Target price monitoring with email and push notifications.
7. **Step 7 — Shopping Missions**: Continuous multi-day candidate search and threshold notifications.
8. **Step 8 — Out-of-Band Affiliate Engine**: Server-side click tracking, HTTP 302 outbound redirects, and commission logging.
9. **Step 9 — Admin Intelligence Dashboard**: Comprehensive management panel for products, analytics, monetization, and security.
10. **Step 10 — Programmatic SEO Engine**: Quality gate (`SeoEligibilityService`), JSON-LD schema generator, dynamic sitemap.
11. **Step 11 — Multi-Platform Ecosystem**: Chrome/Edge Extension overlay, Android share intent, and social verdict sharing cards.
12. **Step 12 — Sathi Pro Monetization**: Free vs Pro (₹299/mo) tier quotas, Razorpay payment gateway integration.
13. **Step 13 — Security & Compliance Hardening**: Sliding-window rate limiter, DPDP Act data privacy manager, self-service account erasure.

# DealSathi — Real Commerce Integration Status 🛒

## Executive Summary

This document audits all active Merchant Connectors in DealSathi, documenting connection status, health monitoring, URL generation standards, and fail-closed policies.

---

## Merchant Connector Status Matrix

| Merchant | Connector Implementation | Status | Authentication / API Config | Real URL Format | Affiliate Engine |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Amazon.in** | `AmazonConnector` | Configured | `AMAZON_PARTNER_TAG` | `https://www.amazon.in/s?k={query}&tag={tag}` | Real Partner Tag |
| **Flipkart** | `FlipkartConnector` | Configured | `FLIPKART_AFFILIATE_ID` | `https://www.flipkart.com/search?q={query}&affid={id}` | Real Affiliate ID |
| **Croma** | `CromaConnector` | Configured | API Key / Feed | `https://www.croma.com/search?q={query}` | Real Partner Tag |
| **Reliance Digital** | `RelianceConnector` | Configured | Feed / Catalog | `https://www.reliancedigital.in/search?q={query}` | Direct Link |
| **Myntra** | `MyntraConnector` | Configured | Partner Feed | `https://www.myntra.com/{query}` | Direct Link |

---

## Strict Production URL Rules

1. **Zero Mock URLs**: Synthetic paths such as `amazon.in/dp/mock-...` are strictly prohibited in production.
2. **Valid Merchant Links**: Every "View Verified Offer" or merchant link must point to a functioning product page or valid merchant search query.
3. **Dynamic Source Transparency**: The search UI explicitly displays which sources were queried (`✓ Flipkart`, `✓ Croma`, `○ Amazon`).

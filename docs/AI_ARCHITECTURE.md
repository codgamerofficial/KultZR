# DealSathi — AI Agent Architecture & Tool Integration 🤖

## Executive Summary

Sathi is an **Agentic Shopping Intelligence Layer** built on an OpenAI-compatible TokenRouter gateway (`https://api.tokenrouter.io/v1`). Sathi uses structured tools (`search_products`, `get_offers`, `get_price_history`, `get_reviews`, `calculate_deal_score`) to query verified backend services before generating evidence-grounded responses.

---

## 1. TokenRouter Model Tier Mapping

```text
                                SATHI AI BRAIN
                                      │
                         ┌────────────┴────────────┐
                         │   AI MODEL ROUTER       │
                         └────────────┬────────────┘
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         ▼                            ▼                            ▼
  FAST TIER (Qwen)           REASONING TIER (DeepSeek)      VISION TIER (Nemotron)
qwen/qwen3.8-max-free       deepseek/deepseek-v4-pro-0813  nvidia/nemotron-3-nano-omni
         │                            │                            │
  Intent Extraction            Deep Research                OCR & Screenshot
  Query Rewriting              Shopping Missions            Product Image ID
  Fast Summaries               Complex Comparisons          Visual Shopping
```

---

## 2. Agent Tool System & Data Boundary

```text
User Question → Intent Agent → Tool Execution → Deterministic Verification → Model Reasoning → Response
```

### Available Tools:

1. **`search_products`**: Query product catalog with brand lock, model match, and category filters.
2. **`get_offers`**: Retrieve verified merchant offers with true payable price breakdown.
3. **`get_price_history`**: Fetch 30-day/90-day/365-day market price trendlines and percentiles.
4. **`get_reviews`**: Retrieve aggregated review sentiment, top pros, top cons, and defect rates.
5. **`calculate_deal_score`**: Compute server-side 8-factor Deal Score (0–100).
6. **`create_watch`**: Create a target price surveillance item for background worker evaluation.
7. **`create_mission`**: Create a multi-day candidate search mission.

---

## 3. Strict Safety & Cost Controls

- **Server-Side Key Isolation**: `TOKENROUTER_API_KEY` exists strictly on the server and is never exposed in client bundles or extensions.
- **Fact Isolation Firewall**: Models receive verified tool output JSON and explain findings. Models **cannot alter prices, discounts, or scores**.
- **Rate Limits & Budgeting**: Sliding-window rate limiter prevents AI spend spikes.
- **Graceful Fallbacks**: If TokenRouter is unreachable, basic product search and price comparison continue deterministically.

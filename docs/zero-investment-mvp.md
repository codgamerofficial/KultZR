# KultZR Zero-Investment MVP

## Current architecture

- Next.js App Router storefront
- Supabase catalog/order data
- Qikink server-side POD integration
- Razorpay payment layer already present in the project
- Vercel deployment target

## First launch flow

1. Configure QIKINK_CLIENT_ID and QIKINK_CLIENT_SECRET in server environment variables.
2. Configure Supabase URL/keys.
3. Open `/api/qikink/sync` to verify the server can read the Qikink catalog.
4. Sync selected Qikink products into `products` and `product_provider`.
5. Set a retail selling price above the provider landed cost.
6. Test checkout with Razorpay test credentials before accepting real orders.

## Security

Qikink credentials must remain server-side. Never put them in `NEXT_PUBLIC_*` variables or browser code.

## Next build phase

- Admin catalog browser with Sync button
- Real product/variant stock presentation
- Cart persistence
- Razorpay order creation + signature verification
- Qikink fulfillment after successful payment
- Webhook-driven fulfillment/tracking status
- Customer order tracking
- Automated catalog refresh

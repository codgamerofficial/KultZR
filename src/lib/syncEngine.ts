import { getFulfillmentProvider, ProviderProduct } from './providers';
import { enrichProductWithAI } from './aiEnrichment';
import { supabase } from './supabase';

export interface SyncRunSummary {
  run_id: string;
  started_at: string;
  completed_at: string;
  status: 'COMPLETED' | 'FAILED';
  products_scanned: number;
  products_created: number;
  products_updated: number;
  products_failed: number;
  logs: string[];
}

/**
 * Deterministic Pricing Engine
 * Calculates luxury retail price based on provider cost + shipping + fees + tax + target profit
 */
export function calculateDeterministicPrice(cost: number): { selling_price: number; compare_at_price: number } {
  const shippingFee = 70;
  const paymentFeePct = 0.0236;
  const taxBufferPct = 0.05;
  const targetProfitMargin = 320; // INR profit target

  const totalCost = (cost + shippingFee + targetProfitMargin) / (1 - paymentFeePct - taxBufferPct);
  
  // Psychological luxury pricing tiers
  let selling_price = 799;
  if (totalCost <= 450) selling_price = 799;
  else if (totalCost <= 650) selling_price = 899;
  else if (totalCost <= 850) selling_price = 999;
  else if (totalCost <= 1100) selling_price = 1299;
  else if (totalCost <= 1400) selling_price = 1499;
  else selling_price = 1999;

  const compare_at_price = Math.round(selling_price * 1.35 / 100) * 100 - 1; // e.g., ₹1,199

  return { selling_price, compare_at_price };
}

/**
 * Categorizes a raw product into KultZR Taxonomy
 */
export function categorizeProduct(rawTitle: string, rawCategory?: string): {
  gender: 'Men' | 'Women' | 'Unisex' | 'Accessories';
  category: string;
  collection: string;
} {
  const text = `${rawTitle} ${rawCategory || ''}`.toLowerCase();

  let gender: 'Men' | 'Women' | 'Unisex' | 'Accessories' = 'Unisex';
  if (text.includes('women') || text.includes('crop') || text.includes('top')) {
    gender = 'Women';
  } else if (text.includes('men') && !text.includes('unisex')) {
    gender = 'Men';
  } else if (text.includes('bag') || text.includes('cap') || text.includes('mug') || text.includes('case')) {
    gender = 'Accessories';
  }

  let category = 'T-Shirts';
  if (text.includes('jacket') || text.includes('varsity')) category = 'Jackets';
  else if (text.includes('hoodie') || text.includes('sweatshirt')) category = 'Hoodies';
  else if (text.includes('oversize')) category = 'Oversized';
  else if (text.includes('shirt')) category = 'Shirts';
  else if (text.includes('bag')) category = 'Bags';
  else if (text.includes('cap')) category = 'Caps';

  let collection = 'KultZR Essentials';
  if (text.includes('varsity') || text.includes('drop')) collection = 'New Drops';
  else if (text.includes('ringer') || text.includes('street')) collection = 'Street Culture';

  return { gender, category, collection };
}

/**
 * Main Product Intelligence & Sync Engine Orchestrator
 */
export async function runProductSync(): Promise<SyncRunSummary> {
  const provider = getFulfillmentProvider();
  const runId = `RUN-${Date.now()}`;
  const startedAt = new Date().toISOString();
  const logs: string[] = [];

  let scanned = 0;
  let created = 0;
  let updated = 0;
  let failed = 0;

  logs.push(`[${startedAt}] Initiating Qikink Open API product sync cycle (${runId})...`);

  try {
    const rawProducts: ProviderProduct[] = await provider.getProducts();
    scanned = rawProducts.length;
    logs.push(`Fetched ${scanned} catalog items from provider ${provider.name}.`);

    for (const item of rawProducts) {
      try {
        logs.push(`Processing provider item ID: ${item.id} ("${item.title}")...`);
        const { gender, category, collection } = categorizeProduct(item.title, item.category);
        const { selling_price, compare_at_price } = calculateDeterministicPrice(item.base_price);

        // AI Product Agent Enrichment (NVIDIA NIM GLM-5.2)
        const aiEnriched = await enrichProductWithAI(item.title, item.description || category, gender);

        // Check if product already exists in Supabase to avoid duplicates
        const { data: existing } = await supabase
          .from('products')
          .select('id, slug')
          .eq('slug', aiEnriched.slug || item.id)
          .single();

        const productPayload = {
          slug: aiEnriched.slug || `kultzr-${item.id}`,
          title: aiEnriched.title || item.title,
          short_description: aiEnriched.short_description,
          description: aiEnriched.description,
          gender: gender,
          status: 'PUBLISHED',
          brand: 'KultZR Atelier',
          base_cost: item.base_price,
          selling_price: selling_price,
          compare_at_price: compare_at_price,
          currency: 'INR',
          fabric_details: aiEnriched.fabric_details || '240 GSM Organic Cotton Heavyweight',
          story: aiEnriched.story || 'Designed for those who wear their story without explanation.',
          seo_title: `${aiEnriched.title || item.title} | KultZR Luxury`,
          seo_description: aiEnriched.short_description,
          updated_at: new Date().toISOString(),
        };

        if (existing) {
          await supabase.from('products').update(productPayload).eq('id', existing.id);
          updated++;
          logs.push(`Updated existing KultZR product record ID: ${existing.id}`);
        } else {
          const { data: newProd } = await supabase
            .from('products')
            .insert({
              ...productPayload,
              published_at: new Date().toISOString(),
            })
            .select('id')
            .single();

          if (newProd) {
            // Save Product Images
            if (item.image_url) {
              await supabase.from('product_images').insert({
                product_id: newProd.id,
                image_url: item.image_url,
                alt_text: aiEnriched.title || item.title,
                is_primary: true,
              });
            }

            // Save Product Variants
            if (item.variants && item.variants.length > 0) {
              const variantPayloads = item.variants.map(v => ({
                product_id: newProd.id,
                sku: v.sku || `QK-${item.id}-${v.size}`,
                size: v.size,
                color_name: v.color,
                price: selling_price,
                stock_status: v.availability || 'AVAILABLE',
              }));

              await supabase.from('product_variants').insert(variantPayloads);
            }

            // Save Provider Mapping
            await supabase.from('provider_product_mappings').insert({
              product_id: newProd.id,
              provider_product_id: item.id,
              provider_code: provider.code,
              mapping_status: 'VERIFIED',
            });

            created++;
            logs.push(`Successfully ingested and published new KultZR product ID: ${newProd.id}`);
          }
        }
      } catch (itemErr: any) {
        failed++;
        logs.push(`Error processing product ID ${item.id}: ${itemErr.message}`);
      }
    }

    const completedAt = new Date().toISOString();
    logs.push(`Sync cycle completed successfully at ${completedAt}.`);

    return {
      run_id: runId,
      started_at: startedAt,
      completed_at: completedAt,
      status: 'COMPLETED',
      products_scanned: scanned,
      products_created: created,
      products_updated: updated,
      products_failed: failed,
      logs,
    };
  } catch (err: any) {
    const completedAt = new Date().toISOString();
    logs.push(`Critical failure during product sync: ${err.message}`);

    return {
      run_id: runId,
      started_at: startedAt,
      completed_at: completedAt,
      status: 'FAILED',
      products_scanned: scanned,
      products_created: created,
      products_updated: updated,
      products_failed: scanned - (created + updated),
      logs,
    };
  }
}

import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { enrichProductMetadata } from '@/lib/aiEnrichment';
import { QikinkProvider } from '@/lib/providers/qikink';

const provider = new QikinkProvider();

function slugify(value: string, id: string) {
  return `${value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${id}`;
}

/** Return the real Qikink catalog from the server. Credentials never reach the browser. */
export async function GET() {
  try {
    const products = await provider.getProducts();
    return NextResponse.json({ success: true, count: products.length, products });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unable to load Qikink catalog' }, { status: 502 });
  }
}

/** Sync one Qikink product into the KultZR catalog. */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, sellingPrice } = body;

    if (!productId) {
      return NextResponse.json({ error: 'Qikink Product ID is required' }, { status: 400 });
    }

    const source = await provider.getProduct(String(productId));
    if (!source) {
      return NextResponse.json({ error: `Qikink product ${productId} was not found` }, { status: 404 });
    }

    const baseCost = Number(source.base_price || 0);
    const retailPrice = Number(sellingPrice || Math.ceil((baseCost * 2.2) / 10) * 10);
    const imageList = source.images?.length ? source.images : [source.image_url];
    const categories = String(source.category || 'T-Shirts');

    const aiEnriched = await enrichProductMetadata({
      rawTitle: source.title,
      category: categories,
      emblemName: 'KultZR',
    });

    const productPayload = {
      title: aiEnriched.seoTitle || source.title,
      slug: slugify(source.title, String(productId)),
      category_slug: categories.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      gender: 'Unisex',
      price: retailPrice,
      original_price: Math.round(retailPrice * 1.35),
      description: aiEnriched.luxuryDescription || source.description,
      story: 'Designed by KultZR and produced on demand. No inventory, no overproduction.',
      fabric_details: aiEnriched.fabricDetails || source.description,
      images: JSON.stringify(imageList.filter(Boolean)),
      colors: JSON.stringify([...new Set(source.variants.map(v => v.color))].map(name => ({ name, hex: '#111111' }))),
      sizes: [...new Set(source.variants.map(v => v.size))].join(', '),
      is_customizable: true,
      is_featured: false,
      ai_status: 'PUBLISHED',
    };

    if (!isSupabaseConfigured) {
      return NextResponse.json({
        success: true,
        persisted: false,
        message: 'Product prepared successfully. Connect Supabase to persist it.',
        product: productPayload,
        provider: { id: source.id, baseCost, variants: source.variants },
      });
    }

    const { data: insertedProduct, error: prodErr } = await supabase
      .from('products')
      .upsert(productPayload, { onConflict: 'slug' })
      .select()
      .single();

    if (prodErr) throw prodErr;

    const providerRows = source.variants.length
      ? source.variants.map(variant => ({
          product_id: insertedProduct.id,
          provider_name: 'QIKINK',
          provider_product_id: String(source.id),
          provider_sku: variant.sku,
          base_cost: variant.cost,
          size: variant.size,
          color: variant.color,
        }))
      : [{
          product_id: insertedProduct.id,
          provider_name: 'QIKINK',
          provider_product_id: String(source.id),
          provider_sku: `QK-${source.id}`,
          base_cost: baseCost,
          size: 'ALL',
          color: 'ALL',
        }];

    await supabase
      .from('product_provider')
      .delete()
      .eq('product_id', insertedProduct.id)
      .eq('provider_name', 'QIKINK');

    const { error: providerErr } = await supabase.from('product_provider').insert(providerRows);
    if (providerErr) throw providerErr;

    return NextResponse.json({
      success: true,
      persisted: true,
      message: `${source.title} synced from Qikink to KultZR`,
      product: insertedProduct,
      provider: { id: source.id, baseCost, variants: source.variants },
    });
  } catch (err: any) {
    console.error('KultZR Qikink Sync Error:', err);
    return NextResponse.json({ error: err?.message || 'Failed to sync Qikink product' }, { status: 500 });
  }
}

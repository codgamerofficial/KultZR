import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { enrichProductMetadata } from '@/lib/aiEnrichment';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, title, price, category, image, variants } = body;

    if (!productId || !title) {
      return NextResponse.json({ error: 'Qikink Product ID and Title required' }, { status: 400 });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + productId;

    // AI Enrich the Qikink product metadata
    const aiEnriched = await enrichProductMetadata({
      rawTitle: title,
      category: category || 'T-Shirts',
      emblemName: 'Bespoke Emblem',
    });

    const productPayload = {
      title: aiEnriched.seoTitle || title,
      slug: slug,
      category_slug: (category || 't-shirts').toLowerCase().replace(/\s+/g, '-'),
      gender: 'Unisex',
      price: price || 499,
      original_price: Math.round((price || 499) * 1.6),
      description: aiEnriched.luxuryDescription,
      story: 'Zero-inventory bespoke printing powered by Qikink on-demand manufacturing.',
      fabric_details: aiEnriched.fabricDetails,
      images: JSON.stringify([image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800']),
      colors: JSON.stringify([
        { name: 'Pearl White', hex: '#F5F5F5' },
        { name: 'Obsidian Black', hex: '#1A1A1A' }
      ]),
      sizes: 'XS, S, M, L, XL, XXL',
      is_customizable: true,
      is_featured: true,
      ai_status: 'PUBLISHED',
    };

    if (isSupabaseConfigured) {
      // Upsert into Supabase products table
      const { data: insertedProduct, error: prodErr } = await supabase
        .from('products')
        .upsert(productPayload, { onConflict: 'slug' })
        .select()
        .single();

      if (prodErr) {
        console.error('Supabase Product Sync Error:', prodErr);
      } else if (insertedProduct) {
        // Map to product_provider table for Qikink SKU tracking
        await supabase.from('product_provider').insert({
          product_id: insertedProduct.id,
          provider_name: 'QIKINK',
          provider_product_id: String(productId),
          provider_sku: `QK-${productId}-VAR`,
          base_cost: Math.round((price || 499) * 0.6),
          size: 'ALL',
          color: 'ALL',
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Product ${productId} (${title}) successfully synced to KultZR catalog`,
      product: productPayload,
    });
  } catch (err: any) {
    console.error('Qikink Sync API Error:', err);
    return NextResponse.json({ error: err?.message || 'Failed to sync Qikink product' }, { status: 500 });
  }
}

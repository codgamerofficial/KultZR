const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://thkztuyvpbwwwkppofuf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoa3p0dXl2cGJ3d3drcHBvZnVmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjgwNTIyNywiZXhwIjoyMTAyMzgxMjI3fQ.A_g9b-EXj5-CyM54PP9p4iZBeIq_DDFuhI9tOYLElF4';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const MOCK_PRODUCTS = [
  {
    title: 'The Identity Oversized Tee',
    slug: 'the-identity-oversized-tee',
    category_slug: 'unisex',
    gender: 'unisex',
    price: 1899,
    original_price: 2499,
    description: 'A heavyweight luxury canvas designed for personal storytelling. Made with zero-waste on-demand printing.',
    story: 'Every seam carries intent. "The Identity" represents your personal manifesto—bold, uncompromised, and authentically yours.',
    fabric_details: '100% Combed Organic Cotton • 240 GSM Heavyweight • Bio-Washed • Anti-Pilling',
    images: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000',
    colors: [
      { name: 'Obsidian Black', hex: '#0A0A0C' },
      { name: 'Pearl White', hex: '#FAFAFA' },
      { name: 'Vintage Washed Charcoal', hex: '#272730' },
      { name: 'Imperial Gold', hex: '#D4AF37' }
    ],
    sizes: 'S, M, L, XL, XXL',
    is_customizable: true,
    is_featured: true,
    rating: 4.9,
    review_count: 34
  },
  {
    title: 'Storyteller Heavyweight Hoodie',
    slug: 'storyteller-heavyweight-hoodie',
    category_slug: 'unisex',
    gender: 'unisex',
    price: 3499,
    original_price: 4299,
    description: 'Structured silhouette tailored with fleece interior. Perfect canvas for custom back quotes and artwork.',
    story: 'Built for winter nights, creative breakthroughs, and unspoken ambition.',
    fabric_details: '80% Organic Cotton, 20% Recycled Poly • 380 GSM Fleece • Double-Lined Hood • YKK Hardware',
    images: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1000',
    colors: [
      { name: 'Midnight Charcoal', hex: '#141418' },
      { name: 'Sand Cream', hex: '#E6E2DD' },
      { name: 'Obsidian Black', hex: '#0A0A0C' }
    ],
    sizes: 'S, M, L, XL, XXL',
    is_customizable: true,
    is_featured: true,
    rating: 4.95,
    review_count: 52
  },
  {
    title: 'Empowered Statement Cropped Hoodie',
    slug: 'empowered-statement-cropped-hoodie',
    category_slug: 'women',
    gender: 'women',
    price: 2999,
    original_price: 3699,
    description: 'Cropped hem, raw edge detail, and high-density cotton structure. Personalize with your custom mantra.',
    story: 'Unapologetic expression. Created for women who carve their own path.',
    fabric_details: '95% Premium French Terry Cotton, 5% Elastane • 320 GSM • Raw Cut Hem',
    images: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000',
    colors: [
      { name: 'Pearl White', hex: '#FAFAFA' },
      { name: 'Rose Gold Amber', hex: '#D4AF37' },
      { name: 'Charcoal Black', hex: '#141418' }
    ],
    sizes: 'XS, S, M, L',
    is_customizable: true,
    is_featured: true,
    rating: 4.9,
    review_count: 27
  }
];

async function seed() {
  console.log('Seeding products to Supabase live database...');
  for (const prod of MOCK_PRODUCTS) {
    const { data, error } = await supabase.from('products').insert(prod);
    if (error) {
      console.error(`Failed to insert ${prod.title}:`, error.message);
    } else {
      console.log(`Successfully seeded product: ${prod.title}`);
    }
  }
}

seed();

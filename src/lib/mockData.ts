import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    title: 'The Identity Oversized Tee',
    slug: 'the-identity-oversized-tee',
    category_slug: 'unisex',
    gender: 'unisex',
    price: 1899,
    original_price: 2499,
    description: 'A heavyweight luxury canvas designed for personal storytelling. Made with zero-waste on-demand printing.',
    story: 'Every seam carries intent. "The Identity" represents your personal manifesto—bold, uncompromised, and authentically yours.',
    fabric_details: '100% Combed Organic Cotton • 240 GSM Heavyweight • Bio-Washed • Anti-Pilling',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1000',
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0A0A0C' },
      { name: 'Pearl White', hex: '#FAFAFA' },
      { name: 'Vintage Washed Charcoal', hex: '#272730' },
      { name: 'Imperial Gold', hex: '#D4AF37' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    is_customizable: true,
    is_featured: true,
    rating: 4.9,
    review_count: 34
  },
  {
    id: 'prod-002',
    title: 'Storyteller Heavyweight Hoodie',
    slug: 'storyteller-heavyweight-hoodie',
    category_slug: 'unisex',
    gender: 'unisex',
    price: 3499,
    original_price: 4299,
    description: 'Structured silhouette tailored with fleece interior. Perfect canvas for custom back quotes and artwork.',
    story: 'Built for winter nights, creative breakthroughs, and unspoken ambition.',
    fabric_details: '80% Organic Cotton, 20% Recycled Poly • 380 GSM Fleece • Double-Lined Hood • YKK Hardware',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=1000',
    ],
    colors: [
      { name: 'Midnight Charcoal', hex: '#141418' },
      { name: 'Sand Cream', hex: '#E6E2DD' },
      { name: 'Obsidian Black', hex: '#0A0A0C' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    is_customizable: true,
    is_featured: true,
    rating: 4.95,
    review_count: 52
  },
  {
    id: 'prod-003',
    title: 'Visionary Minimalist Drop-Shoulder Tee',
    slug: 'visionary-minimalist-drop-shoulder-tee',
    category_slug: 'men',
    gender: 'men',
    price: 1699,
    original_price: 2199,
    description: 'Clean architectural cut featuring dropped shoulders and subtle branding. Tailored for urban effortless style.',
    story: 'Less is more. Designed for the quiet leaders shaping tomorrow.',
    fabric_details: '100% Ring-Spun Cotton • 220 GSM • Pre-shrunk • Reinforced collar',
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1618354691229-88d47f28e742?auto=format&fit=crop&q=80&w=1000',
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0A0A0C' },
      { name: 'Deep Sage', hex: '#3B4D3C' },
      { name: 'Pearl White', hex: '#FAFAFA' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    is_customizable: true,
    is_featured: false,
    rating: 4.8,
    review_count: 19
  },
  {
    id: 'prod-004',
    title: 'Empowered Statement Cropped Hoodie',
    slug: 'empowered-statement-cropped-hoodie',
    category_slug: 'women',
    gender: 'women',
    price: 2999,
    original_price: 3699,
    description: 'Cropped hem, raw edge detail, and high-density cotton structure. Personalize with your custom mantra.',
    story: 'Unapologetic expression. Created for women who carve their own path.',
    fabric_details: '95% Premium French Terry Cotton, 5% Elastane • 320 GSM • Raw Cut Hem',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=1000',
    ],
    colors: [
      { name: 'Pearl White', hex: '#FAFAFA' },
      { name: 'Rose Gold Amber', hex: '#D4AF37' },
      { name: 'Charcoal Black', hex: '#141418' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    is_customizable: true,
    is_featured: true,
    rating: 4.9,
    review_count: 27
  },
  {
    id: 'prod-005',
    title: 'KultZR Signature Canvas Tote',
    slug: 'kultzr-signature-canvas-tote',
    category_slug: 'accessories',
    gender: 'accessories',
    price: 899,
    original_price: 1299,
    description: 'Heavyweight organic canvas bag with reinforced handles. Customize with your quote, insignia, or art.',
    story: 'Carry your story wherever you roam. Sustainable zero-plastic canvas tote.',
    fabric_details: '100% Unbleached Heavy Canvas • 400 GSM • Inner zippered pocket • Reinforced stitching',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1000',
    ],
    colors: [
      { name: 'Natural Oatmeal', hex: '#EBE6DD' },
      { name: 'Obsidian Black', hex: '#0A0A0C' }
    ],
    sizes: ['One Size'],
    is_customizable: true,
    is_featured: false,
    rating: 4.85,
    review_count: 41
  },
  {
    id: 'prod-006',
    title: 'Artisan Embroidered Snapback Cap',
    slug: 'artisan-embroidered-snapback-cap',
    category_slug: 'accessories',
    gender: 'accessories',
    price: 1199,
    original_price: 1599,
    description: 'Structured 6-panel hat with brass buckle closure. Custom 3D thread embroidery options available.',
    story: 'Crown your identity with precision craft.',
    fabric_details: '100% Heavy Twill Cotton • Brass hardware • Moisture-wicking sweatband',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&q=80&w=1000',
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0A0A0C' },
      { name: 'Vintage Olive', hex: '#4B5320' }
    ],
    sizes: ['Adjustable'],
    is_customizable: true,
    is_featured: false,
    rating: 4.75,
    review_count: 14
  }
];

export const MOCK_TESTIMONIALS = [
  {
    id: '1',
    name: 'Aysha Khan',
    role: 'Visual Artist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    text: 'I uploaded my grandmother’s traditional motif onto the Identity Oversized Tee. The print clarity and cotton quality are unreal!',
    rating: 5,
    storyTag: '#MyGrandmotherLegacy'
  },
  {
    id: '2',
    name: 'Rohan Verma',
    role: 'Tech Founder',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    text: 'Zero waste, custom made, and delivered in 4 days. KultZR is the future of conscious streetwear.',
    rating: 5,
    storyTag: '#CodeAndCanvas'
  },
  {
    id: '3',
    name: 'Devika Nair',
    role: 'Architect',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    text: 'The Customizer Studio let me place my architectural mantra right on the sleeve. Fits like a designer luxury piece.',
    rating: 5,
    storyTag: '#StructuralMinimalism'
  }
];

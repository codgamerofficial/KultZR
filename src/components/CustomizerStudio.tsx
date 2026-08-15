'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/cartContext';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { Product, ColorOption } from '@/lib/types';
import { Sparkles, ShoppingBag, Type, Palette, Layout, ShieldCheck, Check, Upload, Image as ImageIcon, Share2, Compass, Crown, Sun } from 'lucide-react';
import confetti from 'canvas-confetti';

const FONTS = [
  { name: 'Montserrat', value: 'var(--font-inter), sans-serif' },
  { name: 'Playfair Display', value: 'Georgia, serif' },
  { name: 'Bebas Neue', value: 'Impact, sans-serif' },
  { name: 'Courier Code', value: 'monospace' },
  { name: 'Cinzel Decorative', value: "'Cinzel', Georgia, serif" },
];

const TEXT_COLORS = [
  { name: 'Pearl White', hex: '#FAFAFA' },
  { name: 'Imperial Gold', hex: '#D4AF37' },
  { name: 'Metallic Silver', hex: '#C0C0C0' },
  { name: 'Amber Yellow', hex: '#FFC107' },
  { name: 'Crimson Red', hex: '#E54D42' },
  { name: 'Obsidian Black', hex: '#0A0A0C' },
];

const STORY_PRESETS = [
  "Unapologetically Self-Made.",
  "Wear Your Legacy.",
  "Code & Canvas.",
  "Culture Over Everything.",
  "Crafted in Silence, Speaks in Thunder.",
  "Zero Inventory. Infinite Identity.",
];

const EMBLEM_PRESETS = [
  { name: 'None', icon: null, svgPath: null },
  { name: 'KR Monogram', icon: '✨', svgPath: '/brand/icon.svg' },
  { name: 'Quill & Thread', icon: '🖋️', svgPath: null },
  { name: 'Phoenix Crest', icon: '🦅', svgPath: null },
  { name: 'Minimalist Sun', icon: '☀️', svgPath: null },
  { name: 'Heritage Knot', icon: '⚜️', svgPath: null },
  { name: 'Astral Compass', icon: '🧭', svgPath: null },
  { name: 'Urban Crown', icon: '👑', svgPath: null },
  { name: 'Cyber Lotus', icon: '🪷', svgPath: null },
];

export default function CustomizerStudio({ initialProduct }: { initialProduct?: Product }) {
  const { addToCart } = useCart();

  const [selectedProduct, setSelectedProduct] = useState<Product>(initialProduct || MOCK_PRODUCTS[0]);
  const [selectedGarmentColor, setSelectedGarmentColor] = useState<ColorOption>(selectedProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(selectedProduct.sizes[0] || 'M');

  // Customization state
  const [customText, setCustomText] = useState<string>('WEAR YOUR STORY');
  const [selectedFont, setSelectedFont] = useState<string>(FONTS[0].name);
  const [selectedTextColor, setSelectedTextColor] = useState<string>('#FAFAFA');
  const [selectedEmblem, setSelectedEmblem] = useState<string>('KR Monogram');
  const [uploadedGraphic, setUploadedGraphic] = useState<string | null>(null);
  const [placement, setPlacement] = useState<'front_center' | 'back_center' | 'chest_pocket'>('front_center');
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedGraphic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const activeFontObj = FONTS.find(f => f.name === selectedFont) || FONTS[0];
  const activeEmblemObj = EMBLEM_PRESETS.find(e => e.name === selectedEmblem);

  const handleAddToCart = () => {
    addToCart(
      selectedProduct,
      selectedSize,
      selectedGarmentColor,
      {
        custom_text: customText,
        font_family: selectedFont,
        text_color: selectedTextColor,
        garment_color: selectedGarmentColor.name,
        graphic_url: uploadedGraphic || activeEmblemObj?.svgPath || undefined,
        placement: placement,
      },
      1
    );

    setAdded(true);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => setAdded(false), 2500);
  };

  const handleShareDesign = () => {
    const url = `${window.location.origin}/customize?product=${selectedProduct.slug}&text=${encodeURIComponent(customText)}&font=${encodeURIComponent(selectedFont)}&color=${encodeURIComponent(selectedGarmentColor.name)}&emblem=${encodeURIComponent(selectedEmblem)}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-brand-gold/30 shadow-2xl space-y-8">
      
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-border pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> 2D Atelier Bespoke Studio
          </span>
          <h2 className="text-3xl font-black text-brand-pearl mt-1">Design Your Personal Identity Piece</h2>
          <p className="text-xs text-brand-muted mt-1">
            Zero-waste on-demand printing. Choose your emblem, statement text, typography, and placement.
          </p>
        </div>

        <button
          onClick={handleShareDesign}
          className="px-4 py-2.5 rounded-full bg-brand-dark border border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10 text-xs font-bold flex items-center gap-2 shrink-0 transition-all cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>{copied ? 'Design URL Copied!' : 'Share Custom Design'}</span>
        </button>
      </div>

      {/* Main Interactive Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Garment Mockup Live 2D Canvas (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 sm:p-10 rounded-3xl bg-brand-dark/90 border border-brand-border relative min-h-115 overflow-hidden group">
          
          {/* Subtle Ambient Studio Light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

          {/* Placement Badge */}
          <span className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-brand-card/80 text-brand-gold border border-brand-gold/30">
            Preview: {placement.replace('_', ' ')}
          </span>

          {/* Garment Image Mockup */}
          <div className="relative w-72 h-80 sm:w-88 sm:h-96 flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.02]">
            <Image
              src={selectedProduct.images[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800'}
              alt={selectedProduct.title}
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />

            {/* LIVE 2D OVERLAY CANVAS PRINT AREA */}
            <div
              className={`absolute flex flex-col items-center justify-center text-center p-3 pointer-events-none transition-all duration-300 ${
                placement === 'front_center'
                  ? 'top-[28%] w-[60%]'
                  : placement === 'back_center'
                  ? 'top-[26%] w-[65%]'
                  : 'top-[24%] left-[22%] w-[35%]'
              }`}
            >
              {/* Custom Graphic Upload or Vector SVG Emblem */}
              {uploadedGraphic ? (
                <img src={uploadedGraphic} alt="Custom Graphic" className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-2 drop-shadow-md" />
              ) : activeEmblemObj?.svgPath ? (
                <img src={activeEmblemObj.svgPath} alt="KR Emblem" className="w-14 h-14 sm:w-18 sm:h-18 object-contain mb-2 drop-shadow-lg" />
              ) : activeEmblemObj?.icon ? (
                <span className="text-2xl sm:text-3xl mb-1 filter drop-shadow-md">{activeEmblemObj.icon}</span>
              ) : null}

              {/* Typography Statement Text */}
              {customText && (
                <p
                  style={{
                    fontFamily: activeFontObj.value,
                    color: selectedTextColor,
                    textShadow: '0 2px 8px rgba(0,0,0,0.85)'
                  }}
                  className="text-base sm:text-lg md:text-xl font-extrabold tracking-wide leading-tight wrap-break-word max-w-full drop-shadow-xl uppercase"
                >
                  {customText}
                </p>
              )}
            </div>
          </div>

          {/* Garment Color Swatches under mockup */}
          <div className="mt-4 flex items-center gap-3 z-10">
            <span className="text-xs text-brand-muted font-bold">Fabric Color:</span>
            {selectedProduct.colors.map(color => (
              <button
                key={color.name}
                onClick={() => setSelectedGarmentColor(color)}
                style={{ backgroundColor: color.hex }}
                className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                  selectedGarmentColor.name === color.name ? 'border-brand-gold scale-125 shadow-lg shadow-amber-500/30' : 'border-brand-border hover:scale-110'
                }`}
                title={color.name}
              />
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN: Customization Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Base Product Selector */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-widest text-brand-gold flex items-center gap-1.5">
              <Layout className="w-3.5 h-3.5" /> Select Atelier Silhouette
            </label>
            <select
              value={selectedProduct.id}
              onChange={(e) => {
                const prod = MOCK_PRODUCTS.find(p => p.id === e.target.value);
                if (prod) {
                  setSelectedProduct(prod);
                  setSelectedGarmentColor(prod.colors[0]);
                  setSelectedSize(prod.sizes[0] || 'M');
                }
              }}
              className="w-full bg-brand-dark border border-brand-border rounded-xl p-3 text-xs text-brand-pearl focus:outline-none focus:border-brand-gold"
            >
              {MOCK_PRODUCTS.map(p => (
                <option key={p.id} value={p.id}>{p.title} — ₹{p.price.toLocaleString('en-IN')}</option>
              ))}
            </select>
          </div>

          {/* Statement Quote Text Input */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-widest text-brand-gold flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5" /> Statement Quote / Name
            </label>
            <input
              type="text"
              maxLength={45}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="e.g. WEAR YOUR STORY"
              className="w-full bg-brand-dark border border-brand-border rounded-xl p-3 text-xs text-brand-pearl focus:outline-none focus:border-brand-gold uppercase font-bold"
            />

            {/* Quick Story Statement Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {STORY_PRESETS.map(preset => (
                <button
                  key={preset}
                  onClick={() => setCustomText(preset)}
                  className="px-2.5 py-1 rounded-full bg-brand-card/60 border border-brand-border hover:border-brand-gold text-[10px] text-brand-muted hover:text-brand-pearl transition-all cursor-pointer"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Vector Emblem Presets (Expanded) */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-widest text-brand-gold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Vector Story Emblems
            </label>
            <div className="grid grid-cols-3 gap-2">
              {EMBLEM_PRESETS.map(emb => (
                <button
                  key={emb.name}
                  onClick={() => {
                    setSelectedEmblem(emb.name);
                    setUploadedGraphic(null);
                  }}
                  className={`p-2.5 rounded-xl border text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    selectedEmblem === emb.name && !uploadedGraphic
                      ? 'border-brand-gold bg-brand-gold/15 text-brand-gold shadow-md shadow-amber-500/10'
                      : 'border-brand-border bg-brand-dark text-brand-muted hover:border-brand-pearl'
                  }`}
                >
                  {emb.svgPath ? (
                    <img src={emb.svgPath} alt="KR" className="w-4 h-4 object-contain" />
                  ) : emb.icon ? (
                    <span>{emb.icon}</span>
                  ) : null}
                  <span className="truncate">{emb.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Graphic File Upload */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-widest text-brand-gold flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5" /> Upload Custom Graphic (PNG / SVG)
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/png, image/svg+xml, image/jpeg"
                onChange={handleFileUpload}
                className="hidden"
                id="custom-graphic-upload"
              />
              <label
                htmlFor="custom-graphic-upload"
                className="w-full p-3 rounded-xl border border-dashed border-brand-border bg-brand-dark hover:border-brand-gold text-xs text-brand-muted hover:text-brand-pearl flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <ImageIcon className="w-4 h-4 text-brand-gold" />
                <span>{uploadedGraphic ? 'Replace Uploaded Graphic' : 'Upload Graphic Vector'}</span>
              </label>
            </div>
          </div>

          {/* Font Typography Selector */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-widest text-brand-gold flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5" /> Typography Font Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {FONTS.map(font => (
                <button
                  key={font.name}
                  onClick={() => setSelectedFont(font.name)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    selectedFont === font.name
                      ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                      : 'border-brand-border bg-brand-dark text-brand-muted hover:border-brand-pearl'
                  }`}
                >
                  {font.name}
                </button>
              ))}
            </div>
          </div>

          {/* Text Color Swatches */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-widest text-brand-gold flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5" /> Print Ink Color
            </label>
            <div className="flex items-center gap-3">
              {TEXT_COLORS.map(color => (
                <button
                  key={color.name}
                  onClick={() => setSelectedTextColor(color.hex)}
                  style={{ backgroundColor: color.hex }}
                  className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                    selectedTextColor === color.hex ? 'border-brand-gold scale-125 shadow-lg shadow-amber-500/30' : 'border-brand-border hover:scale-110'
                  }`}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Select Fit Size</label>
            <div className="flex gap-2">
              {selectedProduct.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                    selectedSize === size
                      ? 'border-brand-gold bg-brand-gold text-brand-dark'
                      : 'border-brand-border bg-brand-dark text-brand-muted hover:text-brand-pearl'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add Bespoke Item to Bag CTA */}
          <button
            onClick={handleAddToCart}
            className="w-full py-4 bg-linear-to-r from-amber-400 via-brand-gold to-amber-500 text-brand-dark font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-xl shadow-amber-500/20 cursor-pointer"
          >
            {added ? (
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5" /> Added to Shopping Bag!
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Add Custom Piece to Bag (₹{selectedProduct.price.toLocaleString('en-IN')})
              </span>
            )}
          </button>

          <p className="text-[11px] text-center text-brand-muted flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            240 GSM Organic Cotton • Printed On-Demand via Qikink
          </p>

        </div>

      </div>

    </div>
  );
}

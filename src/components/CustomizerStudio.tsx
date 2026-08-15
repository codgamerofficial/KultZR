'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/cartContext';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { Product, ColorOption } from '@/lib/types';
import { Sparkles, ShoppingBag, Type, Palette, Layout, ShieldCheck, Check, Upload, Image as ImageIcon, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const FONTS = [
  { name: 'Montserrat', value: 'var(--font-inter), sans-serif' },
  { name: 'Playfair Display', value: 'Georgia, serif' },
  { name: 'Bebas Neue', value: 'Impact, sans-serif' },
  { name: 'Courier Code', value: 'monospace' },
];

const TEXT_COLORS = [
  { name: 'Pearl White', hex: '#FAFAFA' },
  { name: 'Imperial Gold', hex: '#D4AF37' },
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
];

const EMBLEM_PRESETS = [
  { name: 'None', icon: null },
  { name: 'Quill & Thread', icon: '🖋️' },
  { name: 'Phoenix Crest', icon: '🦅' },
  { name: 'Minimalist Sun', icon: '☀️' },
  { name: 'Heritage Knot', icon: '⚜️' },
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
  const [selectedEmblem, setSelectedEmblem] = useState<string>('None');
  const [uploadedGraphic, setUploadedGraphic] = useState<string | null>(null);
  const [placement, setPlacement] = useState<'front_center' | 'back_center' | 'chest_pocket'>('front_center');
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedGraphic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShareDesign = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        placement: placement,
        graphic_url: uploadedGraphic || undefined,
      }
    );

    setAdded(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => setAdded(false), 2500);
  };

  const emblemObj = EMBLEM_PRESETS.find(e => e.name === selectedEmblem);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* LEFT CANVAS PREVIEW (7 Cols) */}
      <div className="lg:col-span-7 space-y-4">
        <div className="relative aspect-square w-full rounded-3xl overflow-hidden glass-panel border border-brand-gold/30 flex items-center justify-center p-8 shadow-2xl">
          
          {/* Background Mockup Image */}
          <div 
            className="absolute inset-0 transition-colors duration-500" 
            style={{ backgroundColor: selectedGarmentColor.hex === '#FAFAFA' ? '#F4F4F6' : selectedGarmentColor.hex }}
          >
            <Image
              src={selectedProduct.images[0]}
              alt={selectedProduct.title}
              fill
              className="object-contain opacity-75 mix-blend-multiply"
            />
          </div>

          {/* Live Rendered Custom Text Layer */}
          <div 
            className={`absolute transition-all duration-300 pointer-events-none text-center px-6 max-w-[80%] ${
              placement === 'front_center' ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' :
              placement === 'back_center' ? 'top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2' :
              'top-[32%] left-[38%] -translate-x-1/2'
            }`}
          >
            {/* Custom Graphic or Emblem */}
            {uploadedGraphic ? (
              <div className="w-16 h-16 relative mx-auto mb-2 opacity-90">
                <img src={uploadedGraphic} alt="Custom Graphic" className="w-full h-full object-contain" />
              </div>
            ) : emblemObj?.icon ? (
              <div className="text-3xl mb-1 drop-shadow-md">{emblemObj.icon}</div>
            ) : null}

            <p
              className="tracking-widest font-extrabold uppercase drop-shadow-md select-none transition-all"
              style={{
                color: selectedTextColor,
                fontSize: placement === 'chest_pocket' ? '1rem' : '1.75rem',
                fontFamily: selectedFont === 'Courier Code' ? 'monospace' : selectedFont === 'Playfair Display' ? 'Georgia, serif' : 'var(--font-inter), sans-serif',
                textShadow: selectedTextColor === '#0A0A0C' ? '0 1px 2px rgba(255,255,255,0.4)' : '0 2px 8px rgba(0,0,0,0.6)'
              }}
            >
              {customText || 'YOUR CUSTOM STORY'}
            </p>
            <div className="w-12 h-0.5 bg-brand-gold mx-auto mt-2 opacity-80" />
            <span className="text-[10px] tracking-widest text-brand-gold font-bold uppercase block mt-1">
              KultZR Bespoke
            </span>
          </div>

          {/* Canvas Watermark Bar */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-brand-pearl bg-brand-dark/80 backdrop-blur-md px-4 py-2 rounded-xl border border-brand-border">
            <span className="flex items-center gap-1.5 text-brand-gold font-bold">
              <Sparkles className="w-4 h-4" /> Live 2D Mockup Canvas
            </span>
            <button 
              onClick={handleShareDesign}
              className="text-brand-muted hover:text-brand-gold text-[11px] font-semibold flex items-center gap-1 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" /> {copied ? 'Link Copied!' : 'Share Design'}
            </button>
          </div>

        </div>

        {/* Garment Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MOCK_PRODUCTS.slice(0, 4).map(prod => (
            <button
              key={prod.id}
              onClick={() => {
                setSelectedProduct(prod);
                setSelectedGarmentColor(prod.colors[0]);
              }}
              className={`p-3 rounded-xl text-left border transition-all ${
                selectedProduct.id === prod.id 
                  ? 'border-brand-gold bg-brand-gold/10 text-brand-pearl font-bold' 
                  : 'border-brand-border bg-brand-card/40 text-brand-muted hover:border-brand-pearl/40'
              }`}
            >
              <p className="text-xs font-semibold line-clamp-1">{prod.title}</p>
              <p className="text-[11px] text-brand-gold mt-1">₹{prod.price}</p>
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT CONTROLS PANEL (5 Cols) */}
      <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-brand-border space-y-6">
        <div>
          <div className="flex items-center gap-2 text-brand-gold font-bold text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4" /> KultZR Bespoke Studio
          </div>
          <h2 className="text-2xl font-bold text-brand-pearl mt-1">Customize {selectedProduct.title}</h2>
          <p className="text-xs text-brand-muted mt-1">
            Express your story with custom typography on luxury 240 GSM organic cotton.
          </p>
        </div>

        {/* Control 1: Story Text Input & Presets */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-brand-pearl flex items-center gap-2">
            <Type className="w-4 h-4 text-brand-gold" /> Custom Story Text
          </label>
          <input
            type="text"
            maxLength={35}
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Type your quote or name..."
            className="w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-pearl font-semibold focus:outline-none focus:border-brand-gold"
          />
          <div className="flex items-center justify-between text-[11px] text-brand-muted">
            <span>Max 35 characters</span>
            <span>{35 - customText.length} left</span>
          </div>

          {/* Quick Presets */}
          <div className="pt-2">
            <p className="text-[11px] text-brand-muted mb-2">Or select a story preset:</p>
            <div className="flex flex-wrap gap-1.5">
              {STORY_PRESETS.map(preset => (
                <button
                  key={preset}
                  onClick={() => setCustomText(preset)}
                  className="px-2.5 py-1 rounded-lg bg-brand-card/80 border border-brand-border text-[11px] text-brand-pearl hover:border-brand-gold hover:text-brand-gold transition-colors"
                >
                  &quot;{preset}&quot;
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Control 2: Story Emblems & Upload */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <label className="font-bold uppercase tracking-wider text-brand-pearl flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-brand-gold" /> Story Emblem / Graphic
            </label>
            <label className="text-brand-gold hover:underline cursor-pointer flex items-center gap-1 font-semibold">
              <Upload className="w-3.5 h-3.5" /> Upload Custom Graphic
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {EMBLEM_PRESETS.map(emblem => (
              <button
                key={emblem.name}
                onClick={() => {
                  setSelectedEmblem(emblem.name);
                  setUploadedGraphic(null);
                }}
                className={`py-2 px-2 rounded-xl border text-[11px] text-center flex items-center justify-center gap-1 transition-all ${
                  selectedEmblem === emblem.name && !uploadedGraphic
                    ? 'border-brand-gold bg-brand-gold/10 text-brand-gold font-bold'
                    : 'border-brand-border bg-brand-dark text-brand-muted hover:border-brand-pearl'
                }`}
              >
                {emblem.icon && <span>{emblem.icon}</span>}
                <span className="truncate">{emblem.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Control 3: Typography Style */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-brand-pearl">
            Typography Style
          </label>
          <div className="grid grid-cols-2 gap-2">
            {FONTS.map(font => (
              <button
                key={font.name}
                onClick={() => setSelectedFont(font.name)}
                className={`py-2 px-3 rounded-xl border text-xs text-center transition-all ${
                  selectedFont === font.name
                    ? 'border-brand-gold bg-brand-gold/10 text-brand-gold font-bold'
                    : 'border-brand-border bg-brand-dark text-brand-muted hover:border-brand-pearl'
                }`}
              >
                {font.name}
              </button>
            ))}
          </div>
        </div>

        {/* Control 4: Text & Garment Colors */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-pearl flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-brand-gold" /> Text Color
            </label>
            <div className="flex items-center gap-2">
              {TEXT_COLORS.map(color => (
                <button
                  key={color.name}
                  onClick={() => setSelectedTextColor(color.hex)}
                  className={`w-6 h-6 rounded-full border-2 ${selectedTextColor === color.hex ? 'border-brand-gold scale-110' : 'border-brand-border'}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-pearl">
              Garment Color
            </label>
            <div className="flex items-center gap-2">
              {selectedProduct.colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => setSelectedGarmentColor(color)}
                  className={`w-6 h-6 rounded-full border-2 ${selectedGarmentColor.name === color.name ? 'border-brand-gold scale-110' : 'border-brand-border'}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Control 5: Placement & Size */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-pearl flex items-center gap-1.5">
              <Layout className="w-3.5 h-3.5 text-brand-gold" /> Placement
            </label>
            <select
              value={placement}
              onChange={(e) => setPlacement(e.target.value as any)}
              className="w-full bg-brand-dark border border-brand-border rounded-xl px-3 py-2 text-xs text-brand-pearl focus:outline-none focus:border-brand-gold"
            >
              <option value="front_center">Front Center</option>
              <option value="back_center">Back Center</option>
              <option value="chest_pocket">Left Chest Pocket</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-pearl">
              Size
            </label>
            <div className="flex gap-1.5">
              {selectedProduct.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                    selectedSize === size
                      ? 'border-brand-gold bg-brand-gold text-brand-dark'
                      : 'border-brand-border bg-brand-dark text-brand-muted hover:border-brand-pearl'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Price & Add to Cart Button */}
        <div className="pt-4 border-t border-brand-border/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-brand-muted">Bespoke Total (Incl. Printing)</p>
              <p className="text-2xl font-extrabold text-brand-gold">₹{selectedProduct.price.toLocaleString('en-IN')}</p>
            </div>
            <div className="text-right text-[11px] text-brand-muted">
              <p className="flex items-center gap-1 justify-end text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> Made-to-Order Quality
              </p>
              <p>Dispatched in 3-5 Business Days</p>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-4 bg-linear-to-r from-amber-400 via-brand-gold to-amber-500 text-brand-dark font-extrabold text-base rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
          >
            {added ? (
              <>
                <Check className="w-5 h-5 stroke-3" /> Added to Your Story Bag!
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" /> Add Bespoke Piece to Bag
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}

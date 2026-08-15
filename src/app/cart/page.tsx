'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { ShoppingBag, Trash2, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-brand-card text-brand-gold rounded-full flex items-center justify-center mx-auto border border-brand-border">
          <ShoppingBag className="w-10 h-10 opacity-50" />
        </div>
        <h1 className="text-3xl font-extrabold text-brand-pearl">Your Story Bag is Empty</h1>
        <p className="text-sm text-brand-muted max-w-md mx-auto">
          Every piece in KultZR is made-to-order with zero waste. Start creating your custom apparel now.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-brand-dark font-extrabold rounded-full hover:bg-amber-400 transition-colors shadow-lg"
        >
          Explore Catalog <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between border-b border-brand-border pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-pearl">Shopping Bag</h1>
          <p className="text-xs text-brand-muted mt-1">{cart.length} item(s) selected for made-to-order craft</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-brand-muted hover:text-brand-crimson transition-colors"
        >
          Clear Bag
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Item List (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(item => (
            <div 
              key={item.cart_item_id}
              className="glass-panel p-6 rounded-2xl border border-brand-border flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between"
            >
              <div className="flex gap-4 items-center">
                <div className="w-24 h-28 relative rounded-xl overflow-hidden bg-brand-dark shrink-0 border border-brand-border">
                  <Image src={item.product.images[0]} alt={item.product.title} fill className="object-cover" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-brand-pearl">{item.product.title}</h3>
                  <p className="text-xs text-brand-muted">Size: <span className="text-brand-pearl font-semibold">{item.size}</span> | Color: <span className="text-brand-pearl font-semibold">{item.color.name}</span></p>
                  {item.customization && (
                    <div className="p-2 rounded-lg bg-brand-card/80 border border-brand-gold/30 text-xs text-brand-gold font-medium flex items-center gap-1.5 mt-2">
                      <Sparkles className="w-4 h-4 shrink-0" />
                      <span>Story Text: &quot;{item.customization.custom_text}&quot; ({item.customization.font_family})</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-brand-border/40">
                <div className="flex items-center border border-brand-border rounded-xl bg-brand-dark px-2 py-1">
                  <button 
                    onClick={() => updateQuantity(item.cart_item_id, item.quantity - 1)}
                    className="px-2 py-1 text-xs text-brand-muted hover:text-brand-pearl"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.cart_item_id, item.quantity + 1)}
                    className="px-2 py-1 text-xs text-brand-muted hover:text-brand-pearl"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-brand-gold">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.cart_item_id)}
                    className="text-xs text-brand-muted hover:text-brand-crimson transition-colors flex items-center gap-1 mt-1 ml-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar (4 Cols) */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-brand-border space-y-6">
          <h3 className="font-extrabold text-lg text-brand-pearl border-b border-brand-border pb-4">
            Order Summary
          </h3>

          <div className="space-y-3 text-xs text-brand-muted">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-brand-pearl font-bold text-sm">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Express Shipping (India)</span>
              <span className="text-emerald-400 font-bold">FREE</span>
            </div>
            <div className="flex justify-between">
              <span>GST Tax (18% Included)</span>
              <span className="text-brand-pearl">₹{Math.round(cartTotal * 0.18).toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-brand-border flex justify-between items-baseline">
            <span className="font-bold text-sm text-brand-pearl">Total Amount</span>
            <span className="text-2xl font-black text-brand-gold">₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>

          <Link
            href="/checkout"
            className="w-full py-4 bg-linear-to-r from-amber-400 via-brand-gold to-amber-500 text-brand-dark font-extrabold text-base rounded-2xl flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-xl shadow-amber-500/20"
          >
            Proceed to Checkout <ArrowRight className="w-5 h-5" />
          </Link>

          <div className="flex items-center justify-center gap-2 text-[11px] text-brand-muted pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero Plastic Packaging • Razorpay Secured</span>
          </div>
        </div>

      </div>
    </div>
  );
}

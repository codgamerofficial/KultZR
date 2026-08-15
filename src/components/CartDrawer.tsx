'use client';

import React from 'react';
import { useCart } from '@/lib/cartContext';
import { ShoppingBag, X, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-brand-charcoal text-brand-pearl border-l border-brand-border shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-brand-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-brand-gold" />
              <h2 className="text-xl font-bold tracking-tight">Your Story Bag</h2>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-brand-card rounded-full text-brand-muted hover:text-brand-pearl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-16 h-16 text-brand-muted mx-auto opacity-40" />
                <p className="text-brand-muted text-lg font-medium">Your bag is empty.</p>
                <p className="text-sm text-brand-muted/70 max-w-xs mx-auto">
                  Explore our luxury collection and wear your story with custom-crafted apparel.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block mt-4 px-6 py-3 bg-brand-gold text-brand-dark font-semibold rounded-full hover:bg-amber-400 transition-colors"
                >
                  Explore Shop
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div 
                  key={item.cart_item_id}
                  className="flex gap-4 p-4 rounded-xl bg-brand-card/60 border border-brand-border/60 relative group"
                >
                  <div className="w-20 h-24 relative rounded-lg overflow-hidden bg-brand-dark flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-sm line-clamp-1">{item.product.title}</h3>
                      <div className="text-xs text-brand-muted mt-1 space-y-0.5">
                        <p>Size: <span className="text-brand-pearl font-medium">{item.size}</span> | Color: <span className="text-brand-pearl font-medium">{item.color.name}</span></p>
                        {item.customization && (
                          <p className="flex items-center gap-1 text-brand-gold text-[11px] font-medium mt-1">
                            <Sparkles className="w-3 h-3" /> Custom Story: &quot;{item.customization.custom_text}&quot;
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-brand-border rounded-lg bg-brand-dark">
                        <button 
                          onClick={() => updateQuantity(item.cart_item_id, item.quantity - 1)}
                          className="px-2 py-1 text-xs text-brand-muted hover:text-brand-pearl"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.cart_item_id, item.quantity + 1)}
                          className="px-2 py-1 text-xs text-brand-muted hover:text-brand-pearl"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm text-brand-gold">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <button 
                          onClick={() => removeFromCart(item.cart_item_id)}
                          className="text-brand-muted hover:text-brand-crimson transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-brand-border bg-brand-card/40 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-brand-muted">Subtotal</span>
                <span className="text-lg font-bold text-brand-gold">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[12px] text-brand-muted">Free standard shipping on orders across India. Zero unsold inventory waste.</p>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-4 bg-gradient-to-r from-amber-400 to-brand-gold text-brand-dark font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-lg shadow-amber-500/10"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

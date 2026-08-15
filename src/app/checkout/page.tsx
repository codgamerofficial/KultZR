'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/cartContext';
import { OrderShippingAddress } from '@/lib/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import RazorpayModal from '@/components/RazorpayModal';
import { ShieldCheck, ArrowRight, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [orderComplete, setOrderComplete] = useState<{ paymentId: string; orderId: string } | null>(null);

  const [address, setAddress] = useState<OrderShippingAddress>({
    full_name: '',
    email: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    country: 'India',
  });

  const handleSubmitAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.full_name || !address.email || !address.address_line1 || !address.pincode) {
      alert('Please fill out all required shipping fields.');
      return;
    }
    setShowRazorpay(true);
  };

  const handlePaymentSuccess = async (paymentId: string, orderId: string) => {
    setShowRazorpay(false);
    setOrderComplete({ paymentId, orderId });

    // 1. Save order to Supabase live database if configured
    if (isSupabaseConfigured) {
      try {
        const { data: orderData, error: orderError } = await supabase.from('orders').insert({
          order_number: orderId,
          customer_email: address.email,
          customer_name: address.full_name,
          shipping_address: address,
          total_amount: cartTotal,
          currency: 'INR',
          payment_status: 'paid',
          order_status: 'processing',
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
        }).select().single();

        if (!orderError && orderData) {
          const orderItems = cart.map(item => ({
            order_id: orderData.id,
            product_id: item.product.id,
            product_title: item.product.title,
            product_image: item.product.images[0],
            quantity: item.quantity,
            size: item.size,
            color: item.color.name,
            unit_price: item.product.price,
            customization_details: item.customization || null,
          }));

          await supabase.from('order_items').insert(orderItems);
        }
      } catch (err) {
        console.warn('Supabase DB order insert warning:', err);
      }
    }

    // 2. Trigger Print-on-Demand fulfillment webhook
    try {
      await fetch('/api/webhooks/pod', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          paymentId,
          items: cart,
          shippingAddress: address,
        })
      });
    } catch (e) {
      console.warn('POD webhook call warning:', e);
    }

    clearCart();
  };

  if (orderComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-2xl">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Payment Verified!</span>
          <h1 className="text-3xl sm:text-5xl font-black text-brand-pearl">Wear Your Story Soon!</h1>
          <p className="text-sm text-brand-muted max-w-md mx-auto">
            Thank you, <span className="text-brand-pearl font-bold">{address.full_name}</span>. Your payment has been confirmed via Razorpay. Your order is now being custom printed with zero waste.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-brand-border text-left max-w-md mx-auto space-y-3 text-xs">
          <div className="flex justify-between border-b border-brand-border pb-2">
            <span className="text-brand-muted">Razorpay Order Ref:</span>
            <span className="font-bold text-brand-gold">{orderComplete.orderId}</span>
          </div>
          <div className="flex justify-between border-b border-brand-border pb-2">
            <span className="text-brand-muted">Razorpay Payment ID:</span>
            <span className="font-mono text-brand-pearl">{orderComplete.paymentId}</span>
          </div>
          <div className="flex justify-between border-b border-brand-border pb-2">
            <span className="text-brand-muted">Shipping Destination:</span>
            <span className="font-semibold text-brand-pearl text-right">{address.city}, {address.state}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-muted">Estimated Delivery:</span>
            <span className="font-bold text-emerald-400">3-5 Business Days</span>
          </div>
        </div>

        <div className="pt-4 flex justify-center gap-4">
          <Link
            href="/account"
            className="px-6 py-3 bg-brand-gold text-brand-dark font-extrabold text-xs rounded-full hover:bg-amber-400 transition-colors"
          >
            Track Order Status
          </Link>
          <Link
            href="/shop"
            className="px-6 py-3 bg-brand-card text-brand-pearl font-bold text-xs rounded-full border border-brand-border"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-brand-pearl">No Items in Cart for Checkout</h2>
        <p className="text-xs text-brand-muted">Please add items to your cart before proceeding to checkout.</p>
        <Link href="/shop" className="inline-block px-6 py-3 bg-brand-gold text-brand-dark font-bold text-xs rounded-full">
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold flex items-center gap-1.5">
          <Lock className="w-4 h-4" /> Secure Razorpay Checkout
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-brand-pearl">Complete Your Order</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Address Form (7 Cols) */}
        <form onSubmit={handleSubmitAddress} className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-brand-border space-y-6">
          <h3 className="font-extrabold text-lg text-brand-pearl border-b border-brand-border pb-4">
            1. Shipping & Contact Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-brand-pearl">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Aysha Khan"
                value={address.full_name}
                onChange={(e) => setAddress({ ...address, full_name: e.target.value })}
                className="w-full bg-brand-dark border border-brand-border rounded-xl px-3 py-2.5 text-xs text-brand-pearl focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-brand-pearl">Email Address *</label>
              <input
                type="email"
                required
                placeholder="aysha@example.com"
                value={address.email}
                onChange={(e) => setAddress({ ...address, email: e.target.value })}
                className="w-full bg-brand-dark border border-brand-border rounded-xl px-3 py-2.5 text-xs text-brand-pearl focus:outline-none focus:border-brand-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-brand-pearl">Phone Number (For Delivery Updates) *</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                className="w-full bg-brand-dark border border-brand-border rounded-xl px-3 py-2.5 text-xs text-brand-pearl focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-brand-pearl">Pincode / Postal Code *</label>
              <input
                type="text"
                required
                placeholder="400001"
                value={address.pincode}
                onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                className="w-full bg-brand-dark border border-brand-border rounded-xl px-3 py-2.5 text-xs text-brand-pearl focus:outline-none focus:border-brand-gold"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-brand-pearl">Flat / House No. / Street Address *</label>
            <input
              type="text"
              required
              placeholder="102, Crescent Towers, Bandra West"
              value={address.address_line1}
              onChange={(e) => setAddress({ ...address, address_line1: e.target.value })}
              className="w-full bg-brand-dark border border-brand-border rounded-xl px-3 py-2.5 text-xs text-brand-pearl focus:outline-none focus:border-brand-gold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-brand-pearl">City *</label>
              <input
                type="text"
                required
                placeholder="Mumbai"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="w-full bg-brand-dark border border-brand-border rounded-xl px-3 py-2.5 text-xs text-brand-pearl focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-brand-pearl">State *</label>
              <input
                type="text"
                required
                placeholder="Maharashtra"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                className="w-full bg-brand-dark border border-brand-border rounded-xl px-3 py-2.5 text-xs text-brand-pearl focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-brand-pearl">Country</label>
              <input
                type="text"
                disabled
                value="India"
                className="w-full bg-brand-dark/50 border border-brand-border rounded-xl px-3 py-2.5 text-xs text-brand-muted"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-linear-to-r from-amber-400 via-brand-gold to-amber-500 text-brand-dark font-extrabold text-base rounded-2xl flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-xl shadow-amber-500/20 cursor-pointer"
          >
            Proceed to Razorpay Payment Gateway <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {/* Order Summary Sidebar (5 Cols) */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-brand-border space-y-6">
          <h3 className="font-extrabold text-lg text-brand-pearl border-b border-brand-border pb-4">
            Order Review ({cart.length} Items)
          </h3>

          <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
            {cart.map(item => (
              <div key={item.cart_item_id} className="flex gap-3 items-center text-xs">
                <div className="w-12 h-14 relative rounded-lg overflow-hidden bg-brand-dark shrink-0 border border-brand-border">
                  <img src={item.product.images[0]} alt="" className="object-cover w-full h-full" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-brand-pearl line-clamp-1">{item.product.title}</p>
                  <p className="text-brand-muted text-[11px]">Qty: {item.quantity} | Size: {item.size}</p>
                  {item.customization && (
                    <p className="text-brand-gold text-[10px] font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Custom: &quot;{item.customization.custom_text}&quot;
                    </p>
                  )}
                </div>
                <span className="font-bold text-brand-gold">
                  ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-brand-border space-y-2 text-xs text-brand-muted">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-brand-pearl font-bold">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Express Delivery</span>
              <span className="text-emerald-400 font-bold">FREE</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-brand-pearl pt-2 border-t border-brand-border">
              <span>Total</span>
              <span className="text-brand-gold text-xl font-black">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-brand-card/60 border border-brand-border/60 text-[11px] text-brand-muted space-y-1">
            <p className="font-bold text-brand-pearl flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" /> Zero Waste Promise
            </p>
            <p>Your garment will be custom printed within 48 hours and shipped in 100% plastic-free packaging.</p>
          </div>
        </div>

      </div>

      {/* Razorpay Modal */}
      {showRazorpay && (
        <RazorpayModal
          amount={cartTotal}
          customerAddress={address}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowRazorpay(false)}
        />
      )}

    </div>
  );
}

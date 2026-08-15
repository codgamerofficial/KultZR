'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import AuthModal from '@/components/AuthModal';
import { User, Package, MapPin, ShieldCheck, LogOut, Sparkles, CheckCircle2, Clock, Truck, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
  const { user, profile, signOut, updateProfile } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Edit Profile State
  const [editingProfile, setEditingProfile] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setPhone(profile.phone || '');
    }
  }, [profile]);

  // Fetch real orders from Supabase DB
  useEffect(() => {
    async function fetchUserOrders() {
      if (!user) return;
      setLoadingOrders(true);

      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase
            .from('orders')
            .select(`
              *,
              order_items (*)
            `)
            .or(`user_id.eq.${user.id},customer_email.eq.${user.email}`)
            .order('created_at', { ascending: false });

          if (!error && data) {
            setOrders(data);
          } else {
            console.warn('Orders query error:', error?.message);
          }
        } catch (err) {
          console.warn('Error querying orders:', err);
        }
      }
      setLoadingOrders(false);
    }

    fetchUserOrders();
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    await updateProfile({ full_name: fullName, phone });
    setSavingProfile(false);
    setEditingProfile(false);
  };

  // 1. Unauthenticated View
  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-brand-gold/10 text-brand-gold border border-brand-gold/30 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
          <User className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Identity & Dashboard</span>
          <h1 className="text-3xl font-black text-brand-pearl">KultZR Account Access</h1>
          <p className="text-xs text-brand-muted leading-relaxed">
            Sign in or create an account to view real order tracking, manage your shipping profile, and save custom designs.
          </p>
        </div>

        <button
          onClick={() => setAuthModalOpen(true)}
          className="w-full py-4 bg-linear-to-r from-amber-400 via-brand-gold to-amber-500 text-brand-dark font-extrabold text-sm rounded-2xl shadow-xl shadow-amber-500/20 hover:opacity-95 transition-all cursor-pointer"
        >
          Sign In / Register Account
        </button>

        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </div>
    );
  }

  // 2. Authenticated Dashboard View
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-brand-gold/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-amber-400 to-brand-gold text-brand-dark font-black text-xl flex items-center justify-center shadow-lg">
            {profile?.full_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> KultZR Authenticated Member
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-brand-pearl">{profile?.full_name || 'Valued Member'}</h1>
            <p className="text-xs text-brand-muted">{user.email}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setEditingProfile(!editingProfile)}
            className="px-4 py-2 bg-brand-card text-brand-pearl border border-brand-border rounded-xl text-xs font-bold hover:border-brand-gold transition-colors"
          >
            {editingProfile ? 'Cancel Edit' : 'Edit Profile'}
          </button>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold hover:bg-red-500/20 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </div>

      {/* Edit Profile Form */}
      {editingProfile && (
        <form onSubmit={handleSaveProfile} className="glass-panel p-6 rounded-2xl border border-brand-gold/40 space-y-4 max-w-lg">
          <h3 className="font-bold text-brand-pearl text-sm">Update Profile Details</h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-brand-pearl">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-brand-dark border border-brand-border rounded-xl px-3 py-2 text-brand-pearl focus:outline-none focus:border-brand-gold mt-1"
              />
            </div>
            <div>
              <label className="font-bold text-brand-pearl">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-brand-dark border border-brand-border rounded-xl px-3 py-2 text-brand-pearl focus:outline-none focus:border-brand-gold mt-1"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={savingProfile}
            className="px-6 py-2.5 bg-brand-gold text-brand-dark font-extrabold text-xs rounded-xl hover:bg-amber-400 transition-colors"
          >
            {savingProfile ? 'Saving Changes...' : 'Save Profile Changes'}
          </button>
        </form>
      )}

      {/* Real Orders Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-brand-border pb-4">
          <h2 className="text-xl font-bold text-brand-pearl flex items-center gap-2">
            <Package className="w-5 h-5 text-brand-gold" /> Real Order History & Live Tracking
          </h2>
          <span className="text-xs text-brand-muted">{orders.length} Verified Orders</span>
        </div>

        {loadingOrders ? (
          <div className="p-8 text-center text-xs text-brand-muted animate-pulse">
            Loading order records from Supabase cloud database...
          </div>
        ) : orders.length === 0 ? (
          <div className="glass-panel p-8 rounded-3xl border border-brand-border text-center space-y-4">
            <Package className="w-12 h-12 text-brand-muted mx-auto" />
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-brand-pearl">No Orders Found Yet</h3>
              <p className="text-xs text-brand-muted">You haven&apos;t placed any orders with {user.email} yet.</p>
            </div>
            <Link
              href="/shop"
              className="inline-block px-6 py-2.5 bg-brand-gold text-brand-dark font-extrabold text-xs rounded-full hover:bg-amber-400 transition-colors"
            >
              Explore Shop & Order
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="glass-panel p-6 rounded-3xl border border-brand-border space-y-6">
                
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-border/60 pb-4 text-xs">
                  <div>
                    <span className="text-brand-muted">Order Number</span>
                    <p className="font-mono font-bold text-brand-gold text-sm">{order.order_number}</p>
                  </div>
                  <div>
                    <span className="text-brand-muted">Date Placed</span>
                    <p className="font-semibold text-brand-pearl">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <span className="text-brand-muted">Payment Status</span>
                    <span className="block font-bold text-emerald-400 capitalize">{order.payment_status || 'Paid'}</span>
                  </div>
                  <div>
                    <span className="text-brand-muted">Total Amount</span>
                    <p className="font-extrabold text-brand-pearl text-sm">₹{Number(order.total_amount).toLocaleString('en-IN')}</p>
                  </div>
                </div>

                {/* Live Order Items */}
                <div className="space-y-3">
                  {order.order_items?.map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl bg-brand-dark/60 border border-brand-border/40 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 relative rounded-lg overflow-hidden bg-brand-secondary border border-brand-border shrink-0">
                          {item.product_image && <img src={item.product_image} alt="" className="w-full h-full object-cover" />}
                        </div>
                        <div>
                          <p className="font-bold text-brand-pearl">{item.product_title}</p>
                          <p className="text-brand-muted text-[11px]">Size: {item.size} | Color: {item.color} | Qty: {item.quantity}</p>
                          {item.customization_details?.custom_text && (
                            <p className="text-brand-gold text-[10px] font-medium mt-0.5">
                              Custom Quote: &quot;{item.customization_details.custom_text}&quot;
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="font-bold text-brand-gold">
                        ₹{(Number(item.unit_price) * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Fulfillment Status Stepper */}
                <div className="p-4 rounded-2xl bg-brand-card/40 border border-brand-border/50 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2 text-brand-pearl">
                    <Truck className="w-4 h-4 text-brand-gold" />
                    <span>Status: <strong className="text-emerald-400 capitalize">{order.order_status || 'On-Demand Printing'}</strong></span>
                  </div>
                  <span className="text-brand-muted text-[11px]">Estimated Delivery: 3-5 Business Days</span>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

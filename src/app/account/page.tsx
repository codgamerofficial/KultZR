'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Package, Sparkles, Clock, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'designs' | 'profile'>('orders');

  const mockOrders = [
    {
      id: 'order_kz_8921A',
      date: '2026-08-14',
      status: 'printed',
      items: [
        { title: 'The Identity Oversized Tee', size: 'L', color: 'Obsidian Black', customText: 'UNAPOLOGETICALLY SELF-MADE', price: 1899 }
      ],
      total: 1899,
      tracking: 'DELHIVERY_882910'
    },
    {
      id: 'order_kz_7712B',
      date: '2026-08-01',
      status: 'delivered',
      items: [
        { title: 'Storyteller Heavyweight Hoodie', size: 'M', color: 'Midnight Charcoal', customText: 'CODE & CANVAS', price: 3499 }
      ],
      total: 3499,
      tracking: 'BLUEDART_449210'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* User Greeting */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-border pb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-linear-to-tr from-brand-gold to-amber-200 text-brand-dark flex items-center justify-center font-bold text-2xl shadow-xl shadow-amber-500/20">
            A
          </div>
          <div>
            <span className="text-xs text-brand-gold font-bold uppercase tracking-widest">KultZR Member</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-pearl">Welcome Back, Storyteller</h1>
            <p className="text-xs text-brand-muted">aysha.khan@example.com</p>
          </div>
        </div>

        <Link
          href="/customize"
          className="px-6 py-3 bg-brand-gold text-brand-dark font-extrabold text-xs rounded-full hover:bg-amber-400 transition-colors flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> Create New Design
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-brand-border gap-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'orders' ? 'border-brand-gold text-brand-gold' : 'border-transparent text-brand-muted hover:text-brand-pearl'
          }`}
        >
          <Package className="w-4 h-4" /> My Orders ({mockOrders.length})
        </button>

        <button
          onClick={() => setActiveTab('designs')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'designs' ? 'border-brand-gold text-brand-gold' : 'border-transparent text-brand-muted hover:text-brand-pearl'
          }`}
        >
          <Sparkles className="w-4 h-4" /> Saved Story Designs (2)
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'profile' ? 'border-brand-gold text-brand-gold' : 'border-transparent text-brand-muted hover:text-brand-pearl'
          }`}
        >
          <User className="w-4 h-4" /> Account Details
        </button>
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {mockOrders.map(order => (
            <div key={order.id} className="glass-panel p-6 rounded-2xl border border-brand-border space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-border/60 pb-3 gap-2 text-xs">
                <div>
                  <span className="text-brand-muted">Order Ref:</span> <span className="font-bold text-brand-gold">{order.id}</span>
                  <span className="text-brand-muted ml-3">Placed on:</span> <span className="text-brand-pearl">{order.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                    order.status === 'printed' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {order.status === 'printed' ? 'Custom Printed & Packing' : 'Delivered'}
                  </span>
                  <span className="text-brand-muted">AWB: {order.tracking}</span>
                </div>
              </div>

              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <div>
                    <h4 className="font-bold text-brand-pearl">{item.title}</h4>
                    <p className="text-brand-muted">Size: {item.size} | Color: {item.color}</p>
                    <p className="text-brand-gold font-semibold mt-1">Story Mantra: &quot;{item.customText}&quot;</p>
                  </div>
                  <span className="font-extrabold text-brand-gold text-sm">₹{item.price.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Saved Designs Tab */}
      {activeTab === 'designs' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-brand-border space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-brand-gold font-bold uppercase">Saved Design #1</span>
              <span className="text-[10px] text-brand-muted">Modified 2 days ago</span>
            </div>
            <h4 className="font-bold text-brand-pearl text-base">&quot;UNAPOLOGETICALLY SELF-MADE&quot;</h4>
            <p className="text-xs text-brand-muted">Base: The Identity Oversized Tee (Obsidian Black)</p>
            <div className="pt-2 flex gap-3">
              <Link href="/customize" className="px-4 py-2 bg-brand-gold text-brand-dark text-xs font-bold rounded-lg">
                Open in Studio
              </Link>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-brand-border space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-brand-gold font-bold uppercase">Saved Design #2</span>
              <span className="text-[10px] text-brand-muted">Modified 1 week ago</span>
            </div>
            <h4 className="font-bold text-brand-pearl text-base">&quot;CULTURE OVER EVERYTHING&quot;</h4>
            <p className="text-xs text-brand-muted">Base: Storyteller Heavyweight Hoodie (Midnight Charcoal)</p>
            <div className="pt-2 flex gap-3">
              <Link href="/customize" className="px-4 py-2 bg-brand-gold text-brand-dark text-xs font-bold rounded-lg">
                Open in Studio
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="glass-panel p-6 rounded-2xl border border-brand-border max-w-xl space-y-4 text-xs">
          <h3 className="font-bold text-base text-brand-pearl border-b border-brand-border pb-3">User Profile Information</h3>
          <div className="space-y-2">
            <p className="text-brand-muted">Full Name: <span className="text-brand-pearl font-semibold">Aysha Khan</span></p>
            <p className="text-brand-muted">Email: <span className="text-brand-pearl font-semibold">aysha.khan@example.com</span></p>
            <p className="text-brand-muted">Default Shipping Address: <span className="text-brand-pearl font-semibold">Bandra West, Mumbai 400050</span></p>
            <p className="text-brand-muted">GST Identification: <span className="text-brand-pearl font-semibold">Not Registered (Consumer Account)</span></p>
          </div>
        </div>
      )}

    </div>
  );
}

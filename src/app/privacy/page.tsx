import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy & GDPR | KultZR',
  description: 'Privacy Policy and GDPR compliance statement for KultZR.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold flex items-center gap-1.5">
          <Lock className="w-4 h-4 text-emerald-400" /> Data Privacy & GDPR
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-brand-pearl">Privacy Policy & GDPR Compliance</h1>
        <p className="text-brand-muted text-xs">Last Updated: August 15, 2026</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-brand-border space-y-6 text-xs text-brand-pearl leading-relaxed">
        
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-brand-gold">1. Data We Collect</h3>
          <p className="text-brand-muted">
            We collect personal information necessary for order fulfillment, including your name, shipping address, email address, phone number, and custom garment designs.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-brand-gold">2. How We Store & Protect Your Data</h3>
          <p className="text-brand-muted">
            Your data is stored in encrypted Supabase cloud database instances with Row Level Security (RLS) policies enabled. We do not store raw credit card numbers or banking passwords—all financial transactions are processed directly by Razorpay PCI-DSS certified infrastructure.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-brand-gold">3. GDPR & DPDP Act (India) User Rights</h3>
          <p className="text-brand-muted">
            Under GDPR and the Digital Personal Data Protection Act (DPDP), you have the right to access, rectify, or request permanent deletion of your personal data.
          </p>
          <ul className="list-disc list-inside text-brand-muted pl-2 space-y-1">
            <li>Right to access personal order history</li>
            <li>Right to data portability</li>
            <li>Right to erasure (&quot;Right to be forgotten&quot;)</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-brand-gold">4. Data Deletion Requests</h3>
          <p className="text-brand-muted">
            To request full account or data deletion, email <span className="text-brand-gold font-bold">privacy@kultzr.com</span>. All associated records will be purged within 48 business hours.
          </p>
        </section>

      </div>

      <div className="p-4 rounded-xl bg-brand-card border border-brand-border flex items-center gap-3 text-xs text-brand-pearl">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
        <p className="text-brand-muted">KultZR does not sell or lease user data to third-party advertising brokers.</p>
      </div>

    </div>
  );
}

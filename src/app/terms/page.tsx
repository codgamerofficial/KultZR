import React from 'react';
import { FileText } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | KultZR',
  description: 'Terms of Service for KultZR e-commerce platform and bespoke customizer.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold flex items-center gap-1.5">
          <FileText className="w-4 h-4" /> Legal Framework
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-brand-pearl">Terms of Service</h1>
        <p className="text-brand-muted text-xs">Last Updated: August 15, 2026</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-brand-border space-y-6 text-xs text-brand-pearl leading-relaxed">
        
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-brand-gold">1. Overview</h3>
          <p className="text-brand-muted">
            Welcome to KultZR – Wear Your Story (&quot;KultZR&quot;, &quot;we&quot;, &quot;us&quot;). By accessing our website, purchasing products, or using our 2D Bespoke Studio, you agree to be bound by these Terms of Service.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-brand-gold">2. On-Demand Production & Bespoke Orders</h3>
          <p className="text-brand-muted">
            All KultZR apparel is manufactured on-demand upon receipt of customer payment. Users are responsible for reviewing custom text, fonts, colors, and placement before confirming their order.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-brand-gold">3. Intellectual Property & Content Rights</h3>
          <p className="text-brand-muted">
            By uploading custom graphics or text to the Bespoke Studio, you represent and warrant that you own or possess necessary rights to the content. You agree not to upload defamatory, hate speech, or infringing trademarks.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-brand-gold">4. Payments & Razorpay Gateway</h3>
          <p className="text-brand-muted">
            All transactions are processed securely via Razorpay in Indian Rupees (INR). Orders will only proceed to production once full payment is verified by Razorpay.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-brand-gold">5. GST & Regulatory Compliance</h3>
          <p className="text-brand-muted">
            KultZR is registered under the Goods and Services Tax (GST) Act in India (GSTIN: 27AAACK1234F1Z9). All product prices displayed on the store are inclusive of applicable GST taxes.
          </p>
        </section>

      </div>

    </div>
  );
}

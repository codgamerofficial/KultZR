'use client';

import React, { useState } from 'react';
import { OrderShippingAddress } from '@/lib/types';
import { ShieldCheck, Lock, CheckCircle2, CreditCard, Smartphone, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RazorpayModalProps {
  amount: number;
  customerAddress: OrderShippingAddress;
  onSuccess: (paymentId: string, orderId: string) => void;
  onClose: () => void;
}

export default function RazorpayModal({ amount, customerAddress, onSuccess, onClose }: RazorpayModalProps) {
  const [processing, setProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');

  const handleSimulatePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 }
      });
      const paymentId = 'pay_kz_' + Math.random().toString(36).substring(2, 10).toUpperCase();
      const orderId = 'order_kz_' + Math.random().toString(36).substring(2, 10).toUpperCase();
      onSuccess(paymentId, orderId);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-brand-secondary border border-brand-gold/40 rounded-3xl p-6 sm:p-8 text-brand-pearl shadow-2xl z-10 space-y-6">
        
        {/* Gateway Header */}
        <div className="flex items-center justify-between pb-4 border-b border-brand-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-extrabold text-sm">
              RZP
            </div>
            <div>
              <h3 className="font-extrabold text-lg flex items-center gap-1.5">
                Razorpay Checkout <Lock className="w-4 h-4 text-emerald-400" />
              </h3>
              <p className="text-xs text-brand-muted">KultZR Store Verified Merchant</p>
            </div>
          </div>
          <button onClick={onClose} className="text-brand-muted hover:text-brand-pearl text-sm font-bold">
            Cancel
          </button>
        </div>

        {/* Amount Summary */}
        <div className="p-4 rounded-2xl bg-brand-dark border border-brand-border flex items-center justify-between">
          <div>
            <span className="text-xs text-brand-muted">Amount Payable (INR)</span>
            <p className="text-2xl font-black text-brand-gold">₹{amount.toLocaleString('en-IN')}</p>
          </div>
          <div className="text-right text-xs text-brand-muted">
            <p className="font-semibold text-brand-pearl">{customerAddress.full_name}</p>
            <p>{customerAddress.email}</p>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-brand-muted">Select Payment Option</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setSelectedMethod('upi')}
              className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                selectedMethod === 'upi'
                  ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                  : 'border-brand-border bg-brand-dark text-brand-muted hover:border-brand-pearl'
              }`}
            >
              <Smartphone className="w-5 h-5" />
              <span>UPI / QR</span>
            </button>

            <button
              onClick={() => setSelectedMethod('card')}
              className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                selectedMethod === 'card'
                  ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                  : 'border-brand-border bg-brand-dark text-brand-muted hover:border-brand-pearl'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span>Cards</span>
            </button>

            <button
              onClick={() => setSelectedMethod('netbanking')}
              className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                selectedMethod === 'netbanking'
                  ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                  : 'border-brand-border bg-brand-dark text-brand-muted hover:border-brand-pearl'
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span>NetBanking</span>
            </button>
          </div>
        </div>

        {/* Selected Method Details */}
        <div className="p-4 rounded-xl bg-brand-card/50 border border-brand-border/60 text-xs space-y-2">
          {selectedMethod === 'upi' && (
            <div className="space-y-2">
              <p className="font-semibold text-brand-pearl">Instant GPay / PhonePe / Paytm / BHIM</p>
              <input
                type="text"
                placeholder="enter-upi-id@okaxis or GPay mobile..."
                defaultValue="kultzr.customer@upi"
                className="w-full bg-brand-dark border border-brand-border rounded-lg p-2.5 text-xs text-brand-pearl"
              />
            </div>
          )}
          {selectedMethod === 'card' && (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Card Number (4532 •••• •••• 8892)"
                defaultValue="4532 8812 9012 8892"
                className="w-full bg-brand-dark border border-brand-border rounded-lg p-2.5 text-xs text-brand-pearl"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="MM/YY"
                  defaultValue="12/28"
                  className="bg-brand-dark border border-brand-border rounded-lg p-2.5 text-xs text-brand-pearl"
                />
                <input
                  type="password"
                  placeholder="CVV"
                  defaultValue="881"
                  className="bg-brand-dark border border-brand-border rounded-lg p-2.5 text-xs text-brand-pearl"
                />
              </div>
            </div>
          )}
          {selectedMethod === 'netbanking' && (
            <p className="text-brand-muted">
              Supports HDFC Bank, ICICI Bank, SBI, Axis Bank, Kotak & 50+ Indian Banks.
            </p>
          )}
        </div>

        {/* Submit Payment CTA */}
        <button
          onClick={handleSimulatePayment}
          disabled={processing}
          className="w-full py-4 bg-linear-to-r from-emerald-500 to-teal-500 text-brand-dark font-extrabold text-base rounded-2xl flex items-center justify-center gap-2 hover:opacity-95 transition-opacity disabled:opacity-50 shadow-xl shadow-teal-500/20"
        >
          {processing ? (
            <span className="flex items-center gap-2 animate-pulse">
              <Lock className="w-4 h-4 animate-spin" /> Verifying Payment with Razorpay...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Pay ₹{amount.toLocaleString('en-IN')} Securely
            </span>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-[11px] text-brand-muted">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>256-Bit SSL Encrypted • PCI-DSS Level 1 Compliant</span>
        </div>

      </div>
    </div>
  );
}

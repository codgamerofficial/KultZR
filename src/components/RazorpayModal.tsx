'use client';

import React, { useState, useEffect } from 'react';
import { OrderShippingAddress } from '@/lib/types';
import { ShieldCheck, Lock, CreditCard, Smartphone, Building2, ExternalLink, Info } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RazorpayModalProps {
  amount: number;
  customerAddress: OrderShippingAddress;
  onSuccess: (paymentId: string, orderId: string) => void;
  onClose: () => void;
}

declare global { interface Window { Razorpay: any; } }

export default function RazorpayModal({ amount, customerAddress, onSuccess, onClose }: RazorpayModalProps) {
  const [processing, setProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) { setSdkLoaded(true); return; }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setSdkLoaded(true);
    script.onerror = () => setError('Unable to load Razorpay Checkout. Please disable blockers or try again.');
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  const handleOpenLiveRazorpaySDK = async () => {
    setProcessing(true);
    setError('');
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency: 'INR', customerAddress }),
      });
      const orderData = await response.json();
      if (!response.ok || !orderData.success || !orderData.order_id) throw new Error(orderData.error || 'Unable to create Razorpay order');
      if (!window.Razorpay) throw new Error('Razorpay Checkout is not available in this browser');

      const options: any = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        order_id: orderData.order_id,
        name: 'KultZR',
        description: 'On-demand fashion order',
        prefill: { name: customerAddress.full_name, email: customerAddress.email, contact: customerAddress.phone },
        notes: { merchant: 'KultZR' },
        theme: { color: '#D4AF37' },
        handler: async (res: any) => {
          try {
            const verify = await fetch('/api/checkout/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: res.razorpay_order_id,
                razorpay_payment_id: res.razorpay_payment_id,
                razorpay_signature: res.razorpay_signature,
              }),
            });
            const result = await verify.json();
            if (!verify.ok || !result.verified) throw new Error(result.error || 'Payment verification failed');
            setProcessing(false);
            confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
            onSuccess(res.razorpay_payment_id, res.razorpay_order_id);
          } catch (err: any) {
            setProcessing(false);
            setError(err?.message || 'Payment could not be verified. Please contact support before retrying.');
          }
        },
        modal: { ondismiss: () => setProcessing(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response: any) => {
        setProcessing(false);
        setError(response?.error?.description || 'Payment failed. Please try another payment method.');
      });
      rzp.open();
    } catch (err: any) {
      setProcessing(false);
      setError(err?.message || 'Unable to start payment');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-brand-secondary border border-brand-gold/40 rounded-3xl p-6 sm:p-8 text-brand-pearl shadow-2xl z-10 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-brand-border">
          <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-extrabold text-sm">RZP</div><div><h3 className="font-extrabold text-lg flex items-center gap-1.5">Razorpay Checkout <Lock className="w-4 h-4 text-emerald-400" /></h3><p className="text-xs text-brand-muted">Secure payment verification enabled</p></div></div>
          <button onClick={onClose} className="text-brand-muted hover:text-brand-pearl text-sm font-bold">Cancel</button>
        </div>

        <div className="p-4 rounded-2xl bg-brand-dark border border-brand-border flex items-center justify-between"><div><span className="text-xs text-brand-muted">Amount Payable (INR)</span><p className="text-2xl font-black text-brand-gold">₹{amount.toLocaleString('en-IN')}</p></div><div className="text-right text-xs text-brand-muted"><p className="font-semibold text-brand-pearl">{customerAddress.full_name}</p><p>{customerAddress.email}</p></div></div>

        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300"><div className="flex items-center gap-1.5 font-bold"><Info className="w-4 h-4 shrink-0" /> Real Razorpay order + server-side signature verification</div><p className="text-[11px] mt-1 text-emerald-200/90">KultZR only marks an order paid after the Razorpay signature is verified on the server.</p></div>

        <div className="space-y-3"><label className="text-xs font-bold uppercase tracking-wider text-brand-muted">Payment Method</label><div className="grid grid-cols-3 gap-2">
          {([['upi', Smartphone, 'UPI / QR'], ['card', CreditCard, 'Cards'], ['netbanking', Building2, 'NetBanking']] as const).map(([method, Icon, label]) => <button key={method} onClick={() => setSelectedMethod(method)} className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${selectedMethod === method ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' : 'border-brand-border bg-brand-dark text-brand-muted hover:border-brand-pearl'}`}><Icon className="w-5 h-5" /><span>{label}</span></button>)}
        </div></div>

        {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">{error}</div>}

        <button onClick={handleOpenLiveRazorpaySDK} disabled={processing || !sdkLoaded} className="w-full py-4 bg-linear-to-r from-amber-400 via-brand-gold to-amber-500 text-brand-dark font-extrabold text-base rounded-2xl flex items-center justify-center gap-2 hover:opacity-95 transition-opacity disabled:opacity-50 shadow-xl shadow-amber-500/20 cursor-pointer">
          {processing ? <><Lock className="w-4 h-4 animate-spin" /> Processing...</> : <><ExternalLink className="w-5 h-5" /> Pay ₹{amount.toLocaleString('en-IN')}</>}
        </button>
        <div className="flex items-center justify-center gap-2 text-[11px] text-brand-muted"><ShieldCheck className="w-4 h-4 text-emerald-400" />256-bit encrypted checkout</div>
      </div>
    </div>
  );
}

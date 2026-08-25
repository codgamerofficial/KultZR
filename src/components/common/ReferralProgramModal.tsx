'use client';

import React, { useState } from 'react';
import { Gift, X, Copy, Check, MessageSquare, Sparkles, Users } from 'lucide-react';

interface ReferralProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferralProgramModal: React.FC<ReferralProgramModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const referralCode = 'SATHI-FLY-2026';
  const inviteUrl = `https://dealsathi.in/invite?ref=${referralCode}`;
  const inviteText = `Shop smarter with DealSathi — your personal AI shopping agent! Use my invite link to get 50 free Deep Research credits:`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${inviteText} ${inviteUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-brand-saffron" />
            <h3 className="font-extrabold text-base text-slate-900">Invite Your Sathi</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-900 text-white space-y-2 border border-indigo-900">
          <div className="flex items-center gap-1.5 text-xs font-bold text-brand-yellow">
            <Sparkles className="w-4 h-4 fill-brand-yellow" />
            <span>Give 50 Credits, Get 50 Credits</span>
          </div>
          <h4 className="font-black text-lg text-white">Earn Free Sathi Pro Credits</h4>
          <p className="text-xs text-indigo-100 leading-relaxed font-medium">
            Invite friends to shop with DealSathi. You both receive 50 Deep Research credits when they perform their first product search!
          </p>
        </div>

        {/* Copy Invite Link */}
        <div className="space-y-2 text-xs">
          <span className="font-bold text-slate-700 block">Your Unique Invite Link</span>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <input
              type="text"
              readOnly
              value={inviteUrl}
              className="bg-transparent border-none text-slate-900 font-mono text-xs w-full focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-brand-blue text-white rounded-lg font-bold shrink-0 hover:bg-indigo-700 transition flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Quick WhatsApp Share */}
        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${inviteText} ${inviteUrl}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-glow-emerald hover:bg-emerald-700 transition"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Share via WhatsApp</span>
        </a>

      </div>
    </div>
  );
};

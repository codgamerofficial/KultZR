'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Target, Plus, Sparkles, CheckCircle2, Clock, ArrowRight, ShieldCheck, Zap, AlertCircle, Trash2 } from 'lucide-react';
import { ShoppingMission } from '@/lib/types';

export default function MissionsPage() {
  const [missions, setMissions] = useState<ShoppingMission[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [budget, setBudget] = useState(35000);
  const [priority, setPriority] = useState('Camera & Battery');
  const [category, setCategory] = useState('smartphones');

  const fetchMissions = async () => {
    try {
      const res = await fetch('/api/v1/missions');
      const data = await res.json();
      if (data.success) {
        setMissions(data.missions || []);
      }
    } catch (err) {
      console.error('Failed to fetch missions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  const handleCreateMission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch('/api/v1/missions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          budgetMax: Number(budget),
          priorityKey: priority,
          conditionPreference: 'New',
          deadlineDays: 30,
        }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchMissions();
        setTitle('');
        setShowModal(false);
      }
    } catch (err) {
      console.error('Failed to create mission:', err);
    }
  };

  const handleDeleteMission = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/missions?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        await fetchMissions();
      }
    } catch (err) {
      console.error('Failed to delete mission:', err);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-br from-indigo-950 via-brand-indigo to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-indigo-900 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-yellow text-xs font-semibold backdrop-blur-md">
            <Target className="w-4 h-4" />
            <span>Persistent Agent Service</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Shopping Missions</h1>
          <p className="text-xs sm:text-sm text-indigo-100/90 max-w-lg">
            Set long-running shopping objectives. Sathi continuously monitors stores, analyzes price drops, and alerts you when candidate products match your target criteria.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-brand-saffron to-amber-500 text-white font-bold text-sm rounded-2xl shadow-glow-saffron hover:opacity-95 transition flex items-center gap-2 self-start sm:self-auto shrink-0"
        >
          <Plus className="w-5 h-5" />
          <span>New Mission</span>
        </button>
      </div>

      {/* MISSIONS LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Your Active Missions ({missions.length})</h2>
          <span className="text-xs text-slate-400">Backend Synced</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 font-medium text-xs">
            Loading your active shopping missions...
          </div>
        ) : missions.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {missions.map((m) => (
              <div key={m.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6 hover:shadow-card-hover transition relative">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-brand-blue flex items-center justify-center font-bold">
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">{m.title}</h3>
                      <p className="text-xs text-slate-500">Created: {m.createdAt} | Deadline: {m.deadlineDays} days left</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      m.status === 'Price Dropped' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      ● {m.status}
                    </span>
                    <button
                      onClick={() => handleDeleteMission(m.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition"
                      title="Delete Mission"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Mission Details */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Max Budget</span>
                    <span className="font-bold text-slate-900">₹{m.budgetMax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Target Price</span>
                    <span className="font-bold text-emerald-600">₹{m.targetPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Priority Focus</span>
                    <span className="font-bold text-brand-blue">{m.priorityKey}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Candidates Tracked</span>
                    <span className="font-bold text-slate-900">{m.candidatesCount} Products</span>
                  </div>
                </div>

                {/* Best Candidate Match */}
                {m.bestCandidateProduct && (
                  <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={m.bestCandidateProduct.imageUrl} alt="" className="w-12 h-12 object-cover rounded-xl border border-slate-200" />
                      <div>
                        <span className="text-[10px] font-bold text-indigo-700 uppercase">Top Candidate</span>
                        <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{m.bestCandidateProduct.title}</h4>
                        <p className="text-xs font-bold text-emerald-600">₹{m.bestCandidateProduct.currentBestTruePrice.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    <Link
                      href={`/product/${m.bestCandidateProduct.id}`}
                      className="px-4 py-2 bg-indigo-950 text-white rounded-xl text-xs font-bold hover:bg-brand-blue transition shrink-0 flex items-center gap-1"
                    >
                      <span>View Candidate</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}

              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs font-medium space-y-3">
            <p className="text-sm font-bold text-slate-700">No active shopping missions yet.</p>
            <p className="max-w-md mx-auto text-slate-400">
              Tell Sathi what product category, max budget, or specific feature priorities you are hunting for. Sathi will monitor verified store offers 24/7.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 bg-brand-blue text-white rounded-xl text-xs font-bold shadow-glow-blue hover:bg-indigo-700 transition inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create Your First Mission</span>
            </button>
          </div>
        )}
      </div>

      {/* CREATE MISSION MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <form onSubmit={handleCreateMission} className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 space-y-4">
            <h3 className="font-bold text-base text-slate-900">Create New Shopping Mission</h3>
            
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Mission Objective Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Find my next phone under ₹35k"
                className="w-full px-4 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Max Budget (₹)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full px-4 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Primary Priority</label>
              <input
                type="text"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                placeholder="e.g. Camera & Battery"
                className="w-full px-4 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                required
              />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">Cancel</button>
              <button type="submit" className="px-5 py-2.5 bg-brand-blue text-white rounded-xl text-xs font-bold shadow-glow-blue">Start Mission</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

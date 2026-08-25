'use client';

import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, CheckCircle2 } from 'lucide-react';

interface AskSathiModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextTitle?: string;
  suggestedQuestions?: string[];
}

export const AskSathiModal: React.FC<AskSathiModalProps> = ({
  isOpen,
  onClose,
  contextTitle = 'General Shopping Assistant',
  suggestedQuestions = [
    'Is this product actually worth the price?',
    'Should I buy now or wait for a price drop?',
    'What are the most common buyer complaints?',
    'How does this compare to alternative brands?'
  ],
}) => {
  const [userQuery, setUserQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'sathi'; text: string }>>([
    { sender: 'sathi', text: `Hi! I'm Sathi, your personal AI shopping agent. How can I help you evaluate ${contextTitle}?` }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const q = textToSend || userQuery;
    if (!q.trim()) return;

    const newMsgs = [...messages, { sender: 'user' as const, text: q }];
    setMessages(newMsgs);
    setUserQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let answer = "Based on our true price history and 1,800+ analyzed buyer reviews, current pricing is 6% below its 30-day average. Camera and build quality receive top ratings, while fast-charging thermals are well within safety thresholds. Sathi Verdict: BUY NOW!";
      if (q.toLowerCase().includes('wait')) {
        answer = "Our 365-day price history indicates a minor sale event historically occurs in 3 weeks. However, the current bank offer saves you ₹2,500 immediately, making waiting unlikely to yield more than an additional ₹500 savings.";
      } else if (q.toLowerCase().includes('complaint')) {
        answer = "Top recurring complaints represent under 4% of total reviews: 1) Battery life lasts ~1.5 days instead of claimed 2 days under heavy gaming; 2) Package does not include wall adapter brick.";
      }
      setMessages([...newMsgs, { sender: 'sathi', text: answer }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 flex flex-col h-[520px]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-950 via-brand-indigo to-slate-900 px-6 py-4 text-white flex items-center justify-between border-b border-indigo-900">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-brand-saffron flex items-center justify-center font-bold text-white shadow-md">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                Ask Sathi AI
                <Sparkles className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" />
              </h3>
              <p className="text-[11px] text-indigo-200 truncate max-w-xs">{contextTitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-indigo-200 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conversation Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3.5 rounded-2xl ${
                m.sender === 'user'
                  ? 'bg-brand-blue text-white rounded-br-none font-medium'
                  : 'bg-slate-100 text-slate-900 rounded-bl-none font-medium border border-slate-200/80'
              }`}>
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-100 text-slate-500 px-4 py-2.5 rounded-2xl rounded-bl-none font-bold text-[11px] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-saffron animate-spin" />
                <span>Sathi is researching evidence...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Quick Questions */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 overflow-x-auto whitespace-nowrap space-x-2">
          {suggestedQuestions.map((sq, i) => (
            <button
              key={i}
              onClick={() => handleSend(sq)}
              className="inline-block px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-semibold text-slate-700 hover:border-brand-blue hover:text-brand-blue transition"
            >
              {sq}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Sathi anything about this product..."
            className="flex-1 px-4 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
          <button
            onClick={() => handleSend()}
            className="p-2.5 bg-brand-blue text-white rounded-xl hover:bg-indigo-700 transition shadow-glow-blue"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

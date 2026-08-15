import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, PhoneCall, CheckCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [showNotification, setShowNotification] = useState(true);

  const cleanNumber = COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '');

  const quickMessages = [
    'Tender Inquiry & BOQ Quotation',
    'Road & Highway Construction',
    'Civil High Court & Building Work',
    'Heavy Machinery Fleet Rental',
  ];

  const handleSendMessage = (customMsg?: string) => {
    const textToSend = customMsg || message || 'Hello M/s AZMAT ULLAH & BROTHERS, I would like to discuss a construction project / tender quotation.';
    const encodedText = encodeURIComponent(textToSend);
    const url = `https://wa.me/${cleanNumber}?text=${encodedText}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {/* Interactive WhatsApp Popover Card */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] max-w-sm sm:w-96 bg-slate-900 border-4 border-emerald-500 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Card Header */}
          <div className="bg-emerald-600 p-4 border-b-2 border-slate-950 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-slate-950 border-2 border-white flex items-center justify-center text-emerald-400 font-black">
                <MessageCircle className="w-6 h-6 fill-current" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full" />
              </div>
              <div>
                <h4 className="font-black text-sm uppercase tracking-wider text-white font-grotesk leading-none">
                  Azmat Ullah &amp; Brothers
                </h4>
                <p className="text-[11px] font-bold text-emerald-100 flex items-center gap-1 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse inline-block" />
                  Online • WhatsApp Site Support
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-emerald-100 hover:text-white hover:bg-emerald-700 transition-colors"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-slate-950/90 space-y-3">
            <div className="bg-slate-900 p-3 border border-slate-800 text-xs leading-relaxed space-y-1">
              <p className="text-slate-200 font-medium">
                Assalam-o-Alaikum! Welcome to <strong className="text-amber-400">M/s AZMAT ULLAH &amp; BROTHERS (Govt: Contractor)</strong>.
              </p>
              <p className="text-slate-400 text-[11px]">
                How can our engineering team assist your project today?
              </p>
              <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-400 pt-1">
                <span>PEC License # 15623</span>
                <CheckCheck className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                Quick Select:
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {quickMessages.map((msg, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(msg)}
                    className="text-left bg-slate-900 hover:bg-emerald-600/20 hover:border-emerald-400 border border-slate-800 p-2 text-xs font-bold text-slate-200 transition-all flex items-center justify-between"
                  >
                    <span>{msg}</span>
                    <Send className="w-3 h-3 text-emerald-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <div className="pt-2 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                placeholder="Type your message or BOQ question..."
                className="flex-1 bg-slate-900 border border-slate-700 text-xs px-3 py-2 text-white font-medium focus:outline-none focus:border-emerald-400 placeholder:text-slate-500"
              />
              <button
                onClick={() => handleSendMessage()}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3 py-2 font-black text-xs uppercase border border-slate-950 flex items-center justify-center transition-all"
                title="Send on WhatsApp"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Direct Number */}
            <div className="text-center pt-1">
              <a
                href={`tel:${COMPANY_INFO.phone2}`}
                className="text-[11px] font-bold text-amber-400 hover:underline inline-flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" /> Or Call Direct: {COMPANY_INFO.phone2}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button with Badge */}
      <div className="flex items-center gap-2">
        {!isOpen && showNotification && (
          <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-900 border-2 border-emerald-500 px-2.5 sm:px-3 py-1.5 sm:py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-white text-[11px] sm:text-xs font-bold animate-bounce">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="hidden xs:inline">Chat on WhatsApp</span>
            <span className="xs:hidden">WhatsApp</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNotification(false);
              }}
              className="text-slate-400 hover:text-white ml-0.5"
              aria-label="Dismiss"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 border-3 border-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          aria-label="Open WhatsApp live support"
          title="Direct WhatsApp with M/s AZMAT ULLAH & BROTHERS"
        >
          <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-current text-slate-950" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 border-2 border-slate-950 rounded-full flex items-center justify-center text-[9px] font-black text-slate-950">
            1
          </span>
        </button>
      </div>
    </div>
  );
};

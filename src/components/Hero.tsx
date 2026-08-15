import React from 'react';
import { COMPANY_INFO, HERO_IMAGES, TRANSLATIONS } from '../data/companyData';
import { Language } from '../types';
import {
  Building,
  Route,
  Compass,
  Award,
  ChevronRight,
  Calculator,
  FileText,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
} from 'lucide-react';

interface HeroProps {
  currentLang: Language;
  onOpenTenderModal: () => void;
  onScrollToCalculator: () => void;
  onScrollToProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onOpenTenderModal,
  onScrollToCalculator,
  onScrollToProjects,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section id="hero" className="relative bg-slate-950 text-white overflow-hidden border-b-4 border-amber-400">
      {/* Background Image Overlay with vibrant color */}
      <div className="absolute inset-0 z-0 opacity-45">
        <img
          src={HERO_IMAGES.heroBanner}
          alt="Asmatullah & Brothers Highway Paving and Construction"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-12 pb-16 md:pt-20 md:pb-24">
        {/* Top Announcement Badge */}
        <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-3.5 py-1.5 font-black uppercase text-xs md:text-sm tracking-widest border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
          <Award className="w-4 h-4 text-slate-950 shrink-0" />
          <span>{t.heroBadge}</span>
        </div>

        {/* Hero Title & Main Tagline */}
        <div className="max-w-5xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white font-grotesk leading-none drop-shadow-md">
            {COMPANY_INFO.name}
          </h1>

          <div className="mt-4 inline-block bg-amber-400 text-slate-950 px-3 py-1 font-black text-xl sm:text-3xl uppercase tracking-tight font-grotesk shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {currentLang === 'ur'
              ? COMPANY_INFO.taglineUr
              : currentLang === 'ps'
              ? COMPANY_INFO.taglinePs
              : COMPANY_INFO.tagline}
          </div>

          <p className="mt-6 text-slate-100 text-base md:text-xl max-w-3xl font-medium leading-relaxed border-l-4 border-amber-400 pl-4 bg-slate-950/70 p-2 border border-slate-800/80">
            {t.heroSub}
          </p>
        </div>

        {/* Core Sector Quick Image Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl">
          <div
            onClick={onScrollToProjects}
            className="group cursor-pointer bg-slate-900 border-2 border-slate-800 hover:border-amber-400 overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <div className="relative h-28 w-full overflow-hidden">
              <img
                src={HERO_IMAGES.heroBanner}
                alt="Highways & Asphalt"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-950/60 group-hover:bg-slate-950/30 transition-all" />
              <span className="absolute top-2 left-2 bg-amber-400 text-slate-950 px-2 py-0.5 text-[10px] font-black uppercase border border-slate-950">
                Roads &amp; Highways
              </span>
            </div>
            <div className="p-3 bg-slate-900 flex items-center justify-between">
              <div>
                <h3 className="font-black text-xs uppercase text-white font-grotesk">{t.roadConst}</h3>
                <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">NHA &amp; C&amp;W Approved</p>
              </div>
              <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={onScrollToProjects}
            className="group cursor-pointer bg-slate-900 border-2 border-slate-800 hover:border-amber-400 overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <div className="relative h-28 w-full overflow-hidden">
              <img
                src={HERO_IMAGES.buildingConstruction}
                alt="Civic Buildings"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-950/60 group-hover:bg-slate-950/30 transition-all" />
              <span className="absolute top-2 left-2 bg-amber-400 text-slate-950 px-2 py-0.5 text-[10px] font-black uppercase border border-slate-950">
                Civic Buildings
              </span>
            </div>
            <div className="p-3 bg-slate-900 flex items-center justify-between">
              <div>
                <h3 className="font-black text-xs uppercase text-white font-grotesk">{t.buildingConst}</h3>
                <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Hospitals &amp; Courts</p>
              </div>
              <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={onScrollToProjects}
            className="group cursor-pointer bg-slate-900 border-2 border-slate-800 hover:border-amber-400 overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <div className="relative h-28 w-full overflow-hidden">
              <img
                src={HERO_IMAGES.societyInfrastructure}
                alt="Housing Societies"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-950/60 group-hover:bg-slate-950/30 transition-all" />
              <span className="absolute top-2 left-2 bg-amber-400 text-slate-950 px-2 py-0.5 text-[10px] font-black uppercase border border-slate-950">
                Housing Schemes
              </span>
            </div>
            <div className="p-3 bg-slate-900 flex items-center justify-between">
              <div>
                <h3 className="font-black text-xs uppercase text-white font-grotesk">{t.societyDev}</h3>
                <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Gated Town Development</p>
              </div>
              <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-wrap items-center gap-3.5">
          <button
            onClick={onOpenTenderModal}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-6 py-3.5 border-2 border-slate-950 font-black uppercase text-xs md:text-sm tracking-wider shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all active:translate-x-0 active:translate-y-0"
          >
            <FileText className="w-4 h-4" />
            <span>{t.requestQuote}</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello M/s AZMAT ULLAH & BROTHERS, I would like to inquire about construction services / tender quotation.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-3.5 border-2 border-slate-950 font-black uppercase text-xs md:text-sm tracking-wider shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>

          <button
            onClick={onScrollToCalculator}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-400 border-2 border-amber-400 px-5 py-3.5 font-black uppercase text-xs md:text-sm tracking-wider shadow-[4px_4px_0px_0px_rgba(251,191,36,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>{t.calculateCost}</span>
          </button>

          <a
            href={`tel:${COMPANY_INFO.phone1}`}
            className="flex items-center gap-2 text-slate-200 hover:text-amber-400 font-bold uppercase text-xs tracking-wider px-4 py-3.5 border border-slate-800 bg-slate-900/80 hover:bg-slate-900 transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <span>Call: {COMPANY_INFO.phone1}</span>
          </a>
        </div>

        {/* Key Numerical Stats Banner */}
        <div className="mt-16 pt-8 border-t-2 border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-slate-900/80 p-4 border-l-4 border-amber-400 flex flex-col">
            <span className="text-3xl md:text-5xl font-black text-amber-400 font-grotesk">1.39B+</span>
            <span className="text-xs uppercase font-extrabold tracking-wider text-slate-300 mt-1">Portfolio (PKR)</span>
          </div>

          <div className="bg-slate-900/80 p-4 border-l-4 border-white flex flex-col">
            <span className="text-3xl md:text-5xl font-black text-white font-grotesk">19</span>
            <span className="text-xs uppercase font-extrabold tracking-wider text-slate-300 mt-1">Documented Projects</span>
          </div>

          <div className="bg-slate-900/80 p-4 border-l-4 border-amber-400 flex flex-col">
            <span className="text-3xl md:text-5xl font-black text-amber-400 font-grotesk">140+</span>
            <span className="text-xs uppercase font-extrabold tracking-wider text-slate-300 mt-1">Heavy Machinery Units</span>
          </div>

          <div className="bg-slate-900/80 p-4 border-l-4 border-amber-400 flex flex-col">
            <span className="text-3xl md:text-5xl font-black text-white font-grotesk">PEC C4</span>
            <span className="text-xs uppercase font-extrabold tracking-wider text-slate-300 mt-1">Licence # 15623</span>
          </div>
        </div>
      </div>
    </section>
  );
};

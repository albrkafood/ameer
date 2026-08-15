import React, { useState } from 'react';
import { COMPANY_INFO, TRANSLATIONS } from '../data/companyData';
import { Language } from '../types';
import {
  Phone,
  Mail,
  ShieldCheck,
  FileText,
  Menu,
  X,
  Globe,
  HardHat,
  ChevronRight,
  Send,
} from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenTenderModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onOpenTenderModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950 text-white border-b-2 border-amber-400/60 shadow-2xl">
      {/* Top Bar - Credentials & Fast Direct Contact */}
      <div className="bg-amber-400 text-slate-950 px-4 py-1.5 text-xs font-black uppercase tracking-wider border-b-2 border-slate-950">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-black bg-slate-950 text-amber-400 px-2.5 py-0.5 border border-slate-950 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              {COMPANY_INFO.pecLicense}
            </span>
            <span className="hidden sm:inline-block font-extrabold text-slate-950 tracking-tight">
              Approved Govt Contractor: C&amp;W | PWD | NHA
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-950">
            <a
              href={`tel:${COMPANY_INFO.phone1}`}
              className="flex items-center gap-1 hover:underline font-black tracking-wide"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{COMPANY_INFO.phone1}</span>
            </a>
            <span className="hidden md:inline font-black">|</span>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="hidden md:flex items-center gap-1 hover:underline font-bold"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{COMPANY_INFO.email}</span>
            </a>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 border border-slate-900 text-xs">
              <Globe className="w-3.5 h-3.5 text-amber-400 ml-1 mr-0.5" />
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-0.5 font-black text-[10px] tracking-wider transition-all ${
                  currentLang === 'en'
                    ? 'bg-amber-400 text-slate-950'
                    : 'text-amber-400/70 hover:text-amber-400'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('ur')}
                className={`px-2 py-0.5 font-black text-[10px] tracking-wider transition-all ${
                  currentLang === 'ur'
                    ? 'bg-amber-400 text-slate-950'
                    : 'text-amber-400/70 hover:text-amber-400'
                }`}
              >
                اردو
              </button>
              <button
                onClick={() => onLanguageChange('ps')}
                className={`px-2 py-0.5 font-black text-[10px] tracking-wider transition-all ${
                  currentLang === 'ps'
                    ? 'bg-amber-400 text-slate-950'
                    : 'text-amber-400/70 hover:text-amber-400'
                }`}
              >
                پښتو
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
        {/* Company Logo & Brand Title */}
        <div
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 bg-amber-400 text-slate-950 border-2 border-slate-950 flex items-center justify-center font-black shadow-[3px_3px_0px_0px_rgba(251,191,36,0.5)] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-all">
            <HardHat className="w-7 h-7 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-black uppercase tracking-tighter text-white font-grotesk leading-none">
                ASMATULLAH &amp; BROTHERS
              </h1>
            </div>
            <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mt-1">
              Government Construction Co.
            </p>
          </div>
        </div>

        {/* Desktop Menu Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-black uppercase tracking-wider text-slate-300">
          <button
            onClick={() => scrollToSection('hero')}
            className="hover:text-amber-400 transition-colors py-1 border-b-2 border-transparent hover:border-amber-400"
          >
            {t.home}
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="hover:text-amber-400 transition-colors py-1 border-b-2 border-transparent hover:border-amber-400"
          >
            {t.about}
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="hover:text-amber-400 transition-colors py-1 border-b-2 border-transparent hover:border-amber-400"
          >
            {t.services}
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="hover:text-amber-400 transition-colors py-1 border-b-2 border-transparent hover:border-amber-400"
          >
            {t.projects}
          </button>
          <button
            onClick={() => scrollToSection('machinery')}
            className="hover:text-amber-400 transition-colors py-1 border-b-2 border-transparent hover:border-amber-400"
          >
            {t.machinery}
          </button>
          <button
            onClick={() => scrollToSection('calculator')}
            className="text-amber-400 hover:text-amber-300 transition-colors py-1 border-b-2 border-amber-400"
          >
            {t.calculator}
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="hover:text-amber-400 transition-colors py-1 border-b-2 border-transparent hover:border-amber-400"
          >
            {t.contact}
          </button>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenTenderModal}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2 border-2 border-slate-950 font-black uppercase text-xs tracking-wider shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all active:translate-x-0 active:translate-y-0"
          >
            <FileText className="w-4 h-4" />
            <span>{t.tender}</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 border-2 border-amber-400/40 bg-slate-900 text-amber-400 hover:bg-amber-400 hover:text-slate-950 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-800 border-t border-slate-700 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-base font-medium text-slate-200">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-left py-2 border-b border-slate-700/50 hover:text-amber-400 flex items-center justify-between"
            >
              <span>{t.home}</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left py-2 border-b border-slate-700/50 hover:text-amber-400 flex items-center justify-between"
            >
              <span>{t.about}</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-left py-2 border-b border-slate-700/50 hover:text-amber-400 flex items-center justify-between"
            >
              <span>{t.services}</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-left py-2 border-b border-slate-700/50 hover:text-amber-400 flex items-center justify-between"
            >
              <span>{t.projects}</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
            <button
              onClick={() => scrollToSection('machinery')}
              className="text-left py-2 border-b border-slate-700/50 hover:text-amber-400 flex items-center justify-between"
            >
              <span>{t.machinery}</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
            <button
              onClick={() => scrollToSection('calculator')}
              className="text-left py-2 border-b border-slate-700/50 text-amber-400 font-semibold flex items-center justify-between"
            >
              <span>{t.calculator}</span>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left py-2 border-b border-slate-700/50 hover:text-amber-400 flex items-center justify-between"
            >
              <span>{t.contact}</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTenderModal();
              }}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-2.5 rounded-lg font-bold text-center flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{t.tender}</span>
            </button>

            <a
              href={`tel:${COMPANY_INFO.phone1}`}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2.5 rounded-lg font-semibold text-center flex items-center justify-center gap-2 text-sm"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{t.callNow}: {COMPANY_INFO.phone1}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

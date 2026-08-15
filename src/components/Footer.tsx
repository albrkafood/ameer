import React from 'react';
import { COMPANY_INFO, TRANSLATIONS } from '../data/companyData';
import { Language } from '../types';
import {
  HardHat,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  FileText,
} from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onOpenTenderModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onOpenTenderModal }) => {
  const t = TRANSLATIONS[currentLang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Company Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-400 border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] flex items-center justify-center text-slate-950 font-black">
                <HardHat className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase text-white font-grotesk leading-none">
                  ASMATULLAH &amp; BROTHERS
                </h3>
                <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mt-0.5">
                  Government Construction Company
                </p>
              </div>
            </div>

            <p className="text-xs font-medium text-slate-300 leading-relaxed max-w-sm">
              Registered with Pakistan Engineering Council under Category C1 (No Limit). Specialized in turn-key government buildings, dual carriageway roads, and master housing society infrastructure.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs font-bold uppercase tracking-wider bg-slate-900 p-2.5 border border-slate-800 w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-200">{COMPANY_INFO.pecLicense}</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3 text-xs font-bold uppercase tracking-wider">
            <h4 className="text-sm font-black text-amber-400 font-grotesk tracking-widest bg-slate-900 p-1.5 border border-slate-800 inline-block mb-1">
              Engineering Sectors
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-amber-400 transition-colors text-left">
                  Government Building Construction
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-amber-400 transition-colors text-left">
                  Highways &amp; Asphalt Road Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-amber-400 transition-colors text-left">
                  Housing Society Infrastructure
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('machinery')} className="hover:text-amber-400 transition-colors text-left">
                  Heavy Equipment Machinery Rental
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('calculator')} className="hover:text-amber-400 transition-colors text-amber-400 font-black text-left">
                  Interactive Budget Estimator &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & RFQ CTA */}
          <div className="lg:col-span-4 space-y-4 text-xs font-bold uppercase tracking-wider">
            <h4 className="text-sm font-black text-amber-400 font-grotesk tracking-widest bg-slate-900 p-1.5 border border-slate-800 inline-block mb-1">
              Tender &amp; Procurement
            </h4>
            <p className="text-slate-300 font-medium text-xs normal-case">
              Direct procurement queries &amp; BOQ tender document submissions:
            </p>

            <div className="space-y-2 text-slate-200">
              <p className="flex items-center gap-2 bg-slate-900 p-2 border border-slate-800">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone1}`} className="hover:underline font-black">{COMPANY_INFO.phone1}</a>
              </p>
              <p className="flex items-center gap-2 bg-slate-900 p-2 border border-slate-800">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.tenderEmail}`} className="hover:underline font-black">{COMPANY_INFO.tenderEmail}</a>
              </p>
            </div>

            <button
              onClick={onOpenTenderModal}
              className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 py-3 border-2 border-slate-950 font-black uppercase text-xs tracking-wider shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Submit RFQ / Tender Documents</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-2 border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold uppercase tracking-wider text-slate-400">
          <p>© {new Date().getFullYear()} Asmatullah &amp; Brothers Govt. Construction Company.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-amber-400 font-black hover:underline transition-colors bg-slate-900 px-3 py-1.5 border border-slate-800"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

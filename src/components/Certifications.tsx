import React from 'react';
import { CERTIFICATIONS, COMPANY_INFO, TRANSLATIONS } from '../data/companyData';
import { Language } from '../types';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  FileCheck2,
  Building,
  Microscope,
  FileText,
  BadgeCheck,
  Hash,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface CertificationsProps {
  currentLang: Language;
}

export const Certifications: React.FC<CertificationsProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section id="licenses" className="py-16 md:py-24 bg-slate-950 text-white border-b-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest px-3 py-1 border border-slate-950 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] mx-auto mb-3">
            <Award className="w-4 h-4 text-slate-950" /> Official Government Registration &amp; Accreditation
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white font-grotesk tracking-tighter">
            PEC Licence &amp; Tax Compliance
          </h2>
          <p className="text-slate-300 font-medium text-base mt-2">
            M/s AZMAT ULLAH &amp; BROTHERS holds valid constructor accreditation with Pakistan Engineering Council and active taxpayer registration with Federal Board of Revenue (FBR).
          </p>
        </div>

        {/* Highlighted PEC Primary Certificate Feature Box */}
        <div className="mb-10 bg-slate-900 border-4 border-amber-400 p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b-2 border-slate-800">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-amber-400 text-slate-950 font-black border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] shrink-0">
                <BadgeCheck className="w-8 h-8" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="bg-emerald-400 text-slate-950 font-black text-xs px-2.5 py-0.5 uppercase tracking-wider border border-slate-950">
                    {COMPANY_INFO.pecValidity}
                  </span>
                  <span className="bg-slate-950 text-amber-400 font-mono text-xs font-bold px-2 py-0.5 border border-slate-800">
                    Form PEC-11 | {COMPANY_INFO.pecSerialNo}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black uppercase text-white font-grotesk">
                  Pakistan Engineering Council (PEC) Licence
                </h3>
                <p className="text-amber-400 font-mono font-bold text-sm mt-0.5">
                  Firm: M/s AZMAT ULLAH &amp; BROTHERS • Licence No: 15623 • Category: C4
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 border-2 border-slate-800 shrink-0 text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Project Tendering Limit</span>
              <span className="text-xl md:text-2xl font-black text-white font-grotesk">Rs. 200 Million</span>
              <span className="text-[11px] text-emerald-400 font-bold block mt-0.5">Per Single Engineering Project</span>
            </div>
          </div>

          {/* Approved Specialization Codes Grid */}
          <div className="mt-6">
            <h4 className="text-xs font-black uppercase text-slate-300 tracking-widest mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> Approved Specialization Codes on Form PEC-11:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {COMPANY_INFO.pecSpecializationCodes.map((code, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/90 p-2.5 border border-slate-800 flex items-center gap-2 text-xs font-bold text-slate-200"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{code}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications & Enlistments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="bg-slate-900 border-2 border-slate-800 hover:border-amber-400 p-6 transition-all flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-3 bg-amber-400 text-slate-950 font-black border border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="bg-emerald-400 text-slate-950 border border-slate-950 px-2.5 py-1 text-xs font-black uppercase tracking-widest">
                    {cert.validity}
                  </span>
                </div>

                <span className="text-xs font-black text-amber-400 uppercase tracking-widest block bg-slate-950 p-1 border border-slate-800 inline-block mb-1">
                  Authority: {cert.authority}
                </span>
                <h3 className="text-lg font-black uppercase text-white font-grotesk mt-1 mb-2">{cert.title}</h3>
                <p className="text-xs font-medium text-slate-300 leading-relaxed">{cert.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-slate-800 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
                <span>Ref: <strong className="text-amber-400 font-black font-mono">{cert.licenseNo}</strong></span>
                <span className="bg-slate-950 px-2 py-1 text-amber-400 border border-slate-800 font-black">{cert.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Lab Testing Feature Box */}
        <div className="mt-12 bg-slate-900 border-4 border-amber-400 p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-amber-400 text-slate-950 font-black border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] shrink-0">
              <Microscope className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase text-white font-grotesk">On-Site QA/QC Soil, Asphalt &amp; Concrete Testing Protocols</h3>
              <p className="text-xs md:text-sm font-medium text-slate-300 mt-1 max-w-2xl">
                We perform daily concrete cylinder compression tests, asphalt core compaction density checks, and soil CBR load tests across all active project sites.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3 bg-slate-950 px-4 py-3 border-2 border-slate-800 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-slate-200">ISO 9001 Compliant Quality System</span>
          </div>
        </div>
      </div>
    </section>
  );
};

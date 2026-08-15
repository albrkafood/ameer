import React from 'react';
import { CERTIFICATIONS, TRANSLATIONS } from '../data/companyData';
import { Language } from '../types';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  FileCheck2,
  Building,
  Microscope,
} from 'lucide-react';

interface CertificationsProps {
  currentLang: Language;
}

export const Certifications: React.FC<CertificationsProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section className="py-16 md:py-24 bg-slate-950 text-white border-b-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest px-3 py-1 border border-slate-950 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] mx-auto mb-3">
            <Award className="w-4 h-4 text-slate-950" /> Official Government Registration
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white font-grotesk tracking-tighter">
            Licensing &amp; PEC Accreditation
          </h2>
          <p className="text-slate-300 font-medium text-base mt-2">
            Fully compliant with federal engineering council standards, environmental safety regulations, and government public works procurement policies.
          </p>
        </div>

        {/* Certifications Grid */}
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
                  Issued By: {cert.authority}
                </span>
                <h3 className="text-xl font-black uppercase text-white font-grotesk mt-1 mb-2">{cert.title}</h3>
                <p className="text-xs font-medium text-slate-300 leading-relaxed">{cert.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-slate-800 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
                <span>License Ref: <strong className="text-amber-400 font-black">{cert.licenseNo}</strong></span>
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
              <h3 className="text-xl font-black uppercase text-white font-grotesk">On-Site QA/QC Soil &amp; Concrete Testing Laboratories</h3>
              <p className="text-xs md:text-sm font-medium text-slate-300 mt-1 max-w-2xl">
                We deploy mobile testing labs to every road and building site to perform daily concrete cylinder compression tests, asphalt core compaction density checks, and soil CBR load tests.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3 bg-slate-950 px-4 py-3 border-2 border-slate-800 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-slate-200">ISO 17025 Compliant Material Testing</span>
          </div>
        </div>
      </div>
    </section>
  );
};

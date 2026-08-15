import React from 'react';
import { COMPANY_INFO, COMPANY_MILESTONES, TRANSLATIONS } from '../data/companyData';
import siteEngineersImg from '../assets/images/pakistani_civil_engineers_1786165493474.jpg';
import { Language } from '../types';
import {
  Shield,
  Award,
  CheckCircle,
  Clock,
  HardHat,
  Users,
  Target,
  FileBadge,
} from 'lucide-react';

interface CompanyOverviewProps {
  currentLang: Language;
}

export const CompanyOverview: React.FC<CompanyOverviewProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section id="about" className="py-16 md:py-24 bg-slate-950 text-slate-100 border-b-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b-2 border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 px-3 py-1 font-black text-xs uppercase tracking-widest border border-slate-950 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] mb-3">
              <Shield className="w-4 h-4 text-slate-950" /> About Company &amp; Leadership
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white font-grotesk tracking-tighter leading-none">
              Trusted Govt &amp; Infrastructure Contractors
            </h2>
          </div>
          <p className="text-slate-300 text-base md:text-lg max-w-xl font-medium leading-relaxed border-l-4 border-amber-400 pl-4">
            From heavy mountain highways to multi-story civic complexes and master-planned gated housing societies, Asmatullah &amp; Brothers delivers high-spec engineering with unmatched integrity.
          </p>
        </div>

        {/* CEO Message & Credentials Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* CEO Card */}
          <div className="lg:col-span-5 bg-slate-900 border-2 border-amber-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col justify-between">
            <div className="relative h-44 w-full border-b-2 border-slate-800">
              <img
                src={siteEngineersImg}
                alt="Engr. Asmatullah Khan & Engineering Team"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <span className="absolute bottom-2 left-2 bg-amber-400 text-slate-950 font-black text-[10px] uppercase px-2 py-0.5 border border-slate-950">
                Site Supervision &amp; Quality Control
              </span>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-amber-400 text-slate-950 font-black text-xl flex items-center justify-center border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-grotesk shrink-0">
                  AK
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase text-white font-grotesk">{COMPANY_INFO.ceoName}</h3>
                  <p className="text-xs font-black text-amber-400 uppercase tracking-widest mt-0.5">
                    {COMPANY_INFO.ceoTitle}
                  </p>
                  <p className="text-xs font-semibold text-slate-300 mt-0.5">PEC Registered Professional Civil Engineer</p>
                </div>
              </div>

              <blockquote className="text-slate-200 font-medium italic text-xs md:text-sm leading-relaxed border-l-4 border-amber-400 pl-4 py-1 bg-slate-950/80 p-3 border border-slate-800">
                "When we take on a government highway, a regional hospital, or a residential housing society, we are not just laying concrete and asphalt; we are building the foundation for future generations."
              </blockquote>

              <div className="mt-6 pt-4 border-t-2 border-slate-800 grid grid-cols-2 gap-3 text-xs font-bold uppercase tracking-wider">
                <div className="bg-slate-950 p-2.5 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Registration</span>
                  <span className="font-black text-white text-xs">Pakistan Eng. Council</span>
                </div>
                <div className="bg-slate-950 p-2.5 border border-amber-400/40">
                  <span className="text-slate-400 block text-[10px]">Licensure Tier</span>
                  <span className="font-black text-amber-400 text-xs">Category C1 (No Limit)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pillars of Strength */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-5 border-2 border-slate-800 hover:border-amber-400 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="p-2.5 bg-amber-400 text-slate-950 font-black border border-slate-950 w-fit mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-black text-base uppercase text-white font-grotesk mb-1">Government Approved Credentials</h4>
                <p className="text-xs font-medium text-slate-300 leading-relaxed">
                  Enlisted with Federal C&amp;W, Public Works Department (PWD), National Highway Authority (NHA), and Capital Development Authority (CDA).
                </p>
              </div>

              <div className="bg-slate-900 p-5 border-2 border-slate-800 hover:border-amber-400 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="p-2.5 bg-amber-400 text-slate-950 font-black border border-slate-950 w-fit mb-3">
                  <HardHat className="w-5 h-5" />
                </div>
                <h4 className="font-black text-base uppercase text-white font-grotesk mb-1">In-House Machinery Ownership</h4>
                <p className="text-xs font-medium text-slate-300 leading-relaxed">
                  Over 140 company-owned heavy excavators, asphalt pavers, batching plants, and rollers ensuring rapid on-site mobilization without delay.
                </p>
              </div>

              <div className="bg-slate-900 p-5 border-2 border-slate-800 hover:border-amber-400 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="p-2.5 bg-amber-400 text-slate-950 font-black border border-slate-950 w-fit mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-black text-base uppercase text-white font-grotesk mb-1">850+ Skilled Workforce</h4>
                <p className="text-xs font-medium text-slate-300 leading-relaxed">
                  Licensed resident site engineers, QA/QC concrete lab technicians, surveyor crews, and experienced asphalt paving operators.
                </p>
              </div>

              <div className="bg-slate-900 p-5 border-2 border-slate-800 hover:border-amber-400 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="p-2.5 bg-amber-400 text-slate-950 font-black border border-slate-950 w-fit mb-3">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="font-black text-base uppercase text-white font-grotesk mb-1">Turn-Key Execution</h4>
                <p className="text-xs font-medium text-slate-300 leading-relaxed">
                  End-to-end capability: site survey, cut &amp; fill earthwork, civil structure, utility grid, asphalt paving, to final inauguration handover.
                </p>
              </div>
            </div>

            {/* Registration Badges Bar */}
            <div className="bg-slate-900 p-4 border-2 border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2">
                <FileBadge className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                  Tax Registration &amp; Compliance: FBR NTN Active | Sales Tax Registered | ISO 9001 Certified
                </span>
              </div>
              <span className="text-xs font-black uppercase text-slate-950 bg-amber-400 px-3 py-1 border border-slate-950">
                100% Tax Compliant
              </span>
            </div>
          </div>
        </div>

        {/* Milestones & History Timeline */}
        <div className="mt-16 pt-12 border-t-2 border-slate-800">
          <h3 className="text-xl md:text-2xl font-black uppercase text-white font-grotesk tracking-tight mb-8 flex items-center gap-2">
            <Clock className="w-6 h-6 text-amber-400" />
            Company Journey &amp; Historical Milestones
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {COMPANY_MILESTONES.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900 p-4 border-2 border-slate-800 hover:border-amber-400 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative"
              >
                <div className="text-amber-400 font-black text-3xl font-grotesk mb-1">{item.year}</div>
                <h4 className="font-black uppercase text-sm text-white font-grotesk mb-1">{item.title}</h4>
                <p className="text-xs font-medium text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

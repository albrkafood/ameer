import React from 'react';
import { COMPANY_INFO, COMPANY_MILESTONES, STAFF_MEMBERS, EXPERTISE_LIST, TRANSLATIONS } from '../data/companyData';
import siteEngineersImg from '../assets/images/pakistani_civil_engineers_1786165493474.jpg';
import { Language } from '../types';
import {
  Shield,
  Award,
  CheckCircle2,
  Clock,
  HardHat,
  Users,
  Target,
  FileBadge,
  Sparkles,
  Quote,
  Building,
  Briefcase,
  Phone,
  Mail,
  MapPin,
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
              <Shield className="w-4 h-4 text-slate-950" /> Official Company Profile &amp; Leadership
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white font-grotesk tracking-tighter leading-none">
              {COMPANY_INFO.name}
            </h2>
            <p className="text-amber-400 font-mono font-bold text-xs uppercase tracking-widest mt-2">
              {COMPANY_INFO.badge} • Registered at RTO Peshawar
            </p>
          </div>
          <p className="text-slate-300 text-base md:text-lg max-w-xl font-medium leading-relaxed border-l-4 border-amber-400 pl-4">
            Official government contractor for Communication &amp; Works (C&amp;W), Pakhtunkhwa Highways Authority (PKHA), Irrigation Department, and TMAs with over PKR 1.39 Billion portfolio.
          </p>
        </div>

        {/* Official Introduction & Core Mission */}
        <div className="mt-10 bg-slate-900 border-2 border-amber-400 p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-400 text-slate-950 font-black border border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0 hidden sm:flex">
              <Quote className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-slate-950 px-3 py-1 text-xs font-black uppercase tracking-wider text-amber-400 border border-slate-800">
                  Official Company Statement
                </span>
                <span className="text-xs text-slate-400 font-bold uppercase">
                  PEC Licence # 15623 (C4)
                </span>
              </div>
              <p className="text-slate-200 text-sm md:text-base font-medium leading-relaxed italic">
                "{COMPANY_INFO.introText}"
              </p>
            </div>
          </div>
        </div>

        {/* 6 Official Brand Values & Taglines */}
        <div className="mt-8">
          <h3 className="text-xs font-black uppercase text-amber-400 tracking-widest mb-3 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Official Company Principles &amp; Motto
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {COMPANY_INFO.taglinesList.map((tagline, idx) => (
              <div
                key={idx}
                className="bg-slate-900/90 p-3.5 border border-slate-800 hover:border-amber-400 flex items-center gap-3 transition-all"
              >
                <div className="w-6 h-6 bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 border border-slate-950 font-mono">
                  0{idx + 1}
                </div>
                <span className="text-xs font-bold text-slate-200 tracking-wide">
                  {tagline}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Managing Director & Credentials Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* MD Card */}
          <div className="lg:col-span-5 bg-slate-900 border-2 border-amber-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col justify-between">
            <div className="relative h-44 w-full border-b-2 border-slate-800">
              <img
                src={siteEngineersImg}
                alt="Azmat Ullah & Brothers Engineering Team"
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
                  AU
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase text-white font-grotesk">{COMPANY_INFO.ceoName}</h3>
                  <p className="text-xs font-black text-amber-400 uppercase tracking-widest mt-0.5">
                    {COMPANY_INFO.ceoTitle}
                  </p>
                  <p className="text-xs font-semibold text-slate-300 mt-0.5">M/s AZMAT ULLAH &amp; BROTHERS</p>
                </div>
              </div>

              <div className="bg-slate-950/80 p-3.5 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">PEC Licence No:</span>
                  <strong className="text-amber-400 font-mono">{COMPANY_INFO.pecLicense}</strong>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">FBR NTN / Tax ID:</span>
                  <strong className="text-white font-mono">{COMPANY_INFO.fbrRegNo}</strong>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Tax Jurisdiction:</span>
                  <strong className="text-white">{COMPANY_INFO.taxOffice}</strong>
                </div>
                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-slate-400">Registered Office:</span>
                  <strong className="text-white text-right text-[11px] max-w-[200px] truncate">
                    Nowshera, KPK
                  </strong>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-slate-800 grid grid-cols-2 gap-3 text-xs font-bold uppercase tracking-wider">
                <div className="bg-slate-950 p-2.5 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Projects Executed</span>
                  <span className="font-black text-white text-xs">19 Landmark Projects</span>
                </div>
                <div className="bg-slate-950 p-2.5 border border-amber-400/40">
                  <span className="text-slate-400 block text-[10px]">Total Portfolio</span>
                  <span className="font-black text-amber-400 text-xs">PKR 1.39 Billion+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Strengths */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-5 border-2 border-slate-800 hover:border-amber-400 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="p-2.5 bg-amber-400 text-slate-950 font-black border border-slate-950 w-fit mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-black text-base uppercase text-white font-grotesk mb-1">Government Approved Enlistments</h4>
                <p className="text-xs font-medium text-slate-300 leading-relaxed">
                  Active pre-qualified contractor for KPK C&amp;W, Pakhtunkhwa Highways Authority (PKHA), Irrigation Department, and TMAs.
                </p>
              </div>

              <div className="bg-slate-900 p-5 border-2 border-slate-800 hover:border-amber-400 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="p-2.5 bg-amber-400 text-slate-950 font-black border border-slate-950 w-fit mb-3">
                  <HardHat className="w-5 h-5" />
                </div>
                <h4 className="font-black text-base uppercase text-white font-grotesk mb-1">Heavy Plant &amp; Machinery</h4>
                <p className="text-xs font-medium text-slate-300 leading-relaxed">
                  Owned fleet of CAT Excavators, Vögele Asphalt Pavers, Tandem Rollers, Batching Plants, and 3-Axle Dumpers ready for immediate mobilization.
                </p>
              </div>

              <div className="bg-slate-900 p-5 border-2 border-slate-800 hover:border-amber-400 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="p-2.5 bg-amber-400 text-slate-950 font-black border border-slate-950 w-fit mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-black text-base uppercase text-white font-grotesk mb-1">Dedicated Engineering Staff</h4>
                <p className="text-xs font-medium text-slate-300 leading-relaxed">
                  9 core executive engineers, project managers, quantity surveyors, electrical/mechanical specialists, and site supervisors.
                </p>
              </div>

              <div className="bg-slate-900 p-5 border-2 border-slate-800 hover:border-amber-400 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="p-2.5 bg-amber-400 text-slate-950 font-black border border-slate-950 w-fit mb-3">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="font-black text-base uppercase text-white font-grotesk mb-1">Multi-Discipline Specializations</h4>
                <p className="text-xs font-medium text-slate-300 leading-relaxed">
                  PEC Specializations: CE01 (Highways), CE04(ii) (Flood Control), CE09 (Structures), EE01/04/06 &amp; EE11 (Solar Power).
                </p>
              </div>
            </div>

            {/* Registration Badges Bar */}
            <div className="bg-slate-900 p-4 border-2 border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2">
                <FileBadge className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                  Official Address: Khush Maqam, Taru Jabba, Tehsil Pabbi, District Nowshera, KPK
                </span>
              </div>
              <span className="text-xs font-black uppercase text-slate-950 bg-amber-400 px-3 py-1 border border-slate-950">
                Active Taxpayer
              </span>
            </div>
          </div>
        </div>

        {/* Official Staff List Table Section */}
        <div id="staff" className="mt-16 pt-12 border-t-2 border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 px-2.5 py-0.5 text-xs font-black uppercase tracking-wider mb-2 border border-slate-950">
                <Users className="w-3.5 h-3.5" /> Company Staff Roster
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase text-white font-grotesk">
                List of Company Key Staff &amp; Engineering Officers
              </h3>
              <p className="text-xs text-slate-300 font-medium mt-1">
                Official technical personnel assigned across headquarters, project estimation, and active field sites.
              </p>
            </div>
            <span className="bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs font-mono font-bold text-amber-400 uppercase w-fit">
              Total Key Officers: 09
            </span>
          </div>

          <div className="overflow-x-auto border-2 border-slate-800 bg-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950 text-slate-300 font-black uppercase tracking-wider border-b-2 border-slate-800">
                  <th className="py-3.5 px-4 w-16 text-center text-amber-400">S. No</th>
                  <th className="py-3.5 px-4">Title of Position / Designation</th>
                  <th className="py-3.5 px-4">Name of Staff Officer</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Department / Division</th>
                  <th className="py-3.5 px-4 text-center">Numbers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200 font-medium">
                {STAFF_MEMBERS.map((member) => (
                  <tr key={member.sNo} className="hover:bg-slate-800/60 transition-colors">
                    <td className="py-3 px-4 text-center font-mono font-bold text-amber-400 bg-slate-950/40">
                      0{member.sNo}
                    </td>
                    <td className="py-3 px-4 font-bold uppercase text-white tracking-wide">
                      {member.position}
                    </td>
                    <td className="py-3 px-4 font-black uppercase text-amber-400">
                      {member.name}
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell text-slate-300 text-xs">
                      {member.department}
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-white">
                      01
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Milestones & History Timeline */}
        <div className="mt-16 pt-12 border-t-2 border-slate-800">
          <h3 className="text-xl md:text-2xl font-black uppercase text-white font-grotesk tracking-tight mb-8 flex items-center gap-2">
            <Clock className="w-6 h-6 text-amber-400" />
            Company Journey &amp; Registration Milestones
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
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

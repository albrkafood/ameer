import React from 'react';
import { EQUIPMENT_FLEET, TRANSLATIONS } from '../data/companyData';
import { Language } from '../types';
import {
  Truck,
  Wrench,
  Building,
  Route,
  ShieldCheck,
  CheckCircle,
  FileText,
  Construction,
} from 'lucide-react';

interface EquipmentFleetProps {
  currentLang: Language;
  onOpenTenderModal: () => void;
}

export const EquipmentFleet: React.FC<EquipmentFleetProps> = ({
  currentLang,
  onOpenTenderModal,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section id="machinery" className="py-16 md:py-24 bg-slate-950 text-white border-b-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b-2 border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 px-3 py-1 font-black text-xs uppercase tracking-widest border border-slate-950 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] mb-2">
              <Truck className="w-4 h-4 text-slate-950" /> Company Machinery Fleet
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white font-grotesk tracking-tighter">
              140+ Heavy Equipment Units
            </h2>
          </div>
          <p className="text-slate-300 font-medium text-base max-w-xl border-l-4 border-amber-400 pl-4">
            We own and maintain our entire fleet of heavy construction machinery, guaranteeing immediate site mobilization and eliminating equipment rental dependencies.
          </p>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EQUIPMENT_FLEET.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border-2 border-slate-800 hover:border-amber-400 p-6 transition-all flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-amber-400 text-slate-950 font-black border border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Construction className="w-6 h-6" />
                  </div>
                  <span
                    className={`px-2.5 py-1 font-black text-[10px] uppercase tracking-widest border border-slate-950 ${
                      item.status.includes('Operational')
                        ? 'bg-emerald-400 text-slate-950'
                        : 'bg-blue-400 text-slate-950'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <span className="text-xs font-black text-amber-400 uppercase tracking-widest block bg-slate-950 p-1 border border-slate-800 inline-block mb-1">
                  {item.category}
                </span>
                <h3 className="text-lg font-black uppercase text-white font-grotesk mt-1 mb-2">{item.name}</h3>

                <div className="space-y-2 text-xs font-semibold text-slate-300 pt-3 border-t-2 border-slate-800">
                  <div className="flex justify-between bg-slate-950 p-2 border border-slate-800">
                    <span className="text-slate-400 uppercase text-[10px]">Model / Make:</span>
                    <span className="font-bold text-white uppercase">{item.model}</span>
                  </div>
                  <div className="flex justify-between bg-slate-950 p-2 border border-slate-800">
                    <span className="text-slate-400 uppercase text-[10px]">Fleet Count:</span>
                    <span className="font-black text-amber-400 text-sm font-grotesk">{item.units} Units</span>
                  </div>
                  <div className="flex justify-between bg-slate-950 p-2 border border-slate-800">
                    <span className="text-slate-400 uppercase text-[10px]">Capacity:</span>
                    <span className="font-bold text-white text-right uppercase max-w-[180px]">{item.capacity}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-slate-800 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-slate-300 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Verified Fleet
                </span>
                <button
                  onClick={onOpenTenderModal}
                  className="text-amber-400 font-black hover:underline uppercase tracking-wide"
                >
                  Subcontract Machinery &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Fleet Deployment Callout */}
        <div className="mt-12 bg-amber-400 text-slate-950 border-4 border-slate-950 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="space-y-1">
            <h3 className="text-xl md:text-3xl font-black uppercase font-grotesk tracking-tight">
              Need Heavy Machinery &amp; Asphalt Plants Deployed on Site?
            </h3>
            <p className="text-xs md:text-sm font-bold text-slate-900 uppercase tracking-wide">
              We provide subcontract machinery rental with licensed operators, on-site fuel bowsers, and mobile mechanics across Pakistan.
            </p>
          </div>

          <button
            onClick={onOpenTenderModal}
            className="shrink-0 bg-slate-950 hover:bg-slate-900 text-amber-400 border-2 border-slate-950 px-7 py-4 font-black uppercase text-xs tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Request Machinery Deployment</span>
          </button>
        </div>
      </div>
    </section>
  );
};

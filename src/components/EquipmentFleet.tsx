import React, { useState } from 'react';
import { EQUIPMENT_FLEET, TRANSLATIONS } from '../data/companyData';
import { Language, Equipment } from '../types';
import {
  Truck,
  Wrench,
  Building,
  CheckCircle,
  FileText,
  Construction,
  Layers,
  Sparkles,
  Maximize2,
  X,
  ShieldAlert,
  CalendarCheck,
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
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  const categories = [
    'All',
    'Excavators & Earthmovers',
    'Asphalt & Paving',
    'Compaction & Rollers',
    'Concrete & Batching',
    'Transport & Logistics',
  ];

  const filteredFleet =
    selectedCategory === 'All'
      ? EQUIPMENT_FLEET
      : EQUIPMENT_FLEET.filter((item) => item.category === selectedCategory);

  return (
    <section id="machinery" className="py-16 md:py-24 bg-slate-950 text-white border-b-4 border-amber-400 relative overflow-hidden">
      {/* Subtle Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b-2 border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-3.5 py-1.5 font-black text-xs uppercase tracking-widest border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] mb-3">
              <Truck className="w-4 h-4 text-slate-950" /> Company Machinery Fleet
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white font-grotesk tracking-tighter">
              140+ Heavy Equipment Units
            </h2>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
              100% Company-Owned Specialized Plant, Earthmoving &amp; Road Paving Machinery
            </p>
          </div>

          <div className="max-w-xl bg-slate-900 border-2 border-slate-800 p-4 border-l-4 border-l-amber-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-slate-200 font-medium text-sm leading-relaxed">
              We own and maintain our entire heavy construction fleet with dedicated maintenance yards in Pabbi Nowshera and Haripur, eliminating contractor rental delays and ensuring rapid mobilization.
            </p>
          </div>
        </div>

        {/* Quick Highlights Counter Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="bg-slate-900 border border-slate-800 p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-400 text-slate-950 font-black flex items-center justify-center font-grotesk text-base border border-slate-950 shrink-0">
              14
            </div>
            <div>
              <div className="text-[11px] font-black text-slate-400 uppercase">CAT Excavators</div>
              <div className="text-xs font-bold text-white uppercase">Heavy Earthmoving</div>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-400 text-slate-950 font-black flex items-center justify-center font-grotesk text-base border border-slate-950 shrink-0">
              28
            </div>
            <div>
              <div className="text-[11px] font-black text-slate-400 uppercase">Pavers &amp; Rollers</div>
              <div className="text-xs font-bold text-white uppercase">Asphalt Highway Fleet</div>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-400 text-slate-950 font-black flex items-center justify-center font-grotesk text-base border border-slate-950 shrink-0">
              48
            </div>
            <div>
              <div className="text-[11px] font-black text-slate-400 uppercase">Dump Trucks</div>
              <div className="text-xs font-bold text-white uppercase">3-Axle Logistics</div>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-400 text-slate-950 font-black flex items-center justify-center font-grotesk text-base border border-slate-950 shrink-0">
              100%
            </div>
            <div>
              <div className="text-[11px] font-black text-slate-400 uppercase">Direct Ownership</div>
              <div className="text-xs font-bold text-white uppercase">Zero Rental Stoppage</div>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8 items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mr-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-400" /> Filter Fleet:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-black uppercase tracking-wider transition-all border ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFleet.map((item) => (
            <div
              key={item.id}
              className="group bg-slate-900 border-2 border-slate-800 hover:border-amber-400 transition-all flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(251,191,36,0.3)] overflow-hidden"
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950 border-b-2 border-slate-800">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-850 text-slate-600">
                      <Construction className="w-12 h-12" />
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40 opacity-70" />

                  {/* Top Image Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 border border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {item.units} Units in Fleet
                    </span>

                    <span
                      className={`px-2.5 py-1 font-black text-[10px] uppercase tracking-widest border border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                        item.status.includes('Operational')
                          ? 'bg-emerald-400 text-slate-950'
                          : 'bg-cyan-400 text-slate-950'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Quick Zoom Trigger Button */}
                  <button
                    onClick={() => setSelectedEquipment(item)}
                    className="absolute bottom-3 right-3 bg-slate-950/90 hover:bg-amber-400 hover:text-slate-950 text-white p-2 border border-slate-700 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    title="Enlarge Photo"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card Content Body */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest bg-slate-950 px-2 py-0.5 border border-slate-800 inline-block">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-base md:text-lg font-black uppercase text-white font-grotesk leading-snug group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h3>

                  {/* Specifications Table */}
                  <div className="space-y-2 text-xs font-semibold text-slate-300 mt-4 pt-3 border-t-2 border-slate-800">
                    <div className="flex justify-between items-center bg-slate-950 p-2.5 border border-slate-800">
                      <span className="text-slate-400 uppercase text-[10px] font-bold">Model / Make:</span>
                      <span className="font-bold text-white uppercase text-right text-[11px]">{item.model}</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-950 p-2.5 border border-slate-800">
                      <span className="text-slate-400 uppercase text-[10px] font-bold">Available Count:</span>
                      <span className="font-black text-amber-400 text-xs font-grotesk uppercase">{item.units} Active Units</span>
                    </div>
                    <div className="flex justify-between items-start bg-slate-950 p-2.5 border border-slate-800 gap-2">
                      <span className="text-slate-400 uppercase text-[10px] font-bold shrink-0">Capacity:</span>
                      <span className="font-semibold text-slate-200 text-right text-[11px] leading-tight">{item.capacity}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 pt-0 mt-2">
                <div className="pt-3 border-t-2 border-slate-800 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                  <span className="text-slate-300 flex items-center gap-1 text-[11px]">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Inspected &amp; Tested
                  </span>
                  <button
                    onClick={onOpenTenderModal}
                    className="text-amber-400 font-black hover:text-amber-300 hover:underline uppercase tracking-wide text-xs flex items-center gap-1"
                  >
                    Deploy on Site &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fleet Deployment Callout Banner */}
        <div className="mt-14 bg-amber-400 text-slate-950 border-4 border-slate-950 p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 bg-slate-950 text-amber-400 px-2.5 py-0.5 font-black text-[10px] uppercase tracking-widest">
              <Sparkles className="w-3 h-3" /> Subcontract Machinery &amp; Asphalt Plants
            </div>
            <h3 className="text-xl md:text-3xl font-black uppercase font-grotesk tracking-tight">
              Need Heavy Machinery Mobilized To Your Site?
            </h3>
            <p className="text-xs md:text-sm font-bold text-slate-900 uppercase tracking-wide max-w-3xl">
              We provide equipment deployment with certified operators, on-site fuel bowsers, mobile mechanics, and heavy lowbed transport across Islamabad, Rawalpindi &amp; all KPK districts.
            </p>
          </div>

          <button
            onClick={onOpenTenderModal}
            className="shrink-0 bg-slate-950 hover:bg-slate-900 text-amber-400 border-2 border-slate-950 px-8 py-4 font-black uppercase text-xs tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Request Machinery Deployment</span>
          </button>
        </div>
      </div>

      {/* Machinery Image Lightbox Modal */}
      {selectedEquipment && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border-4 border-amber-400 max-w-3xl w-full p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedEquipment(null)}
              className="absolute top-4 right-4 bg-slate-950 text-white hover:text-amber-400 p-2 border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-block bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest px-2.5 py-1 mb-2 border border-slate-950">
              {selectedEquipment.category}
            </div>
            <h3 className="text-2xl font-black uppercase text-white font-grotesk mb-4">
              {selectedEquipment.name}
            </h3>

            {selectedEquipment.imageUrl && (
              <div className="aspect-video w-full overflow-hidden border-2 border-slate-800 mb-4 bg-slate-950">
                <img
                  src={selectedEquipment.imageUrl}
                  alt={selectedEquipment.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="bg-slate-950 p-3 border border-slate-800">
                <div className="text-[10px] font-bold uppercase text-slate-400">Make / Model</div>
                <div className="text-sm font-black text-white uppercase">{selectedEquipment.model}</div>
              </div>
              <div className="bg-slate-950 p-3 border border-slate-800">
                <div className="text-[10px] font-bold uppercase text-slate-400">Fleet Inventory</div>
                <div className="text-sm font-black text-amber-400 uppercase font-grotesk">{selectedEquipment.units} Units Available</div>
              </div>
              <div className="bg-slate-950 p-3 border border-slate-800">
                <div className="text-[10px] font-bold uppercase text-slate-400">Operational Status</div>
                <div className="text-sm font-black text-emerald-400 uppercase">{selectedEquipment.status}</div>
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 border border-slate-800 mb-6">
              <div className="text-[10px] font-bold uppercase text-slate-400 mb-1">Capacity &amp; Performance Rating:</div>
              <div className="text-xs font-semibold text-slate-200">{selectedEquipment.capacity}</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={() => setSelectedEquipment(null)}
                className="px-5 py-2.5 bg-slate-800 text-slate-200 hover:text-white uppercase font-bold text-xs border border-slate-700"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  setSelectedEquipment(null);
                  onOpenTenderModal();
                }}
                className="px-6 py-2.5 bg-amber-400 text-slate-950 hover:bg-amber-300 font-black uppercase text-xs border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" /> Subcontract This Equipment
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

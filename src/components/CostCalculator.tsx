import React, { useState } from 'react';
import { CostEstimateInput, CostEstimateResult, Language } from '../types';
import {
  Calculator,
  Route,
  Building,
  Compass,
  FileText,
  DollarSign,
  Clock,
  Send,
  CheckCircle2,
  Info,
} from 'lucide-react';

interface CostCalculatorProps {
  currentLang: Language;
  onOpenTenderModalWithSpecs: (specs: string) => void;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({
  currentLang,
  onOpenTenderModalWithSpecs,
}) => {
  const [projectType, setProjectType] = useState<'road' | 'building' | 'society'>('road');
  const [scale, setScale] = useState<number>(10); // 10 KM for road, 25000 SqFt for building, 50 Acres for society
  const [qualityGrade, setQualityGrade] = useState<'standard' | 'premium' | 'government_spec'>('government_spec');
  const [includeEarthwork, setIncludeEarthwork] = useState<boolean>(true);
  const [includeUtilities, setIncludeUtilities] = useState<boolean>(true);
  const [includeLandscaping, setIncludeLandscaping] = useState<boolean>(false);

  // Calculate dynamic costs based on civil engineering benchmarks
  const calculateEstimate = (): CostEstimateResult => {
    let rateMin = 0;
    let rateMax = 0;
    let timelineBaseMonths = 0;

    if (projectType === 'road') {
      // Per KM Dual Lane Road: approx PKR 25M - 45M per KM
      rateMin = 28000000;
      rateMax = 42000000;
      timelineBaseMonths = Math.ceil(scale * 0.4);
    } else if (projectType === 'building') {
      // Per Sq Ft Covered Area: approx PKR 3,500 - 6,000 per Sq Ft
      rateMin = 3600;
      rateMax = 5200;
      timelineBaseMonths = Math.max(6, Math.ceil((scale / 10000) * 3));
    } else {
      // Per Acre Housing Society Infrastructure: approx PKR 4M - 7.5M per Acre
      rateMin = 4500000;
      rateMax = 7200000;
      timelineBaseMonths = Math.max(8, Math.ceil((scale / 20) * 2));
    }

    // Grade multiplier
    const gradeMult = qualityGrade === 'standard' ? 1.0 : qualityGrade === 'premium' ? 1.25 : 1.15;

    // Options multiplier
    let optionsAdd = 0;
    if (includeEarthwork) optionsAdd += 0.12;
    if (includeUtilities) optionsAdd += 0.18;
    if (includeLandscaping) optionsAdd += 0.08;

    const minTotal = Math.round(scale * rateMin * gradeMult * (1 + optionsAdd));
    const maxTotal = Math.round(scale * rateMax * gradeMult * (1 + optionsAdd));

    const unitName = projectType === 'road' ? 'KM' : projectType === 'building' ? 'Sq Ft' : 'Acres';

    return {
      estimatedTotalMin: minTotal,
      estimatedTotalMax: maxTotal,
      currency: 'PKR',
      breakdown: [
        {
          item: `Core Engineering & Structural ${projectType === 'road' ? 'Asphalt' : projectType === 'building' ? 'RCC' : 'Development'} Work`,
          costMin: Math.round(minTotal * 0.55),
          costMax: Math.round(maxTotal * 0.55),
        },
        {
          item: includeEarthwork ? 'Heavy Earthmoving, Cut & Fill & Sub-Base' : 'Basic Foundation Leveling',
          costMin: Math.round(minTotal * 0.18),
          costMax: Math.round(maxTotal * 0.18),
        },
        {
          item: includeUtilities ? 'Underground Drainage, Sewerage & Electric Grid' : 'Standard Utility Hookups',
          costMin: Math.round(minTotal * 0.17),
          costMax: Math.round(maxTotal * 0.17),
        },
        {
          item: 'QA/QC Lab Testing, Surveying & Site Supervision',
          costMin: Math.round(minTotal * 0.10),
          costMax: Math.round(maxTotal * 0.10),
        },
      ],
      timelineMonths: Math.min(36, Math.max(4, timelineBaseMonths)),
    };
  };

  const result = calculateEstimate();

  const formatPKR = (amount: number) => {
    if (amount >= 10000000) {
      return `PKR ${(amount / 10000000).toFixed(2)} Crore`;
    } else if (amount >= 100000) {
      return `PKR ${(amount / 100000).toFixed(2)} Lakh`;
    }
    return `PKR ${amount.toLocaleString()}`;
  };

  const handleSendRFQ = () => {
    const unit = projectType === 'road' ? 'KM' : projectType === 'building' ? 'Sq Ft' : 'Acres';
    const specSummary = `Project Type: ${projectType.toUpperCase()} | Scale: ${scale} ${unit} | Quality Grade: ${qualityGrade} | Estimated Cost: ${formatPKR(
      result.estimatedTotalMin
    )} - ${formatPKR(result.estimatedTotalMax)} | Estimated Duration: ${result.timelineMonths} Months.`;

    onOpenTenderModalWithSpecs(specSummary);
  };

  return (
    <section id="calculator" className="py-16 md:py-24 bg-slate-950 text-white border-b-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest px-3 py-1 border border-slate-950 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] mx-auto mb-3">
            <Calculator className="w-4 h-4 text-slate-950" /> Interactive Civil Budget Estimator
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white font-grotesk tracking-tighter">
            Instant Cost &amp; Timeline Calculator
          </h2>
          <p className="text-slate-300 font-medium text-base mt-2">
            Calculate benchmark budgetary figures for government road tenders, civic building projects, or private housing society land developments.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="bg-slate-900 border-4 border-amber-400 p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Project Type */}
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-amber-400 mb-3 bg-slate-950 p-1.5 border border-slate-800 inline-block">
                1. Select Sector Project Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setProjectType('road');
                    setScale(10);
                  }}
                  className={`p-3 border-2 text-left flex flex-col items-center sm:items-start gap-2 transition-all font-black uppercase text-xs ${
                    projectType === 'road'
                      ? 'bg-amber-400 text-slate-950 border-slate-950 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-amber-400'
                  }`}
                >
                  <Route className="w-5 h-5" />
                  <span>Road / Highway</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setProjectType('building');
                    setScale(25000);
                  }}
                  className={`p-3 border-2 text-left flex flex-col items-center sm:items-start gap-2 transition-all font-black uppercase text-xs ${
                    projectType === 'building'
                      ? 'bg-amber-400 text-slate-950 border-slate-950 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-amber-400'
                  }`}
                >
                  <Building className="w-5 h-5" />
                  <span>Civic Building</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setProjectType('society');
                    setScale(40);
                  }}
                  className={`p-3 border-2 text-left flex flex-col items-center sm:items-start gap-2 transition-all font-black uppercase text-xs ${
                    projectType === 'society'
                      ? 'bg-amber-400 text-slate-950 border-slate-950 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-amber-400'
                  }`}
                >
                  <Compass className="w-5 h-5" />
                  <span>Housing Society</span>
                </button>
              </div>
            </div>

            {/* Step 2: Scale Input Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-black uppercase tracking-widest text-amber-400 bg-slate-950 p-1.5 border border-slate-800 inline-block">
                  2. Project Scale ({projectType === 'road' ? 'Road Length in KM' : projectType === 'building' ? 'Covered Area in Sq Ft' : 'Land Size in Acres'})
                </label>
                <span className="text-lg font-black text-amber-400 font-grotesk bg-slate-950 px-3 py-1 border-2 border-slate-800 uppercase">
                  {scale.toLocaleString()} {projectType === 'road' ? 'KM' : projectType === 'building' ? 'Sq. Ft.' : 'Acres'}
                </span>
              </div>

              <input
                type="range"
                min={projectType === 'road' ? 1 : projectType === 'building' ? 2000 : 5}
                max={projectType === 'road' ? 100 : projectType === 'building' ? 250000 : 500}
                step={projectType === 'road' ? 1 : projectType === 'building' ? 1000 : 5}
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full accent-amber-400 bg-slate-950 h-3 border border-slate-800 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-1 uppercase">
                <span>Min: {projectType === 'road' ? '1 KM' : projectType === 'building' ? '2,000 Sq Ft' : '5 Acres'}</span>
                <span>Max: {projectType === 'road' ? '100 KM' : projectType === 'building' ? '250,000 Sq Ft' : '500 Acres'}</span>
              </div>
            </div>

            {/* Step 3: Specification Grade */}
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-amber-400 mb-2 bg-slate-950 p-1.5 border border-slate-800 inline-block">
                3. Engineering Specification Grade
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs font-black uppercase">
                <button
                  type="button"
                  onClick={() => setQualityGrade('standard')}
                  className={`p-2.5 border-2 text-center transition-all ${
                    qualityGrade === 'standard'
                      ? 'bg-amber-400 text-slate-950 border-slate-950'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  Commercial Grade
                </button>

                <button
                  type="button"
                  onClick={() => setQualityGrade('government_spec')}
                  className={`p-2.5 border-2 text-center transition-all ${
                    qualityGrade === 'government_spec'
                      ? 'bg-amber-400 text-slate-950 border-slate-950'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  Govt C&amp;W / NHA Spec
                </button>

                <button
                  type="button"
                  onClick={() => setQualityGrade('premium')}
                  className={`p-2.5 border-2 text-center transition-all ${
                    qualityGrade === 'premium'
                      ? 'bg-amber-400 text-slate-950 border-slate-950'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  Heavy Duty Mega Spec
                </button>
              </div>
            </div>

            {/* Step 4: Included Sub-Scopes */}
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-amber-400 mb-2 bg-slate-950 p-1.5 border border-slate-800 inline-block">
                4. Included Sub-Contract Scope
              </label>
              <div className="space-y-2 text-xs font-bold text-slate-200">
                <label className="flex items-center gap-2.5 cursor-pointer bg-slate-950 p-2.5 border border-slate-800 hover:border-amber-400">
                  <input
                    type="checkbox"
                    checked={includeEarthwork}
                    onChange={(e) => setIncludeEarthwork(e.target.checked)}
                    className="accent-amber-400 w-4 h-4"
                  />
                  <span>Heavy Cut &amp; Fill Earthworks, Hill Cutting &amp; Compaction</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer bg-slate-950 p-2.5 border border-slate-800 hover:border-amber-400">
                  <input
                    type="checkbox"
                    checked={includeUtilities}
                    onChange={(e) => setIncludeUtilities(e.target.checked)}
                    className="accent-amber-400 w-4 h-4"
                  />
                  <span>Underground Utility Lines (Sewerage, Storm Drain, Water Pipe Grid)</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer bg-slate-950 p-2.5 border border-slate-800 hover:border-amber-400">
                  <input
                    type="checkbox"
                    checked={includeLandscaping}
                    onChange={(e) => setIncludeLandscaping(e.target.checked)}
                    className="accent-amber-400 w-4 h-4"
                  />
                  <span>Road Signage, Street LED Lights &amp; Green Belt Landscaping</span>
                </label>
              </div>
            </div>
          </div>

          {/* Result Column */}
          <div className="lg:col-span-5 bg-slate-950 p-6 border-2 border-slate-800 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-amber-400 text-xs font-black uppercase tracking-widest block mb-1 bg-slate-900 p-1.5 border border-slate-800 inline-block">
                Estimated Project Budget Range
              </span>
              <div className="text-2xl sm:text-4xl font-black text-white font-grotesk leading-tight mt-2">
                {formatPKR(result.estimatedTotalMin)}
              </div>
              <div className="text-base font-bold text-slate-400 uppercase font-grotesk">
                to {formatPKR(result.estimatedTotalMax)}
              </div>

              <div className="mt-4 pt-4 border-t-2 border-slate-800 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-slate-300 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-amber-400" /> Estimated Duration:
                </span>
                <span className="font-black text-amber-400 text-base font-grotesk">{result.timelineMonths} Months</span>
              </div>

              {/* Itemized Breakdown */}
              <div className="mt-6 space-y-3">
                <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest">
                  Itemized Cost Allocation
                </h4>
                {result.breakdown.map((item, idx) => (
                  <div key={idx} className="bg-slate-900 p-3 border border-slate-800 text-xs space-y-1 font-semibold">
                    <div className="text-slate-200 uppercase text-[11px]">{item.item}</div>
                    <div className="text-amber-400 font-black font-grotesk">
                      {formatPKR(item.costMin)} - {formatPKR(item.costMax)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct RFQ Action */}
            <div className="pt-4 border-t-2 border-slate-800">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 mb-3 uppercase tracking-wide">
                <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Preliminary benchmarks based on PEC &amp; C&amp;W official schedule rates.</span>
              </div>

              <button
                type="button"
                onClick={handleSendRFQ}
                className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 py-4 border-2 border-slate-950 font-black uppercase text-xs tracking-wider shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Estimate for Official Tender Quotation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

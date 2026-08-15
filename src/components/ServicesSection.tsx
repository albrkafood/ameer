import React, { useState } from 'react';
import { HERO_IMAGES, TRANSLATIONS } from '../data/companyData';
import heavyMachineryImg from '../assets/images/heavy_machinery_fleet_1786165680809.jpg';
import { Language, ServiceCategory } from '../types';
import {
  Building2,
  Route,
  Compass,
  Truck,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Layers,
  Wrench,
  ChevronRight,
  FileText,
} from 'lucide-react';

interface ServicesSectionProps {
  currentLang: Language;
  onOpenTenderModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  currentLang,
  onOpenTenderModal,
}) => {
  const [activeTab, setActiveTab] = useState<ServiceCategory>('building');
  const t = TRANSLATIONS[currentLang];

  const serviceDetails = {
    building: {
      title: 'Building Construction (Government & Commercial)',
      subtitle: 'Earthquake-Resistant Multi-Story RCC Structures, Civic Complexes & Turn-Key Facilities',
      image: HERO_IMAGES.buildingConstruction,
      capabilities: [
        'Turn-Key Civic Centers, Govt Offices & Divisional Hospitals',
        'Earthquake Zone 3/4 Reinforced Cement Concrete (RCC) Frames',
        'High-density Foundation Raft Piling & Structural Steel Works',
        'Central HVAC, Medical Gas, Plumbing & Electrical Grid Integration',
        'Granite, Marble, & Acoustic Soundproof Interior Finishing',
        'ISO 9001 Concrete Batching & On-Site Quality Lab Testing',
      ],
      deliverables: 'Complete Turn-Key Building from Excavation to Occupation Certificate',
    },
    road: {
      title: 'Road & Highway Infrastructure Construction',
      subtitle: 'High-Speed Dual Carriageways, Heavy Asphalt Paving, Bridges & Drainage Networks',
      image: HERO_IMAGES.heroBanner,
      capabilities: [
        'Heavy Earthworks, Cut & Fill Hill Side Road Cutting',
        'Sub-Base, Aggregate Base Course & Prime Coat Application',
        'Vögele Heavy Asphalt Concrete Paving (Binder & Wearing Course)',
        'Prestressed Girder Bridges, Box Culverts & Riverbed Piling',
        'Stormwater Retention Channels & Retaining Wall Barriers',
        'Road Signage, Retro-reflective Cat Eyes, Thermoplastic Marking',
      ],
      deliverables: 'High-Durability Highways Built for Extreme Axle Loads & All-Weather Transport',
    },
    society: {
      title: 'Housing Society Infrastructure & Town Development',
      subtitle: 'Complete Master Land Leveling, Underground Utilities, Paved Streets & Gated Perimeter',
      image: HERO_IMAGES.societyInfrastructure,
      capabilities: [
        'Master Land Topographical Survey & GPS Earth Grading',
        'Underground High-Density Sewerage Pipeline & Septic Tanks',
        'Overhead & Underground Water Supply Filtration & Reservoirs',
        'Interlocking Concrete Tough-Tile Paver Internal Street Network',
        'Gated Entry Gate Arches, Boundary Walls & Security Watchtowers',
        'Underground Electrification, Street Light Poles & Park Development',
      ],
      deliverables: 'Ready-to-Construct Housing Schemes for Private Developers & Govt Agencies',
    },
    machinery: {
      title: 'Heavy Machinery & Fleet Equipment Rental',
      subtitle: '140+ Unit Fleet of CAT Excavators, Asphalt Pavers, Tandem Rollers & Cranes',
      image: heavyMachineryImg,
      capabilities: [
        'Caterpillar 330D Hydraulic Excavators with Skilled Operators',
        'Vögele Super 1800-3 German Asphalt Paving Units',
        'Dynapac & Hamm 12-18 Ton Vibratory Tandem Rollers',
        'MEKA Automatic Computerized Mobile Batching Plants',
        'SANY 50-Ton Hydraulic Mobile Cranes & Heavy Dumpers',
        'Rapid On-Site Mobilization to any District across Pakistan',
      ],
      deliverables: 'Subcontract Machinery Deployment with On-Site Mechanics & Diesel Support',
    },
  };

  const currentService = serviceDetails[activeTab];

  return (
    <section id="services" className="py-16 md:py-24 bg-slate-950 text-white border-b-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest px-3 py-1 border border-slate-950 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
            Pillars of Engineering
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white font-grotesk tracking-tighter mt-3">
            Our Core Specializations
          </h2>
          <p className="text-slate-300 font-medium text-base mt-2">
            Delivering precision civil engineering across government civic buildings, national road corridors, and modern residential housing societies.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab('building')}
            className={`flex items-center gap-2.5 px-6 py-3 font-black text-xs uppercase tracking-wider border-2 transition-all ${
              activeTab === 'building'
                ? 'bg-amber-400 text-slate-950 border-slate-950 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-400'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Building Construction</span>
          </button>

          <button
            onClick={() => setActiveTab('road')}
            className={`flex items-center gap-2.5 px-6 py-3 font-black text-xs uppercase tracking-wider border-2 transition-all ${
              activeTab === 'road'
                ? 'bg-amber-400 text-slate-950 border-slate-950 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-400'
            }`}
          >
            <Route className="w-4 h-4" />
            <span>Roads &amp; Highways</span>
          </button>

          <button
            onClick={() => setActiveTab('society')}
            className={`flex items-center gap-2.5 px-6 py-3 font-black text-xs uppercase tracking-wider border-2 transition-all ${
              activeTab === 'society'
                ? 'bg-amber-400 text-slate-950 border-slate-950 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-400'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Housing Society Dev</span>
          </button>

          <button
            onClick={() => setActiveTab('machinery')}
            className={`flex items-center gap-2.5 px-6 py-3 font-black text-xs uppercase tracking-wider border-2 transition-all ${
              activeTab === 'machinery'
                ? 'bg-amber-400 text-slate-950 border-slate-950 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-400'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Machinery Rental</span>
          </button>
        </div>

        {/* Selected Service Detail Box */}
        <div className="bg-slate-900 border-2 border-amber-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 lg:grid-cols-12">
          {/* Service Image Column */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full border-b-2 lg:border-b-0 lg:border-r-2 border-slate-800">
            <img
              src={currentService.image}
              alt={currentService.title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-950 border-2 border-amber-400">
              <span className="text-amber-400 text-[10px] font-black uppercase tracking-widest block">Key Deliverable</span>
              <p className="text-white font-bold text-xs mt-0.5">{currentService.deliverables}</p>
            </div>
          </div>

          {/* Details & Capabilities Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white font-grotesk">
                {currentService.title}
              </h3>
              <p className="text-amber-400 font-bold text-sm mt-1 bg-slate-950 p-2 border border-slate-800 inline-block">
                {currentService.subtitle}
              </p>

              <div className="mt-6 pt-6 border-t-2 border-slate-800">
                <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" /> Key Technical Capabilities
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentService.capabilities.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs md:text-sm font-semibold text-slate-200 bg-slate-950/60 p-2 border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t-2 border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                <span>PEC License Grade: </span>
                <span className="font-black text-amber-400 bg-slate-950 px-2 py-0.5 border border-slate-800">C1 No Limit</span>
              </div>

              <button
                onClick={onOpenTenderModal}
                className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 py-3 border-2 border-slate-950 font-black uppercase text-xs tracking-wider shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Inquire for {activeTab === 'road' ? 'Road' : activeTab === 'building' ? 'Building' : activeTab === 'society' ? 'Society' : 'Machinery'} Project</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

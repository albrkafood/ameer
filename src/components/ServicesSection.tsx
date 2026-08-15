import React, { useState } from 'react';
import { HERO_IMAGES, EXPERTISE_LIST, SERVICE_PILLARS, COMPANY_INFO, TRANSLATIONS } from '../data/companyData';
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
  Hammer,
  ShoppingBag,
  Briefcase,
  Sparkles,
  Shield,
  Home,
  GraduationCap,
  HeartPulse,
  Moon,
  Users,
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
  const [activeImageIndex, setActiveImageIndex] = useState<Record<string, number>>({
    building: 0,
    road: 0,
    irrigation: 0,
    society: 0,
    machinery: 0,
  });
  const t = TRANSLATIONS[currentLang];

  const serviceDetails = {
    building: {
      title: 'Building Construction (Government, Commercial & Residential)',
      subtitle: 'Civil High Court Havelian, Hamza Height Complex, Educational Institutions & Turn-Key Facilities',
      images: [
        HERO_IMAGES.modernCivicComplex || HERO_IMAGES.judicialCourt,
        HERO_IMAGES.judicialCourt,
        HERO_IMAGES.buildingConstruction,
      ],
      capabilities: [
        'Civil High Court Complex, Govt Administrative Blocks & Judicial Chambers',
        'Multi-Story Residential Flats (e.g. Hamza Height Complex - PKR 250M)',
        'Earthquake Zone 3/4 Reinforced Cement Concrete (RCC) Structural Frames',
        'Academic Blocks, Govt Middle Schools (e.g. UC Owir Chitral)',
        'High-density Foundation Raft Piling & Structural Steel Works',
        'Granite, Marble Flooring, Acoustic Finishing, Plumbing & Electrical (EE01/04/06)',
      ],
      deliverables: 'Complete Turn-Key Execution from Foundation Excavation to Finishing & Occupancy Handover',
    },
    road: {
      title: 'Road & Highway Infrastructure Construction',
      subtitle: 'PKHA Highway Corridors, Asphalt Black-Topping, PCC Rigid Pavements & Drainage Networks',
      images: [
        HERO_IMAGES.pkhaHighwayAsphalt || HERO_IMAGES.heroBanner,
        HERO_IMAGES.heroBanner,
      ],
      capabilities: [
        'Rehabilitation of PKHA Highway Corridors (Beer Kalinger 7.50 KM & Shahr-e-Tanwal 5.0 KM)',
        'Heavy Asphalt Concrete Paving, Aggregate Base Course & Prime Coat Application',
        'Rigid Plain Cement Concrete (PCC) Road Pavements (TMA Haripur & Pabbi Nowshera)',
        'District Abbottabad Mountain Roads (Banda Pir Khan, Terhana Bala, Maira Madroch)',
        'Prestressed Girder Bridges, Box Culverts, Side Drains & Water Chutes',
        'Road Signage, Retro-reflective Cat Eyes & Thermoplastic Striping',
      ],
      deliverables: 'All-Weather High Durability Roads Engineered for Extreme Axle Loads & Mountain Terrain',
    },
    irrigation: {
      title: 'Irrigation & River Flood Protection Systems',
      subtitle: 'RRM Stone Protection Walls, River Training Structures, Canal Roads & Drainage Channels',
      images: [
        HERO_IMAGES.riverBridge,
      ],
      capabilities: [
        'Construction of 8 Nos Flood Protection Walls across District Haripur (Pkg 1 & 2)',
        'Random Rubble Masonry (RRM) Stone Protection Walls in Dag Basud Pabbi, Nowshera',
        'Embankment Stabilization, Wire Gabion Boxes & Stone Apron Launching',
        'Canal Road Infrastructure (3.0 KM Haripur Canal Inspection Route)',
        'Monsoon Stormwater Runoff Channels & Riverbed Scour Protection',
        'Heavy Boulder Transport & Precision River Toe Wall Foundation Piling',
      ],
      deliverables: 'Heavy Stone & Concrete Flood Barriers Shielding Populations, Agricultural Lands & Canals',
    },
    society: {
      title: 'Housing Schemes & Community Infrastructure',
      subtitle: 'Master Land Grading, Underground Utilities, Interlocking Pavers & Gated Perimeters',
      images: [
        HERO_IMAGES.societyInfrastructure,
        HERO_IMAGES.paradiseHousing,
      ],
      capabilities: [
        'Master Land Topographical Survey & GPS Earth Grading',
        'Underground High-Density Sewerage Pipeline & Septic Drainage Networks',
        'Overhead & Underground Water Supply Filtration & Reservoirs',
        'Interlocking Concrete Tough-Tile Paver Internal Street Network',
        'Gated Entry Gate Arches, Boundary Walls & Security Watchtowers',
        'Underground Electrification, Street Light Poles & Park Development',
      ],
      deliverables: 'Ready-to-Construct Housing Schemes & Residential Complexes for Developers & Owners',
    },
    machinery: {
      title: 'Heavy Machinery & Fleet Equipment Rental',
      subtitle: '140+ Owned Units of CAT Excavators, Asphalt Pavers, Tandem Rollers & Cranes',
      images: [
        heavyMachineryImg,
      ],
      capabilities: [
        'Caterpillar 330D Hydraulic Excavators with Certified Master Operators',
        'Vögele Super 1800-3 German Heavy Asphalt Paving Units',
        'Dynapac & Hamm 12-18 Ton Vibratory Tandem Rollers',
        'MEKA Automatic Computerized Mobile Batching Plants',
        'SANY 50-Ton Hydraulic Mobile Cranes & 3-Axle Heavy Dumpers',
        'Rapid On-Site Mobilization to any District across KPK & Pakistan',
      ],
      deliverables: 'Immediate Equipment Deployment with On-Site Mechanics & Fuel Logistical Support',
    },
  };

  const currentService = serviceDetails[activeTab];
  const currentImgIndex = activeImageIndex[activeTab] || 0;
  const currentImage = currentService.images[currentImgIndex] || currentService.images[0];

  // Helper icon mapper for expertise
  const renderExpertiseIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-5 h-5 text-amber-400" />;
      case 'Route': return <Route className="w-5 h-5 text-amber-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-amber-400" />;
      case 'Users': return <Users className="w-5 h-5 text-amber-400" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-amber-400" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-amber-400" />;
      case 'Moon': return <Moon className="w-5 h-5 text-amber-400" />;
      case 'Home': return <Home className="w-5 h-5 text-amber-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-amber-400" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-amber-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-400" />;
      default: return <CheckCircle2 className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-slate-950 text-white border-b-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest px-3 py-1 border border-slate-950 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
            Engineering Scope &amp; Pillars
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white font-grotesk tracking-tighter mt-3">
            Core Specializations &amp; Services
          </h2>
          <p className="text-slate-300 font-medium text-base mt-2">
            Providing comprehensive construction execution, structural fabrication, procurement resourcing, and professional project management across Pakistan.
          </p>
        </div>

        {/* 4 Official Service Pillars (Page 9 from Profile) */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-amber-400 text-slate-950 px-2.5 py-0.5 text-xs font-black uppercase">
              Our 4 Pillars of Services
            </span>
            <span className="text-xs text-slate-400 uppercase font-mono">
              Comprehensive Capability Lifecycle
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICE_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="bg-slate-900 border-2 border-slate-800 hover:border-amber-400 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
                    <span className="text-amber-400 font-black text-xs uppercase tracking-wider">
                      {pillar.category}
                    </span>
                    <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  </div>
                  <h3 className="text-lg font-black uppercase text-white font-grotesk mb-3">
                    {pillar.title}
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {pillar.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 11 Sectors of Official Expertise Grid (Page 4 from Profile) */}
        <div className="mb-16 pt-12 border-t-2 border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 px-2.5 py-0.5 text-xs font-black uppercase tracking-wider mb-2 border border-slate-950">
                <Sparkles className="w-3.5 h-3.5" /> 11 Core Fields
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase text-white font-grotesk">
                Official Areas of Expertise
              </h3>
            </div>
            <span className="bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs font-mono font-bold text-amber-400 uppercase w-fit">
              From Profile Record
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {EXPERTISE_LIST.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/90 p-4 border border-slate-800 hover:border-amber-400 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="p-2 bg-slate-950 border border-slate-800 w-fit">
                    {renderExpertiseIcon(item.iconName)}
                  </div>
                  <span className="font-mono text-[11px] font-bold text-slate-400">
                    #{item.id < 10 ? `0${item.id}` : item.id}
                  </span>
                </div>
                <h4 className="font-black text-sm uppercase text-white font-grotesk mb-1">
                  {item.name}
                </h4>
                <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Interactive Capability Explorer */}
        <div className="pt-12 border-t-2 border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-black uppercase text-white font-grotesk tracking-tight">
              Interactive Technical Operations Explorer
            </h3>
            <p className="text-xs text-slate-300 font-medium mt-1">
              Select an engineering division to inspect specifications, machinery assignment, and deliverables.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
            <button
              onClick={() => setActiveTab('building')}
              className={`flex items-center gap-2 px-4 md:px-5 py-2.5 font-black text-xs uppercase tracking-wider border-2 transition-all ${
                activeTab === 'building'
                  ? 'bg-amber-400 text-slate-950 border-slate-950 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-400'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Buildings &amp; Courts</span>
            </button>

            <button
              onClick={() => setActiveTab('road')}
              className={`flex items-center gap-2 px-4 md:px-5 py-2.5 font-black text-xs uppercase tracking-wider border-2 transition-all ${
                activeTab === 'road'
                  ? 'bg-amber-400 text-slate-950 border-slate-950 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-400'
              }`}
            >
              <Route className="w-4 h-4" />
              <span>Roads &amp; Highways</span>
            </button>

            <button
              onClick={() => setActiveTab('irrigation')}
              className={`flex items-center gap-2 px-4 md:px-5 py-2.5 font-black text-xs uppercase tracking-wider border-2 transition-all ${
                activeTab === 'irrigation'
                  ? 'bg-amber-400 text-slate-950 border-slate-950 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-400'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Irrigation &amp; Flood Walls</span>
            </button>

            <button
              onClick={() => setActiveTab('society')}
              className={`flex items-center gap-2 px-4 md:px-5 py-2.5 font-black text-xs uppercase tracking-wider border-2 transition-all ${
                activeTab === 'society'
                  ? 'bg-amber-400 text-slate-950 border-slate-950 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-400'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Housing &amp; Communities</span>
            </button>

            <button
              onClick={() => setActiveTab('machinery')}
              className={`flex items-center gap-2 px-4 md:px-5 py-2.5 font-black text-xs uppercase tracking-wider border-2 transition-all ${
                activeTab === 'machinery'
                  ? 'bg-amber-400 text-slate-950 border-slate-950 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-400'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Machinery Fleet Rental</span>
            </button>
          </div>

          {/* Selected Service Detail Box */}
          <div className="bg-slate-900 border-2 border-amber-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 lg:grid-cols-12">
            {/* Service Image Column */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full border-b-2 lg:border-b-0 lg:border-r-2 border-slate-800 flex flex-col justify-between">
              <div className="relative flex-1 min-h-[260px] overflow-hidden bg-slate-950">
                <img
                  key={currentImage}
                  src={currentImage}
                  alt={currentService.title}
                  className="w-full h-full object-cover object-center transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Multiple Image Switcher if available */}
                {currentService.images.length > 1 && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-950/90 p-1 border border-slate-800 backdrop-blur-sm">
                    {currentService.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          setActiveImageIndex((prev) => ({
                            ...prev,
                            [activeTab]: idx,
                          }))
                        }
                        className={`w-7 h-7 border text-[10px] font-black uppercase transition-all flex items-center justify-center ${
                          currentImgIndex === idx
                            ? 'bg-amber-400 text-slate-950 border-white scale-105'
                            : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-amber-400'
                        }`}
                        title={`View Angle ${idx + 1}`}
                      >
                        0{idx + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-950 border-t-2 border-amber-400">
                <span className="text-amber-400 text-[10px] font-black uppercase tracking-widest block">Key Deliverable</span>
                <p className="text-white font-bold text-xs mt-0.5">{currentService.deliverables}</p>
              </div>
            </div>

            {/* Details & Capabilities Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-white font-grotesk">
                  {currentService.title}
                </h3>
                <p className="text-amber-400 font-bold text-xs sm:text-sm mt-1 bg-slate-950 p-2 border border-slate-800 inline-block">
                  {currentService.subtitle}
                </p>

                <div className="mt-6 pt-6 border-t-2 border-slate-800">
                  <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" /> Technical Execution Standards
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentService.capabilities.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-200 bg-slate-950/60 p-2.5 border border-slate-800">
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
                  <span>PEC License: </span>
                  <span className="font-black text-amber-400 bg-slate-950 px-2 py-0.5 border border-slate-800">{COMPANY_INFO.pecLicense}</span>
                </div>

                <button
                  onClick={onOpenTenderModal}
                  className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 py-3 border-2 border-slate-950 font-black uppercase text-xs tracking-wider shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>Submit Tender / RFQ Inquiry</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

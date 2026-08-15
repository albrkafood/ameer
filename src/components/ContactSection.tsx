import React, { useState } from 'react';
import { COMPANY_INFO, FAQ_LIST, TRANSLATIONS } from '../data/companyData';
import { Language } from '../types';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Building,
  Navigation,
} from 'lucide-react';

interface ContactSectionProps {
  currentLang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ currentLang }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const t = TRANSLATIONS[currentLang];

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-slate-950 text-white border-b-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-4">
        {/* Contact Info & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Head Office & Phone Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 px-3 py-1 font-black text-xs uppercase tracking-widest border border-slate-950 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] mb-2">
                <MapPin className="w-4 h-4 text-slate-950" /> Executive Head Office
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase text-white font-grotesk tracking-tighter">
                Get In Touch With Engineers
              </h2>
              <p className="text-slate-300 font-medium text-base mt-2">
                Whether you are a government department issuing a tender BOQ or a private developer initiating a housing society, we are ready to deploy.
              </p>
            </div>

            <div className="bg-slate-900 border-2 border-slate-800 p-6 space-y-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-start gap-3.5">
                <div className="p-3 bg-amber-400 text-slate-950 font-black border border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-widest text-amber-400 bg-slate-950 p-1 border border-slate-800 inline-block mb-1">
                    Islamabad Executive Head Office
                  </h4>
                  <p className="text-xs font-semibold text-slate-200 leading-relaxed">{COMPANY_INFO.headOfficeAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t-2 border-slate-800">
                <div className="p-3 bg-amber-400 text-slate-950 font-black border border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-widest text-amber-400 bg-slate-950 p-1 border border-slate-800 inline-block mb-1">
                    Direct Phone Lines
                  </h4>
                  <div className="text-xs text-amber-400 font-black mt-1 space-y-1">
                    <p><a href={`tel:${COMPANY_INFO.phone1}`} className="hover:underline bg-slate-950 p-1 border border-slate-800 block">{COMPANY_INFO.phone1} (CEO / Direct)</a></p>
                    <p><a href={`tel:${COMPANY_INFO.phone2}`} className="hover:underline bg-slate-950 p-1 border border-slate-800 block">{COMPANY_INFO.phone2} (Chief Engineer)</a></p>
                    <p className="text-slate-300 font-bold uppercase text-[10px]">Landline: {COMPANY_INFO.landline}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t-2 border-slate-800">
                <div className="p-3 bg-amber-400 text-slate-950 font-black border border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-widest text-amber-400 bg-slate-950 p-1 border border-slate-800 inline-block mb-1">
                    Email Inquiries &amp; Tenders
                  </h4>
                  <div className="text-xs font-bold text-slate-200 mt-1 space-y-1">
                    <p>Inquiries: <a href={`mailto:${COMPANY_INFO.email}`} className="text-amber-400 font-black hover:underline">{COMPANY_INFO.email}</a></p>
                    <p>Tenders: <a href={`mailto:${COMPANY_INFO.tenderEmail}`} className="text-amber-400 font-black hover:underline">{COMPANY_INFO.tenderEmail}</a></p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t-2 border-slate-800">
                <div className="p-3 bg-amber-400 text-slate-950 font-black border border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-widest text-amber-400 bg-slate-950 p-1 border border-slate-800 inline-block mb-1">
                    Working Hours
                  </h4>
                  <p className="text-xs font-semibold text-slate-300 mt-1">Monday - Saturday: 8:00 AM - 6:00 PM (Emergency Site Support 24/7)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Visualizer Mockup */}
          <div className="lg:col-span-7 bg-slate-900 border-4 border-amber-400 flex flex-col justify-between relative min-h-[380px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="p-4 bg-slate-950 border-b-2 border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-white font-grotesk">
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>Asmatullah &amp; Brothers Operations Map</span>
              </div>
              <span className="text-[10px] text-slate-950 font-black bg-amber-400 border border-slate-950 px-2 py-0.5 uppercase tracking-wider">
                Nationwide Deployment
              </span>
            </div>

            <div className="p-6 relative z-10 flex-1 flex flex-col justify-center items-center text-center space-y-4">
              <div className="w-16 h-16 bg-amber-400 text-slate-950 font-black border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white font-grotesk">Headquarters &amp; Project Site Offices</h3>
              <p className="text-xs font-medium text-slate-300 max-w-md">
                Active site offices deployed across Islamabad, Peshawar, Swat, Quetta, Mardan, Rawalpindi, and CPEC transport corridors.
              </p>

              <div className="flex flex-wrap justify-center gap-2 text-xs font-bold uppercase pt-2">
                <span className="bg-slate-950 px-3 py-1.5 border border-slate-800 text-slate-200">
                  📍 Islamabad HQ
                </span>
                <span className="bg-slate-950 px-3 py-1.5 border border-slate-800 text-slate-200">
                  📍 Peshawar Branch
                </span>
                <span className="bg-slate-950 px-3 py-1.5 border border-slate-800 text-slate-200">
                  📍 Swat Site Office
                </span>
                <span className="bg-slate-950 px-3 py-1.5 border border-slate-800 text-slate-200">
                  📍 Quetta Regional Office
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-950 border-t-2 border-slate-800 text-center text-xs font-bold uppercase tracking-wider text-slate-300">
              Need site engineers to inspect your plot or road alignment? Call us directly for site visit schedule.
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="pt-12 border-t-2 border-slate-800 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-1.5 bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest px-3 py-1 border border-slate-950 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] mb-2">
              <HelpCircle className="w-4 h-4 text-slate-950" /> Frequently Asked Questions
            </div>
            <h3 className="text-2xl sm:text-4xl font-black uppercase text-white font-grotesk tracking-tight">
              Government Procurement &amp; Contractor FAQs
            </h3>
          </div>

          <div className="space-y-3">
            {FAQ_LIST.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border-2 border-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-black uppercase tracking-wider text-white hover:text-amber-400 transition-colors"
                >
                  <span className="pr-4">{faq.question}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-amber-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                  )}
                </button>

                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs font-medium text-slate-200 leading-relaxed border-t-2 border-slate-800 pt-3 bg-slate-950">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

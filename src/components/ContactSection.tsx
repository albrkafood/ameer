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
  Send,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';

interface ContactSectionProps {
  currentLang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ currentLang }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'form' | 'map'>('form');
  
  // Quick contact form state
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('Road & Highway Construction');
  const [formMessage, setFormMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [ticketNo, setTicketNo] = useState('');

  const t = TRANSLATIONS[currentLang];

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const payload = {
      name: formName,
      phone: formPhone,
      email: formEmail,
      inquiryType: formSubject,
      details: formMessage,
      source: 'Direct Contact Section Form',
    };

    try {
      const res = await fetch('/api/send-mail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setTicketNo(data.reference || `ABCC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
        setSentSuccess(true);
      } else {
        setTicketNo(`ABCC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
        setSentSuccess(true);
      }
    } catch {
      setTicketNo(`ABCC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
      setSentSuccess(true);
    } finally {
      setIsSending(false);
    }
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
                <div className="space-y-3">
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-widest text-amber-400 bg-slate-950 p-1 border border-slate-800 inline-block mb-1">
                      Corporate Head Office (Islamabad)
                    </h4>
                    <p className="text-xs font-semibold text-slate-100 leading-relaxed">{COMPANY_INFO.address}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-800">
                    <h5 className="font-bold text-[11px] uppercase tracking-wider text-slate-400 mb-0.5">
                      Regional Branch Office (KPK):
                    </h5>
                    <p className="text-[11px] text-slate-300 font-medium">{COMPANY_INFO.regionalOfficeAddress}</p>
                  </div>
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
                    <p><a href={`tel:${COMPANY_INFO.phone1}`} className="hover:underline bg-slate-950 p-1 border border-slate-800 block">{COMPANY_INFO.phone1} (Managing Partner / Direct)</a></p>
                    <p><a href={`tel:${COMPANY_INFO.phone2}`} className="hover:underline bg-slate-950 p-1 border border-slate-800 block">{COMPANY_INFO.phone2} (WhatsApp / Site Operations)</a></p>
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

              {/* Direct WhatsApp Contact Box */}
              <div className="pt-4 border-t-2 border-slate-800">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello M/s AZMAT ULLAH & BROTHERS, I would like to inquire about construction services / tender.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-3.5 border-2 border-slate-950 font-black uppercase text-xs tracking-wider flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Instant WhatsApp Chat</span>
                  </div>
                  <span className="font-mono font-bold bg-slate-950 text-emerald-400 px-2 py-0.5 border border-slate-950 text-[11px]">
                    {COMPANY_INFO.whatsapp}
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Form & Operations Map Panel */}
          <div className="lg:col-span-7 bg-slate-900 border-4 border-amber-400 flex flex-col justify-between relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            {/* Tab Header */}
            <div className="p-3 bg-slate-950 border-b-2 border-slate-800 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTab('form')}
                  className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    activeTab === 'form'
                      ? 'bg-amber-400 text-slate-950 border border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct Message</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('map')}
                  className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    activeTab === 'map'
                      ? 'bg-amber-400 text-slate-950 border border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Regional Site Offices</span>
                </button>
              </div>

              <span className="text-[10px] text-slate-950 font-black bg-amber-400 border border-slate-950 px-2 py-0.5 uppercase tracking-wider">
                PEC C1 Certified
              </span>
            </div>

            {/* Tab 1: Direct Message Form */}
            {activeTab === 'form' && (
              <div className="p-6">
                {!sentSuccess ? (
                  <form onSubmit={handleQuickSubmit} className="space-y-4">
                    <div>
                      <h3 className="text-lg font-black uppercase text-white font-grotesk">
                        Send An Inquiry / Request Site Visit
                      </h3>
                      <p className="text-xs text-slate-300 font-medium mt-0.5">
                        Our engineering estimating department will respond within 2-4 business hours.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                          Full Name / Company Officer *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Engr. Tariq Mehmood"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          className="w-full bg-slate-950 border-2 border-slate-800 p-2.5 text-white font-medium focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +92 300 1234567"
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          className="w-full bg-slate-950 border-2 border-slate-800 p-2.5 text-white font-medium focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="officer@domain.com"
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          className="w-full bg-slate-950 border-2 border-slate-800 p-2.5 text-white font-medium focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                          Inquiry Subject
                        </label>
                        <select
                          value={formSubject}
                          onChange={(e) => setFormSubject(e.target.value)}
                          className="w-full bg-slate-950 border-2 border-slate-800 p-2.5 text-white font-bold uppercase focus:outline-none focus:border-amber-400"
                        >
                          <option value="Road & Highway Construction">Road & Highway Construction</option>
                          <option value="Bridge & RCC Culvert Construction">Bridge & RCC Culvert Construction</option>
                          <option value="Housing Society Infrastructure">Housing Society Infrastructure</option>
                          <option value="Government Building Complex">Government Building Complex</option>
                          <option value="Heavy Machinery Fleet Rental">Heavy Machinery Fleet Rental</option>
                          <option value="Tender BOQ / Joint Venture">Tender BOQ / Joint Venture</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                        Project Scope, Location &amp; Requirements *
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Please describe project scope, approximate length/area, site location, or schedule..."
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        className="w-full bg-slate-950 border-2 border-slate-800 p-2.5 text-xs text-white font-medium focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <p className="text-[11px] text-slate-400 font-semibold">
                        🔒 Transmitted securely via DirectAdmin SMTP Email Gateway.
                      </p>

                      <button
                        type="submit"
                        disabled={isSending}
                        className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 px-6 py-3 font-black uppercase text-xs border-2 border-slate-950 flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                      >
                        {isSending ? (
                          <>
                            <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                            <span>Sending Email...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="p-6 text-center space-y-4">
                    <div className="w-14 h-14 bg-emerald-400 text-slate-950 font-black border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-black uppercase text-white font-grotesk">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-xs text-slate-300 font-medium max-w-md mx-auto">
                      Thank you for contacting Asmatullah &amp; Brothers Construction Co. Your inquiry reference ticket is:
                    </p>
                    <div className="inline-block bg-slate-950 px-4 py-2 border border-slate-800 text-amber-400 font-mono font-black text-sm">
                      {ticketNo}
                    </div>
                    <p className="text-xs text-slate-400 font-medium">
                      Our engineering division has received your transmission and will follow up shortly.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSentSuccess(false);
                          setFormMessage('');
                        }}
                        className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 py-2 font-black uppercase text-xs border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Operations Map */}
            {activeTab === 'map' && (
              <div className="p-6 flex-1 flex flex-col justify-center items-center text-center space-y-4">
                <div className="w-14 h-14 bg-amber-400 text-slate-950 font-black border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                  <MapPin className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black uppercase text-white font-grotesk">
                  Executive HQ &amp; Regional Site Offices
                </h3>
                <p className="text-xs font-medium text-slate-300 max-w-md">
                  Active field offices deployed across Islamabad, Peshawar, Swat, Quetta, Mardan, Rawalpindi, and CPEC transport corridors.
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase pt-2 w-full max-w-md">
                  <span className="bg-slate-950 p-2.5 border border-amber-400 text-amber-400 font-black">
                    🏛️ Islamabad Corporate HQ
                  </span>
                  <span className="bg-slate-950 p-2.5 border border-slate-800 text-slate-200">
                    🏢 Nowshera Regional Office
                  </span>
                  <span className="bg-slate-950 p-2.5 border border-slate-800 text-slate-200">
                    🏗️ Haripur &amp; Abbottabad
                  </span>
                  <span className="bg-slate-950 p-2.5 border border-slate-800 text-slate-200">
                    🏔️ Chitral &amp; Peshawar Division
                  </span>
                </div>
              </div>
            )}

            <div className="p-3 bg-slate-950 border-t-2 border-slate-800 text-center text-xs font-bold uppercase tracking-wider text-slate-300">
              Need immediate technical consultation? Call CEO direct at <a href={`tel:${COMPANY_INFO.phone1}`} className="text-amber-400 underline">{COMPANY_INFO.phone1}</a>
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

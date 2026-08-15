/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CompanyOverview } from './components/CompanyOverview';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsPortfolio } from './components/ProjectsPortfolio';
import { EquipmentFleet } from './components/EquipmentFleet';
import { CostCalculator } from './components/CostCalculator';
import { Certifications } from './components/Certifications';
import { ContactSection } from './components/ContactSection';
import { TenderRFQForm } from './components/TenderRFQForm';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isTenderModalOpen, setIsTenderModalOpen] = useState(false);
  const [initialSpecs, setInitialSpecs] = useState('');

  const handleOpenTenderModalWithSpecs = (specs: string) => {
    setInitialSpecs(specs);
    setIsTenderModalOpen(true);
  };

  const handleOpenTenderModal = () => {
    setInitialSpecs('');
    setIsTenderModalOpen(true);
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Sticky Top Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenTenderModal={handleOpenTenderModal}
      />

      {/* Main Hero Banner */}
      <Hero
        currentLang={currentLang}
        onOpenTenderModal={handleOpenTenderModal}
        onScrollToCalculator={() => scrollToId('calculator')}
        onScrollToProjects={() => scrollToId('projects')}
      />

      {/* Company Story & CEO Leadership */}
      <CompanyOverview currentLang={currentLang} />

      {/* Services Breakdown (Buildings, Roads, Housing Societies) */}
      <ServicesSection
        currentLang={currentLang}
        onOpenTenderModal={handleOpenTenderModal}
      />

      {/* Landmark Executed Projects Portfolio */}
      <ProjectsPortfolio
        currentLang={currentLang}
        onOpenTenderModal={handleOpenTenderModal}
      />

      {/* Heavy Machinery Fleet Showcase */}
      <EquipmentFleet
        currentLang={currentLang}
        onOpenTenderModal={handleOpenTenderModal}
      />

      {/* Interactive Project Cost & Timeline Estimator */}
      <CostCalculator
        currentLang={currentLang}
        onOpenTenderModalWithSpecs={handleOpenTenderModalWithSpecs}
      />

      {/* Government Licensing & QA Standards */}
      <Certifications currentLang={currentLang} />

      {/* Office Locations & FAQs */}
      <ContactSection currentLang={currentLang} />

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onOpenTenderModal={handleOpenTenderModal}
      />

      {/* Floating Interactive WhatsApp Direct Support Button */}
      <WhatsAppButton />

      {/* Official Tender Submission / RFQ Modal */}
      <TenderRFQForm
        isOpen={isTenderModalOpen}
        onClose={() => setIsTenderModalOpen(false)}
        initialSpecs={initialSpecs}
        currentLang={currentLang}
      />
    </div>
  );
}

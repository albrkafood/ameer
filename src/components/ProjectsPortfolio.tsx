import React, { useState } from 'react';
import { PROJECTS_LIST, TRANSLATIONS } from '../data/companyData';
import { Language, Project, ServiceCategory } from '../types';
import { ProjectModal } from './ProjectModal';
import {
  Building2,
  Route,
  Compass,
  Filter,
  MapPin,
  ExternalLink,
  Award,
  Calendar,
  Layers,
  Search,
} from 'lucide-react';

interface ProjectsPortfolioProps {
  currentLang: Language;
  onOpenTenderModal: () => void;
}

export const ProjectsPortfolio: React.FC<ProjectsPortfolioProps> = ({
  currentLang,
  onOpenTenderModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const t = TRANSLATIONS[currentLang];

  const filteredProjects = PROJECTS_LIST.filter((p) => {
    const matchesCategory =
      selectedCategory === 'all'
        ? true
        : selectedCategory === 'completed'
        ? p.status === 'Completed'
        : selectedCategory === 'ongoing'
        ? p.status === 'Ongoing'
        : p.category === selectedCategory;

    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-16 md:py-24 bg-slate-950 text-white border-b-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b-2 border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 px-3 py-1 font-black text-xs uppercase tracking-widest border border-slate-950 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] mb-2">
              <Award className="w-4 h-4 text-slate-950" /> Executive Engineering Portfolio
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white font-grotesk tracking-tighter">
              Landmark Executed Projects
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="SEARCH PROJECTS, CLIENTS, ROADS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border-2 border-slate-800 text-white font-bold text-xs pl-9 pr-4 py-3 focus:outline-none focus:border-amber-400 uppercase placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b-2 border-slate-800">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 font-black text-xs uppercase tracking-wider border-2 transition-all ${
              selectedCategory === 'all'
                ? 'bg-amber-400 text-slate-950 border-slate-950 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-400'
            }`}
          >
            All Projects ({PROJECTS_LIST.length})
          </button>

          <button
            onClick={() => setSelectedCategory('building')}
            className={`px-4 py-2 font-black text-xs uppercase tracking-wider border-2 transition-all flex items-center gap-1.5 ${
              selectedCategory === 'building'
                ? 'bg-amber-400 text-slate-950 border-slate-950 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-400'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Buildings
          </button>

          <button
            onClick={() => setSelectedCategory('road')}
            className={`px-4 py-2 font-black text-xs uppercase tracking-wider border-2 transition-all flex items-center gap-1.5 ${
              selectedCategory === 'road'
                ? 'bg-amber-400 text-slate-950 border-slate-950 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-400'
            }`}
          >
            <Route className="w-3.5 h-3.5" />
            Roads &amp; Highways
          </button>

          <button
            onClick={() => setSelectedCategory('society')}
            className={`px-4 py-2 font-black text-xs uppercase tracking-wider border-2 transition-all flex items-center gap-1.5 ${
              selectedCategory === 'society'
                ? 'bg-amber-400 text-slate-950 border-slate-950 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-400'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Housing Societies
          </button>

          <button
            onClick={() => setSelectedCategory('completed')}
            className={`px-4 py-2 font-black text-xs uppercase tracking-wider border-2 transition-all ${
              selectedCategory === 'completed'
                ? 'bg-emerald-400 text-slate-950 border-slate-950 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-400'
            }`}
          >
            Completed
          </button>

          <button
            onClick={() => setSelectedCategory('ongoing')}
            className={`px-4 py-2 font-black text-xs uppercase tracking-wider border-2 transition-all ${
              selectedCategory === 'ongoing'
                ? 'bg-amber-400 text-slate-950 border-slate-950 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-400'
            }`}
          >
            Ongoing
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-slate-900 border-2 border-slate-800 hover:border-amber-400 transition-all duration-300 group cursor-pointer flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950 border-b-2 border-slate-800">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  <span
                    className={`absolute top-3 right-3 px-2.5 py-1 font-black text-[10px] uppercase tracking-widest border border-slate-950 ${
                      project.status === 'Completed'
                        ? 'bg-emerald-400 text-slate-950'
                        : 'bg-amber-400 text-slate-950'
                    }`}
                  >
                    {project.status}
                  </span>

                  <span className="absolute bottom-3 left-3 bg-slate-950 text-amber-400 border border-slate-800 text-[11px] font-black uppercase px-2.5 py-0.5 font-grotesk">
                    {project.contractValue}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <span className="text-amber-400 text-xs font-black uppercase tracking-widest block bg-slate-950 p-1.5 border border-slate-800">
                    Client: {project.client}
                  </span>

                  <h3 className="font-black text-base uppercase text-white font-grotesk group-hover:text-amber-400 transition-colors line-clamp-2 leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-xs font-bold text-slate-300 flex items-center gap-1 uppercase tracking-wide">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </p>

                  <p className="text-xs font-medium text-slate-300 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 bg-slate-950 border-t-2 border-slate-800 mt-3 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
                <span>Handover: {project.completionYear}</span>
                <span className="text-amber-400 font-black group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Technical Specs <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 bg-slate-950 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">No projects matched your filter query.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-amber-400 underline text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Modal Trigger */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenTenderModal={onOpenTenderModal}
        />
      </div>
    </section>
  );
};

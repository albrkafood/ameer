import React, { useState } from 'react';
import { PROJECTS_LIST, TRANSLATIONS, COMPANY_INFO } from '../data/companyData';
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
  Shield,
  CheckCircle2,
  Clock,
  Briefcase,
  ListFilter,
  LayoutGrid,
  Table,
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
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const t = TRANSLATIONS[currentLang];

  const filteredProjects = PROJECTS_LIST.filter((p) => {
    const matchesCategory =
      selectedCategory === 'all'
        ? true
        : selectedCategory === 'completed'
        ? p.status === 'Completed'
        : selectedCategory === 'ongoing'
        ? p.status !== 'Completed'
        : p.category === selectedCategory;

    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.scopeOfWork.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const totalCompletedValue = 'PKR 1,020 Million';
  const totalInProgressValue = 'PKR 372 Million';

  return (
    <section id="projects" className="py-16 md:py-24 bg-slate-950 text-white border-b-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b-2 border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 px-3 py-1 font-black text-xs uppercase tracking-widest border border-slate-950 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] mb-2">
              <Award className="w-4 h-4 text-slate-950" /> Official Project Portfolio (19 Landmark Works)
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white font-grotesk tracking-tighter">
              Projects in Hand &amp; Completed Works
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-medium mt-1">
              Documented track record of 19 government and high-scale private civil engineering projects totaling over <strong className="text-amber-400 font-black">1.39 Billion PKR</strong>.
            </p>
          </div>

          {/* Search Input & View Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="SEARCH PROJECTS, CLIENTS, ROADS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border-2 border-slate-800 text-white font-bold text-xs pl-9 pr-4 py-2.5 focus:outline-none focus:border-amber-400 uppercase placeholder:text-slate-500"
              />
            </div>

            <div className="flex items-center bg-slate-900 border-2 border-slate-800 p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-all ${
                  viewMode === 'grid' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 transition-all ${
                  viewMode === 'table' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
                title="Official Sheet Table View"
              >
                <Table className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b-2 border-slate-800 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 font-black uppercase tracking-wider border-2 transition-all ${
              selectedCategory === 'all'
                ? 'bg-amber-400 text-slate-950 border-slate-950 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-400'
            }`}
          >
            All Works ({PROJECTS_LIST.length})
          </button>

          <button
            onClick={() => setSelectedCategory('road')}
            className={`px-3.5 py-2 font-black uppercase tracking-wider border-2 transition-all flex items-center gap-1.5 ${
              selectedCategory === 'road'
                ? 'bg-amber-400 text-slate-950 border-slate-950 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-400'
            }`}
          >
            <Route className="w-3.5 h-3.5" />
            Roads &amp; Highways (10)
          </button>

          <button
            onClick={() => setSelectedCategory('building')}
            className={`px-3.5 py-2 font-black uppercase tracking-wider border-2 transition-all flex items-center gap-1.5 ${
              selectedCategory === 'building'
                ? 'bg-amber-400 text-slate-950 border-slate-950 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-400'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Courts, Schools &amp; Buildings (4)
          </button>

          <button
            onClick={() => setSelectedCategory('irrigation')}
            className={`px-3.5 py-2 font-black uppercase tracking-wider border-2 transition-all flex items-center gap-1.5 ${
              selectedCategory === 'irrigation'
                ? 'bg-amber-400 text-slate-950 border-slate-950 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-400'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Flood Protection &amp; Walls (3)
          </button>

          <button
            onClick={() => setSelectedCategory('completed')}
            className={`px-3.5 py-2 font-black uppercase tracking-wider border-2 transition-all flex items-center gap-1.5 ${
              selectedCategory === 'completed'
                ? 'bg-emerald-400 text-slate-950 border-slate-950 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-400'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Completed (14)
          </button>

          <button
            onClick={() => setSelectedCategory('ongoing')}
            className={`px-3.5 py-2 font-black uppercase tracking-wider border-2 transition-all flex items-center gap-1.5 ${
              selectedCategory === 'ongoing'
                ? 'bg-amber-400 text-slate-950 border-slate-950 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-400'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            In Progress / Active (05)
          </button>
        </div>

        {/* View Mode: Official Table View */}
        {viewMode === 'table' ? (
          <div className="overflow-x-auto border-2 border-slate-800 bg-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-8">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950 text-slate-300 font-black uppercase tracking-wider border-b-2 border-slate-800">
                  <th className="py-3.5 px-3 w-12 text-center text-amber-400">S.No</th>
                  <th className="py-3.5 px-4">Name of Scheme / Project</th>
                  <th className="py-3.5 px-4">Name of Client / Department</th>
                  <th className="py-3.5 px-4">Scope of Work</th>
                  <th className="py-3.5 px-4 text-right">Cost (Million)</th>
                  <th className="py-3.5 px-4 text-center">Status / Remarks</th>
                  <th className="py-3.5 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200 font-medium">
                {filteredProjects.map((proj) => (
                  <tr
                    key={proj.id}
                    onClick={() => setSelectedProject(proj)}
                    className="hover:bg-slate-800/70 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-3 text-center font-mono font-bold text-amber-400 bg-slate-950/40">
                      {proj.sNo ? (proj.sNo < 10 ? `0${proj.sNo}` : proj.sNo) : '•'}
                    </td>
                    <td className="py-3 px-4 font-black uppercase text-white tracking-wide">
                      {proj.title}
                      <span className="block text-[11px] text-slate-400 font-normal mt-0.5">{proj.location}</span>
                    </td>
                    <td className="py-3 px-4 font-bold text-amber-400">
                      {proj.client}
                    </td>
                    <td className="py-3 px-4 text-slate-300 text-xs max-w-xs">
                      {proj.scopeOfWork}
                    </td>
                    <td className="py-3 px-4 text-right font-black text-amber-400 font-mono text-sm">
                      {proj.contractValue}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 font-black text-[10px] uppercase tracking-wider border border-slate-950 ${
                          proj.status === 'Completed'
                            ? 'bg-emerald-400 text-slate-950'
                            : 'bg-amber-400 text-slate-950'
                        }`}
                      >
                        {proj.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(proj);
                        }}
                        className="p-1.5 bg-slate-950 hover:bg-amber-400 hover:text-slate-950 text-amber-400 border border-slate-800 transition-colors"
                        title="View Details"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="bg-slate-900 border-2 border-slate-800 hover:border-amber-400 transition-all duration-300 group cursor-pointer flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-950 border-b-2 border-slate-800">
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

                    {project.sNo && (
                      <span className="absolute top-3 left-3 bg-slate-950 text-white font-mono text-[10px] font-bold px-2 py-0.5 border border-slate-800">
                        #{project.sNo < 10 ? `0${project.sNo}` : project.sNo}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-2.5">
                    <span className="text-amber-400 text-xs font-black uppercase tracking-widest block bg-slate-950 p-1.5 border border-slate-800 truncate">
                      Client: {project.client}
                    </span>

                    <h3 className="font-black text-base uppercase text-white font-grotesk group-hover:text-amber-400 transition-colors line-clamp-2 leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-xs font-bold text-slate-300 flex items-center gap-1 uppercase tracking-wide">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </p>

                    <div className="bg-slate-950/80 p-2 border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Scope of Work:</span>
                      <p className="text-xs font-bold text-amber-300/90 truncate">
                        {project.scopeOfWork}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-3.5 bg-slate-950 border-t-2 border-slate-800 mt-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
                  <span className="text-[11px] text-slate-400 font-mono">Category: {project.category}</span>
                  <span className="text-amber-400 font-black group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Details <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 bg-slate-950 border border-slate-800">
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

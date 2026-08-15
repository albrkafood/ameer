import React from 'react';
import { Project } from '../types';
import {
  X,
  Building,
  Route,
  Compass,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  ShieldCheck,
  FileText,
  DollarSign,
  Tag,
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenTenderModal: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenTenderModal,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border-4 border-amber-400 max-w-3xl w-full text-white overflow-hidden shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-amber-400 text-slate-950 font-black border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-amber-300 transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Header Banner Image */}
        <div className="relative h-64 sm:h-80 w-full bg-slate-950 border-b-2 border-slate-800">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1 font-black text-xs uppercase tracking-widest border border-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                project.status === 'Completed'
                  ? 'bg-emerald-400 text-slate-950'
                  : project.status === 'Ongoing'
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-blue-400 text-slate-950'
              }`}
            >
              {project.status} Project
            </span>
          </div>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-amber-400 font-black text-xs uppercase tracking-widest block mb-1 bg-slate-950 p-1 border border-slate-800 inline-block">
              Client: {project.client}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white font-grotesk leading-none mt-1">
              {project.title}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-bold uppercase tracking-wide flex items-center gap-1.5 mt-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{project.location}</span>
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Key Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-950 p-4 border-2 border-slate-800 text-xs font-bold uppercase tracking-wider">
            <div className="bg-slate-900 p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Contract Value</span>
              <span className="font-black text-amber-400 text-sm font-grotesk">{project.contractValue}</span>
            </div>
            <div className="bg-slate-900 p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Year / Handover</span>
              <span className="font-black text-white text-sm font-grotesk">{project.completionYear}</span>
            </div>
            <div className="bg-slate-900 p-2.5 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Category</span>
              <span className="font-black text-white text-sm capitalize font-grotesk">{project.category}</span>
            </div>
          </div>

          {/* Scope of Work */}
          {project.scopeOfWork && (
            <div>
              <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-2 bg-slate-950 p-1.5 border border-slate-800 inline-block">
                Official Scope of Work
              </h4>
              <p className="text-amber-400 font-bold text-sm bg-slate-950 p-3 border border-slate-800">
                {project.scopeOfWork}
              </p>
            </div>
          )}

          {/* Description */}
          {project.description && (
            <div>
              <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-2 bg-slate-950 p-1.5 border border-slate-800 inline-block">
                Project Description
              </h4>
              <p className="text-slate-200 text-sm font-medium leading-relaxed mt-1">{project.description}</p>
            </div>
          )}

          {/* Technical Specifications */}
          {project.specifications && project.specifications.length > 0 && (
            <div>
              <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-3 bg-slate-950 p-1.5 border border-slate-800 inline-block">
                Technical Specifications &amp; Parameters
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold">
                {project.specifications.map((spec, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-950 p-3 border border-slate-800 flex justify-between items-center"
                  >
                    <span className="text-slate-400 uppercase text-[10px]">{spec.label}:</span>
                    <span className="font-black text-amber-400 text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-2 bg-slate-950 p-1.5 border border-slate-800 inline-block">
                Engineering Highlights
              </h4>
              <ul className="space-y-2 text-xs font-semibold text-slate-200">
                {project.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-950 p-2 border border-slate-800">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 px-6 py-4 border-t-2 border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-300">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>M/s AZMAT ULLAH &amp; BROTHERS (Govt: Contractor)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 border-2 border-slate-700 text-slate-200 font-black uppercase text-xs hover:border-white transition-all"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenTenderModal();
              }}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 border-2 border-slate-950 font-black uppercase text-xs tracking-wider shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]"
            >
              Similar Project Quotation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

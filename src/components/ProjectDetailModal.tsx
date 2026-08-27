import React from "react";
import { X, Heart, ExternalLink, Github, Sparkles, User, Calendar, Tag } from "lucide-react";
import { Project } from "../types";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onLike: (id: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onLike,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-flex items-center gap-1 rounded-md bg-indigo-600/90 px-2.5 py-1 text-xs font-bold text-white uppercase tracking-wider backdrop-blur-xs mb-2">
              <Sparkles className="h-3 w-3" />
              {project.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-slate-100 bg-slate-50/50 rounded-xl px-4">
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <User className="h-4 w-4 text-indigo-600" />
              <span className="font-semibold">{project.studentName}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500">{project.batch}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => onLike(project.id)}
                className="flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-100 active:scale-95 transition-all cursor-pointer"
              >
                <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                <span>{project.likes} Likes</span>
              </button>
            </div>
          </div>

          {/* Project Detailed Description */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Project Architecture & Overview
            </h3>
            <p className="text-base text-slate-700 leading-relaxed whitespace-pre-line">
              {project.fullDetails || project.description}
            </p>
          </div>

          {/* Tech Stack Tags */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5" />
              Technologies, Software & Frameworks Used
            </h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="rounded-lg bg-indigo-50 border border-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* External links */}
          <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-slate-100">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Open Live Project / Demo</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Github className="h-4 w-4 text-slate-900" />
                <span>View Source Code</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="ml-auto px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

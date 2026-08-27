import React, { useState, useMemo } from "react";
import { Search, Heart, ExternalLink, Plus, Sparkles, Filter, Code2, Palette, Box, Gamepad2, Brain, ArrowUpRight } from "lucide-react";
import { Project } from "../types";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { ProjectSubmitModal } from "./ProjectSubmitModal";

interface PortfolioGalleryProps {
  projects: Project[];
  onLikeProject: (id: string) => void;
  onAddProject: (project: Project) => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  projects,
  onLikeProject,
  onAddProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [submitModalOpen, setSubmitModalOpen] = useState<boolean>(false);

  const categories = [
    { id: "All", label: "All Projects", icon: Sparkles },
    { id: "Web & Full-Stack", label: "Web & Cloud", icon: Code2 },
    { id: "3D & VFX", label: "3D & Unreal VFX", icon: Box },
    { id: "UI/UX Design", label: "UI/UX & Product", icon: Palette },
    { id: "Game Development", label: "Game Dev", icon: Gamepad2 },
    { id: "AI & Data", label: "AI & Data", icon: Brain },
    { id: "Graphic & Motion", label: "Motion Arts", icon: Palette },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="gallery-section" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-md bg-indigo-100 text-indigo-800 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
              <span>Student & Alumni Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Crafted at Dream Crafter Institute
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
              Explore award-winning graduation capstones, real-time 3D environments, SaaS architectures, and design prototypes built by our cohorts.
            </p>
          </div>

          <button
            onClick={() => setSubmitModalOpen(true)}
            className="self-start md:self-auto flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 active:scale-98 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Submit Student Project</span>
          </button>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 whitespace-nowrap px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-indigo-300" : "text-slate-400"}`} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px] sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <Filter className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Projects Found</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              No showcase pieces match your current filter or search criteria. Try selecting "All Projects" or submit a new project!
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs hover:shadow-xl hover:border-indigo-200 transition-all duration-300"
              >
                {/* Thumbnail Container */}
                <div
                  onClick={() => setActiveProject(project)}
                  className="relative h-52 w-full overflow-hidden bg-slate-900 cursor-pointer"
                >
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 rounded-md bg-slate-950/80 backdrop-blur-xs px-2.5 py-1 text-[11px] font-bold text-white uppercase tracking-wider border border-white/10">
                    {project.category}
                  </span>

                  {project.featured && (
                    <span className="absolute top-3 right-3 rounded-md bg-amber-500 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-950 shadow-sm">
                      Spotlight
                    </span>
                  )}

                  {/* Student author badge overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="font-semibold drop-shadow-sm truncate pr-2">
                      by {project.studentName}
                    </span>
                    <span className="text-[11px] text-slate-300 shrink-0">
                      {project.batch}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-5 space-y-3">
                  <h3
                    onClick={() => setActiveProject(project)}
                    className="font-bold text-slate-900 text-lg leading-snug group-hover:text-indigo-600 transition-colors cursor-pointer line-clamp-1"
                  >
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-500">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <button
                      onClick={() => onLikeProject(project.id)}
                      className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Applaud project"
                    >
                      <Heart className="h-4 w-4 fill-rose-500/20 text-rose-500" />
                      <span>{project.likes}</span>
                    </button>

                    <button
                      onClick={() => setActiveProject(project)}
                      className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                    >
                      <span>View Breakdown</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Project Details */}
        <ProjectDetailModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onLike={(id) => onLikeProject(id)}
        />

        {/* Modal for Submitting New Project */}
        <ProjectSubmitModal
          isOpen={submitModalOpen}
          onClose={() => setSubmitModalOpen(false)}
          onSuccess={(newProj) => {
            onAddProject(newProj);
          }}
        />
      </div>
    </section>
  );
};

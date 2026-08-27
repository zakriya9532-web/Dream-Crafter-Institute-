import React, { useState } from "react";
import { X, BookOpen, Clock, CheckCircle2, Award, Sparkles, ArrowRight, ExternalLink, Code2, Box, Palette, Brain } from "lucide-react";
import { INSTITUTE_PROGRAMS } from "../data/programs";
import { ProgramInfo } from "../types";
import { DCI_BRAND } from "../assets/branding";

interface ProgramsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProgramForAdmission: (program: ProgramInfo) => void;
}

export const ProgramsModal: React.FC<ProgramsModalProps> = ({
  isOpen,
  onClose,
  onSelectProgramForAdmission,
}) => {
  const [selectedProgram, setSelectedProgram] = useState<ProgramInfo>(INSTITUTE_PROGRAMS[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900 px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <img
              src={DCI_BRAND.logoUrl}
              alt="Dream Crafter Institute Logo"
              className="h-10 w-10 rounded-xl object-cover ring-2 ring-indigo-400"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-tight">Academic Curriculum & Syllabus Catalog</h3>
                <span className="rounded-full bg-indigo-500/20 text-indigo-300 px-2 py-0.5 text-[10px] font-bold border border-indigo-400/30">
                  Fall 2026 Academic Year
                </span>
              </div>
              <p className="text-xs text-slate-400">Comprehensive course modules, industry toolchains, and career trajectories</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body: Sidebar list + Detail panel */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Programs Sidebar */}
          <div className="w-full md:w-80 border-r border-slate-200 bg-slate-50/70 p-4 overflow-y-auto space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-2 mb-2">
              Select Discipline
            </div>
            {INSTITUTE_PROGRAMS.map((prog) => {
              const isSelected = selectedProgram.id === prog.id;
              return (
                <button
                  key={prog.id}
                  onClick={() => setSelectedProgram(prog)}
                  className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-bold"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider opacity-80">
                      {prog.category}
                    </span>
                    {prog.badge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          isSelected ? "bg-white/20 text-white" : "bg-indigo-50 text-indigo-700"
                        }`}
                      >
                        {prog.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-extrabold mt-1 leading-snug">{prog.name}</div>
                  <div className="text-xs mt-1 opacity-90 flex items-center justify-between">
                    <span>{prog.duration}</span>
                    <span className="font-bold">PKR {prog.feePKR.toLocaleString()}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Program Detailed View */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Banner */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 text-white p-6 shadow-md">
              <div className="relative z-10 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-indigo-500/30 px-2.5 py-1 text-xs font-bold text-indigo-200 ring-1 ring-inset ring-indigo-400/40">
                    Course Code: {selectedProgram.code}
                  </span>
                  <span className="rounded-md bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-300">
                    Duration: {selectedProgram.duration}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {selectedProgram.name}
                </h2>
                <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {selectedProgram.description}
                </p>

                <div className="pt-2 flex items-center gap-4">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Total Tuition Fee</span>
                    <span className="text-2xl font-black text-amber-400">
                      PKR {selectedProgram.feePKR.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      onSelectProgramForAdmission(selectedProgram);
                      onClose();
                    }}
                    className="ml-auto flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-500 transition-colors shadow-lg cursor-pointer"
                  >
                    <span>Apply for This Program</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Curriculum Breakdown */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo-600" />
                <span>Curriculum Modules & Practical Lab Objectives</span>
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {selectedProgram.curriculum.map((mod, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 text-xs sm:text-sm text-slate-800"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs">
                      {idx + 1}
                    </span>
                    <span className="font-medium pt-0.5">{mod}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools and Technologies */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                <span>Industry Toolchain & Software Mastery</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProgram.tools.map((t, idx) => (
                  <span
                    key={idx}
                    className="rounded-xl bg-indigo-50 border border-indigo-200 px-3.5 py-1.5 text-xs font-bold text-indigo-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Career Trajectories */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Award className="h-4 w-4 text-emerald-600" />
                <span>Target Career Roles & Employment Pathways</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedProgram.careerRoles.map((role, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-xl bg-emerald-50/60 border border-emerald-200 p-3 text-xs sm:text-sm text-emerald-950 font-semibold"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span>Official social updates available on:</span>
            <a
              href={DCI_BRAND.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-indigo-600 hover:underline flex items-center gap-1"
            >
              <span>Facebook Page</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <button
            onClick={() => {
              onSelectProgramForAdmission(selectedProgram);
              onClose();
            }}
            className="w-full sm:w-auto rounded-xl bg-indigo-600 px-6 py-2 text-xs sm:text-sm font-bold text-white hover:bg-indigo-700 cursor-pointer shadow-sm"
          >
            Proceed to Admission Form
          </button>
        </div>
      </div>
    </div>
  );
};

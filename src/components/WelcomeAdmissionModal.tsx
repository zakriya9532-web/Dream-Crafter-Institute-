import React, { useState } from "react";
import {
  X,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Phone,
  MapPin,
  CheckCircle2,
  Calendar,
  Languages,
  Code2,
  Palette,
  BookOpen,
  Car,
  User,
  ShieldCheck
} from "lucide-react";
import { DCI_BRAND } from "../assets/branding";
import { DreamCrafterLogo } from "./DreamCrafterLogo";

interface WelcomeAdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourseAndApply: (courseTitle: string) => void;
  onOpenStudentLogin: () => void;
  onOpenSyllabus?: () => void;
}

export const WelcomeAdmissionModal: React.FC<WelcomeAdmissionModalProps> = ({
  isOpen,
  onClose,
  onSelectCourseAndApply,
  onOpenStudentLogin,
  onOpenSyllabus,
}) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  if (!isOpen) return null;

  const handleDismiss = () => {
    if (dontShowAgain) {
      localStorage.setItem("dci_welcome_dismissed", "true");
    }
    onClose();
  };

  const courses = [
    {
      title: "English Language Course",
      badge: "Fluency & Grammar",
      icon: Languages,
      color: "text-indigo-400 bg-indigo-950/60 border-indigo-500/30",
    },
    {
      title: "German Language (A1, A2, B1, B2)",
      badge: "Study Visa & Career",
      icon: Languages,
      color: "text-amber-400 bg-amber-950/60 border-amber-500/30",
    },
    {
      title: "DIT (Diploma in IT - 1 Year)",
      badge: "1-Year Diploma",
      icon: Code2,
      color: "text-sky-400 bg-sky-950/60 border-sky-500/30",
    },
    {
      title: "CIT (Certificate in IT)",
      badge: "Core Foundations",
      icon: Code2,
      color: "text-sky-400 bg-sky-950/60 border-sky-500/30",
    },
    {
      title: "MS Office & Basic Computer",
      badge: "Office Automation",
      icon: Code2,
      color: "text-cyan-400 bg-cyan-950/60 border-cyan-500/30",
    },
    {
      title: "Python & Web Development",
      badge: "Modern Tech",
      icon: Code2,
      color: "text-emerald-400 bg-emerald-950/60 border-emerald-500/30",
    },
    {
      title: "Calligraphy and Painting Classes",
      badge: "Creative Arts",
      icon: Palette,
      color: "text-purple-400 bg-purple-950/60 border-purple-500/30",
    },
    {
      title: "Tuition Classes (PG to F.Sc)",
      badge: "All Subjects",
      icon: BookOpen,
      color: "text-rose-400 bg-rose-950/60 border-rose-500/30",
    },
    {
      title: "Driving Classes (Male & Female)",
      badge: "Certified Training",
      icon: Car,
      color: "text-teal-400 bg-teal-950/60 border-teal-500/30",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl bg-slate-950 rounded-3xl shadow-2xl border-2 border-amber-500/40 text-white overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Ambient Golden Sheen */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Top Header */}
        <div className="relative p-6 sm:p-8 pb-4 text-center border-b border-slate-800/80 space-y-4">
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Announcement"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Luxury Logo Emblem */}
          <div className="flex justify-center">
            <DreamCrafterLogo size="xl" />
          </div>

          <div className="space-y-1.5 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-400/30 uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Admissions Open 2026 • Akora Khattak</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome to Dream Crafter Institute
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Select your desired course to start your instant online admission or access your student portal card.
            </p>
          </div>
        </div>

        {/* Courses Selection Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
              <span>Select a Course for Instant Admission</span>
              <span className="text-amber-400">Click Any Course</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {courses.map((c) => {
                const Icon = c.icon;
                return (
                  <button
                    key={c.title}
                    onClick={() => {
                      handleDismiss();
                      onSelectCourseAndApply(c.title);
                    }}
                    className={`flex items-start gap-2.5 p-3 rounded-2xl border text-left transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer group ${c.color}`}
                  >
                    <div className="p-2 rounded-xl bg-slate-900/80 border border-white/10 shrink-0 group-hover:border-amber-400/50 transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <div className="font-bold text-xs text-white group-hover:text-amber-300 transition-colors truncate">
                        {c.title}
                      </div>
                      <span className="inline-block text-[10px] text-slate-300 font-medium truncate">
                        {c.badge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => {
                handleDismiss();
                onSelectCourseAndApply("English Language Course");
              }}
              className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 py-3.5 px-4 text-sm font-extrabold text-white shadow-xl shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <GraduationCap className="h-4 w-4" />
              <span>Full Online Admission Form</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => {
                handleDismiss();
                onOpenStudentLogin();
              }}
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 py-3.5 px-4 text-sm font-extrabold text-slate-950 shadow-xl shadow-amber-500/20 transition-all cursor-pointer"
            >
              <User className="h-4 w-4" />
              <span>Student & Applicant Login</span>
            </button>
          </div>

          {/* Contact & Address Footer */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <MapPin className="h-4 w-4 text-rose-400 shrink-0" />
              <span className="line-clamp-1">2nd Floor, Usman Plaza, Near Darul Uloom Haqqania, Akora Khattak</span>
            </div>

            <a
              href={`tel:${DCI_BRAND.phone1.replace(/[^0-9]/g, "")}`}
              className="flex items-center gap-1.5 font-bold text-emerald-400 hover:text-emerald-300 transition-colors shrink-0"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Call: {DCI_BRAND.phone1}</span>
            </a>
          </div>
        </div>

        {/* Modal Bottom Footer with Dismiss Option */}
        <div className="p-4 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded border-slate-700 bg-slate-800 text-amber-500 focus:ring-amber-400 h-3.5 w-3.5"
            />
            <span className="text-[11px]">Do not show automatically on next visit</span>
          </label>

          <button
            onClick={handleDismiss}
            className="font-bold text-slate-300 hover:text-white px-3 py-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Enter Portal →
          </button>
        </div>
      </div>
    </div>
  );
};

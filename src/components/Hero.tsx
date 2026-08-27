import React from "react";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Layers,
  Bot,
  GraduationCap,
  Building2,
  BookOpen,
  ExternalLink,
  Phone,
  MapPin,
  Car,
  Languages,
  Code2,
  Palette,
  User
} from "lucide-react";
import { InstituteStats } from "../types";
import { DCI_BRAND } from "../assets/branding";
import { DreamCrafterLogo } from "./DreamCrafterLogo";

interface HeroProps {
  stats: InstituteStats | null;
  onNavigate: (tab: string) => void;
  onOpenConsult: () => void;
  onOpenPrograms?: () => void;
  onOpenStudentLogin?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  stats,
  onNavigate,
  onOpenConsult,
  onOpenPrograms,
  onOpenStudentLogin,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 text-white pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24">
      {/* Decorative background grid and ambient lighting */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-slate-900/80 px-3.5 py-1.5 text-xs font-semibold text-amber-300 backdrop-blur-md">
            <DreamCrafterLogo size="xs" />
            <span>Dream Crafter Institute (Akora Khattak)</span>
          </div>

          <a
            href={DCI_BRAND.facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/40 bg-blue-950/60 px-3 py-1.5 text-xs font-semibold text-blue-300 hover:text-white hover:bg-blue-900/80 transition-colors backdrop-blur-md"
            title="Official Facebook Page"
          >
            <svg className="h-3.5 w-3.5 fill-current text-blue-400" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Official Facebook Page</span>
            <ExternalLink className="h-3 w-3 opacity-80" />
          </a>

          <a
            href={`tel:${DCI_BRAND.phone1.replace(/[^0-9]/g, "")}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/50 px-3 py-1.5 text-xs font-bold text-emerald-300 hover:text-white hover:bg-emerald-900/70 transition-colors backdrop-blur-md"
          >
            <Phone className="h-3.5 w-3.5 text-emerald-400" />
            <span>Call: {DCI_BRAND.phone1}</span>
          </a>
        </div>

        {/* Center Logo Showcase */}
        <div className="flex justify-center mb-4">
          <DreamCrafterLogo size="hero" />
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Dream Crafter Institute
            <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent block text-2xl sm:text-4xl lg:text-5xl mt-2 font-black">
              Languages • Computer • Arts • Tuitions • Driving
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
            Professional training in <strong>English & German (A1-B2)</strong>, <strong>Computer Courses (CIT, DIT, Web, Python, MS Office)</strong>, <strong>Calligraphy & Painting</strong>, <strong>Tuition Classes (PG to F.Sc)</strong>, and certified <strong>Driving Classes (Male & Female)</strong>.
          </p>

          <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900/80 border border-slate-800 px-4 py-2 text-xs sm:text-sm text-slate-300">
            <MapPin className="h-4 w-4 text-rose-400 shrink-0" />
            <span>2nd Floor, Usman Plaza, Near Darul Uloom Haqqania, Akora Khattak</span>
          </div>
        </div>

        {/* Action Button Group */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => onNavigate("admissions")}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <GraduationCap className="h-5 w-5" />
            <span>Online Admission Form</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          {onOpenStudentLogin && (
            <button
              onClick={onOpenStudentLogin}
              className="flex items-center gap-2 rounded-xl border border-amber-500/50 bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3.5 text-sm sm:text-base font-extrabold text-slate-950 shadow-xl shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <User className="h-5 w-5 text-slate-950" />
              <span>Student & ID Portal</span>
            </button>
          )}

          {onOpenPrograms && (
            <button
              onClick={onOpenPrograms}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-5 sm:px-6 py-3.5 text-sm sm:text-base font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition-all cursor-pointer backdrop-blur-sm"
            >
              <BookOpen className="h-5 w-5 text-amber-400" />
              <span>Explore All Courses</span>
            </button>
          )}

          <button
            onClick={() => onNavigate("gallery")}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-3.5 text-sm sm:text-base font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer backdrop-blur-sm"
          >
            <Layers className="h-5 w-5 text-indigo-400" />
            <span>Course Showcase</span>
          </button>

          <button
            onClick={onOpenConsult}
            className="flex items-center gap-2 rounded-xl border border-teal-500/40 bg-teal-950/40 px-5 py-3.5 text-sm sm:text-base font-semibold text-teal-300 hover:bg-teal-900/60 hover:border-teal-400 transition-all cursor-pointer backdrop-blur-sm"
          >
            <Bot className="h-5 w-5 text-teal-400" />
            <span>AI Counselor</span>
          </button>
        </div>

        {/* Key Offerings Feature Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto text-left">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3.5 backdrop-blur-sm space-y-1">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
              <Languages className="h-4 w-4" />
              <span>Languages</span>
            </div>
            <p className="text-xs font-semibold text-white">English Language</p>
            <p className="text-[11px] text-slate-400">German (A1, A2, B1, B2)</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3.5 backdrop-blur-sm space-y-1">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
              <Code2 className="h-4 w-4" />
              <span>Computer</span>
            </div>
            <p className="text-xs font-semibold text-white">CIT & DIT (1-Year)</p>
            <p className="text-[11px] text-slate-400">MS Office, Python & Web</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3.5 backdrop-blur-sm space-y-1">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
              <Palette className="h-4 w-4" />
              <span>Creative Arts</span>
            </div>
            <p className="text-xs font-semibold text-white">Calligraphy Classes</p>
            <p className="text-[11px] text-slate-400">Painting & Sketching</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3.5 backdrop-blur-sm space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <BookOpen className="h-4 w-4" />
              <span>Tuitions</span>
            </div>
            <p className="text-xs font-semibold text-white">PG to Matric</p>
            <p className="text-[11px] text-slate-400">F.Sc (Pre-Med/Eng/ICS)</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3.5 backdrop-blur-sm space-y-1 col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Car className="h-4 w-4" />
              <span>Driving Classes</span>
            </div>
            <p className="text-xs font-semibold text-white">Male & Female</p>
            <p className="text-[11px] text-slate-400">Separate Instructors</p>
          </div>
        </div>

        {/* Contact Banner */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-300 font-medium">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-emerald-400" />
            <span>Helpline: <strong className="text-white">0334-0535660</strong> / <strong className="text-white">0334-2490719</strong></span>
          </div>
          <span className="hidden sm:inline text-slate-600">•</span>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-rose-400" />
            <span>Akora Khattak Campus</span>
          </div>
        </div>
      </div>
    </section>
  );
};


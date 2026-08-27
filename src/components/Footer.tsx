import React from "react";
import {
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  BookOpen,
  GraduationCap,
  Sparkles,
  Building2,
  Car,
  Languages,
  Code2,
  Palette,
  User
} from "lucide-react";
import { DCI_BRAND } from "../assets/branding";
import { DreamCrafterLogo } from "./DreamCrafterLogo";

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenTracker: () => void;
  onOpenAdmin: () => void;
  onOpenPrograms?: () => void;
  onOpenStudentLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenTracker,
  onOpenAdmin,
  onOpenPrograms,
  onOpenStudentLogin,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs sm:text-sm border-t border-slate-800">
      {/* Top Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand & Social Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <DreamCrafterLogo size="md" />
              <div>
                <span className="font-extrabold text-white text-base tracking-tight block">
                  DREAM CRAFTER INSTITUTE
                </span>
                <span className="text-[11px] text-amber-400 font-semibold block leading-tight">
                  Akora Khattak Campus
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              English & German Languages (A1-B2) • Computer Courses (CIT, DIT, Basic Computer, MS Office, Python, Web) • Calligraphy & Painting • Tuitions (PG to F.Sc) • Driving Classes (Male & Female).
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                <span>2nd Floor, Usman Plaza, Near Darul Uloom Haqqania, Akora Khattak</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>0334-0535660 / 0334-2490719</span>
              </div>
            </div>

            {/* Official Facebook Community Feature Card */}
            <div className="rounded-2xl border border-blue-900/60 bg-gradient-to-r from-blue-950/60 to-slate-900 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">Official Facebook Page</div>
                    <div className="text-[10px] text-blue-300">Dream Crafter Institute</div>
                  </div>
                </div>
              </div>

              <a
                href={DCI_BRAND.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-500 transition-colors shadow-xs"
              >
                <span>Visit Facebook Page</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Courses & Programs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate("admissions")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  • English Language Course
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("admissions")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  • German Language (A1, A2, B1, B2)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("admissions")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  • CIT & DIT (1-Year Diploma)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("admissions")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  • Basic Computer & MS Office
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("admissions")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  • Python & Web Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("admissions")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  • Calligraphy and Painting Classes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("admissions")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  • Tuition Classes (PG to F.Sc)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("admissions")}
                  className="hover:text-white transition-colors cursor-pointer text-left text-emerald-400 font-semibold"
                >
                  • Driving Classes (Male & Female)
                </button>
              </li>
            </ul>
          </div>

          {/* Admissions & Tracking */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Admissions & Banking
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate("admissions")}
                  className="hover:text-white transition-colors cursor-pointer text-indigo-300 font-semibold"
                >
                  Online Admission Form
                </button>
              </li>
              {onOpenStudentLogin && (
                <li>
                  <button
                    onClick={onOpenStudentLogin}
                    className="hover:text-amber-200 transition-colors cursor-pointer text-amber-300 font-bold flex items-center gap-1.5"
                  >
                    <User className="h-3 w-3" />
                    <span>Student Portal & ID Card</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={onOpenTracker}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Track Application Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("admissions")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bank Account Details
                </button>
              </li>
              {onOpenPrograms && (
                <li>
                  <button
                    onClick={onOpenPrograms}
                    className="hover:text-white transition-colors cursor-pointer text-slate-300 flex items-center gap-1"
                  >
                    <BookOpen className="h-3 w-3" />
                    <span>View All Syllabi</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-white transition-colors cursor-pointer text-emerald-400"
                >
                  Database Inspector
                </button>
              </li>
            </ul>
          </div>

          {/* Campus Location & Contacts */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Contact & Location
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="rounded-xl bg-slate-900 border border-slate-800 p-3 space-y-1">
                <div className="font-bold text-white text-xs">Dream Crafter Institute</div>
                <div className="text-slate-300 text-[11px]">2nd Floor, Usman Plaza, Near Darul Uloom Haqqania, Akora Khattak</div>
              </div>
              <div className="rounded-xl bg-slate-900 border border-slate-800 p-3 space-y-1">
                <div className="font-bold text-emerald-400 text-xs">Direct Helplines</div>
                <div className="font-mono text-white text-xs font-bold">0334-0535660</div>
                <div className="font-mono text-white text-xs font-bold">0334-2490719</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Dream Crafter Institute (Akora Khattak). All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={DCI_BRAND.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              Facebook: {DCI_BRAND.facebookHandle}
            </a>
            <span>•</span>
            <span className="hover:text-slate-400 transition-colors">0334-0535660</span>
            <span>•</span>
            <span className="hover:text-slate-400 transition-colors">0334-2490719</span>
          </div>
        </div>
      </div>
    </footer>
  );
};


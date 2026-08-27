import React, { useState } from "react";
import {
  Sparkles,
  Menu,
  X,
  Database,
  Search,
  FileText,
  MessageSquare,
  Phone,
  Briefcase,
  GraduationCap,
  BookOpen,
  ExternalLink,
  User
} from "lucide-react";
import { DCI_BRAND } from "../assets/branding";
import { DreamCrafterLogo } from "./DreamCrafterLogo";

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenTracker: () => void;
  onOpenAdmin: () => void;
  onOpenPrograms: () => void;
  onOpenStudentLogin: () => void;
  onOpenWelcome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenTracker,
  onOpenAdmin,
  onOpenPrograms,
  onOpenStudentLogin,
  onOpenWelcome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Overview", icon: Sparkles },
    { id: "gallery", label: "Project Gallery", icon: Briefcase },
    { id: "admissions", label: "Admissions & Bank Details", icon: GraduationCap },
    { id: "chat", label: "Community & AI Counselor", icon: MessageSquare },
    { id: "contact", label: "Campuses & Contact", icon: Phone },
  ];

  const handleNavClick = (id: string) => {
    onTabChange(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md transition-all shadow-xs">
      {/* Top Notification Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 py-1.5 px-3 sm:px-4 text-xs font-medium text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
          {/* Left Announcement */}
          <div className="flex items-center gap-2 overflow-hidden">
            {onOpenWelcome ? (
              <button
                onClick={onOpenWelcome}
                className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 px-2.5 py-0.5 text-[11px] font-bold text-amber-300 ring-1 ring-inset ring-amber-400/40 shrink-0 cursor-pointer transition-colors"
                title="View Admissions Open Notice"
              >
                <Sparkles className="h-3 w-3" />
                <span>Admissions Fall 2026 Open</span>
              </button>
            ) : (
              <span className="inline-flex items-center rounded-full bg-amber-500/20 px-2 py-0.5 text-[11px] font-bold text-amber-300 ring-1 ring-inset ring-amber-400/40 shrink-0">
                Admissions Fall 2026 Open
              </span>
            )}
            <span className="hidden md:inline text-slate-300 truncate">
              English & German (A1-B2) • CIT & DIT • Computer Courses • Calligraphy & Arts • Tuitions (PG to F.Sc) • Driving (Male & Female)
            </span>
          </div>

          {/* Right Links: Phone + Student Login + Facebook + Tracker + Admin Inspector */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 text-[11px]">
            <a
              href={`tel:${DCI_BRAND.phone1.replace(/[^0-9]/g, "")}`}
              className="hidden sm:inline-flex items-center gap-1 text-emerald-300 font-bold hover:text-emerald-200"
            >
              <Phone className="h-3 w-3 text-emerald-400" />
              <span>{DCI_BRAND.phone1}</span>
            </a>

            <span className="hidden sm:inline text-slate-700">|</span>

            {/* Student Login Link */}
            <button
              onClick={onOpenStudentLogin}
              className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-bold bg-amber-500/15 hover:bg-amber-500/25 px-2 py-0.5 rounded-full border border-amber-400/30 cursor-pointer transition-colors"
            >
              <User className="h-3 w-3" />
              <span>Student Login</span>
            </button>

            <span className="hidden sm:inline text-slate-700">|</span>

            {/* Facebook Link */}
            <a
              href={DCI_BRAND.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-1.5 text-indigo-300 hover:text-white transition-colors bg-indigo-900/60 px-2 py-0.5 rounded-full border border-indigo-700/50 font-semibold"
              title="Visit Dream Crafter Institute Official Facebook Page"
            >
              <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
              <ExternalLink className="h-2.5 w-2.5 opacity-70" />
            </a>

            <span className="hidden sm:inline text-slate-700">|</span>

            {/* Track Button */}
            <button
              onClick={onOpenTracker}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <Search className="h-3 w-3 text-amber-400" />
              <span className="hidden sm:inline">Track Status</span>
            </button>

            <span className="text-slate-700">|</span>

            {/* Admin Inspector */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-slate-400 hover:text-indigo-200 transition-colors cursor-pointer"
              title="Database & Admin Manager"
            >
              <Database className="h-3 w-3 text-emerald-400" />
              <span className="hidden lg:inline">DB Inspector</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav Header */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        {/* Brand Logo & Title */}
        <div
          onClick={() => handleNavClick("home")}
          className="flex cursor-pointer items-center gap-2.5 sm:gap-3 group"
        >
          <DreamCrafterLogo size="md" />

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight">
                DREAM CRAFTER
              </span>
              <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-800 border border-amber-200">
                Institute
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 hidden sm:block">
              Akora Khattak • Languages, Computer, Arts, Tuitions & Driving
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-indigo-700 shadow-xs border border-slate-200 font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Student Login Portal Button */}
          <button
            onClick={onOpenStudentLogin}
            className="flex items-center gap-1.5 rounded-xl border border-amber-400/60 bg-gradient-to-r from-amber-500 to-amber-600 px-3.5 py-2 text-xs font-black text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
            title="Access Student Digital Card & Schedule"
          >
            <User className="h-3.5 w-3.5" />
            <span>Student Portal</span>
          </button>

          {/* Academic Syllabus Explorer Button */}
          <button
            onClick={onOpenPrograms}
            className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors cursor-pointer"
            title="Browse full academic syllabi"
          >
            <BookOpen className="h-3.5 w-3.5 text-indigo-600" />
            <span>Courses</span>
          </button>

          {/* Apply Button */}
          <button
            onClick={() => handleNavClick("admissions")}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs sm:text-sm font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 active:scale-98 transition-all cursor-pointer"
          >
            <FileText className="h-4 w-4" />
            <span>Apply Online</span>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenStudentLogin}
            className="rounded-lg bg-amber-500 px-2.5 py-1.5 text-xs font-black text-slate-950 shadow-xs"
          >
            Login
          </button>

          <button
            onClick={() => handleNavClick("admissions")}
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs"
          >
            Apply
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl space-y-2 animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-bold border border-indigo-100"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStudentLogin();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-2.5 text-xs font-black text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-sm"
            >
              <User className="h-4 w-4" />
              <span>Student & Applicant Portal Login</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPrograms();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-200"
            >
              <BookOpen className="h-4 w-4 text-indigo-600" />
              <span>Browse Academic Syllabi & Fees</span>
            </button>

            <a
              href={DCI_BRAND.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white hover:bg-blue-700"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Follow Official Facebook Page</span>
            </a>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTracker();
                }}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Search className="h-3.5 w-3.5 text-slate-500" />
                <span>Track Status</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Database className="h-3.5 w-3.5 text-emerald-600" />
                <span>DB Inspector</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

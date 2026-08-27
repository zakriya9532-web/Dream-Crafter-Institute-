import React from "react";
import {
  GraduationCap,
  User,
  Phone,
  MessageCircle,
  Sparkles,
  ChevronUp
} from "lucide-react";
import { DCI_BRAND } from "../assets/branding";

interface QuickFloatingAdmissionsProps {
  onOpenAdmission: () => void;
  onOpenStudentLogin: () => void;
  onOpenWelcome?: () => void;
}

export const QuickFloatingAdmissions: React.FC<QuickFloatingAdmissionsProps> = ({
  onOpenAdmission,
  onOpenStudentLogin,
  onOpenWelcome,
}) => {
  return (
    <aside aria-label="Quick Admissions and Student Support Actions" className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      {/* Floating Action Menu Bar */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-amber-500/40 shadow-2xl text-white">
        {/* Admissions Button */}
        <button
          onClick={onOpenAdmission}
          className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-3 py-2 text-xs font-extrabold text-white transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
          title="Online Admission Form"
        >
          <GraduationCap className="h-4 w-4" />
          <span className="hidden sm:inline">Apply 2026</span>
          <span className="sm:hidden">Apply</span>
        </button>

        {/* Student Login Button */}
        <button
          onClick={onOpenStudentLogin}
          className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 px-3 py-2 text-xs font-extrabold text-slate-950 transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
          title="Student & Applicant Login"
        >
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">Student Login</span>
          <span className="sm:hidden">Login</span>
        </button>

        {/* Direct Call Button */}
        <a
          href={`tel:${DCI_BRAND.phone1.replace(/[^0-9]/g, "")}`}
          className="flex items-center gap-1 rounded-xl bg-slate-800 hover:bg-slate-700 px-2.5 py-2 text-xs font-bold text-emerald-400 transition-all cursor-pointer"
          title={`Call Helpline: ${DCI_BRAND.phone1}`}
        >
          <Phone className="h-4 w-4" />
          <span className="hidden md:inline text-[11px]">{DCI_BRAND.phone1}</span>
        </a>

        {/* Welcome Announcement Trigger */}
        {onOpenWelcome && (
          <button
            onClick={onOpenWelcome}
            className="flex items-center justify-center rounded-xl p-2 text-amber-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            title="Open Admissions Overview"
          >
            <Sparkles className="h-4 w-4" />
          </button>
        )}
      </div>
    </aside>
  );
};

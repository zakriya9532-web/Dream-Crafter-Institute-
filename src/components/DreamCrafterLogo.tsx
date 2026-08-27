import React from "react";
import { DCI_BRAND } from "../assets/branding";

interface DreamCrafterLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "hero";
  showText?: boolean;
  className?: string;
}

export const DreamCrafterLogo: React.FC<DreamCrafterLogoProps> = ({
  size = "md",
  showText = false,
  className = "",
}) => {
  const sizeMap = {
    xs: "h-7 w-7",
    sm: "h-9 w-9",
    md: "h-11 w-11",
    lg: "h-14 w-14",
    xl: "h-20 w-20",
    hero: "h-24 w-24 sm:h-28 sm:w-28",
  };

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <div className="relative group shrink-0">
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 opacity-40 blur-xs group-hover:opacity-75 transition duration-300"></div>
        <div className={`relative ${sizeMap[size]} rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 border border-amber-400/40 shadow-lg shadow-amber-950/40 flex items-center justify-center p-0.5`}>
          <img
            src={DCI_BRAND.logoUrl}
            alt="Dream Crafter Institute Logo"
            className="h-full w-full object-cover rounded-[10px] sm:rounded-[14px]"
            loading="eager"
          />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
              DREAM CRAFTER
            </span>
            <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-800 border border-amber-200">
              Institute
            </span>
          </div>
          <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 line-clamp-1">
            Akora Khattak • Languages, IT, Arts & Driving
          </p>
        </div>
      )}
    </div>
  );
};

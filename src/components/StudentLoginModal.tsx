import React, { useState } from "react";
import {
  X,
  User,
  Phone,
  Search,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Download,
  Printer,
  Calendar,
  Clock,
  MapPin,
  GraduationCap,
  ShieldCheck,
  CreditCard,
  BookOpen,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Car,
  Languages,
  Code2,
  FileCheck
} from "lucide-react";
import { AdmissionApplication } from "../types";
import { DCI_BRAND } from "../assets/branding";
import { DreamCrafterLogo } from "./DreamCrafterLogo";

interface StudentLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  admissions: AdmissionApplication[];
  onOpenAdmissionForm?: () => void;
  onSelectApplication?: (app: AdmissionApplication) => void;
}

export const StudentLoginModal: React.FC<StudentLoginModalProps> = ({
  isOpen,
  onClose,
  admissions,
  onOpenAdmissionForm,
}) => {
  const [identifier, setIdentifier] = useState("");
  const [currentStudent, setCurrentStudent] = useState<AdmissionApplication | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"card" | "schedule" | "fees" | "support">("card");

  if (!isOpen) return null;

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoginError(null);

    const query = identifier.trim().toLowerCase();
    if (!query) {
      setLoginError("Please enter your Application No (e.g. DCI-2026-1042), Phone No, or Email.");
      return;
    }

    const cleanQueryPhone = query.replace(/[^0-9]/g, "");

    const found = admissions.find((a) => {
      const matchApp = a.applicationNumber.toLowerCase().includes(query);
      const matchEmail = a.email.toLowerCase() === query;
      const cleanStudentPhone = a.phone.replace(/[^0-9]/g, "");
      const matchPhone = cleanQueryPhone.length >= 7 && cleanStudentPhone.includes(cleanQueryPhone);
      const matchName = a.fullName.toLowerCase().includes(query);
      return matchApp || matchEmail || matchPhone || matchName;
    });

    if (found) {
      setCurrentStudent(found);
      setLoginError(null);
    } else {
      // If not in local array, offer helpful advice or create a dynamic view
      setLoginError(
        `No record matching "${identifier}" found. Please check your spelling or apply for new admission below.`
      );
    }
  };

  const handleDemoSelect = (sampleApp: AdmissionApplication) => {
    setCurrentStudent(sampleApp);
    setIdentifier(sampleApp.applicationNumber);
    setLoginError(null);
  };

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-4 sm:p-6 text-white border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DreamCrafterLogo size="md" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg sm:text-xl text-white tracking-tight">
                  Student & Applicant Portal
                </h3>
                <span className="rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 border border-amber-400/30">
                  DCI Portal
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Dream Crafter Institute (Akora Khattak)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {!currentStudent ? (
            /* Login Form View */
            <div className="space-y-6">
              <div className="text-center max-w-md mx-auto space-y-1">
                <h4 className="text-xl font-bold text-slate-900">
                  Student Access & Verification
                </h4>
                <p className="text-xs sm:text-sm text-slate-500">
                  Enter your Application ID (e.g. <strong>DCI-2026-1042</strong>), registered phone number, or email to access your ID Card and Class Schedule.
                </p>
              </div>

              {loginError && (
                <div className="flex items-start gap-2.5 rounded-2xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-800">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold">{loginError}</p>
                    {onOpenAdmissionForm && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenAdmissionForm();
                        }}
                        className="font-bold underline text-rose-900 cursor-pointer"
                      >
                        Click here to fill the Admission Form now →
                      </button>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Application ID / Phone / Email
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. DCI-2026-1042 or 0334-0535660"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="w-full rounded-2xl border-2 border-slate-200 pl-4 pr-12 py-3 text-sm text-slate-900 focus:border-amber-500 focus:outline-none shadow-xs font-medium"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 p-2 font-bold transition-colors cursor-pointer"
                      title="Search & Login"
                    >
                      <Search className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 py-3.5 text-sm font-extrabold text-amber-400 hover:text-amber-300 shadow-lg shadow-slate-950/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer border border-amber-500/30"
                >
                  <User className="h-4 w-4" />
                  <span>Access Student Dashboard</span>
                </button>
              </form>

              {/* Demo Sample Logins */}
              {admissions.length > 0 && (
                <div className="border-t border-slate-200 pt-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-bold uppercase tracking-wider">
                      Quick Demo Student Accounts
                    </span>
                    <span>Click any to test instant login</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {admissions.slice(0, 4).map((adm) => (
                      <button
                        key={adm.id}
                        onClick={() => handleDemoSelect(adm)}
                        className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-amber-50/60 border border-slate-200 hover:border-amber-300 transition-all text-left group cursor-pointer"
                      >
                        <div className="space-y-0.5 truncate">
                          <div className="text-xs font-bold text-slate-900 group-hover:text-amber-900 truncate">
                            {adm.fullName}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">
                            {adm.program} • {adm.applicationNumber}
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-amber-600 shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Helplines and New Admission Info */}
              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="text-slate-600 text-center sm:text-left">
                  Haven't applied yet? Spring/Fall 2026 Admissions are Open!
                </div>
                {onOpenAdmissionForm && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenAdmissionForm();
                    }}
                    className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition-colors shrink-0 cursor-pointer"
                  >
                    Open Admission Form
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Logged In Dashboard View */
            <div className="space-y-6">
              {/* Profile Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-amber-500/20 text-amber-700 font-extrabold flex items-center justify-center text-lg border border-amber-400/40">
                    {currentStudent.fullName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">
                      {currentStudent.fullName}
                    </h4>
                    <p className="text-xs font-mono font-bold text-indigo-700">
                      {currentStudent.applicationNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-bold border ${
                      currentStudent.admissionStatus === "Approved"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}
                  >
                    Status: {currentStudent.admissionStatus}
                  </span>

                  <button
                    onClick={() => setCurrentStudent(null)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Switch Account
                  </button>
                </div>
              </div>

              {/* Dashboard Sub-Tabs */}
              <div className="flex items-center gap-1 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold">
                <button
                  onClick={() => setActiveTab("card")}
                  className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeTab === "card"
                      ? "bg-slate-900 text-amber-400 font-extrabold shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <GraduationCap className="h-4 w-4" />
                  <span>Digital Student ID</span>
                </button>

                <button
                  onClick={() => setActiveTab("schedule")}
                  className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeTab === "schedule"
                      ? "bg-slate-900 text-amber-400 font-extrabold shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Clock className="h-4 w-4" />
                  <span>Class Timetable</span>
                </button>

                <button
                  onClick={() => setActiveTab("fees")}
                  className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeTab === "fees"
                      ? "bg-slate-900 text-amber-400 font-extrabold shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Fee & Payment</span>
                </button>

                <button
                  onClick={() => setActiveTab("support")}
                  className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeTab === "support"
                      ? "bg-slate-900 text-amber-400 font-extrabold shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <FileCheck className="h-4 w-4" />
                  <span>Materials & Help</span>
                </button>
              </div>

              {/* Tab 1: Digital Student ID Card */}
              {activeTab === "card" && (
                <div className="space-y-4">
                  <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 sm:p-7 text-white shadow-2xl border-2 border-amber-500/40 overflow-hidden">
                    {/* Golden decorative accent */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-500/30 pb-4">
                      <div className="flex items-center gap-3">
                        <DreamCrafterLogo size="md" />
                        <div>
                          <h5 className="font-black text-lg text-white tracking-wide">
                            DREAM CRAFTER INSTITUTE
                          </h5>
                          <p className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                            Akora Khattak Campus • Official Student Card
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="rounded-full bg-amber-400 text-slate-950 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
                          2026 VALID
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                      <div className="sm:col-span-8 space-y-2.5">
                        <div>
                          <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
                            Student Name
                          </span>
                          <span className="text-lg font-black text-amber-300">
                            {currentStudent.fullName}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
                              Enrolled Program
                            </span>
                            <span className="font-bold text-white">
                              {currentStudent.program}
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
                              Assigned Shift
                            </span>
                            <span className="font-bold text-white capitalize">
                              {currentStudent.shift} Shift
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
                              Roll / App ID
                            </span>
                            <span className="font-mono font-bold text-amber-300">
                              {currentStudent.applicationNumber}
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
                              Contact Phone
                            </span>
                            <span className="font-mono text-slate-300">
                              {currentStudent.phone}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="sm:col-span-4 flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                        <QrCode className="h-16 w-16 text-amber-300 mb-1" />
                        <span className="text-[9px] font-mono text-slate-300 font-bold uppercase">
                          DCI VERIFIED
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                      <span>2nd Floor, Usman Plaza, Akora Khattak</span>
                      <span>Helpline: 0334-0535660</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={handlePrintCard}
                      className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-amber-400 hover:bg-slate-800 transition-colors shadow-sm cursor-pointer border border-amber-500/30"
                    >
                      <Printer className="h-4 w-4" />
                      <span>Print Student Card</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: Class Timetable & Schedule */}
              {activeTab === "schedule" && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <Clock className="h-4 w-4 text-indigo-600" />
                      <span>Batch Schedule & Campus Timings</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                        <span className="font-bold text-slate-800 block">Morning Shift</span>
                        <span className="text-indigo-600 font-bold block">09:00 AM – 11:30 AM</span>
                        <span className="text-slate-500 text-[11px] block">Monday to Saturday • Room 204</span>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                        <span className="font-bold text-slate-800 block">Evening Shift</span>
                        <span className="text-indigo-600 font-bold block">04:00 PM – 06:30 PM</span>
                        <span className="text-slate-500 text-[11px] block">Monday to Saturday • Lab 1</span>
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center gap-2 text-slate-800 font-bold">
                        <MapPin className="h-4 w-4 text-rose-500" />
                        <span>Campus Venue</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        2nd Floor, Usman Plaza, Near Darul Uloom Haqqania, Akora Khattak.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Fee & Payment Status */}
              {activeTab === "fees" && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700">Course:</span>
                      <span className="font-bold text-slate-900">{currentStudent.program}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700">Payment Status:</span>
                      <span className="rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 font-bold">
                        {currentStudent.paymentStatus}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700">Calculated Fee:</span>
                      <span className="font-black text-slate-900">PKR {currentStudent.feeAmount.toLocaleString()}</span>
                    </div>

                    {currentStudent.scholarshipCode && (
                      <div className="flex items-center justify-between text-emerald-700 font-semibold">
                        <span>Scholarship Coupon ({currentStudent.scholarshipCode}):</span>
                        <span>-PKR {(currentStudent.discountApplied || 0).toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200 font-extrabold text-sm text-slate-900">
                      <span>Net Payable:</span>
                      <span className="text-indigo-700">PKR {(currentStudent.feeAmount - (currentStudent.discountApplied || 0)).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3.5 text-xs text-amber-900 space-y-1">
                    <div className="font-bold">Official Bank & EasyPaisa Accounts</div>
                    <div>Meezan Bank: <strong>01030104992837</strong></div>
                    <div>EasyPaisa / JazzCash: <strong>0334-0535660</strong></div>
                  </div>
                </div>
              )}

              {/* Tab 4: Materials & Help */}
              {activeTab === "support" && (
                <div className="space-y-3 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-indigo-600" />
                      <span>Course Materials & Syllabus</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Download class presentations, assignment guidelines, and software toolkits directly from the institute library.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-emerald-600" />
                      <span>Admissions Coordinator Helpline</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Need to switch batch shift or require document attestation? Call <strong>0334-0535660</strong> or <strong>0334-2490719</strong>.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

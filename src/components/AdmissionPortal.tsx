import React, { useState } from "react";
import {
  FileCheck,
  Building2,
  Search,
  Upload,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  FileText,
  Percent,
  ExternalLink,
  BookOpen
} from "lucide-react";
import { ProgramInfo, BankAccount, AdmissionApplication } from "../types";
import { INSTITUTE_PROGRAMS } from "../data/programs";
import { ApplicationSlipModal } from "./ApplicationSlipModal";
import { DCI_BRAND } from "../assets/branding";

interface AdmissionPortalProps {
  bankDetails: BankAccount[];
  onSubmitAdmission: (data: Partial<AdmissionApplication>) => Promise<AdmissionApplication>;
  onTrackAdmission: (query: string) => Promise<AdmissionApplication>;
  onOpenConsult: () => void;
  onOpenPrograms?: () => void;
}

export const AdmissionPortal: React.FC<AdmissionPortalProps> = ({
  bankDetails,
  onSubmitAdmission,
  onTrackAdmission,
  onOpenConsult,
  onOpenPrograms,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"apply" | "bank-info" | "track">("apply");

  // Step state for multi-step form (1: Select Program, 2: Personal Info, 3: Bank & Slip)
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [selectedProgram, setSelectedProgram] = useState<ProgramInfo>(INSTITUTE_PROGRAMS[0]);
  const [shift, setShift] = useState<"Morning" | "Evening" | "Weekend (Online)">("Morning");
  
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "Male",
    cnicOrPassport: "",
    address: "",
    city: "",
    priorExperience: "Beginner",
    portfolioUrl: "",
  });

  const [scholarshipCode, setScholarshipCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [scholarshipMessage, setScholarshipMessage] = useState<string | null>(null);

  const [paymentInfo, setPaymentInfo] = useState({
    bankNameUsed: bankDetails[0]?.bankName || "Meezan Bank Ltd",
    transactionRef: "",
    paymentDate: new Date().toISOString().split("T")[0],
    depositSlipDataUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Tracking state
  const [trackQuery, setTrackQuery] = useState("");
  const [trackLoading, setTrackLoading] = useState(false);
  const [trackResult, setTrackResult] = useState<AdmissionApplication | null>(null);
  const [trackError, setTrackError] = useState<string | null>(null);

  // Success Slip Modal
  const [createdAdmission, setCreatedAdmission] = useState<AdmissionApplication | null>(null);
  const [slipModalOpen, setSlipModalOpen] = useState(false);

  // Copy indicator state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleApplyScholarship = () => {
    const code = scholarshipCode.trim().toUpperCase();
    if (!code) {
      setScholarshipMessage("Please enter a valid scholarship promo code.");
      return;
    }
    if (code === "EARLY2026" || code === "DREAM30") {
      setDiscountPercent(30);
      setScholarshipMessage("30% Early Admittance & Merit Grant Applied successfully!");
    } else if (code === "CREATIVE15" || code === "DCI15") {
      setDiscountPercent(15);
      setScholarshipMessage("15% Creative Portfolio Grant Applied successfully!");
    } else if (code === "WOMENINTECH" || code === "FUTURE20") {
      setDiscountPercent(20);
      setScholarshipMessage("20% Women in Creative Tech Grant Applied!");
    } else {
      setDiscountPercent(0);
      setScholarshipMessage("Invalid or expired scholarship code. Check our Facebook page for active promo codes.");
    }
  };

  const baseFee = selectedProgram.feePKR;
  const discountAmount = (baseFee * discountPercent) / 100;
  const netTotal = baseFee - discountAmount;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormError("The file size exceeds the 5MB limit. Please upload a smaller screenshot or PDF.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setPaymentInfo({ ...paymentInfo, depositSlipDataUrl: reader.result as string });
        setFormError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitAdmission = async () => {
    if (!paymentInfo.transactionRef.trim()) {
      setFormError("Please enter your Bank Transaction ID or Reference Number.");
      return;
    }

    setLoading(true);
    setFormError(null);

    try {
      const payload: Partial<AdmissionApplication> = {
        fullName: personalInfo.fullName,
        email: personalInfo.email,
        phone: personalInfo.phone,
        gender: personalInfo.gender,
        cnicOrPassport: personalInfo.cnicOrPassport || "N/A",
        address: personalInfo.address || "N/A",
        city: personalInfo.city || "Online / Nationwide",
        program: selectedProgram.name,
        shift: shift,
        priorExperience: personalInfo.priorExperience,
        portfolioUrl: personalInfo.portfolioUrl,
        tuitionFee: baseFee,
        discountAmount: discountAmount,
        totalPayable: netTotal,
        paymentMethod: "Bank Transfer (1Link/IBFT/Raast)",
        bankNameUsed: paymentInfo.bankNameUsed,
        transactionRef: paymentInfo.transactionRef,
        paymentDate: paymentInfo.paymentDate,
        depositSlipDataUrl: paymentInfo.depositSlipDataUrl,
      };

      const result = await onSubmitAdmission(payload);
      setCreatedAdmission(result);
      setSlipModalOpen(true);
      
      // Reset form
      setStep(1);
      setPersonalInfo({
        fullName: "",
        email: "",
        phone: "",
        gender: "Male",
        cnicOrPassport: "",
        address: "",
        city: "",
        priorExperience: "Beginner",
        portfolioUrl: "",
      });
      setPaymentInfo({
        bankNameUsed: bankDetails[0]?.bankName || "Meezan Bank Ltd",
        transactionRef: "",
        paymentDate: new Date().toISOString().split("T")[0],
        depositSlipDataUrl: "",
      });
      setScholarshipCode("");
      setDiscountPercent(0);
      setScholarshipMessage(null);
    } catch (err: any) {
      setFormError(err.message || "Failed to submit admission application. Please verify details.");
    } finally {
      setLoading(false);
    }
  };

  const handleTrackLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;

    setTrackLoading(true);
    setTrackError(null);
    setTrackResult(null);

    try {
      const res = await onTrackAdmission(trackQuery.trim());
      setTrackResult(res);
    } catch (err: any) {
      setTrackError(err.message || "No matching application record found. Please verify your Application ID or Email.");
    } finally {
      setTrackLoading(false);
    }
  };

  return (
    <section id="admissions-section" className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-bold text-indigo-800 uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4 text-indigo-600" />
            <span>Official Admissions & Financial Settlement</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Online Admission Portal & Bank Verification
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Enroll directly in Dream Crafter Institute programs. Pay through verified scheduled banking channels and instantly receive your official digitally signed student voucher.
          </p>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-full">
            <button
              onClick={() => setActiveSubTab("apply")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeSubTab === "apply"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <FileCheck className="h-4 w-4" />
              <span>Online Admission Form</span>
            </button>

            <button
              onClick={() => setActiveSubTab("bank-info")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeSubTab === "bank-info"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>Official Bank Accounts (IBANs)</span>
            </button>

            <button
              onClick={() => setActiveSubTab("track")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeSubTab === "track"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Search className="h-4 w-4" />
              <span>Track Application Status</span>
            </button>
          </div>
        </div>

        {/* TAB 1: ONLINE ADMISSION FORM */}
        {activeSubTab === "apply" && (
          <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
            {/* Step Wizard Progress Bar */}
            <div className="bg-slate-900 text-white p-4 sm:p-6">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                      step >= 1 ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    1
                  </div>
                  <span className="text-xs sm:text-sm font-semibold hidden sm:inline">Program & Shift</span>
                </div>
                <div className="h-0.5 w-12 sm:w-20 bg-slate-800" />
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                      step >= 2 ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    2
                  </div>
                  <span className="text-xs sm:text-sm font-semibold hidden sm:inline">Candidate Information</span>
                </div>
                <div className="h-0.5 w-12 sm:w-20 bg-slate-800" />
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                      step >= 3 ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    3
                  </div>
                  <span className="text-xs sm:text-sm font-semibold hidden sm:inline">Bank Transfer & Voucher</span>
                </div>
              </div>
            </div>

            {formError && (
              <div className="m-6 flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-200 p-4 text-sm text-rose-700">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* STEP 1: Select Program & Shift */}
            {step === 1 && (
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Step 1: Choose Your Creative Program</h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Select the discipline you want to specialize in for the Fall 2026 academic cohort.
                    </p>
                  </div>
                  {onOpenPrograms && (
                    <button
                      type="button"
                      onClick={onOpenPrograms}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 self-start sm:self-auto"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>View Full Syllabi & Modules</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {INSTITUTE_PROGRAMS.map((prog) => {
                    const isSelected = selectedProgram.id === prog.id;
                    return (
                      <div
                        key={prog.id}
                        onClick={() => setSelectedProgram(prog)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? "border-indigo-600 bg-indigo-50/40 shadow-sm"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                            {prog.name}
                          </h4>
                          {prog.badge && (
                            <span className="rounded bg-indigo-100 text-indigo-800 px-2 py-0.5 text-[10px] font-bold uppercase shrink-0">
                              {prog.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{prog.description}</p>
                        <div className="mt-3 flex items-center justify-between text-xs font-semibold pt-2 border-t border-slate-100">
                          <span className="text-slate-600">{prog.duration}</span>
                          <span className="text-indigo-700 font-extrabold text-sm">
                            PKR {prog.feePKR.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Shift Selection */}
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Preferred Cohort Shift *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "Morning", label: "Morning Studio", time: "9:00 AM - 1:00 PM (On Campus)" },
                      { id: "Evening", label: "Evening Masterclass", time: "5:00 PM - 9:00 PM (On Campus)" },
                      { id: "Weekend (Online)", label: "Weekend Interactive", time: "Sat & Sun Live Labs + LMS" },
                    ].map((s) => (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => setShift(s.id as any)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          shift === s.id
                            ? "border-indigo-600 bg-indigo-50 text-indigo-900 font-bold shadow-xs"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <div className="text-sm font-bold">{s.label}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{s.time}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Next Button */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={onOpenConsult}
                    className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-teal-700 hover:text-teal-800"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Unsure which program fits? Ask AI Counselor</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 cursor-pointer shadow-md"
                  >
                    <span>Proceed to Candidate Info</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Candidate Info */}
            {step === 2 && (
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Step 2: Candidate Information</h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Provide accurate identity and contact details for official registration and student verification.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muhammad Zafar"
                      value={personalInfo.fullName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="zafar@example.com"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Gender
                    </label>
                    <select
                      value={personalInfo.gender}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other / Prefer not to specify</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      CNIC / Passport / B-Form
                    </label>
                    <input
                      type="text"
                      placeholder="42101-XXXXXXX-X"
                      value={personalInfo.cnicOrPassport}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, cnicOrPassport: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      City of Residence
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Karachi, Lahore, Islamabad, or Overseas"
                      value={personalInfo.city}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Portfolio / GitHub / Behance (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://behance.net/..."
                      value={personalInfo.portfolioUrl}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, portfolioUrl: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Nav Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Programs</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!personalInfo.fullName.trim() || !personalInfo.email.trim() || !personalInfo.phone.trim()) {
                        setFormError("Please fill in your Full Legal Name, Email Address, and Phone Number.");
                        return;
                      }
                      setFormError(null);
                      setStep(3);
                    }}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 cursor-pointer shadow-md"
                  >
                    <span>Proceed to Bank Transfer & Slip</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Bank Details, Fee Calculation & Slip Upload */}
            {step === 3 && (
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Step 3: Bank Payment & Deposit Slip Submission</h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Transfer the tuition fee to any official Dream Crafter Institute account and upload the transaction receipt or reference ID.
                  </p>
                </div>

                {/* Selected Program & Fee Summary Banner */}
                <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 sm:p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold uppercase text-indigo-700">Selected Program</div>
                      <div className="text-base font-bold text-slate-900">{selectedProgram.name}</div>
                      <div className="text-xs text-slate-600">{shift} Shift • {selectedProgram.duration}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500">Standard Tuition</div>
                      <div className="text-xl font-black text-indigo-950">PKR {baseFee.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Scholarship Code Input */}
                  <div className="pt-3 border-t border-indigo-200/60 flex flex-col sm:flex-row items-center gap-2">
                    <div className="relative flex-1 w-full">
                      <input
                        type="text"
                        placeholder="Enter Scholarship Code (e.g. EARLY2026, DREAM30, DCI15)"
                        value={scholarshipCode}
                        onChange={(e) => setScholarshipCode(e.target.value)}
                        className="w-full rounded-xl border border-indigo-200 bg-white px-3.5 py-2 text-xs sm:text-sm uppercase font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyScholarship}
                      className="w-full sm:w-auto rounded-xl bg-indigo-700 px-4 py-2 text-xs sm:text-sm font-bold text-white hover:bg-indigo-800 transition-colors cursor-pointer"
                    >
                      Apply Code
                    </button>
                  </div>

                  {scholarshipMessage && (
                    <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>{scholarshipMessage}</span>
                    </div>
                  )}

                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between pt-2 text-sm font-bold text-emerald-800 border-t border-emerald-200/80">
                      <span>Scholarship Grant Discount:</span>
                      <span>- PKR {discountAmount.toLocaleString()} ({discountPercent}%)</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 text-base sm:text-lg font-extrabold text-slate-900 border-t border-indigo-200">
                    <span>Net Payable Tuition Fee:</span>
                    <span className="text-indigo-900 font-mono">PKR {netTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Bank Details Selector Cards */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Building2 className="h-4 w-4 text-indigo-600" />
                      <span>Authorized Institute Bank Accounts</span>
                    </label>
                    <span className="text-[11px] text-slate-500">Select target bank for transfer</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {bankDetails.map((bank, idx) => {
                      const isSelected = paymentInfo.bankNameUsed === bank.bankName;
                      return (
                        <div
                          key={idx}
                          onClick={() => setPaymentInfo({ ...paymentInfo, bankNameUsed: bank.bankName })}
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-2 ${
                            isSelected
                              ? "border-indigo-600 bg-indigo-50/50 shadow-sm"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs sm:text-sm text-slate-900">{bank.bankName}</span>
                            {isSelected && <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" />}
                          </div>
                          
                          <div className="text-[11px] text-slate-600 space-y-1 font-mono">
                            <div>
                              <span className="text-slate-400">Account: </span>
                              <span className="font-bold text-slate-800">{bank.accountNumber}</span>
                            </div>
                            <div className="truncate" title={bank.iban}>
                              <span className="text-slate-400">IBAN: </span>
                              <span className="text-slate-700">{bank.iban}</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(bank.iban, `iban-${idx}`);
                            }}
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 hover:text-indigo-800 bg-white border border-indigo-200 px-2 py-0.5 rounded-md"
                          >
                            {copiedKey === `iban-${idx}` ? (
                              <>
                                <Check className="h-3 w-3 text-emerald-600" />
                                <span className="text-emerald-600">IBAN Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Copy IBAN</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Payment Reference & Slip Upload Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Bank Transaction ID / Reference (UTR) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MEZN-TX-892401 or HBL-991283"
                      value={paymentInfo.transactionRef}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, transactionRef: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-mono text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Payment Transfer Date
                    </label>
                    <input
                      type="date"
                      value={paymentInfo.paymentDate}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, paymentDate: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Upload Slip Drag & Drop Area */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Upload Bank Transfer Screenshot / Deposit Slip (Optional)
                  </label>
                  <div className="relative border-2 border-dashed border-slate-300 hover:border-indigo-400 rounded-2xl p-4 sm:p-6 text-center bg-slate-50/50 transition-colors">
                    {paymentInfo.depositSlipDataUrl ? (
                      <div className="flex flex-col items-center space-y-2">
                        <img
                          src={paymentInfo.depositSlipDataUrl}
                          alt="Uploaded Bank Slip"
                          className="h-28 rounded-lg object-contain shadow-xs border border-slate-200"
                        />
                        <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Deposit Slip Attached Successfully</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setPaymentInfo({ ...paymentInfo, depositSlipDataUrl: "" })}
                          className="text-xs text-rose-600 hover:underline cursor-pointer"
                        >
                          Remove and upload a different image
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="mx-auto h-8 w-8 text-slate-400" />
                        <div className="text-xs text-slate-600">
                          <label className="cursor-pointer font-bold text-indigo-600 hover:text-indigo-700">
                            <span>Upload a screenshot</span>
                            <input
                              type="file"
                              accept="image/*,.pdf"
                              onChange={handleFileUpload}
                              className="sr-only"
                            />
                          </label>
                          <span> or drag and drop</span>
                        </div>
                        <p className="text-[11px] text-slate-400">PNG, JPG, or PDF up to 5MB</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Nav Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Candidate Info</span>
                  </button>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleSubmitAdmission}
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-3 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-50 transition-all cursor-pointer shadow-lg shadow-emerald-600/20"
                  >
                    {loading ? (
                      <span>Verifying & Generating Voucher...</span>
                    ) : (
                      <>
                        <ShieldCheck className="h-5 w-5" />
                        <span>Submit Admission Application</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BANK DETAILS SITE & IBANS */}
        {activeSubTab === "bank-info" && (
          <div className="mx-auto max-w-5xl space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-900 text-white p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4" />
                <span>Authorized Financial Accounts</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Official Bank Transfer & Settlement Accounts
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
                Dream Crafter Institute operates strictly through scheduled, regulated banking institutions. Always verify the Account Title before confirming any inter-bank transfer (IBFT/Raast).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bankDetails.map((bank, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="font-extrabold text-base text-slate-900">{bank.bankName}</div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                        Active Channel
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Account Title:</span>
                        <span className="font-bold text-slate-800 text-xs leading-snug block">
                          {bank.accountTitle}
                        </span>
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 font-mono">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 text-[10px]">Account No:</span>
                          <button
                            onClick={() => handleCopy(bank.accountNumber, `acc-${idx}`)}
                            className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                          >
                            {copiedKey === `acc-${idx}` ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                            {copiedKey === `acc-${idx}` ? "Copied" : "Copy"}
                          </button>
                        </div>
                        <div className="font-bold text-slate-900 text-sm mt-0.5">{bank.accountNumber}</div>
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 font-mono">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 text-[10px]">IBAN Number:</span>
                          <button
                            onClick={() => handleCopy(bank.iban, `full-iban-${idx}`)}
                            className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                          >
                            {copiedKey === `full-iban-${idx}` ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                            {copiedKey === `full-iban-${idx}` ? "Copied" : "Copy"}
                          </button>
                        </div>
                        <div className="font-bold text-slate-900 text-xs break-all mt-0.5">{bank.iban}</div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                        <div>
                          <span className="text-slate-400 block">Branch Code:</span>
                          <span className="font-semibold">{bank.branchCode}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Swift Code:</span>
                          <span className="font-semibold">{bank.swiftCode}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                    <p className="italic">{bank.instructions}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Step-by-step payment guide */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 space-y-4">
              <h4 className="text-lg font-bold text-slate-900">How to Complete Your Fee Payment</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-700">
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="font-bold text-indigo-700 text-sm">1. Initiate Transfer</div>
                  <p className="text-slate-600">
                    Open your banking mobile app, choose Inter-Bank Fund Transfer / Raast, and paste the official IBAN copied above.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="font-bold text-indigo-700 text-sm">2. Add Reference</div>
                  <p className="text-slate-600">
                    In payment remarks or purpose, include your Full Legal Name or Student CNIC for rapid verification.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="font-bold text-indigo-700 text-sm">3. Submit Slip & Voucher</div>
                  <p className="text-slate-600">
                    Save the digital receipt screenshot and submit it in the admission form above to generate your official voucher.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: APPLICATION STATUS TRACKER */}
        {activeSubTab === "track" && (
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
                <Search className="h-4 w-4" />
                <span>Real-Time Status Lookup</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Track Admission & Fee Status</h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                Enter your unique Application ID (e.g. <code className="font-bold text-indigo-700">DCI-2026-8921</code>), Registered Email, or Phone Number.
              </p>

              <form onSubmit={handleTrackLookup} className="flex flex-col sm:flex-row gap-2 pt-2">
                <input
                  type="text"
                  required
                  placeholder="Enter Application ID or Email..."
                  value={trackQuery}
                  onChange={(e) => setTrackQuery(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={trackLoading}
                  className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {trackLoading ? "Searching..." : "Check Status"}
                </button>
              </form>

              {trackError && (
                <div className="flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-200 p-4 text-xs sm:text-sm text-rose-700">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{trackError}</span>
                </div>
              )}
            </div>

            {/* Lookup Result View */}
            {trackResult && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg space-y-6 animate-in fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Application Reference Number
                    </span>
                    <h4 className="text-2xl font-mono font-black text-indigo-950">
                      {trackResult.applicationNumber}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-extrabold uppercase">
                      {trackResult.admissionStatus}
                    </span>
                    <span className="rounded-full bg-indigo-100 text-indigo-800 px-3 py-1 text-xs font-extrabold uppercase">
                      {trackResult.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-400 block text-xs">Applicant Name:</span>
                    <span className="font-bold text-slate-900">{trackResult.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Enrolled Program:</span>
                    <span className="font-bold text-indigo-700">{trackResult.program}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Cohort Shift:</span>
                    <span className="font-medium text-slate-800">{trackResult.shift}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Total Tuition Payable:</span>
                    <span className="font-medium text-slate-800">PKR {trackResult.totalPayable.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Payment Method:</span>
                    <span className="font-medium text-slate-800">{trackResult.paymentMethod}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Transaction ID (UTR):</span>
                    <span className="font-mono text-slate-800">{trackResult.transactionRef || "Pending"}</span>
                  </div>
                </div>

                {trackResult.notes && (
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-700">
                    <span className="font-bold block mb-1">Admissions Office Notes:</span>
                    <p>{trackResult.notes}</p>
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      setCreatedAdmission(trackResult);
                      setSlipModalOpen(true);
                    }}
                    className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-slate-800 cursor-pointer"
                  >
                    <FileCheck className="h-4 w-4" />
                    <span>View & Print Official Voucher</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Official Application & Fee Slip Modal */}
        <ApplicationSlipModal
          admission={createdAdmission}
          onClose={() => setSlipModalOpen(false)}
        />
      </div>
    </section>
  );
};

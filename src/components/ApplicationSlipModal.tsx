import React from "react";
import { X, Printer, CheckCircle2, QrCode, ShieldCheck, Download, Calendar, GraduationCap, ExternalLink } from "lucide-react";
import { AdmissionApplication } from "../types";
import { DCI_BRAND } from "../assets/branding";

interface ApplicationSlipModalProps {
  admission: AdmissionApplication | null;
  onClose: () => void;
}

export const ApplicationSlipModal: React.FC<ApplicationSlipModalProps> = ({
  admission,
  onClose,
}) => {
  if (!admission) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-slate-200">
        {/* Action Header bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Official Admission & Fee Voucher</h3>
              <p className="text-[11px] text-slate-500">Dream Crafter Institute of Advanced Technologies</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Slip Content */}
        <div id="printable-admission-voucher" className="p-6 sm:p-8 space-y-6">
          {/* Header Branding */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-indigo-900 pb-5">
            <div className="flex items-center gap-3">
              <img
                src={DCI_BRAND.logoUrl}
                alt="Dream Crafter Institute Emblem"
                className="h-12 w-12 rounded-xl object-cover ring-2 ring-indigo-600/30"
              />
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                  DREAM CRAFTER INSTITUTE
                </h1>
                <p className="text-xs text-slate-600 font-medium">
                  2nd Floor, Usman Plaza, Near Darul Uloom Haqqania, Akora Khattak
                </p>
                <p className="text-[10px] text-slate-500">
                  Contact: 0334-0535660 / 0334-2490719 • Reg No: {DCI_BRAND.registrationNumber}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-indigo-200 bg-indigo-50/80 p-3 text-right">
              <div className="text-[10px] uppercase font-bold text-indigo-700">Application Number</div>
              <div className="text-base font-black text-indigo-950 font-mono tracking-wider">
                {admission.applicationNumber}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Issued: {new Date(admission.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Status Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-900 text-white p-4">
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Admission Status</div>
              <div className="text-lg font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                {admission.admissionStatus}
              </div>
            </div>

            <div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Payment Status</div>
              <div className="text-sm font-semibold text-amber-300">
                {admission.paymentStatus}
              </div>
            </div>

            <div className="text-right">
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Program Shift</div>
              <div className="text-sm font-bold text-white">
                {admission.shift} Cohort
              </div>
            </div>
          </div>

          {/* Candidate Profile Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-slate-200 p-4 bg-slate-50/40 text-xs sm:text-sm">
            <div>
              <span className="text-slate-500 block text-xs">Applicant Full Name:</span>
              <span className="font-bold text-slate-900 text-base">{admission.fullName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">Enrolled Program:</span>
              <span className="font-bold text-indigo-700">{admission.program}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">Email Address:</span>
              <span className="font-medium text-slate-800">{admission.email}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">Contact Phone / WhatsApp:</span>
              <span className="font-medium text-slate-800">{admission.phone}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">CNIC / Passport / B-Form:</span>
              <span className="font-medium text-slate-800">{admission.cnicOrPassport}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">City / Campus:</span>
              <span className="font-medium text-slate-800">{admission.city}</span>
            </div>
          </div>

          {/* Fee & Bank Transaction Summary */}
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
              Fee Structure & Settlement Details
            </div>
            <div className="p-4 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Standard Program Tuition:</span>
                <span>PKR {admission.tuitionFee.toLocaleString()}</span>
              </div>
              {admission.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Merit / Early Bird Scholarship Grant:</span>
                  <span>- PKR {admission.discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-900 font-extrabold text-base border-t border-slate-200 pt-2">
                <span>Net Total Payable Tuition:</span>
                <span className="text-indigo-900 font-mono">PKR {admission.totalPayable.toLocaleString()}</span>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 block">Payment Mode:</span>
                  <span className="font-semibold text-slate-800">{admission.paymentMethod}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Bank Account:</span>
                  <span className="font-semibold text-slate-800">{admission.bankNameUsed || "Meezan Bank Ltd"}</span>
                </div>
                {admission.transactionRef && (
                  <div className="col-span-2">
                    <span className="text-slate-400 block">Transaction Reference / UTR:</span>
                    <span className="font-mono font-bold text-indigo-700">{admission.transactionRef}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Verification Stamps & Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 bg-slate-100 rounded-xl p-1.5 border border-slate-300 flex items-center justify-center">
                <QrCode className="h-12 w-12 text-slate-800" />
              </div>
              <div className="text-[11px] text-slate-500">
                <div className="font-bold text-slate-800 flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>DCI Verified Document</span>
                </div>
                <div>Scan to verify enrollment authenticity</div>
                <div className="font-mono text-[10px] text-slate-400">UUID: {admission.id}</div>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-block border-b border-slate-400 px-6 pb-1 text-xs font-bold text-slate-700">
                Director of Admissions
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                Dream Crafter Institute Academic Registrar
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom CTA */}
        <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            Keep your Application ID <strong className="text-slate-800">{admission.applicationNumber}</strong> safe for orientation.
          </span>
          <button
            onClick={onClose}
            className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 cursor-pointer"
          >
            Close Voucher
          </button>
        </div>
      </div>
    </div>
  );
};

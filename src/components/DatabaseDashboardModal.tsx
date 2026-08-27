import React, { useState } from "react";
import { X, Database, CheckCircle2, AlertCircle, RefreshCw, Eye, Search, FileText, UserCheck, MessageSquare, Briefcase } from "lucide-react";
import { AdmissionApplication, Project, ContactMessage, ChatMessage } from "../types";

interface DatabaseDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  admissions: AdmissionApplication[];
  projects: Project[];
  contacts: ContactMessage[];
  chatMessages: ChatMessage[];
  onUpdateAdmissionStatus: (
    appId: string,
    updates: { paymentStatus?: AdmissionApplication["paymentStatus"]; admissionStatus?: AdmissionApplication["admissionStatus"]; notes?: string }
  ) => Promise<void>;
  onResetDB: () => Promise<void>;
}

export const DatabaseDashboardModal: React.FC<DatabaseDashboardModalProps> = ({
  isOpen,
  onClose,
  admissions,
  projects,
  contacts,
  chatMessages,
  onUpdateAdmissionStatus,
  onResetDB,
}) => {
  const [activeTab, setActiveTab] = useState<"admissions" | "projects" | "contacts" | "chat">("admissions");
  const [selectedAdmission, setSelectedAdmission] = useState<AdmissionApplication | null>(null);
  const [updating, setUpdating] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const handleStatusChange = async (
    appId: string,
    paymentStatus: AdmissionApplication["paymentStatus"],
    admissionStatus: AdmissionApplication["admissionStatus"]
  ) => {
    setUpdating(true);
    try {
      await onUpdateAdmissionStatus(appId, { paymentStatus, admissionStatus });
      if (selectedAdmission && selectedAdmission.id === appId) {
        setSelectedAdmission((prev) => prev ? { ...prev, paymentStatus, admissionStatus } : null);
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleReset = async () => {
    if (confirm("Are you sure you want to reset the database to sample records?")) {
      setResetting(true);
      try {
        await onResetDB();
      } finally {
        setResetting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900 px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-tight">DCI Live Database & Verification Inspector</h3>
                <span className="rounded-full bg-emerald-500/20 text-emerald-400 px-2 py-0.5 text-[10px] font-bold border border-emerald-500/30">
                  Connected: data/database.json
                </span>
              </div>
              <p className="text-xs text-slate-400">Manage online admissions, verified bank receipts, portfolio submissions, and chat logs</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              disabled={resetting}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              title="Reset sample data"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${resetting ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Reset DB</span>
            </button>

            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Database Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-slate-200 bg-slate-50 p-3 text-xs">
          <button
            onClick={() => setActiveTab("admissions")}
            className={`p-2.5 rounded-xl text-left transition-all ${
              activeTab === "admissions" ? "bg-white shadow-xs border border-slate-300 font-bold" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <div className="text-slate-400 text-[10px] uppercase font-semibold">Admissions</div>
            <div className="text-sm font-extrabold text-slate-900 flex items-center justify-between">
              <span>{admissions.length} Applicants</span>
              <UserCheck className="h-4 w-4 text-indigo-600" />
            </div>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`p-2.5 rounded-xl text-left transition-all ${
              activeTab === "projects" ? "bg-white shadow-xs border border-slate-300 font-bold" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <div className="text-slate-400 text-[10px] uppercase font-semibold">Portfolio Items</div>
            <div className="text-sm font-extrabold text-slate-900 flex items-center justify-between">
              <span>{projects.length} Works</span>
              <Briefcase className="h-4 w-4 text-indigo-600" />
            </div>
          </button>

          <button
            onClick={() => setActiveTab("chat")}
            className={`p-2.5 rounded-xl text-left transition-all ${
              activeTab === "chat" ? "bg-white shadow-xs border border-slate-300 font-bold" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <div className="text-slate-400 text-[10px] uppercase font-semibold">Chat Threads</div>
            <div className="text-sm font-extrabold text-slate-900 flex items-center justify-between">
              <span>{chatMessages.length} Messages</span>
              <MessageSquare className="h-4 w-4 text-indigo-600" />
            </div>
          </button>

          <button
            onClick={() => setActiveTab("contacts")}
            className={`p-2.5 rounded-xl text-left transition-all ${
              activeTab === "contacts" ? "bg-white shadow-xs border border-slate-300 font-bold" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <div className="text-slate-400 text-[10px] uppercase font-semibold">Inquiries</div>
            <div className="text-sm font-extrabold text-slate-900 flex items-center justify-between">
              <span>{contacts.length} Messages</span>
              <FileText className="h-4 w-4 text-indigo-600" />
            </div>
          </button>
        </div>

        {/* Database Table View Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* TAB: ADMISSIONS */}
          {activeTab === "admissions" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h4 className="font-bold text-slate-900 text-sm">Admission Applications Table</h4>
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by name, ID, email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">App ID</th>
                      <th className="p-3">Candidate</th>
                      <th className="p-3">Program & Shift</th>
                      <th className="p-3">Fee Total</th>
                      <th className="p-3">Payment Ref</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {admissions
                      .filter(
                        (a) =>
                          !search ||
                          a.fullName.toLowerCase().includes(search.toLowerCase()) ||
                          a.applicationNumber.toLowerCase().includes(search.toLowerCase()) ||
                          a.email.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((adm) => (
                        <tr key={adm.id} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-indigo-700">{adm.applicationNumber}</td>
                          <td className="p-3">
                            <div className="font-bold text-slate-900">{adm.fullName}</div>
                            <div className="text-[11px] text-slate-500">{adm.email}</div>
                          </td>
                          <td className="p-3">
                            <div className="font-semibold text-slate-800 line-clamp-1">{adm.program}</div>
                            <div className="text-[10px] text-slate-500">{adm.shift}</div>
                          </td>
                          <td className="p-3 font-bold text-slate-900">
                            PKR {adm.totalPayable.toLocaleString()}
                          </td>
                          <td className="p-3">
                            <span className="font-mono text-[11px] bg-slate-100 px-1.5 py-0.5 rounded">
                              {adm.transactionRef || "N/A"}
                            </span>
                          </td>
                          <td className="p-3">
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                adm.paymentStatus === "Verified"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {adm.paymentStatus}
                            </span>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => setSelectedAdmission(adm)}
                              className="rounded bg-indigo-50 border border-indigo-200 px-2 py-1 text-[11px] font-bold text-indigo-700 hover:bg-indigo-100"
                            >
                              Inspect / Verify
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Single Admission Inspection Panel */}
              {selectedAdmission && (
                <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/40 p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-indigo-200/80 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-indigo-700">Detailed Verification View</span>
                      <h4 className="font-extrabold text-base text-slate-900">
                        {selectedAdmission.fullName} — {selectedAdmission.applicationNumber}
                      </h4>
                    </div>
                    <button
                      onClick={() => setSelectedAdmission(null)}
                      className="text-xs text-slate-500 hover:text-slate-800"
                    >
                      Close view
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-500 block">Phone:</span>
                      <span className="font-semibold text-slate-900">{selectedAdmission.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">CNIC / ID:</span>
                      <span className="font-semibold text-slate-900">{selectedAdmission.cnicOrPassport}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Bank Selected:</span>
                      <span className="font-semibold text-slate-900">{selectedAdmission.bankNameUsed || "Meezan Bank Ltd"}</span>
                    </div>
                  </div>

                  {selectedAdmission.depositSlipDataUrl && (
                    <div>
                      <span className="text-xs font-bold text-slate-700 block mb-1">Attached Bank Slip Image:</span>
                      <img
                        src={selectedAdmission.depositSlipDataUrl}
                        alt="Deposit Slip"
                        className="h-36 rounded-lg object-contain bg-white border border-slate-200"
                      />
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-700">Update Status:</span>
                    <button
                      onClick={() => handleStatusChange(selectedAdmission.id, "Verified", "Accepted")}
                      disabled={updating}
                      className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
                    >
                      Approve & Mark Verified
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedAdmission.id, "Verified", "Enrolled")}
                      disabled={updating}
                      className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700"
                    >
                      Mark Enrolled
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedAdmission.id, "Under Review", "Submitted")}
                      disabled={updating}
                      className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-700"
                    >
                      Set Under Review
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: PROJECTS */}
          {activeTab === "projects" && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm">Published Showcase Projects ({projects.length})</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-4 rounded-xl border border-slate-200 bg-white flex gap-3 text-xs">
                    <img src={proj.thumbnail} alt="" className="h-16 w-20 rounded-lg object-cover bg-slate-900" />
                    <div className="flex-1 space-y-1">
                      <div className="font-bold text-slate-900 line-clamp-1">{proj.title}</div>
                      <div className="text-slate-500">{proj.studentName} • {proj.category}</div>
                      <div className="text-indigo-600 font-semibold">{proj.likes} Likes</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CHAT MESSAGES */}
          {activeTab === "chat" && (
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Community Chat Messages ({chatMessages.length})</h4>
              <div className="space-y-2 text-xs">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="p-3 rounded-xl border border-slate-200 bg-white space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{msg.authorName} ({msg.authorRole})</span>
                      <span className="text-[10px] text-slate-400">#{msg.channel} • {new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-slate-700">{msg.content}</p>
                    <div className="text-[10px] text-slate-400">{msg.replies.length} replies • {msg.likes} likes</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CONTACTS */}
          {activeTab === "contacts" && (
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Direct Contact Messages ({contacts.length})</h4>
              <div className="space-y-2 text-xs">
                {contacts.map((c) => (
                  <div key={c.id} className="p-3 rounded-xl border border-slate-200 bg-white space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{c.name} ({c.email})</span>
                      <span className="text-[10px] text-slate-400">{c.campus}</span>
                    </div>
                    <div className="font-semibold text-indigo-700">{c.subject}</div>
                    <p className="text-slate-700">{c.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-3 flex items-center justify-between text-xs text-slate-500">
          <span>Dream Crafter Institute Production Database Controller</span>
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-4 py-1.5 font-bold text-white hover:bg-slate-800"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};

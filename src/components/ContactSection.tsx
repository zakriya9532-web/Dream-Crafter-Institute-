import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Award,
  BookOpen,
  Car
} from "lucide-react";
import { DCI_BRAND } from "../assets/branding";

interface ContactSectionProps {
  onContactSubmit: (data: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    campus?: string;
    message: string;
  }) => Promise<void>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onContactSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Course Admission & Fee Inquiry",
    campus: "Akora Khattak Main Campus",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("Please provide your Full Name, Email Address, and Message.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await onContactSubmit(formData);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Course Admission & Fee Inquiry",
        campus: "Akora Khattak Main Campus",
        message: "",
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || "Unable to send message at this time. Please retry or call us directly at 0334-0535660.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-section" className="py-14 sm:py-20 bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-bold text-indigo-800 uppercase tracking-wider">
            <MapPin className="h-4 w-4 text-indigo-600" />
            <span>Campus Location & Direct Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact Dream Crafter Institute
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Visit our Akora Khattak campus or call our admissions desk directly for batch timings, class shifts, and fee concessions.
          </p>
        </div>

        {/* Facebook Verification Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="flex items-center gap-4">
            <img
              src={DCI_BRAND.logoUrl}
              alt="Dream Crafter Institute Logo"
              className="h-16 w-16 rounded-2xl object-cover ring-2 ring-indigo-400 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight">Official Facebook Community</h3>
                <span className="rounded-full bg-blue-500/20 text-blue-300 px-2 py-0.5 text-[10px] font-bold border border-blue-400/30">
                  Official Page
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Follow Dream Crafter Institute on Facebook for batch announcements, admission test schedules, student artworks, and new courses.
              </p>
            </div>
          </div>

          <a
            href={DCI_BRAND.facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-500 transition-all shadow-lg shrink-0 cursor-pointer"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Visit Official Facebook</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Institute Contact Card & Highlights */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-3xl border-2 border-indigo-100 bg-slate-50/80 p-6 sm:p-7 space-y-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-md">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">Main Campus & Head Office</h3>
                  <p className="text-xs font-semibold text-indigo-600">Dream Crafter Institute</p>
                </div>
              </div>

              <div className="space-y-3.5 text-sm text-slate-700">
                <div className="flex items-start gap-3 rounded-xl bg-white p-3.5 border border-slate-200/80">
                  <MapPin className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Campus Address</span>
                    <span className="font-bold text-slate-900 leading-snug">
                      2nd Floor, Usman Plaza, Near Darul Uloom Haqqania, Akora Khattak
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={`tel:${DCI_BRAND.phone1.replace(/[^0-9]/g, "")}`}
                    className="flex items-center gap-3 rounded-xl bg-white p-3.5 border border-slate-200/80 hover:border-indigo-400 transition-colors"
                  >
                    <Phone className="h-5 w-5 text-indigo-600 shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Primary Contact</span>
                      <span className="font-black text-slate-900 text-sm">{DCI_BRAND.phone1}</span>
                    </div>
                  </a>

                  <a
                    href={`tel:${DCI_BRAND.phone2.replace(/[^0-9]/g, "")}`}
                    className="flex items-center gap-3 rounded-xl bg-white p-3.5 border border-slate-200/80 hover:border-indigo-400 transition-colors"
                  >
                    <Phone className="h-5 w-5 text-indigo-600 shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Secondary Helpline</span>
                      <span className="font-black text-slate-900 text-sm">{DCI_BRAND.phone2}</span>
                    </div>
                  </a>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-emerald-950">
                  <MessageCircle className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold block">Direct WhatsApp & SMS Support</span>
                    <span>Chat with admissions at <strong>{DCI_BRAND.phone1}</strong> or <strong>{DCI_BRAND.phone2}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-white p-3.5 border border-slate-200/80">
                  <Clock className="h-5 w-5 text-slate-400 shrink-0" />
                  <div className="text-xs text-slate-600">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Campus Timings</span>
                    <span>Monday - Saturday: <strong>8:00 AM – 8:00 PM</strong> (Morning, Evening & Flexible Shifts)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Key Offerings Pill Box */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Official Institute Offerings</h4>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-lg bg-indigo-50 border border-indigo-200 px-3 py-1 font-bold text-indigo-800">English Language</span>
                <span className="rounded-lg bg-indigo-50 border border-indigo-200 px-3 py-1 font-bold text-indigo-800">German (A1, A2, B1, B2)</span>
                <span className="rounded-lg bg-blue-50 border border-blue-200 px-3 py-1 font-bold text-blue-800">CIT & DIT</span>
                <span className="rounded-lg bg-blue-50 border border-blue-200 px-3 py-1 font-bold text-blue-800">Basic Computer</span>
                <span className="rounded-lg bg-blue-50 border border-blue-200 px-3 py-1 font-bold text-blue-800">MS Office & Python</span>
                <span className="rounded-lg bg-blue-50 border border-blue-200 px-3 py-1 font-bold text-blue-800">Web Development</span>
                <span className="rounded-lg bg-purple-50 border border-purple-200 px-3 py-1 font-bold text-purple-800">Calligraphy & Painting</span>
                <span className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-1 font-bold text-amber-800">Tuitions (PG to F.Sc)</span>
                <span className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1 font-bold text-emerald-800">Driving (Male & Female)</span>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Send an Online Inquiry / Booking</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill out your details below and our campus coordinator will get in touch with class schedule and admission confirmation.
                </p>
              </div>

              {success && (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                  <span>Your message has been sent successfully! Our representative will call you shortly.</span>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-200 p-4 text-sm text-rose-800">
                  <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ahmad Khan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ahmad@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Contact Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0334-0000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Course of Interest
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                    >
                      <option value="English Language Course">English Language Course</option>
                      <option value="German Language (A1, A2, B1, B2)">German Language (A1, A2, B1, B2)</option>
                      <option value="CIT (Certificate in IT)">CIT (Certificate in IT)</option>
                      <option value="DIT (Diploma in IT - 1 Year)">DIT (Diploma in IT - 1 Year)</option>
                      <option value="Basic Computer Course">Basic Computer Course</option>
                      <option value="MS Office Masterclass">MS Office Masterclass</option>
                      <option value="Python Programming Course">Python Programming Course</option>
                      <option value="Web Development Course">Web Development Course</option>
                      <option value="Calligraphy and Painting Classes">Calligraphy and Painting Classes</option>
                      <option value="Tuition Classes (PG to F.Sc)">Tuition Classes (PG to F.Sc)</option>
                      <option value="Driving Classes (For Male and Female)">Driving Classes (For Male and Female)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Message / Preferred Shift (Morning / Evening) *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your timing preferences, prior background, or any specific questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Direct helpline: <span className="font-bold text-slate-800">{DCI_BRAND.phone1}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors cursor-pointer shadow-md"
                  >
                    <Send className="h-4 w-4" />
                    <span>{loading ? "Submitting..." : "Send Message"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

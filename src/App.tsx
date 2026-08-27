import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { PortfolioGallery } from "./components/PortfolioGallery";
import { AdmissionPortal } from "./components/AdmissionPortal";
import { ChatBoard } from "./components/ChatBoard";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { DatabaseDashboardModal } from "./components/DatabaseDashboardModal";
import { ProjectSubmitModal } from "./components/ProjectSubmitModal";
import { ProgramsModal } from "./components/ProgramsModal";
import { StudentLoginModal } from "./components/StudentLoginModal";
import { WelcomeAdmissionModal } from "./components/WelcomeAdmissionModal";
import { QuickFloatingAdmissions } from "./components/QuickFloatingAdmissions";
import {
  Project,
  AdmissionApplication,
  ChatMessage,
  ContactMessage,
  BankAccount,
  ProgramInfo
} from "./types";
import { fetchProjects, fetchBankDetails, fetchAdmissions, fetchChatMessages } from "./services/api";

export function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [projects, setProjects] = useState<Project[]>([]);
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [bankDetails, setBankDetails] = useState<BankAccount[]>([]);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [adminModalOpen, setAdminModalOpen] = useState<boolean>(false);
  const [submitProjectModalOpen, setSubmitProjectModalOpen] = useState<boolean>(false);
  const [programsModalOpen, setProgramsModalOpen] = useState<boolean>(false);
  const [studentLoginModalOpen, setStudentLoginModalOpen] = useState<boolean>(false);
  const [welcomeModalOpen, setWelcomeModalOpen] = useState<boolean>(() => {
    // Open when website opens on fresh visit
    const hasSeenWelcome = sessionStorage.getItem("dci_welcome_seen");
    return !hasSeenWelcome;
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show toast notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Close welcome modal and remember in session
  const handleCloseWelcomeModal = () => {
    setWelcomeModalOpen(false);
    sessionStorage.setItem("dci_welcome_seen", "true");
  };

  // Fetch initial data from Express backend
  const loadData = async () => {
    try {
      setLoading(true);
      const [projData, bankData, admData, chatData] = await Promise.all([
        fetchProjects().catch(() => []),
        fetchBankDetails().catch(() => []),
        fetchAdmissions().catch(() => []),
        fetchChatMessages().catch(() => []),
      ]);

      setProjects(projData);
      setBankDetails(bankData);
      setAdmissions(admData);
      setChatMessages(chatData);

      // Fetch contacts
      try {
        const cRes = await fetch("/api/contact");
        if (cRes.ok) {
          const cData = await cRes.json();
          setContacts(cData);
        }
      } catch (cErr) {
        // ignore
      }
    } catch (err) {
      console.error("Error loading initial application data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle Likes for projects
  const handleLikeProject = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}/like`, { method: "POST" });
      if (res.ok) {
        const updated = await res.json();
        setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
        showToast("Thanks for supporting student work! ❤️");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle New Project Submitted
  const handleAddProject = (newProj: Project) => {
    setProjects((prev) => [newProj, ...prev]);
    showToast("Project successfully added to the showcase gallery!");
  };

  // Handle New Admission Created
  const handleAdmissionCreated = (newAdm: AdmissionApplication) => {
    setAdmissions((prev) => [newAdm, ...prev]);
    showToast(`Admission application ${newAdm.applicationNumber} generated!`);
  };

  // Handle Sending Chat Message
  const handleSendMessage = async (data: {
    channel: ChatMessage["channel"];
    authorName: string;
    authorRole: ChatMessage["authorRole"];
    content: string;
  }) => {
    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const created: ChatMessage = await res.json();
        setChatMessages((prev) => [created, ...prev]);
        showToast("Message posted to community board!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Sending Reply to a Chat Thread
  const handleSendReply = async (
    id: string,
    reply: { authorName: string; authorRole: string; content: string }
  ) => {
    try {
      const res = await fetch(`/api/chat/messages/${id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reply),
      });
      if (res.ok) {
        const updated: ChatMessage = await res.json();
        setChatMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
        showToast("Reply posted successfully!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Like Chat Message
  const handleLikeChatMessage = async (id: string) => {
    try {
      const res = await fetch(`/api/chat/messages/${id}/like`, { method: "POST" });
      if (res.ok) {
        const updated: ChatMessage = await res.json();
        setChatMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Contact Inquiry Submission
  const handleContactSubmit = async (data: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    campus?: string;
    message: string;
  }) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to submit contact message");
    }
    const created: ContactMessage = await res.json();
    setContacts((prev) => [created, ...prev]);
    showToast("Thank you! Your message has been sent to our admissions desk.");
  };

  // Handle Admission Status Update from Database Inspector
  const handleUpdateAdmissionStatus = async (
    appId: string,
    updates: {
      paymentStatus?: AdmissionApplication["paymentStatus"];
      admissionStatus?: AdmissionApplication["admissionStatus"];
      notes?: string;
    }
  ) => {
    try {
      const res = await fetch(`/api/admissions/${appId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const updated = await res.json();
        setAdmissions((prev) => prev.map((a) => (a.id === appId ? updated : a)));
        showToast("Admission record updated in database!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Reset Database
  const handleResetDB = async () => {
    try {
      const res = await fetch("/api/admin/reset-db", { method: "POST" });
      if (res.ok) {
        await loadData();
        showToast("Database restored with sample student & admissions records!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Toast Banner Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="rounded-2xl bg-slate-900 text-white px-4 py-3 text-xs sm:text-sm font-semibold shadow-2xl border border-slate-700 flex items-center gap-2">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Global Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenTracker={() => {
          setActiveTab("admissions");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onOpenPrograms={() => setProgramsModalOpen(true)}
        onOpenStudentLogin={() => setStudentLoginModalOpen(true)}
        onOpenWelcome={() => setWelcomeModalOpen(true)}
      />

      {/* Main Dynamic Content */}
      <main className="flex-1">
        {activeTab === "home" && (
          <div className="space-y-0">
            <Hero
              stats={null}
              onNavigate={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onOpenConsult={() => {
                setActiveTab("chat");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onOpenPrograms={() => setProgramsModalOpen(true)}
              onOpenStudentLogin={() => setStudentLoginModalOpen(true)}
            />
            <PortfolioGallery
              projects={projects}
              onLikeProject={handleLikeProject}
              onAddProject={handleAddProject}
            />
            <AdmissionPortal
              bankDetails={bankDetails}
              onAdmissionCreated={handleAdmissionCreated}
              onOpenConsult={() => {
                setActiveTab("chat");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
            <ChatBoard
              messages={chatMessages}
              onSendMessage={handleSendMessage}
              onSendReply={handleSendReply}
              onLikeMessage={handleLikeChatMessage}
              onNavigateToAdmissions={() => {
                setActiveTab("admissions");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
            <ContactSection onContactSubmit={handleContactSubmit} />
          </div>
        )}

        {activeTab === "gallery" && (
          <PortfolioGallery
            projects={projects}
            onLikeProject={handleLikeProject}
            onAddProject={handleAddProject}
          />
        )}

        {activeTab === "admissions" && (
          <AdmissionPortal
            bankDetails={bankDetails}
            onAdmissionCreated={handleAdmissionCreated}
            onOpenConsult={() => {
              setActiveTab("chat");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {activeTab === "chat" && (
          <ChatBoard
            messages={chatMessages}
            onSendMessage={handleSendMessage}
            onSendReply={handleSendReply}
            onLikeMessage={handleLikeChatMessage}
            onNavigateToAdmissions={() => {
              setActiveTab("admissions");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {activeTab === "contact" && (
          <ContactSection onContactSubmit={handleContactSubmit} />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onOpenTracker={() => {
          setActiveTab("admissions");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenPrograms={() => setProgramsModalOpen(true)}
        onOpenStudentLogin={() => setStudentLoginModalOpen(true)}
      />

      {/* Quick Floating Action Button for Quick Admissions, Login, and WhatsApp */}
      <QuickFloatingAdmissions
        onOpenAdmissions={() => {
          setActiveTab("admissions");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onOpenLogin={() => setStudentLoginModalOpen(true)}
      />

      {/* Welcome Admission & Notice Modal (Triggered on Website Open) */}
      <WelcomeAdmissionModal
        isOpen={welcomeModalOpen}
        onClose={handleCloseWelcomeModal}
        onStartAdmission={(courseId) => {
          setWelcomeModalOpen(false);
          setActiveTab("admissions");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onOpenStudentLogin={() => {
          setWelcomeModalOpen(false);
          setStudentLoginModalOpen(true);
        }}
      />

      {/* Student Portal & ID Card Verification Login Modal */}
      <StudentLoginModal
        isOpen={studentLoginModalOpen}
        onClose={() => setStudentLoginModalOpen(false)}
        admissions={admissions}
        onNavigateToAdmissions={() => {
          setStudentLoginModalOpen(false);
          setActiveTab("admissions");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Academic Programs & Detailed Syllabus Catalog Modal */}
      <ProgramsModal
        isOpen={programsModalOpen}
        onClose={() => setProgramsModalOpen(false)}
        onSelectProgramForAdmission={(program: ProgramInfo) => {
          setProgramsModalOpen(false);
          setActiveTab("admissions");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Database Inspector Modal */}
      <DatabaseDashboardModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        admissions={admissions}
        projects={projects}
        contacts={contacts}
        chatMessages={chatMessages}
        onUpdateAdmissionStatus={handleUpdateAdmissionStatus}
        onResetDB={handleResetDB}
      />

      {/* Standalone Project Submit Modal */}
      <ProjectSubmitModal
        isOpen={submitProjectModalOpen}
        onClose={() => setSubmitProjectModalOpen(false)}
        onSuccess={handleAddProject}
      />
    </div>
  );
}

export default App;


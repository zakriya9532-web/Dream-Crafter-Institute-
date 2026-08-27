import { Project, BankAccount, AdmissionApplication, ChatMessage, ContactMessage, InstituteStats, CounselorResponse } from "../types";

export const api = {
  // Stats
  async getStats(): Promise<InstituteStats> {
    const res = await fetch("/api/stats");
    if (!res.ok) throw new Error("Failed to load institute stats");
    return res.json();
  },

  // Projects
  async getProjects(): Promise<Project[]> {
    const res = await fetch("/api/projects");
    if (!res.ok) throw new Error("Failed to load showcase projects");
    return res.json();
  },

  async createProject(project: Omit<Project, "id" | "likes" | "createdAt">): Promise<Project> {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to submit project");
    }
    return res.json();
  },

  async likeProject(id: string): Promise<{ success: boolean; likes: number }> {
    const res = await fetch(`/api/projects/${id}/like`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to like project");
    return res.json();
  },

  // Bank Details
  async getBankDetails(): Promise<BankAccount[]> {
    const res = await fetch("/api/bank-details");
    if (!res.ok) throw new Error("Failed to load official bank details");
    return res.json();
  },

  // Admissions
  async getAdmissions(): Promise<AdmissionApplication[]> {
    const res = await fetch("/api/admissions");
    if (!res.ok) throw new Error("Failed to load admissions");
    return res.json();
  },

  async searchAdmission(query: string): Promise<AdmissionApplication> {
    const res = await fetch(`/api/admissions/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Application not found");
    }
    return res.json();
  },

  async submitAdmission(data: Partial<AdmissionApplication>): Promise<AdmissionApplication> {
    const res = await fetch("/api/admissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to submit admission application");
    }
    return res.json();
  },

  async updateAdmissionStatus(
    appId: string,
    updates: { paymentStatus?: AdmissionApplication["paymentStatus"]; admissionStatus?: AdmissionApplication["admissionStatus"]; notes?: string }
  ): Promise<AdmissionApplication> {
    const res = await fetch(`/api/admissions/${appId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("Failed to update admission status");
    return res.json();
  },

  // Chat Board
  async getChatMessages(channel?: string): Promise<ChatMessage[]> {
    const url = channel && channel !== "all" ? `/api/chat/messages?channel=${channel}` : "/api/chat/messages";
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to load chat messages");
    return res.json();
  },

  async sendChatMessage(data: {
    channel: "general" | "admissions" | "project-feedback" | "career-advice";
    authorName: string;
    authorRole: "Student" | "Alumni" | "Instructor" | "Applicant" | "AI Counselor";
    content: string;
  }): Promise<ChatMessage> {
    const res = await fetch("/api/chat/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to post message");
    }
    return res.json();
  },

  async replyChatMessage(id: string, reply: { authorName: string; authorRole: string; content: string }): Promise<ChatMessage> {
    const res = await fetch(`/api/chat/messages/${id}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reply),
    });
    if (!res.ok) throw new Error("Failed to post reply");
    return res.json();
  },

  async likeChatMessage(id: string): Promise<{ success: boolean; likes: number }> {
    const res = await fetch(`/api/chat/messages/${id}/like`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to like chat message");
    return res.json();
  },

  // AI Counselor
  async askCounselor(query: string, context?: any): Promise<CounselorResponse> {
    const res = await fetch("/api/gemini/counselor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, context }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to contact counselor");
    }
    return res.json();
  },

  // Contact
  async sendContact(data: { name: string; email: string; phone?: string; subject?: string; campus?: string; message: string }): Promise<ContactMessage> {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to send message");
    }
    return res.json();
  },

  async getContacts(): Promise<ContactMessage[]> {
    const res = await fetch("/api/contact");
    if (!res.ok) throw new Error("Failed to load contact inquiries");
    return res.json();
  },

  // Reset database for demo
  async resetDatabase(): Promise<{ message: string }> {
    const res = await fetch("/api/admin/reset", { method: "POST" });
    return res.json();
  }
};

export const fetchProjects = () => api.getProjects();
export const fetchBankDetails = () => api.getBankDetails();
export const fetchAdmissions = () => api.getAdmissions();
export const fetchChatMessages = (channel?: string) => api.getChatMessages(channel);
export const fetchStats = () => api.getStats();
export const fetchContacts = () => api.getContacts();

import fs from "fs";
import path from "path";

export interface Project {
  id: string;
  title: string;
  category: "Computer & IT" | "Web & Python" | "Languages" | "Calligraphy & Arts" | "Tuitions" | "Driving Classes";
  studentName: string;
  batch: string;
  thumbnail: string;
  description: string;
  fullDetails?: string;
  techStack: string[];
  likes: number;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  createdAt: string;
}

export interface BankAccount {
  bankName: string;
  accountTitle: string;
  accountNumber: string;
  iban: string;
  branchCode: string;
  swiftCode: string;
  branchName: string;
  instructions: string;
  acceptedMethods: string[];
}

export interface AdmissionApplication {
  id: string;
  applicationNumber: string;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  cnicOrPassport: string;
  address: string;
  city: string;
  program: string;
  shift: "Morning" | "Evening" | "Weekend (Online)";
  priorExperience: string;
  portfolioUrl?: string;
  tuitionFee: number;
  discountAmount: number;
  totalPayable: number;
  paymentMethod: "Bank Transfer (1Link/IBFT/Raast)" | "Bank Transfer" | "Direct Deposit" | "Online Banking / Wire" | "Pay at Campus";
  bankNameUsed?: string;
  transactionRef?: string;
  paymentDate?: string;
  depositSlipDataUrl?: string;
  paymentStatus: "Pending Verification" | "Verified" | "Under Review" | "Rejected";
  admissionStatus: "Submitted" | "Documents Verified" | "Interview Scheduled" | "Accepted" | "Enrolled";
  notes?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  channel: "general" | "admissions" | "project-feedback" | "career-advice";
  authorName: string;
  authorRole: "Student" | "Alumni" | "Instructor" | "Applicant" | "AI Counselor";
  avatarBg?: string;
  content: string;
  likes: number;
  replies: {
    id: string;
    authorName: string;
    authorRole: string;
    content: string;
    createdAt: string;
  }[];
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  campus: string;
  message: string;
  status: "New" | "Replied" | "Archived";
  createdAt: string;
}

export interface DatabaseSchema {
  projects: Project[];
  admissions: AdmissionApplication[];
  chatMessages: ChatMessage[];
  contacts: ContactMessage[];
  bankDetails: BankAccount[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "database.json");

const initialBankDetails: BankAccount[] = [
  {
    bankName: "Meezan Bank Limited",
    accountTitle: "DREAM CRAFTER INSTITUTE AKORA KHATTAK",
    accountNumber: "02010108934892",
    iban: "PK72MEZN0002010108934892",
    branchCode: "0201",
    swiftCode: "MEZNPKKA",
    branchName: "Usman Plaza / GT Road Branch, Akora Khattak",
    instructions: "Please attach screenshot/photo of payment slip and mention your Admission Reference in payment description.",
    acceptedMethods: ["Meezan Mobile App", "Raast ID", "ATM Transfer", "Branch Cash Deposit", "1Link 1Bill"]
  },
  {
    bankName: "Habib Bank Limited (HBL)",
    accountTitle: "DREAM CRAFTER INSTITUTE",
    accountNumber: "12907900823403",
    iban: "PK89HABB0012907900823403",
    branchCode: "1290",
    swiftCode: "HABBPKKA",
    branchName: "Akora Khattak Branch",
    instructions: "Easy fee transfer via HBL Mobile, Konnect agent, or any 1Link bank app.",
    acceptedMethods: ["HBL Mobile", "Konnect", "1Link Transfer", "Cash Deposit"]
  },
  {
    bankName: "EasyPaisa / JazzCash & Campus Cash",
    accountTitle: "DREAM CRAFTER INSTITUTE (ADMISSIONS)",
    accountNumber: "0334-0535660",
    iban: "PK00EP03340535660",
    branchCode: "0334",
    swiftCode: "EPAYPKKA",
    branchName: "2nd Floor Usman Plaza, Akora Khattak",
    instructions: "Send via EasyPaisa / JazzCash to 0334-0535660 or 0334-2490719, or pay directly at campus admission desk.",
    acceptedMethods: ["EasyPaisa", "JazzCash", "Direct Campus Counter"]
  }
];

const initialProjects: Project[] = [
  {
    id: "proj-1",
    title: "German A1/A2 Conversation & Goethe Exam Preparation Portal",
    category: "Languages",
    studentName: "Ahmad Jan & Zeeshan Khan",
    batch: "German Language Cohort",
    thumbnail: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80",
    description: "Interactive German vocabulary flashcards, Goethe A1/A2 audio dialogues, and interview practice guide for German university applications.",
    fullDetails: "Developed during the German Language course at Dream Crafter Institute. Covers essential greetings, grammar tables, listening audio files, and exam mock test papers.",
    techStack: ["German A1-B2", "Grammar Drills", "Goethe Test Prep", "Audio Listening Labs"],
    likes: 128,
    liveUrl: "https://www.facebook.com/people/Dream-Crafter-Institute/61583402859369/#",
    featured: true,
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString()
  },
  {
    id: "proj-2",
    title: "Smart Office Automation Suite & Inventory Database (DIT Project)",
    category: "Computer & IT",
    studentName: "Muhammad Bilal & Tariq Mehmood",
    batch: "DIT (Diploma in Information Technology)",
    thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    description: "Comprehensive MS Access and Excel automated inventory & billing system designed for local retail stores and office record management.",
    fullDetails: "Capstone project for 1-Year DIT Diploma. Includes custom database queries, InPage Urdu invoice headers, automated formulas, and data reporting tools.",
    techStack: ["DIT Curriculum", "MS Access SQL", "Advanced Excel", "InPage Urdu", "Visual Basic"],
    likes: 174,
    liveUrl: "https://www.facebook.com/people/Dream-Crafter-Institute/61583402859369/#",
    featured: true,
    createdAt: new Date(Date.now() - 18 * 86400000).toISOString()
  },
  {
    id: "proj-3",
    title: "Automated Student & Tuition Management System in Python",
    category: "Web & Python",
    studentName: "Shahid Ali",
    batch: "Python Programming Batch",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    description: "Desktop software built with Python and Tkinter for managing student enrollments, fee records, and automated SMS notifications.",
    fullDetails: "Developed as a practical final submission in Python course. Implements SQLite database, OOP design patterns, and PDF receipt generation.",
    techStack: ["Python 3", "Tkinter GUI", "SQLite", "ReportLab PDF", "Automation"],
    likes: 195,
    liveUrl: "https://www.facebook.com/people/Dream-Crafter-Institute/61583402859369/#",
    featured: true,
    createdAt: new Date(Date.now() - 25 * 86400000).toISOString()
  },
  {
    id: "proj-4",
    title: "Responsive Institute Web Portal & Student Admission Hub",
    category: "Web & Python",
    studentName: "Usman Ghani & Hamza Ali",
    batch: "Web Development Course",
    thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
    description: "Full responsive multi-device website featuring course catalog, online fee verification, and interactive admissions portal.",
    fullDetails: "Built using HTML5, CSS3, JavaScript, and Tailwind CSS. Fully optimized for mobile screens, tablets, and desktops.",
    techStack: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Responsive UI"],
    likes: 210,
    liveUrl: "https://www.facebook.com/people/Dream-Crafter-Institute/61583402859369/#",
    featured: true,
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString()
  },
  {
    id: "proj-5",
    title: "Traditional Arabic & English Calligraphy Exhibition Canvas",
    category: "Calligraphy & Arts",
    studentName: "Fatima Noor & Ayesha Bibi",
    batch: "Calligraphy & Painting Class",
    thumbnail: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    description: "Handcrafted Thuluth and Nastaliq Quranic calligraphy canvases with gold acrylic detailing and oil painting landscapes.",
    fullDetails: "Showcased at Dream Crafter Institute annual arts exhibition. Features classical bamboo qalam techniques combined with modern canvas color blending.",
    techStack: ["Traditional Qalam", "Arabic Thuluth", "Nastaliq", "Acrylic on Canvas", "Oil Painting"],
    likes: 245,
    liveUrl: "https://www.facebook.com/people/Dream-Crafter-Institute/61583402859369/#",
    featured: true,
    createdAt: new Date(Date.now() - 8 * 86400000).toISOString()
  },
  {
    id: "proj-6",
    title: "Driver Safety & Traffic Rules Interactive Study Handbook",
    category: "Driving Classes",
    studentName: "Male & Female Driving Department",
    batch: "Driving Training Academy",
    thumbnail: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
    description: "Illustrated visual guide for traffic signs, parking maneuvers, dual-control car practice, and traffic police driving test clearance.",
    fullDetails: "Practical study material prepared for male and female driving candidates at Dream Crafter Institute Akora Khattak campus.",
    techStack: ["Road Safety", "Traffic Signs", "Dual Control Cars", "License Test Guide"],
    likes: 162,
    liveUrl: "https://www.facebook.com/people/Dream-Crafter-Institute/61583402859369/#",
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString()
  }
];

const initialAdmissions: AdmissionApplication[] = [
  {
    id: "adm-1",
    applicationNumber: "DCI-2026-1042",
    fullName: "Muhammad Rizwan",
    email: "rizwan.akora@gmail.com",
    phone: "0334-0535660",
    gender: "Male",
    cnicOrPassport: "17201-8912345-1",
    address: "Near Darul Uloom Haqqania, Akora Khattak",
    city: "Akora Khattak",
    program: "German Language (A1, A2, B1, B2)",
    shift: "Morning",
    priorExperience: "Beginner level, planning for German study visa.",
    tuitionFee: 18000,
    discountAmount: 2000,
    totalPayable: 16000,
    paymentMethod: "Bank Transfer (1Link/IBFT/Raast)",
    bankNameUsed: "Meezan Bank Limited",
    transactionRef: "MEZN-TX-889102",
    paymentDate: "2026-08-20",
    paymentStatus: "Verified",
    admissionStatus: "Accepted",
    notes: "Admitted for German A1 Morning Batch.",
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString()
  },
  {
    id: "adm-2",
    applicationNumber: "DCI-2026-1043",
    fullName: "Zainab Bibi",
    email: "zainab.student@gmail.com",
    phone: "0334-2490719",
    gender: "Female",
    cnicOrPassport: "17201-4567890-2",
    address: "Usman Plaza, GT Road",
    city: "Akora Khattak",
    program: "DIT (Diploma in Information Technology)",
    shift: "Morning",
    priorExperience: "Matric passed, enrolling for 1-Year DIT Diploma.",
    tuitionFee: 22000,
    discountAmount: 2000,
    totalPayable: 20000,
    paymentMethod: "Bank Transfer",
    bankNameUsed: "Habib Bank Limited (HBL)",
    transactionRef: "HBL-ONL-998231",
    paymentDate: "2026-08-24",
    paymentStatus: "Verified",
    admissionStatus: "Enrolled",
    notes: "Enrollment confirmed. Class timings provided.",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString()
  }
];

const initialChatMessages: ChatMessage[] = [
  {
    id: "chat-1",
    channel: "admissions",
    authorName: "Kashif Khan",
    authorRole: "Applicant",
    avatarBg: "bg-blue-600",
    content: "Assalam o Alaikum! Are separate driving classes available for female students with female instructors at the Akora Khattak campus?",
    likes: 12,
    replies: [
      {
        id: "rep-1",
        authorName: "Dream Crafter Admissions Desk",
        authorRole: "AI Counselor",
        content: "Walaikum Assalam! Yes, we have dedicated certified female driving instructors and separate timings exclusively for female students with dual-control training cars.",
        createdAt: new Date(Date.now() - 3 * 3600000).toISOString()
      },
      {
        id: "rep-2",
        authorName: "Instructor Qari Sahib",
        authorRole: "Instructor",
        content: "You can visit us on 2nd Floor, Usman Plaza, Near Darul Uloom Haqqania, Akora Khattak or call 0334-0535660 / 0334-2490719 for timing slots.",
        createdAt: new Date(Date.now() - 2 * 3600000).toISOString()
      }
    ],
    createdAt: new Date(Date.now() - 5 * 3600000).toISOString()
  },
  {
    id: "chat-2",
    channel: "general",
    authorName: "Sohail Ahmad",
    authorRole: "Student",
    avatarBg: "bg-emerald-600",
    content: "Is DIT (Diploma in Information Technology) 1 year course recognized for government and private job scale appointments?",
    likes: 15,
    replies: [
      {
        id: "rep-3",
        authorName: "Academic Director DCI",
        authorRole: "Instructor",
        content: "Yes, our DIT curriculum strictly aligns with technical board standards, covering Office Automation, C/C++, Database & Web Design.",
        createdAt: new Date(Date.now() - 1 * 3600000).toISOString()
      }
    ],
    createdAt: new Date(Date.now() - 6 * 3600000).toISOString()
  },
  {
    id: "chat-3",
    channel: "career-advice",
    authorName: "Irfan Ullah",
    authorRole: "Student",
    avatarBg: "bg-purple-600",
    content: "Which levels of German Language are covered for Germany Study & Opportunity Card visas?",
    likes: 18,
    replies: [
      {
        id: "rep-4",
        authorName: "German Language Instructor",
        authorRole: "Instructor",
        content: "We provide complete preparation for A1, A2, B1, and B2 levels with Goethe-Institut test patterns, speaking drills, and visa interview preparation.",
        createdAt: new Date(Date.now() - 40 * 60000).toISOString()
      }
    ],
    createdAt: new Date(Date.now() - 8 * 3600000).toISOString()
  }
];

const initialContacts: ContactMessage[] = [
  {
    id: "cont-1",
    name: "Tariq Mahmood",
    email: "tariq.akora@gmail.com",
    phone: "0334-0535660",
    subject: "Admission Inquiry for German Language & DIT",
    campus: "Akora Khattak Main Campus",
    message: "I want to enroll in the German Language (A1) and DIT courses. Please share new batch start dates and class shift timings.",
    status: "New",
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString()
  }
];

class DatabaseService {
  private db: DatabaseSchema;

  constructor() {
    this.db = {
      projects: initialProjects,
      admissions: initialAdmissions,
      chatMessages: initialChatMessages,
      contacts: initialContacts,
      bankDetails: initialBankDetails
    };
    this.loadFromDisk();
  }

  private loadFromDisk(): void {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, "utf-8");
        const parsed = JSON.parse(fileContent);
        this.db = {
          projects: Array.isArray(parsed.projects) && parsed.projects.length > 0 ? parsed.projects : initialProjects,
          admissions: Array.isArray(parsed.admissions) ? parsed.admissions : initialAdmissions,
          chatMessages: Array.isArray(parsed.chatMessages) ? parsed.chatMessages : initialChatMessages,
          contacts: Array.isArray(parsed.contacts) ? parsed.contacts : initialContacts,
          bankDetails: Array.isArray(parsed.bankDetails) && parsed.bankDetails.length > 0 ? parsed.bankDetails : initialBankDetails
        };
      } else {
        this.saveToDisk();
      }
    } catch (err) {
      console.error("Database load error, fallback to initial:", err);
      this.saveToDisk();
    }
  }

  private saveToDisk(): void {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.db, null, 2), "utf-8");
    } catch (err) {
      console.error("Failed to save database to disk:", err);
    }
  }

  // --- Projects ---
  getProjects(): Project[] {
    return this.db.projects;
  }

  addProject(project: Omit<Project, "id" | "likes" | "createdAt">): Project {
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      likes: 0,
      createdAt: new Date().toISOString()
    };
    this.db.projects.unshift(newProject);
    this.saveToDisk();
    return newProject;
  }

  likeProject(id: string): { success: boolean; likes: number } {
    const proj = this.db.projects.find((p) => p.id === id);
    if (!proj) return { success: false, likes: 0 };
    proj.likes += 1;
    this.saveToDisk();
    return { success: true, likes: proj.likes };
  }

  // --- Admissions ---
  getAdmissions(): AdmissionApplication[] {
    return this.db.admissions;
  }

  getAdmissionById(query: string): AdmissionApplication | undefined {
    const clean = query.trim().toLowerCase();
    return this.db.admissions.find(
      (a) => a.id.toLowerCase() === clean ||
             a.applicationNumber.toLowerCase() === clean ||
             a.email.toLowerCase() === clean ||
             a.phone.replace(/[^0-9]/g, "") === clean.replace(/[^0-9]/g, "")
    );
  }

  createAdmission(data: Omit<AdmissionApplication, "id" | "applicationNumber" | "paymentStatus" | "admissionStatus" | "createdAt">): AdmissionApplication {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newAdmission: AdmissionApplication = {
      ...data,
      id: `adm-${Date.now()}`,
      applicationNumber: `DCI-2026-${randomCode}`,
      paymentStatus: "Pending Verification",
      admissionStatus: "Submitted",
      createdAt: new Date().toISOString()
    };
    this.db.admissions.unshift(newAdmission);
    this.saveToDisk();
    return newAdmission;
  }

  updateAdmissionStatus(
    appId: string,
    updates: {
      paymentStatus?: AdmissionApplication["paymentStatus"];
      admissionStatus?: AdmissionApplication["admissionStatus"];
      notes?: string;
    }
  ): AdmissionApplication | null {
    const adm = this.db.admissions.find((a) => a.id === appId || a.applicationNumber === appId);
    if (!adm) return null;
    if (updates.paymentStatus) adm.paymentStatus = updates.paymentStatus;
    if (updates.admissionStatus) adm.admissionStatus = updates.admissionStatus;
    if (updates.notes !== undefined) adm.notes = updates.notes;
    this.saveToDisk();
    return adm;
  }

  // --- Bank Details ---
  getBankDetails(): BankAccount[] {
    return this.db.bankDetails;
  }

  // --- Chat Board ---
  getChatMessages(channel?: string): ChatMessage[] {
    if (!channel || channel === "all") return this.db.chatMessages;
    return this.db.chatMessages.filter((m) => m.channel === channel);
  }

  addChatMessage(data: {
    channel: "general" | "admissions" | "project-feedback" | "career-advice";
    authorName: string;
    authorRole: "Student" | "Alumni" | "Instructor" | "Applicant" | "AI Counselor";
    content: string;
  }): ChatMessage {
    const avatarBgs = ["bg-indigo-600", "bg-emerald-600", "bg-amber-600", "bg-rose-600", "bg-teal-600", "bg-blue-600"];
    const randomBg = avatarBgs[Math.floor(Math.random() * avatarBgs.length)];

    const newMsg: ChatMessage = {
      id: `chat-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      channel: data.channel,
      authorName: data.authorName.trim() || "Institute Guest",
      authorRole: data.authorRole || "Student",
      avatarBg: randomBg,
      content: data.content.trim(),
      likes: 0,
      replies: [],
      createdAt: new Date().toISOString()
    };
    this.db.chatMessages.unshift(newMsg);
    this.saveToDisk();
    return newMsg;
  }

  addChatReply(messageId: string, reply: { authorName: string; authorRole: string; content: string }): ChatMessage | null {
    const msg = this.db.chatMessages.find((m) => m.id === messageId);
    if (!msg) return null;
    const newReply = {
      id: `rep-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      authorName: reply.authorName.trim() || "DCI Member",
      authorRole: reply.authorRole || "Student",
      content: reply.content.trim(),
      createdAt: new Date().toISOString()
    };
    msg.replies.push(newReply);
    this.saveToDisk();
    return msg;
  }

  likeChatMessage(id: string): { success: boolean; likes: number } {
    const msg = this.db.chatMessages.find((m) => m.id === id);
    if (!msg) return { success: false, likes: 0 };
    msg.likes += 1;
    this.saveToDisk();
    return { success: true, likes: msg.likes };
  }

  // --- Contacts ---
  getContacts(): ContactMessage[] {
    return this.db.contacts;
  }

  addContact(data: Omit<ContactMessage, "id" | "status" | "createdAt">): ContactMessage {
    const newContact: ContactMessage = {
      ...data,
      id: `cont-${Date.now()}`,
      status: "New",
      createdAt: new Date().toISOString()
    };
    this.db.contacts.unshift(newContact);
    this.saveToDisk();
    return newContact;
  }

  // --- Stats ---
  getStats() {
    return {
      totalProjects: this.db.projects.length,
      totalAdmissions: this.db.admissions.length,
      verifiedStudents: this.db.admissions.filter((a) => a.paymentStatus === "Verified").length,
      totalChatDiscussions: this.db.chatMessages.length,
      inquiriesCount: this.db.contacts.length,
      alumniPlaced: 850,
      placementRate: "99.1%",
      activeCohorts: 12
    };
  }

  // Reset/Seed helper
  resetDatabase() {
    this.db = {
      projects: initialProjects,
      admissions: initialAdmissions,
      chatMessages: initialChatMessages,
      contacts: initialContacts,
      bankDetails: initialBankDetails
    };
    this.saveToDisk();
    return true;
  }
}

export const dbService = new DatabaseService();

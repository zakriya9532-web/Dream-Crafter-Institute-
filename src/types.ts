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

export interface InstituteStats {
  totalProjects: number;
  totalAdmissions: number;
  verifiedStudents: number;
  totalChatDiscussions: number;
  inquiriesCount: number;
  alumniPlaced: number;
  placementRate: string;
  activeCohorts: number;
}

export interface CounselorResponse {
  answer: string;
  recommendedPrograms?: string[];
  scholarshipAdvice?: string;
  estimatedFee?: string;
  nextSteps?: string[];
}

export interface ProgramInfo {
  id: string;
  name: string;
  code: string;
  category: "Languages" | "Computer Courses" | "Creative Arts" | "Tuition Classes" | "Driving Classes";
  duration: string;
  feePKR: number;
  description: string;
  curriculum: string[];
  tools: string[];
  careerRoles: string[];
  badge?: string;
  image: string;
}

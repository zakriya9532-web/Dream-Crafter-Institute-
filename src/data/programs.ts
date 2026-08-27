import { ProgramInfo } from "../types";

export const INSTITUTE_PROGRAMS: ProgramInfo[] = [
  // --- LANGUAGE COURSES ---
  {
    id: "prog-english",
    name: "English Language Course",
    code: "DCI-ENG-2026",
    category: "Languages",
    duration: "3 Months (12 Weeks)",
    feePKR: 8000,
    description: "Comprehensive English communication program focusing on Spoken English, Grammar, Vocabulary Building, Pronunciation, Accent Training, and Public Speaking.",
    curriculum: [
      "Daily Conversation & Spoken Fluency Drills",
      "Essential English Grammar & Sentence Structures",
      "Vocabulary Expansion & Idiomatic Expressions",
      "Listening Comprehension & Audio Dialogue Practice",
      "Public Speaking, Group Discussions & Interview Prep"
    ],
    tools: ["Spoken Fluency Labs", "Grammar Workbooks", "Audio Dialogue Sets", "Public Speaking Stage"],
    careerRoles: ["Fluent English Speaker", "Corporate Communicator", "Customer Support Specialist", "IELTS/PTE Foundation"],
    badge: "Popular Course",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prog-german",
    name: "German Language (A1, A2, B1, B2)",
    code: "DCI-GER-2026",
    category: "Languages",
    duration: "4 - 8 Months (Level Wise)",
    feePKR: 18000,
    description: "Complete CEFR German language preparation covering A1, A2, B1, and B2 levels for Study in Germany, Opportunity Card (Chancenkarte), Work Visa, and Goethe-Zertifikat exams.",
    curriculum: [
      "Level A1: Basics, Introductions, Everyday Scenarios & Vocabulary",
      "Level A2: Elementary Grammar, Expressing Opinions & Daily Life",
      "Level B1: Independent Communication, Work/Study Fluency & Essay Writing",
      "Level B2: Advanced German for University Studies & Professional Employment",
      "Goethe-Institut & ÖSD Exam Preparation with Mock Tests"
    ],
    tools: ["Goethe Exam Modules", "Netzwerk / Schritte International", "Listening Audio Labs", "Visa Interview Prep"],
    careerRoles: ["Study in Germany Applicant", "Chancenkarte / Job Seeker", "German Translator", "Goethe Certified"],
    badge: "Study Abroad & Visa",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80"
  },

  // --- COMPUTER COURSES ---
  {
    id: "prog-cit",
    name: "CIT (Certificate in Information Technology)",
    code: "DCI-CIT-2026",
    category: "Computer Courses",
    duration: "6 Months",
    feePKR: 12000,
    description: "Fundamental IT certification program covering Computer Fundamentals, Windows Operating Systems, MS Office Suite, InPage Urdu, Internet & Digital Skills.",
    curriculum: [
      "Information Technology Concepts & Computer Hardware Basics",
      "Windows Operating System Management & Settings",
      "MS Word, MS Excel & MS PowerPoint in Depth",
      "InPage Urdu Composing & Typing Speed Mastery",
      "Internet Research, Email Etiquette & Cloud Storage"
    ],
    tools: ["MS Office", "InPage Urdu", "Windows 11", "Typing Master", "Google Workspace"],
    careerRoles: ["Computer Operator", "Data Entry Specialist", "Office IT Assistant", "Digital Clerk"],
    badge: "Govt Recognized",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prog-dit",
    name: "DIT (Diploma in Information Technology)",
    code: "DCI-DIT-2026",
    category: "Computer Courses",
    duration: "1 Year (12 Months / 2 Semesters)",
    feePKR: 22000,
    description: "Complete Board of Technical Education aligned 1-Year Diploma covering Programming, Database Systems, Web Design, Networking, Hardware & Office Automation.",
    curriculum: [
      "Semester 1: IT Fundamentals, Operating Systems, Advanced MS Office & InPage",
      "Semester 1: Computer Hardware, Troubleshooting & Local Area Networking (LAN)",
      "Semester 2: C / C++ Programming Fundamentals & Algorithms",
      "Semester 2: Database Management with MS Access & SQL",
      "Semester 2: Web Designing (HTML5, CSS3, JavaScript) & Final Project"
    ],
    tools: ["Visual Studio / Dev C++", "MS Access & SQL", "VS Code", "MS Office", "Packet Tracer"],
    careerRoles: ["IT Specialist", "Junior Programmer", "Database Operator", "Computer Lab Instructor", "Network Technician"],
    badge: "1-Year Diploma",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prog-basic-comp",
    name: "Basic Computer Course",
    code: "DCI-BCC-2026",
    category: "Computer Courses",
    duration: "2 Months",
    feePKR: 5000,
    description: "Beginner-friendly introductory computer course designed for absolute beginners, students, and elders to master essential digital computing with confidence.",
    curriculum: [
      "Introduction to Computer Parts, Mouse, Keyboard & System Setup",
      "Windows Navigation, File Management, Folders & Storage",
      "Urdu and English Fast Typing Techniques",
      "Basic Word Processing, Printing & Scanning Documents",
      "Safe Internet Browsing, YouTube, Gmail & Online Services"
    ],
    tools: ["Windows OS", "Typing Master", "MS Paint & Notepad", "Web Browsers", "Printer/Scanner"],
    careerRoles: ["Computer Literate Individual", "Entry-level Office Assistant", "Personal Computing Confidence"],
    badge: "Beginner Friendly",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prog-msoffice",
    name: "MS Office Masterclass (Word, Excel, PowerPoint, Access)",
    code: "DCI-MSO-2026",
    category: "Computer Courses",
    duration: "2 Months",
    feePKR: 6000,
    description: "In-depth practical training on Microsoft Office Suite for corporate offices, banks, schools, and business administration.",
    curriculum: [
      "MS Word: Official Letters, Book Formatting, Tables, Mail Merge & CV Making",
      "MS Excel: Formulas (VLOOKUP, IF, SUMIF), Pivot Tables, Charts & Salary Sheets",
      "MS PowerPoint: Professional Business Slides, Transitions, Animations & Master Slides",
      "MS Access: Database Creation, Forms, Queries & Inventory Reports",
      "PDF Conversion, Digital Signatures & Cloud Backup"
    ],
    tools: ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "Microsoft Access"],
    careerRoles: ["Office Administrator", "Accounts Assistant", "Executive Secretary", "Data Analyst Assistant"],
    badge: "Essential Office Skill",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prog-python",
    name: "Python Programming Course",
    code: "DCI-PYT-2026",
    category: "Computer Courses",
    duration: "3 Months",
    feePKR: 10000,
    description: "Learn Python from fundamentals to real-world scripting, Object-Oriented Programming (OOP), automation, data handling, and building desktop applications.",
    curriculum: [
      "Python Basics, Variables, Data Types, Conditionals & Loops",
      "Functions, Modules, File I/O & Exception Handling",
      "Object-Oriented Programming (Classes, Objects, Inheritance)",
      "Data Manipulation with NumPy & Pandas",
      "GUI Development with Tkinter & Automation Scripts"
    ],
    tools: ["Python 3", "VS Code", "PyCharm", "Jupyter Notebook", "Git"],
    careerRoles: ["Python Programmer", "Software Developer", "Automation Script Writer", "Data Science Foundation"],
    badge: "High Demand",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prog-webdev",
    name: "Web Development Course",
    code: "DCI-WEB-2026",
    category: "Computer Courses",
    duration: "4 Months",
    feePKR: 15000,
    description: "Build modern, responsive, and mobile-friendly websites using HTML5, CSS3, JavaScript, Tailwind CSS, and full frontend/backend fundamentals.",
    curriculum: [
      "HTML5 Semantic Structure & Modern Web Standards",
      "CSS3 Styling, Flexbox, Grid Layouts & Responsive Design",
      "JavaScript Programming, DOM Manipulation & Event Handling",
      "Modern Frontend Frameworks & Tailwind CSS",
      "Backend Intro, Forms, API Integration & Web Hosting"
    ],
    tools: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "VS Code", "GitHub"],
    careerRoles: ["Web Designer", "Frontend Web Developer", "Freelance Website Creator", "Full-Stack Trainee"],
    badge: "Career Builder",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80"
  },

  // --- CREATIVE & ARTS ---
  {
    id: "prog-arts",
    name: "Calligraphy and Painting Classes",
    code: "DCI-ART-2026",
    category: "Creative Arts",
    duration: "2 Months",
    feePKR: 7000,
    description: "Explore the beauty of traditional and modern calligraphy alongside fine art painting techniques under experienced artists.",
    curriculum: [
      "Arabic & Islamic Calligraphy (Nastaliq, Thuluth & Kufic scripts)",
      "English Modern Calligraphy, Copperplate & Lettering Styles",
      "Pencil Sketching, Shading, Perspective & Still Life Drawing",
      "Watercolor Techniques, Blending & Color Theory",
      "Acrylic and Oil Painting on Canvas with Exhibition Showcase"
    ],
    tools: ["Qalam & Ink", "Chisel Pens", "Acrylic Paints", "Canvas Boards", "Watercolor Sets"],
    careerRoles: ["Professional Calligrapher", "Visual Artist", "Art Instructor", "Freelance Canvas Artist"],
    badge: "Creative Arts",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
  },

  // --- ACADEMIC TUITIONS ---
  {
    id: "prog-tuition",
    name: "Tuition Classes (PG to F.Sc)",
    code: "DCI-TUT-2026",
    category: "Tuition Classes",
    duration: "Monthly / Academic Session",
    feePKR: 4000,
    description: "Dedicated conceptual tuition and exam preparation from Playgroup (PG), Primary, Middle, Matric (9th & 10th), to F.Sc (Pre-Medical, Pre-Engineering & ICS).",
    curriculum: [
      "Junior Section (PG to 5th): Phonics, Math Basics, Urdu, English & Science",
      "Middle Section (6th to 8th): Core Concepts, Regular Tests & Homework Guidance",
      "Matriculation (9th & 10th): BISE Board Exam Preparation, Past Papers & Numericals",
      "F.Sc Part 1 & Part 2: Physics, Chemistry, Biology, Mathematics & Computer Science",
      "Weekly Assessment Tests, Monthly Progress Reports & Parent-Teacher Meetings"
    ],
    tools: ["BISE Past Papers", "Concept Worksheets", "Science Lab Demonstrations", "Weekly Test Series"],
    careerRoles: ["High Board Marks Achiever", "Medical & Engineering College Prep", "Academic Excellence"],
    badge: "PG to F.Sc",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"
  },

  // --- DRIVING CLASSES ---
  {
    id: "prog-driving",
    name: "Driving Classes (For Male and Female)",
    code: "DCI-DRV-2026",
    category: "Driving Classes",
    duration: "1 Month (Practical Driving + Theory)",
    feePKR: 8000,
    description: "Professional driving school with certified vehicles and separate dedicated male and female instructors. Master road safety, parking, highway driving & license test clearing.",
    curriculum: [
      "Car Controls: Steering, Clutch, Gear Shift, Accelerator & Brakes",
      "Starting, Smooth Moving, Reversing & Parallel Parking",
      "Traffic Signals, Road Signs, Highway Safety & Hazard Awareness",
      "Hill Starts, Traffic Maneuvering & Defensive Driving Techniques",
      "Complete Traffic Police Driving License Test Preparation"
    ],
    tools: ["Dual-Control Training Cars", "Traffic Sign Simulator", "Licensed Male & Female Instructors", "License Test Track Prep"],
    careerRoles: ["Confident Licensed Driver", "Safe Motorist", "Official License Holder"],
    badge: "Male & Female",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80"
  }
];

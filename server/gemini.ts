import { GoogleGenAI, ThinkingLevel } from "@google/genai";

let genAIClient: GoogleGenAI | null = null;

export function getGenAIClient(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set. Mock responses will be used as fallback.");
    }
    genAIClient = new GoogleGenAI({
      apiKey: apiKey || "dummy-key",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

export interface CounselorResponse {
  answer: string;
  recommendedPrograms?: string[];
  scholarshipAdvice?: string;
  estimatedFee?: string;
  nextSteps?: string[];
  thoughtSummary?: string;
}

export async function askDreamCrafterCounselor(userQuery: string, context?: {
  education?: string;
  interests?: string[];
  budget?: string;
  shiftPreference?: string;
}): Promise<CounselorResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return {
      answer: `Welcome to Dream Crafter Institute! Based on your query: "${userQuery}", we offer English Language, German Language (A1, A2, B1, B2), Computer Courses (CIT, DIT 1-Year Diploma, Basic Computer, MS Office, Python, Web Development), Calligraphy and Painting Classes, Tuition Classes (Playgroup to F.Sc), and certified Driving Classes (for Male and Female). Contact us at 0334-0535660 or 0334-2490719, or visit 2nd Floor, Usman Plaza, Near Darul Uloom Haqqania, Akora Khattak!`,
      recommendedPrograms: ["English Language Course", "German Language (A1, A2, B1, B2)", "DIT (Diploma in Information Technology)", "Web Development Course"],
      scholarshipAdvice: "Merit & Early Admission concessions available on submission of admission form.",
      nextSteps: ["Choose your preferred course & timing", "Fill out Online Admission Form", "Visit campus or call 0334-0535660 / 0334-2490719"]
    };
  }

  const systemInstruction = `You are the Chief Academic & Admissions Counselor at "Dream Crafter Institute" (DCI) located at 2nd Floor, Usman Plaza, Near Darul Uloom Haqqania, Akora Khattak.
Contact Numbers: 0334-0535660, 0334-2490719.
Official Facebook: https://www.facebook.com/people/Dream-Crafter-Institute/61583402859369/#

You provide accurate, encouraging, and clear guidance strictly regarding Dream Crafter Institute's official courses:
1. English Language: Spoken English, Grammar, Fluency, Vocabulary & Public Speaking.
2. German Language: Complete A1, A2, B1, B2 CEFR preparation for German university study, Opportunity Card (Chancenkarte), Work Visa, and Goethe-Institut tests.
3. Computer Courses:
   - CIT (Certificate in Information Technology - 6 Months)
   - DIT (Diploma in Information Technology - 1 Year Technical Board Diploma)
   - Basic Computer Courses (Typing, Windows, Internet, Digital Essentials)
   - MS Office Masterclass (Word, Excel, PowerPoint, Access)
   - Python Programming (Automation, OOP, Data & Application Scripting)
   - Web Development (HTML5, CSS3, JavaScript, Tailwind CSS, Responsive Design)
4. Calligraphy and Painting Classes: Arabic (Thuluth/Nastaliq), English Modern Calligraphy, Pencil Sketching, Watercolor & Canvas Acrylic Painting.
5. Tuition Classes: Comprehensive academic subject coaching from Playgroup (PG) to F.Sc (Pre-Medical, Pre-Engineering, ICS).
6. Driving Classes: Certified driving lessons for both Male and Female students with separate qualified instructors, dual-control training vehicles & traffic sign prep.

Always provide friendly, encouraging, and clear guidance with exact course recommendations and contact details (0334-0535660 / 0334-2490719, 2nd Floor Usman Plaza, Akora Khattak).`;


  const ai = getGenAIClient();
  const prompt = `Student Question / Profile:
Query: "${userQuery}"
Context: ${JSON.stringify(context || {})}

Please analyze the student's needs and provide:
1. Thorough, motivating response tailored to their career aspiration and background.
2. Best matching programs at Dream Crafter Institute.
3. Scholarship/financial assistance recommendation.
4. Concrete next steps for admission.`;

  try {
    // Primary attempt: gemini-3.1-pro-preview with thinkingLevel HIGH (as instructed)
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
      },
    });

    const text = response.text || "Thank you for reaching out to Dream Crafter Institute! Our admissions team is ready to guide your creative journey.";
    return {
      answer: text,
      recommendedPrograms: extractPrograms(text),
      scholarshipAdvice: "Merit & Early Bird Scholarships up to 30% available on online bank deposit.",
      nextSteps: ["Complete Online Admission Form", "Make fee deposit using official DCI Bank Accounts", "Attend orientation interview"]
    };
  } catch (err: any) {
    console.warn("Thinking mode or gemini-3.1-pro-preview failed, attempting fallback to gemini-3.7-flash:", err?.message || err);
    try {
      // Resilient fallback with gemini-3.7-flash
      const fallbackResponse = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
        },
      });

      const fallbackText = fallbackResponse.text || "Thank you for contacting Dream Crafter Institute.";
      return {
        answer: fallbackText,
        recommendedPrograms: extractPrograms(fallbackText),
        scholarshipAdvice: "Check our Admission & Fee page for scholarship criteria.",
        nextSteps: ["Submit admission form", "Attach payment slip"]
      };
    } catch (fallbackErr: any) {
      console.error("All Gemini API calls failed:", fallbackErr);
      return {
        answer: `Thank you for your interest in Dream Crafter Institute (Akora Khattak)! We offer English Language, German Language (A1-B2), Computer Courses (CIT, DIT, Basic Computer, MS Office, Python, Web Development), Calligraphy & Painting, Tuitions (PG to F.Sc), and Driving Classes (Male & Female). Contact: 0334-0535660 / 0334-2490719, 2nd Floor Usman Plaza, Near Darul Uloom Haqqania, Akora Khattak.`,
        recommendedPrograms: ["English Language Course", "German Language (A1, A2, B1, B2)", "DIT (Diploma in Information Technology)", "Computer Courses (CIT, MS Office, Python)"],
        scholarshipAdvice: "Concessions and installment options available.",
        nextSteps: ["Choose your desired course", "Submit admission application", "Visit Akora Khattak campus"]
      };
    }
  }
}

function extractPrograms(text: string): string[] {
  const progs = [
    "English Language Course",
    "German Language (A1, A2, B1, B2)",
    "CIT (Certificate in Information Technology)",
    "DIT (Diploma in Information Technology)",
    "Basic Computer Course",
    "MS Office Masterclass",
    "Python Programming Course",
    "Web Development Course",
    "Calligraphy and Painting Classes",
    "Tuition Classes (PG to F.Sc)",
    "Driving Classes (For Male and Female)"
  ];
  const found = progs.filter(p => text.toLowerCase().includes(p.toLowerCase().substring(0, 8)));
  return found.length > 0 ? found : ["English Language Course", "German Language (A1, A2, B1, B2)", "DIT (Diploma in Information Technology)"];
}


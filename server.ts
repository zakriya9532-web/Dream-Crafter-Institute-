import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { dbService } from "./server/db";
import { askDreamCrafterCounselor } from "./server/gemini";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body parser with reasonable payload limit for receipt images
  app.use(express.json({ limit: "15mb" }));
  app.use(express.urlencoded({ extended: true, limit: "15mb" }));

  // --- API Routes ---

  // Health check
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", institute: "Dream Crafter Institute", timestamp: new Date().toISOString() });
  });

  // Overall statistics
  app.get("/api/stats", (_req: Request, res: Response) => {
    try {
      const stats = dbService.getStats();
      res.json(stats);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Projects / Portfolio Gallery
  app.get("/api/projects", (_req: Request, res: Response) => {
    try {
      const projects = dbService.getProjects();
      res.json(projects);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/projects", (req: Request, res: Response) => {
    try {
      const { title, category, studentName, batch, thumbnail, description, fullDetails, techStack, liveUrl, githubUrl } = req.body;
      if (!title || !category || !studentName || !thumbnail || !description) {
        return res.status(400).json({ error: "Missing required project fields (title, category, studentName, thumbnail, description)" });
      }
      const project = dbService.addProject({
        title,
        category,
        studentName,
        batch: batch || "Alumni Showcase",
        thumbnail,
        description,
        fullDetails: fullDetails || description,
        techStack: Array.isArray(techStack) ? techStack : (techStack || "").split(",").map((s: string) => s.trim()).filter(Boolean),
        liveUrl,
        githubUrl,
        featured: false
      });
      res.status(201).json(project);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/projects/:id/like", (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = dbService.likeProject(id);
      if (!result.success) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Bank details for Admissions
  app.get("/api/bank-details", (_req: Request, res: Response) => {
    try {
      const bankDetails = dbService.getBankDetails();
      res.json(bankDetails);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Admissions
  app.get("/api/admissions", (_req: Request, res: Response) => {
    try {
      const admissions = dbService.getAdmissions();
      res.json(admissions);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admissions/search", (req: Request, res: Response) => {
    try {
      const query = (req.query.q as string) || "";
      if (!query) {
        return res.status(400).json({ error: "Query parameter 'q' is required" });
      }
      const admission = dbService.getAdmissionById(query);
      if (!admission) {
        return res.status(404).json({ error: "No admission application found with provided ID, email, or phone number" });
      }
      res.json(admission);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admissions", (req: Request, res: Response) => {
    try {
      const {
        fullName,
        email,
        phone,
        gender,
        cnicOrPassport,
        address,
        city,
        program,
        shift,
        priorExperience,
        portfolioUrl,
        tuitionFee,
        discountAmount,
        totalPayable,
        paymentMethod,
        bankNameUsed,
        transactionRef,
        paymentDate,
        depositSlipDataUrl,
        notes
      } = req.body;

      if (!fullName || !email || !phone || !program || !shift) {
        return res.status(400).json({ error: "Please fill in all mandatory personal and program information." });
      }

      const admission = dbService.createAdmission({
        fullName,
        email,
        phone,
        gender: gender || "Not Specified",
        cnicOrPassport: cnicOrPassport || "N/A",
        address: address || "N/A",
        city: city || "Online / Nationwide",
        program,
        shift: shift || "Morning",
        priorExperience: priorExperience || "Beginner",
        portfolioUrl,
        tuitionFee: Number(tuitionFee) || 60000,
        discountAmount: Number(discountAmount) || 0,
        totalPayable: Number(totalPayable) || (Number(tuitionFee) || 60000) - (Number(discountAmount) || 0),
        paymentMethod: paymentMethod || "Bank Transfer",
        bankNameUsed,
        transactionRef,
        paymentDate: paymentDate || new Date().toISOString().split("T")[0],
        depositSlipDataUrl,
        notes
      });

      res.status(201).json(admission);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.patch("/api/admissions/:appId/status", (req: Request, res: Response) => {
    try {
      const { appId } = req.params;
      const { paymentStatus, admissionStatus, notes } = req.body;
      const updated = dbService.updateAdmissionStatus(appId, {
        paymentStatus,
        admissionStatus,
        notes
      });
      if (!updated) {
        return res.status(404).json({ error: "Admission record not found" });
      }
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Chat Board
  app.get("/api/chat/messages", (req: Request, res: Response) => {
    try {
      const channel = req.query.channel as string;
      const messages = dbService.getChatMessages(channel);
      res.json(messages);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/chat/messages", (req: Request, res: Response) => {
    try {
      const { channel, authorName, authorRole, content } = req.body;
      if (!content || !content.trim()) {
        return res.status(400).json({ error: "Message content cannot be empty" });
      }
      const msg = dbService.addChatMessage({
        channel: channel || "general",
        authorName: authorName || "Student / Guest",
        authorRole: authorRole || "Student",
        content
      });
      res.status(201).json(msg);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/chat/messages/:id/reply", (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { authorName, authorRole, content } = req.body;
      if (!content || !content.trim()) {
        return res.status(400).json({ error: "Reply content cannot be empty" });
      }
      const updated = dbService.addChatReply(id, {
        authorName: authorName || "DCI Member",
        authorRole: authorRole || "Student",
        content
      });
      if (!updated) {
        return res.status(404).json({ error: "Chat message thread not found" });
      }
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/chat/messages/:id/like", (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = dbService.likeChatMessage(id);
      if (!result.success) {
        return res.status(404).json({ error: "Chat message not found" });
      }
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Gemini AI Career & Admissions Counselor
  app.post("/api/gemini/counselor", async (req: Request, res: Response) => {
    try {
      const { query, context } = req.body;
      if (!query || !query.trim()) {
        return res.status(400).json({ error: "Query is required" });
      }
      const advice = await askDreamCrafterCounselor(query, context);
      res.json(advice);
    } catch (err: any) {
      console.error("Gemini counselor error:", err);
      res.status(500).json({ error: err.message || "Failed to process counseling query" });
    }
  });

  // Contact Form
  app.get("/api/contact", (_req: Request, res: Response) => {
    try {
      const contacts = dbService.getContacts();
      res.json(contacts);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/contact", (req: Request, res: Response) => {
    try {
      const { name, email, phone, subject, campus, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Please provide your name, email, and message" });
      }
      const newContact = dbService.addContact({
        name,
        email,
        phone: phone || "N/A",
        subject: subject || "General Inquiry",
        campus: campus || "Main Creative Campus",
        message
      });
      res.status(201).json(newContact);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Admin DB Reset/Seed
  app.post("/api/admin/reset", (_req: Request, res: Response) => {
    try {
      dbService.resetDatabase();
      res.json({ message: "Database successfully re-seeded with demo records" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- Vite Middleware Integration ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dream Crafter Institute server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});

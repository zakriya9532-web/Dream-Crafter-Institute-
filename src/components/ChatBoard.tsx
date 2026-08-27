import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Bot,
  Send,
  Sparkles,
  Heart,
  CornerDownRight,
  User,
  ShieldAlert,
  Hash,
  BookOpen,
  HelpCircle,
  Briefcase,
  ChevronDown,
  Layers,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { ChatMessage, CounselorResponse } from "../types";
import { DCI_BRAND } from "../assets/branding";

interface ChatBoardProps {
  messages: ChatMessage[];
  onSendMessage: (data: {
    channel: ChatMessage["channel"];
    authorName: string;
    authorRole: ChatMessage["authorRole"];
    content: string;
  }) => Promise<void>;
  onSendReply: (id: string, reply: { authorName: string; authorRole: string; content: string }) => Promise<void>;
  onLikeMessage: (id: string) => Promise<void>;
  onNavigateToAdmissions: () => void;
}

export const ChatBoard: React.FC<ChatBoardProps> = ({
  messages,
  onSendMessage,
  onSendReply,
  onLikeMessage,
  onNavigateToAdmissions,
}) => {
  const [boardMode, setBoardMode] = useState<"community" | "ai-counselor">("community");
  const [activeChannel, setActiveChannel] = useState<ChatMessage["channel"] | "all">("all");

  // Community post input state
  const [authorName, setAuthorName] = useState("");
  const [authorRole, setAuthorRole] = useState<ChatMessage["authorRole"]>("Applicant");
  const [newPostContent, setNewPostContent] = useState("");
  const [postChannel, setPostChannel] = useState<ChatMessage["channel"]>("general");
  const [submittingPost, setSubmittingPost] = useState(false);

  // Replying state
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyAuthor, setReplyAuthor] = useState("");

  // AI Counselor state
  const [counselorInput, setCounselorInput] = useState("");
  const [counselorChatHistory, setCounselorChatHistory] = useState<
    Array<{ sender: "user" | "ai"; text: string; data?: CounselorResponse }>
  >([
    {
      sender: "ai",
      text: "Hello and welcome to Dream Crafter Institute! I am your AI Academic & Career Counselor. Feel free to ask me anything about our creative technology programs, course syllabi, fee scholarship criteria, hardware prerequisites, or career placement trajectories!",
      data: {
        answer: "Hello and welcome to Dream Crafter Institute!",
        recommendedPrograms: [
          "Full-Stack Web Development & Cloud",
          "3D Animation, VFX & Unreal Engine 5",
          "UI/UX & Digital Product Design",
        ],
        scholarshipAdvice: "Check out early registration discounts up to 30%.",
        nextSteps: ["Ask specific questions below", "Explore our student showcase gallery", "Submit an admission application"],
      },
    },
  ]);
  const [aiLoading, setAiLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const channels: Array<{ id: ChatMessage["channel"] | "all"; label: string; icon: any }> = [
    { id: "all", label: "All Topics", icon: Hash },
    { id: "general", label: "General Hub", icon: MessageSquare },
    { id: "admissions", label: "Admissions & Fees", icon: HelpCircle },
    { id: "project-feedback", label: "Project Feedback", icon: Layers },
    { id: "career-advice", label: "Career & Placements", icon: Briefcase },
  ];

  const filteredMessages = messages.filter((m) => activeChannel === "all" || m.channel === activeChannel);

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    setSubmittingPost(true);
    try {
      await onSendMessage({
        channel: postChannel,
        authorName: authorName.trim() || "Guest Member",
        authorRole: authorRole,
        content: newPostContent.trim(),
      });
      setNewPostContent("");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingPost(false);
    }
  };

  const handleReplySubmit = async (msgId: string) => {
    if (!replyText.trim()) return;
    try {
      await onSendReply(msgId, {
        authorName: replyAuthor.trim() || "DCI Member",
        authorRole: "Student",
        content: replyText.trim(),
      });
      setReplyText("");
      setReplyingToId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAskAI = async (queryText?: string) => {
    const textToAsk = queryText || counselorInput;
    if (!textToAsk.trim() || aiLoading) return;

    const userMsg = textToAsk.trim();
    setCounselorChatHistory((prev) => [...prev, { sender: "user", text: userMsg }]);
    if (!queryText) setCounselorInput("");
    setAiLoading(true);

    try {
      const res = await fetch("/api/gemini/counselor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMsg }),
      });

      if (!res.ok) {
        throw new Error("Failed to reach counselor");
      }

      const data: CounselorResponse = await res.json();
      setCounselorChatHistory((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.answer,
          data: data,
        },
      ]);
    } catch (err) {
      setCounselorChatHistory((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "I am currently assisting multiple students. Our top programs include Full-Stack Web Development, 3D Animation & Unreal Engine 5, and UI/UX Design. You can also reach our admissions desk directly or view official bank details under the Admissions tab.",
        },
      ]);
    } finally {
      setAiLoading(false);
      setTimeout(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const samplePrompts = [
    "Which is better for my goals: Full-Stack Web or 3D Animation & Unreal Engine 5?",
    "What are the eligibility requirements for the 30% Early Bird Scholarship?",
    "Can I join if I have no prior coding or art experience?",
    "What computer specifications and GPU are recommended for the 3D VFX lab?",
  ];

  return (
    <section id="chat-section" className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 text-indigo-800 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="h-4 w-4 text-indigo-600" />
            <span>Community & Academic Counselor</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Dream Crafter Institute Discussion Board
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Connect with instructors and peers, inquire about admissions, or receive personalized course recommendations from our AI Career Advisor.
          </p>

          {/* Mode Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setBoardMode("community")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                boardMode === "community"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <MessageSquare className="h-4 w-4 text-indigo-400" />
              <span>Community Discussion Board</span>
            </button>

            <button
              onClick={() => setBoardMode("ai-counselor")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                boardMode === "ai-counselor"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Bot className="h-4 w-4 text-teal-300" />
              <span>AI Admissions Counselor</span>
              <span className="rounded bg-teal-400/20 px-1.5 py-0.2 text-[10px] font-bold text-teal-700">Online</span>
            </button>
          </div>
        </div>

        {/* MODE 1: COMMUNITY FORUM */}
        {boardMode === "community" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Channels */}
            <div className="lg:col-span-1 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                  Discussion Channels
                </div>
                {channels.map((chan) => {
                  const Icon = chan.icon;
                  const isSelected = activeChannel === chan.id;
                  return (
                    <button
                      key={chan.id}
                      onClick={() => setActiveChannel(chan.id)}
                      className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-indigo-50 text-indigo-700 font-bold"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isSelected ? "text-indigo-600" : "text-slate-400"}`} />
                      <span>{chan.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Facebook Community Link Notice */}
              <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 space-y-2 text-xs text-blue-900">
                <div className="font-bold flex items-center gap-1.5 text-blue-950">
                  <svg className="h-4 w-4 fill-current text-blue-600" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Official Facebook Group</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Join our social group for student workshops and portfolio feedback from alumni.
                </p>
                <a
                  href={DCI_BRAND.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-blue-700 hover:underline pt-1"
                >
                  <span>Open Facebook Page</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* Guidelines */}
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 space-y-2 text-xs text-indigo-900">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4 text-indigo-600" />
                  <span>Forum Guidelines</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Please maintain professional decorum. For official voucher verification, use the Admissions Status Tracker.
                </p>
              </div>
            </div>

            {/* Main Chat Feed & Posting Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* New Post Creator Box */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Start a Discussion / Ask a Question
                  </span>
                  <div className="flex items-center gap-2">
                    <select
                      value={postChannel}
                      onChange={(e) => setPostChannel(e.target.value as any)}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 focus:outline-none"
                    >
                      <option value="general">#general</option>
                      <option value="admissions">#admissions</option>
                      <option value="project-feedback">#project-feedback</option>
                      <option value="career-advice">#career-advice</option>
                    </select>
                  </div>
                </div>

                <form onSubmit={handlePostSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Name (e.g. Bilal Ahmed)"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />

                    <select
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value as any)}
                      className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs sm:text-sm text-slate-700 focus:border-indigo-600 focus:outline-none"
                    >
                      <option value="Applicant">Applicant / Prospective Student</option>
                      <option value="Student">Enrolled Student</option>
                      <option value="Alumni">Institute Alumni</option>
                      <option value="Instructor">Faculty / Mentor</option>
                    </select>
                  </div>

                  <textarea
                    rows={2}
                    required
                    placeholder="What would you like to discuss regarding programs, admissions, or projects?"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                  />

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={submittingPost || !newPostContent.trim()}
                      className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50 transition-colors cursor-pointer"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Post to #{postChannel}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Message Feed */}
              <div className="space-y-4">
                {filteredMessages.length === 0 ? (
                  <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 text-sm">
                    No discussions in this channel yet. Be the first to start a conversation!
                  </div>
                ) : (
                  filteredMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3"
                    >
                      {/* Post Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`h-9 w-9 rounded-full ${msg.avatarBg || "bg-indigo-600"} flex items-center justify-center text-white font-bold text-xs`}>
                            {msg.authorName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-sm">{msg.authorName}</span>
                              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600 uppercase">
                                {msg.authorRole}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-400">
                              #{msg.channel} • {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => onLikeMessage(msg.id)}
                          className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-rose-600 px-2 py-1 rounded-md hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500/20" />
                          <span>{msg.likes}</span>
                        </button>
                      </div>

                      {/* Content */}
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed pl-11">
                        {msg.content}
                      </p>

                      {/* Replies List */}
                      {msg.replies && msg.replies.length > 0 && (
                        <div className="pl-11 pt-2 space-y-2">
                          {msg.replies.map((rep) => (
                            <div
                              key={rep.id}
                              className="rounded-xl bg-slate-50 p-3 border border-slate-200/80 text-xs space-y-1"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-900">{rep.authorName}</span>
                                <span className="text-[10px] text-slate-400">
                                  {new Date(rep.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="text-slate-700 leading-normal">{rep.content}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Input Trigger */}
                      <div className="pl-11 pt-2 flex items-center gap-3">
                        {replyingToId === msg.id ? (
                          <div className="w-full space-y-2 rounded-xl bg-slate-50 p-3 border border-slate-200">
                            <div className="flex flex-col sm:flex-row gap-2">
                              <input
                                type="text"
                                placeholder="Your Name"
                                value={replyAuthor}
                                onChange={(e) => setReplyAuthor(e.target.value)}
                                className="w-full sm:w-1/3 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none"
                              />
                              <input
                                type="text"
                                placeholder="Write a reply..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="w-full sm:flex-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none"
                              />
                            </div>
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setReplyingToId(null)}
                                className="text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => handleReplySubmit(msg.id)}
                                className="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-bold text-white hover:bg-indigo-700 cursor-pointer"
                              >
                                Send Reply
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setReplyingToId(msg.id);
                              setReplyText("");
                            }}
                            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                          >
                            <CornerDownRight className="h-3 w-3" />
                            <span>Reply to thread</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: AI CAREER COUNSELOR */}
        {boardMode === "ai-counselor" && (
          <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
            {/* Counselor Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">Dream Crafter AI Counselor</h3>
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                      Online & Ready
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    High-reasoning academic advisement & course matching engine
                  </p>
                </div>
              </div>

              <button
                onClick={onNavigateToAdmissions}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 cursor-pointer shadow-md"
              >
                <span>Jump to Online Admissions</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Chat History Box */}
            <div className="p-6 sm:p-8 space-y-4 max-h-[500px] overflow-y-auto bg-slate-50/50">
              {counselorChatHistory.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex ${item.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      item.sender === "user"
                        ? "bg-indigo-600 text-white rounded-br-none"
                        : "bg-white text-slate-800 border border-slate-200 shadow-xs rounded-bl-none space-y-3"
                    }`}
                  >
                    <p className="whitespace-pre-line">{item.text}</p>

                    {/* Rich Response Recommendations */}
                    {item.data?.recommendedPrograms && item.data.recommendedPrograms.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                          Suggested DCI Programs:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.data.recommendedPrograms.map((p, pIdx) => (
                            <span
                              key={pIdx}
                              className="rounded-md bg-indigo-50 border border-indigo-100 px-2 py-1 text-[11px] font-semibold text-indigo-700"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {item.data?.nextSteps && (
                      <div className="mt-2 text-[11px] text-slate-500 space-y-0.5">
                        <span className="font-bold text-slate-700">Next Action Steps:</span>
                        <ul className="list-disc list-inside">
                          {item.data.nextSteps.map((s, sIdx) => (
                            <li key={sIdx}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {aiLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-none bg-white p-4 border border-slate-200 shadow-xs text-xs text-slate-500 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 animate-spin text-teal-600" />
                    <span>Analyzing your profile and curriculum matching...</span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-6 py-3 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[11px] font-bold text-slate-400 shrink-0">Try asking:</span>
              {samplePrompts.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleAskAI(prompt)}
                  className="whitespace-nowrap rounded-lg bg-slate-100 hover:bg-slate-200 px-3 py-1 text-xs text-slate-700 transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <div className="p-4 sm:p-6 bg-white border-t border-slate-200 flex gap-2">
              <input
                type="text"
                placeholder="Ask anything about fees, shifts, course syllabus, or admissions..."
                value={counselorInput}
                onChange={(e) => setCounselorInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-xs sm:text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
              />
              <button
                onClick={() => handleAskAI()}
                disabled={aiLoading || !counselorInput.trim()}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Ask AI</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

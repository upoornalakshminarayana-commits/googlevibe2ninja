"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Brain, User, Zap, RotateCcw } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const STARTER_MESSAGES: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: `Hi Arjun! 👋 I'm your PathPilot AI Mentor, powered by Gemini 2.5 Pro. I know your goals, schedule, and current progress intimately.

You're preparing for **JEE Advanced** with a deadline in May 2025. Your current success probability is **72%** — you're in Yellow Alert territory.

Your biggest risk right now is the **Mathematics syllabus** — particularly Integration and Differential Equations. The Risk Prediction Agent flagged this 2 days ago.

How can I help you today? You can ask me:
- "Create a 2-week recovery plan for Math"
- "What should I focus on today?"
- "Analyze my weak areas"
- "How do I beat burnout?"`,
    timestamp: new Date(),
  },
];

const SAMPLE_RESPONSES = [
  `Great question! Based on your current progress data, here's my analysis:

**Your Mathematics Recovery Plan (2 weeks):**

📅 **Week 1 — Foundation Recovery**
- Day 1-3: Integration by Parts & Substitution (3h/day)
- Day 4-5: Differential Equations basics (2.5h/day)  
- Day 6-7: Full chapter mock tests + error analysis

📅 **Week 2 — Speed & Accuracy**
- Day 1-4: Mixed problem sets (previous year JEE questions)
- Day 5-6: Timed practice (50 problems in 90 min)
- Day 7: Full Mathematics mock test

**Predicted outcome:** If you follow this plan, your Math success probability increases from 45% → 74% by end of Week 2.

💡 **Pro tip:** Your peak hours are 6-9am. Schedule the hardest integration problems then — your retention is 40% better in the morning.

Should I add these tasks to your schedule? 🎯`,

  `Based on your current metrics, here's your optimal today plan:

**Morning (6am-9am) — Peak Hours** ⭐
- 6:00 - 7:30: Integration by Parts (30 problems)
- 7:30 - 9:00: Organic Chemistry — Chapter 12 revision

**Afternoon (2pm-4pm)**
- 2:00 - 3:30: Board exam English essay practice
- 3:30 - 4:00: Review + corrections

**Evening (9pm-11pm)**  
- 9:00 - 10:30: JEE Mock Test Section (Math only)
- 10:30 - 11:00: Analyze mistakes

**Estimated productivity score: 88/100** 🚀

Your total planned hours: **7.5h** — within your optimal range. The Recovery Agent has pre-loaded all resources.

Want me to activate voice reminders for each session?`,

  `I understand you're feeling overwhelmed. This is completely normal when you're 14 days into an intense study streak! 💙

**Burnout Risk Assessment:** Your current stress level is 6/10 and has been rising for 3 days. The Burnout Detection Agent recommends:

🔴 **Immediate:** Take a 25-minute break right now. No screens.

📊 **This week's adjustment:**
- Reduce daily hours from 8h → 6h for 3 days
- Add one "guilt-free" hour per day
- Switch to easier topics (your preference) for 2 days

🧠 **Why this works:** Research shows strategic rest improves long-term retention by 34%. Your brain consolidates memories during rest.

**The math:** 3 days at 6h = 18h vs 3 days at 8h = 24h — BUT your retention efficiency drops 45% when burned out, so you'd only effectively absorb 13.2h worth of content. My plan gives you 18h at 85% efficiency = more actual learning.

Trust the process. You've maintained a 14-day streak — you're not a quitter. You're being strategic. 🎯`,
];

export default function MentorPage() {
  const [messages, setMessages] = useState<Message[]>(STARTER_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const responseIndex = useRef(0);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    // Simulate AI response (replace with real Gemini call)
    await new Promise((r) => setTimeout(r, 1500));

    let responseText: string;
    try {
      const res = await fetch("/api/agents/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input.trim(), context: STARTER_MESSAGES[0].content }),
      });
      if (res.ok) {
        const data = await res.json();
        responseText = data.response;
      } else {
        throw new Error("API error");
      }
    } catch {
      // Fallback to sample responses
      responseText = SAMPLE_RESPONSES[responseIndex.current % SAMPLE_RESPONSES.length];
      responseIndex.current++;
    }

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responseText,
      timestamp: new Date(),
    };
    setMessages((m) => [...m, aiMsg]);
    setLoading(false);
  };

  const quickPrompts = [
    "Create a recovery plan for Math",
    "What should I focus on today?",
    "Analyze my weak areas",
    "I'm feeling burned out",
    "Boost my motivation",
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <Brain size={20} className="text-violet-400" />
            AI Mentor
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">Powered by Gemini 2.5 Pro · Knows your goals & progress</p>
        </div>
        <div className="flex gap-2">
          <div className="badge-violet text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Online
          </div>
          <button
            onClick={() => setMessages(STARTER_MESSAGES)}
            className="p-2 text-slate-400 hover:text-white glass rounded-lg transition-all"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4 pr-2">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                msg.role === "assistant"
                  ? "bg-gradient-to-br from-violet-600 to-violet-800"
                  : "bg-gradient-to-br from-cyan-600 to-cyan-800"
              }`}>
                {msg.role === "assistant" ? <Brain size={15} className="text-white" /> : <User size={15} className="text-white" />}
              </div>

              {/* Bubble */}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "glass-cyan text-white"
                  : "glass text-slate-300"
              }`}>
                {/* Render markdown-like formatting */}
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
                    part.startsWith("**") && part.endsWith("**")
                      ? <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
                      : part
                  )}
                </div>
                <div className="text-[10px] text-slate-600 mt-2">
                  {msg.timestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading indicator */}
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center flex-shrink-0">
              <Brain size={15} className="text-white" />
            </div>
            <div className="glass rounded-2xl px-4 py-3 flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "0.15s" }} />
              <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "0.3s" }} />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick prompts */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => setInput(prompt)}
            className="flex-shrink-0 text-xs px-3 py-1.5 rounded-lg glass text-slate-400 hover:text-white transition-all"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <div className="flex-1 flex items-center gap-2 input-field px-4 py-3">
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-white placeholder-slate-500 text-sm"
            placeholder="Ask your AI mentor anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          />
          <button
            onClick={() => setIsListening(!isListening)}
            className={`p-1.5 rounded-lg transition-all ${isListening ? "text-red-400 bg-red-400/10" : "text-slate-500 hover:text-white"}`}
          >
            <Mic size={16} />
          </button>
        </div>
        <button
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          className="btn-primary px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

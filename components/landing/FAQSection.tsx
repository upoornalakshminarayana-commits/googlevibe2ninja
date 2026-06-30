"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How does PathPilot AI predict deadline failure?",
    a: "Our Risk Prediction Agent (powered by Gemini 2.5 Pro) analyzes your daily task completion velocity, compares it against your deadline, factors in historical patterns, and calculates a success probability score. When it drops below 60%, you get a Yellow Alert; below 40%, a Red Alert with a recovery plan.",
  },
  {
    q: "Which exams does PathPilot AI support?",
    a: "PathPilot AI supports JEE Main & Advanced, NEET UG, GATE (all branches), UPSC, CAT, GMAT, GRE, board exams, and professional certifications. Our Goal Planning Agent is trained on syllabus patterns for all major Indian competitive exams.",
  },
  {
    q: "How are the 10 AI agents different from a regular chatbot?",
    a: "Each agent has a specialized role and acts autonomously. Unlike a chatbot that only responds to questions, our agents proactively monitor your progress, take actions (like rescheduling tasks), and communicate with each other to give you a coordinated success strategy.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. All data is stored in Google Firebase with bank-level encryption. Your goal and study data never leaves Google Cloud infrastructure. We don't sell or share your personal information. You can export or delete your data anytime.",
  },
  {
    q: "Can working professionals use PathPilot AI?",
    a: "Absolutely. PathPilot AI is built for anyone with goals and deadlines — whether you're preparing for GATE while working, building a startup, getting a promotion, or learning a new skill. The Scheduling Agent respects your work hours and builds plans around your availability.",
  },
  {
    q: "What is the Black Alert mode?",
    a: "Black Alert is our most critical state — triggered when deadline failure probability exceeds 90%. It activates Recovery Mode: all non-essential tasks are paused, an emergency catch-up plan is generated, and you receive priority coaching from the AI Mentor to maximize your remaining time.",
  },
  {
    q: "Does PathPilot AI integrate with Google Calendar and Gmail?",
    a: "Yes. Our Calendar Management Agent syncs with Google Calendar to schedule study blocks and deadlines. The Gmail Parsing Agent scans your inbox for assignment emails, meeting invites, and deadline notifications to automatically create tasks.",
  },
  {
    q: "What is the AI Digital Twin?",
    a: "The AI Digital Twin is a predictive model of you — built from your study patterns, completion rates, energy levels, and historical data. It simulates how 'future-you' would perform under different scenarios, helping you make better decisions today to achieve your goals tomorrow.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="rounded-xl overflow-hidden"
      style={{
        background: open ? "rgba(124,21,240,0.08)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${open ? "rgba(124,21,240,0.3)" : "rgba(255,255,255,0.06)"}`,
        transition: "all 0.3s ease",
      }}
    >
      <button
        className="w-full flex items-center justify-between p-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-white text-sm md:text-base pr-4">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown
            size={18}
            className={`transition-colors ${open ? "text-violet-400" : "text-slate-500"}`}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="faq" className="section-padding" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <div className="badge-violet mb-4 mx-auto w-fit">
            <span>❓</span> FAQ
          </div>
          <h2 className="section-title font-display">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to know about PathPilot AI.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

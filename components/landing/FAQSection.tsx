"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How does PathPilot AI predict deadline failure?",
    a: "Our Risk Prediction Agent analyzes your historical task completion rate, current study velocity, and active stress cap. Comparing these against your target deadline date, it calculates a dynamic success probability. When this score falls under safety thresholds, it activates recovery routines.",
  },
  {
    q: "Which competitive exams are supported out of the box?",
    a: "PathPilot AI pre-supports major exams including JEE Main/Advanced, NEET UG, GATE, UPSC, CAT, GMAT, and board syllabus frameworks. The Goal Agent can also ingest customized syllabus PDFs to construct custom progress routes.",
  },
  {
    q: "How does the multi-agent system differ from a standard chatbot?",
    a: "Chatbots only reply when prompted. PathPilot's 10 agents operate continuously in the background. The Risk Predictor constantly scans completion trends, the Scheduling Agent rearranges calendars, and the Recovery Agent writes catch-up tasks automatically.",
  },
  {
    q: "Is my personal data safe and private?",
    a: "Absolutely. Your data is stored securely in Google Firebase with secure rules and TLS encryption. Goal logs and study habits are private and never sold or used to train third-party AI models. You can export or delete your profile anytime.",
  },
  {
    q: "Can working professionals utilize PathPilot?",
    a: "Yes. The Scheduling Agent adapts to custom availability parameters (such as limiting active sessions to 8:00 PM - 10:00 PM on weekdays). It is used for interview preparation, side projects, startup goals, and skill upgrades.",
  },
  {
    q: "What triggers the Black Alert state?",
    a: "A Black Alert triggers when failure probability exceeds 90% or the syllabus lag exceeds 4 weeks. In this emergency mode, all non-essential tasks are paused, daily hours are dynamically optimized, and the AI Mentor sets structured mock goals to recover progress.",
  },
  {
    q: "Does PathPilot sync with external tools?",
    a: "Yes, it integrates with Google Calendar to push study blocks, and Google Calendar updates sync back. The Gmail parser scans assignment briefs and test notification metadata to automatically register milestones.",
  },
  {
    q: "What is the AI Digital Twin model?",
    a: "The digital twin is a simulation profile built from your daily velocity metrics, energy spikes, and focus efficiency. It runs scenarios in the background to predict how future variables (like fatigue or extra mock exams) will affect your final deadline.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="rounded-xl overflow-hidden border border-white/[0.04] transition-all duration-300"
      style={{
        background: open ? "rgba(124, 21, 240, 0.04)" : "rgba(255, 255, 255, 0.01)",
        borderColor: open ? "rgba(124, 21, 240, 0.25)" : "rgba(255, 255, 255, 0.04)",
      }}
    >
      <button
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-sans font-bold text-white text-[14px] md:text-base pr-6 leading-snug">
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown
            size={16}
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
            <div className="px-6 pb-6 text-slate-400 text-xs md:text-sm leading-relaxed border-t border-white/[0.03] pt-4.5">
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
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="relative py-24 bg-[#02040a]" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">
            ❓ Support FAQ
          </span>
          <h2 className="section-heading font-sans font-bold">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="section-desc">
            Find answers to commonly asked questions about our AI coordination logic, system security, and integration options.
          </p>
        </div>

        {/* Accordions Stack */}
        <div className="flex flex-col gap-4 max-w-3xl mx-auto mt-12">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

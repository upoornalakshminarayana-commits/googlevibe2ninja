"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, ShieldAlert, Zap } from "lucide-react";

const traditionalFeatures = [
  { text: "Manual task planning and calendar maintenance", status: false },
  { text: "Static alarm reminders only after you've missed deadlines", status: false },
  { text: "No understanding of syllabus, energy levels, or study lag", status: false },
  { text: "Requires high self-discipline; leads to guilt and stress", status: false },
  { text: "No path correction when you fall behind schedule", status: false },
];

const pathPilotFeatures = [
  { text: "10 autonomous agents handling scheduling, reminders & planning", status: true },
  { text: "Predictive risk analyzer alerts you 3 weeks before failure", status: true },
  { text: "Learns peak hours, availability, and active stress index", status: true },
  { text: "Empathetic daily mentor keeps you accountable without guilt", status: true },
  { text: "Recovery Agent generates realistic catch-up plans instantly", status: true },
];

export default function ComparisonSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="comparison" className="relative py-24 bg-[#02040a]" ref={ref}>
      {/* Background glow lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c15f0, transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">
            <ShieldAlert size={12} className="text-violet-400" />
            Comparison
          </span>
          <h2 className="section-heading font-sans font-bold">
            Why Traditional Productivity <br />
            <span className="gradient-text">Apps Fail You</span>
          </h2>
          <p className="section-desc">
            Unlike static checklists or calendar apps that expect you to act like a robot, PathPilot adapts to your dynamic human pace.
          </p>
        </div>

        {/* Side-by-Side Cards (Equal Height, Padding, Spacing, Typography) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Card 1: Traditional Apps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col rounded-2xl p-8 md:p-10 bg-slate-950/40 border border-white/5 backdrop-blur-md relative overflow-hidden h-full"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-500">
                <X size={18} />
              </div>
              <div>
                <h3 className="font-sans font-bold text-lg text-slate-400">Traditional To-Do Apps</h3>
                <p className="text-slate-600 text-xs mt-0.5">Calendars, Trello, manual planners</p>
              </div>
            </div>

            {/* List */}
            <ul className="flex flex-col gap-4.5 flex-grow">
              {traditionalFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-3.5 text-sm leading-relaxed text-slate-500">
                  <X size={15} className="mt-0.5 text-rose-500 shrink-0" />
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-white/5">
              <span className="text-slate-600 text-xs font-mono font-medium tracking-wider uppercase block">
                Result: Unpredictable Burnout
              </span>
            </div>
          </motion.div>

          {/* Card 2: PathPilot AI */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col rounded-2xl p-8 md:p-10 bg-gradient-to-br from-[#0c071e]/70 to-[#03060f]/90 border border-violet-500/25 backdrop-blur-md relative overflow-hidden shadow-2xl h-full"
            style={{ boxShadow: "0 10px 40px rgba(124, 21, 240, 0.08)" }}
          >
            {/* Glow effect */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-violet-600/10 blur-2xl pointer-events-none rounded-full" />

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
                <Zap size={18} className="fill-violet-400/20" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-lg text-white">PathPilot Autonomous AI</h3>
                <p className="text-violet-400/70 text-xs mt-0.5">Powered by Gemini 2.5 Multi-Agents</p>
              </div>
            </div>

            {/* List */}
            <ul className="flex flex-col gap-4.5 flex-grow">
              {pathPilotFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-3.5 text-sm leading-relaxed text-slate-300">
                  <Check size={15} className="mt-0.5 text-violet-400 shrink-0" />
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-violet-500/15">
              <span className="text-violet-400 text-xs font-mono font-bold tracking-wider uppercase block">
                Result: Guaranteed Goal Achievement
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { UserCircle, Brain, Calendar, TrendingUp, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: <UserCircle size={24} />,
    title: "Define Your Goal",
    description: "Specify your target (JEE, NEET, GATE, or custom projects), input your deadline, and set daily available hours.",
    color: "#7c15f0",
    glow: "rgba(124, 21, 240, 0.2)",
  },
  {
    step: "02",
    icon: <Brain size={24} />,
    title: "AI Plans Your Path",
    description: "10 autonomous Gemini agents analyze your goal, break down the syllabus, and schedule dynamic daily milestones.",
    color: "#06b6d4",
    glow: "rgba(6, 182, 212, 0.2)",
  },
  {
    step: "03",
    icon: <Calendar size={24} />,
    title: "Execute Guided Tasks",
    description: "Access a structured task list every morning that matches your peak energy hours. Log your hours as you complete them.",
    color: "#a855f7",
    glow: "rgba(168, 85, 247, 0.2)",
  },
  {
    step: "04",
    icon: <TrendingUp size={24} />,
    title: "Predict & Recover Failures",
    description: "When delays occur, our Risk Predictor flags it weeks early, and the Recovery Agent generates a realistic catch-up plan.",
    color: "#10b981",
    glow: "rgba(16, 185, 129, 0.2)",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="relative py-24 bg-[#02040a]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">
            🔄 AI Workflow
          </span>
          <h2 className="section-heading font-sans font-bold">
            How <span className="gradient-text">PathPilot AI</span> Works
          </h2>
          <p className="section-desc">
            A continuous, 4-step autonomous workflow that guides you from starting line to guaranteed goal completion.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative mt-12">
          {/* Horizontal Line connecting steps (Desktop only) */}
          <div
            className="hidden lg:block absolute top-14 left-16 right-16 h-px pointer-events-none z-0"
            style={{
              background: "linear-gradient(90deg, rgba(124, 21, 240, 0.25) 0%, rgba(6, 182, 212, 0.25) 50%, rgba(16, 185, 129, 0.25) 100%)",
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 z-10 relative">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 35 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="flex flex-col items-center text-center group h-full"
              >
                {/* Step Card Wrapper for unified heights & alignment */}
                <div className="card-base flex flex-col items-center p-6 h-full w-full bg-slate-950/40 border border-white/5 relative">
                  {/* Step Badge */}
                  <div
                    className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white font-mono"
                    style={{ background: step.color }}
                  >
                    STEP {step.step}
                  </div>

                  {/* Icon Container */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mt-2 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: `radial-gradient(circle, ${step.color}20, ${step.color}08)`,
                      border: `1px solid ${step.color}35`,
                      color: step.color,
                      boxShadow: `0 0 20px ${step.glow}`,
                    }}
                  >
                    {step.icon}
                  </div>

                  {/* Step Title */}
                  <h3 className="font-sans font-bold text-white text-base mb-3 tracking-tight">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-slate-400 text-xs leading-relaxed flex-grow">
                    {step.description}
                  </p>

                  {/* Connection indicator inside card for tablets/mobile */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-4.5 top-10 z-20 w-8 h-8 rounded-full items-center justify-center bg-slate-900 border border-white/5 shadow-md">
                      <ArrowRight size={13} className="text-slate-500" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-2.5 justify-center mt-14"
        >
          {[
            "Free forever plan tier",
            "10 coordinated AI agents",
            "Real-time study twin metrics",
            "Responsive dashboard access",
            "Google Calendar API integrated",
          ].map((tag) => (
            <span key={tag} className="badge-violet text-[11px] font-semibold py-1.5 px-4 bg-white/[0.02] border border-white/5 text-slate-400">
              ✓ {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

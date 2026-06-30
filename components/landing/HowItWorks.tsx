"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { UserCircle, Brain, Calendar, TrendingUp, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: <UserCircle size={28} />,
    title: "Tell PathPilot Your Goal",
    description: "Share your target — crack JEE, get promoted, launch a startup. Set your deadline and available hours.",
    color: "#7c15f0",
    glow: "rgba(124, 21, 240, 0.3)",
  },
  {
    step: "02",
    icon: <Brain size={28} />,
    title: "AI Architects Your Path",
    description: "10 Gemini AI agents analyze your goal, create a personalized roadmap, and schedule daily tasks automatically.",
    color: "#06b6d4",
    glow: "rgba(6, 182, 212, 0.3)",
  },
  {
    step: "03",
    icon: <Calendar size={28} />,
    title: "Execute Your Daily Plan",
    description: "Each day, AI gives you a prioritized action list, monitors your progress, and adapts based on your pace.",
    color: "#a855f7",
    glow: "rgba(168, 85, 247, 0.3)",
  },
  {
    step: "04",
    icon: <TrendingUp size={28} />,
    title: "AI Saves You Before Failure",
    description: "When you fall behind, the Recovery Agent automatically generates a catch-up plan so you never miss a deadline.",
    color: "#10b981",
    glow: "rgba(16, 185, 129, 0.3)",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="section-padding relative overflow-hidden">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="badge-cyan mb-4 mx-auto w-fit">
            <span>🔄</span> AI Workflow
          </div>
          <h2 className="section-title font-display">
            How <span className="gradient-text">PathPilot AI</span> Works
          </h2>
          <p className="section-subtitle">
            From goal input to guaranteed success — a 4-step AI-powered workflow that adapts to you every single day.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-14 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent 5%, rgba(124,21,240,0.3) 20%, rgba(6,182,212,0.3) 80%, transparent 95%)" }} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative group"
              >
                <div className="card-feature p-6 h-full text-center flex flex-col items-center">
                  {/* Step Number + Icon */}
                  <div className="relative mb-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2 mx-auto transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${step.color}30, ${step.color}15)`,
                        border: `1px solid ${step.color}40`,
                        boxShadow: `0 0 20px ${step.glow}`,
                        color: step.color,
                      }}
                    >
                      {step.icon}
                    </div>
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center"
                      style={{ background: step.color, color: "white" }}
                    >
                      {step.step}
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-white text-lg mb-3 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1">
                    {step.description}
                  </p>

                  {/* Arrow (except last) */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-4 top-14 z-10 w-8 h-8 rounded-full items-center justify-center glass-violet">
                      <ArrowRight size={14} className="text-violet-400" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Feature Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap gap-3 justify-center mt-12"
        >
          {[
            "✅ No credit card required",
            "🤖 10 AI Agents working 24/7",
            "📊 Real-time progress tracking",
            "🔔 Smart deadline alerts",
            "📱 Works on all devices",
          ].map((tag) => (
            <span key={tag} className="badge-violet text-xs py-1.5 px-4">
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

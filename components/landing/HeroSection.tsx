"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Zap } from "lucide-react";
import { useRef } from "react";

const floatingCards = [
  { icon: "⚠️", label: "Risk Detected", sub: "Math syllabus 3 weeks behind", color: "#f59e0b", delay: 0 },
  { icon: "🎯", label: "Goal Achieved!", sub: "Physics target completed", color: "#10b981", delay: 0.3 },
  { icon: "🤖", label: "AI Agent Active", sub: "Recovery plan generated", color: "#7c15f0", delay: 0.6 },
  { icon: "📊", label: "Success Score", sub: "76/100 — Yellow Alert", color: "#06b6d4", delay: 0.9 },
];

const agentOrbs = [
  { label: "Goal AI", color: "#7c15f0", x: "12%", y: "22%", size: 60 },
  { label: "Risk AI", color: "#f59e0b", x: "88%", y: "18%", size: 52 },
  { label: "Chat AI", color: "#06b6d4", x: "82%", y: "68%", size: 56 },
  { label: "Plan AI", color: "#10b981", x: "14%", y: "72%", size: 50 },
  { label: "Core", color: "#a855f7", x: "50%", y: "48%", size: 84 },
];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[92vh] lg:min-h-[96vh] flex flex-col items-center justify-center overflow-hidden pt-28 pb-16"
      style={{ background: "linear-gradient(180deg, #02040a 0%, #050b18 45%, #0f0422 80%, #02040a 100%)" }}
    >
      {/* Animated Background Orbs */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none z-0">
        <div className="orb orb-violet absolute top-[5%] left-[-5%] opacity-15" />
        <div className="orb orb-cyan absolute bottom-[5%] right-[-5%] opacity-10" />
        <div className="orb orb-violet absolute top-[35%] right-[15%] w-80 h-80 opacity-8" />
      </motion.div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30 z-0 pointer-events-none" />

      {/* Connection Lines (Desktop only) */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none z-0">
        {agentOrbs.map((orb, i) => (
          <motion.div
            key={orb.label}
            className="absolute rounded-full flex items-center justify-center text-[10px] font-bold text-white font-mono"
            style={{
              left: orb.x,
              top: orb.y,
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle, ${orb.color}33, ${orb.color}10)`,
              border: `1px solid ${orb.color}40`,
              boxShadow: `0 0 ${orb.size / 2}px ${orb.color}20`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.04, 1],
              boxShadow: [
                `0 0 ${orb.size / 2}px ${orb.color}20`,
                `0 0 ${orb.size}px ${orb.color}35`,
                `0 0 ${orb.size / 2}px ${orb.color}20`,
              ],
            }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
          >
            {orb.label}
          </motion.div>
        ))}

        <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c15f0" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <line x1="12%" y1="22%" x2="50%" y2="48%" stroke="url(#line-grad)" strokeWidth="1.2" />
          <line x1="88%" y1="18%" x2="50%" y2="48%" stroke="url(#line-grad)" strokeWidth="1.2" />
          <line x1="82%" y1="68%" x2="50%" y2="48%" stroke="url(#line-grad)" strokeWidth="1.2" />
          <line x1="14%" y1="72%" x2="50%" y2="48%" stroke="url(#line-grad)" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 flex flex-col items-center justify-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="badge-violet gap-2 text-xs py-1.5 px-4 bg-violet-500/10 border border-violet-500/30">
            <Zap size={11} className="text-violet-400 fill-violet-400 animate-pulse" />
            <span>Powered by Gemini 2.5 Pro — 10 Specialized Agents</span>
          </div>
        </motion.div>

        {/* Hero Title Redesign (OpenAI & Vercel style) */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-sans font-extrabold tracking-tight text-white mb-6 text-balance"
          style={{
            fontSize: "clamp(2.5rem, 5.2vw, 4.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
          }}
        >
          Your Autonomous AI Companion <br />
          <span className="gradient-text">That Never Misses a Deadline</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 max-w-2xl mx-auto mb-9 text-base md:text-[17px] leading-relaxed text-balance"
        >
          PathPilot AI coordinates <span className="text-violet-400 font-semibold">10 autonomous Gemini agents</span> to
          model your study habits, predict delays weeks in advance, and adapt schedules for{" "}
          <span className="text-cyan-400 font-semibold">JEE, NEET, and GATE</span> aspirants.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full sm:w-auto mb-16"
        >
          <Link href="/auth/login" className="btn-primary text-sm py-3 px-7 rounded-xl w-full sm:w-auto">
            Get Started Free
            <ArrowRight size={16} />
          </Link>
          <a href="#how-it-works" className="btn-ghost text-sm py-3 px-6 rounded-xl w-full sm:w-auto flex items-center justify-center gap-2">
            <Play size={12} className="fill-current text-slate-300" />
            Watch Product Demo
          </a>
        </motion.div>

        {/* Floating Notification Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mx-auto"
        >
          {floatingCards.map((card, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5 + i * 0.4, repeat: Infinity, delay: card.delay, ease: "easeInOut" }}
              className="glass rounded-xl p-4 text-left border transition-all duration-300 hover:bg-white/[0.06]"
              style={{ borderColor: `${card.color}25` }}
            >
              <div className="text-2xl mb-2">{card.icon}</div>
              <div className="text-[13px] font-bold text-white mb-1 truncate">{card.label}</div>
              <div className="text-[11px] text-slate-500 leading-snug line-clamp-2">{card.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Subtle bottom gradient shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#02040a] to-transparent pointer-events-none" />
    </section>
  );
}

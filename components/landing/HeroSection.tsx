"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Zap, Brain, Target, TrendingUp } from "lucide-react";
import { useRef } from "react";

const floatingCards = [
  { icon: "⚠️", label: "Risk Detected", sub: "Math syllabus 3 weeks behind", color: "#f59e0b", delay: 0 },
  { icon: "🎯", label: "Goal Achieved!", sub: "Physics target completed", color: "#10b981", delay: 0.3 },
  { icon: "🤖", label: "AI Agent Active", sub: "Recovery plan generated", color: "#7c15f0", delay: 0.6 },
  { icon: "📊", label: "Success Score", sub: "76/100 — Yellow Alert", color: "#06b6d4", delay: 0.9 },
];

const agentOrbs = [
  { label: "Goal AI", color: "#7c15f0", x: "10%", y: "20%", size: 60 },
  { label: "Risk AI", color: "#f59e0b", x: "85%", y: "15%", size: 50 },
  { label: "Chat AI", color: "#06b6d4", x: "75%", y: "70%", size: 55 },
  { label: "Plan AI", color: "#10b981", x: "15%", y: "75%", size: 48 },
  { label: "Core", color: "#a855f7", x: "50%", y: "45%", size: 80 },
];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
      style={{ background: "linear-gradient(135deg, #03060f 0%, #0a1628 40%, #1a0533 70%, #03060f 100%)" }}
    >
      {/* Animated Background Orbs */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="orb orb-violet absolute top-[-10%] left-[-5%] opacity-20" />
        <div className="orb orb-cyan absolute bottom-[-10%] right-[-5%] opacity-15 animation-delay-4000" />
        <div className="orb orb-violet absolute top-[40%] right-[10%] w-96 h-96 opacity-10" />
      </motion.div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Floating Agent Orbs Visualization */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none">
        {agentOrbs.map((orb, i) => (
          <motion.div
            key={orb.label}
            className="absolute rounded-full flex items-center justify-center text-[9px] font-bold text-white"
            style={{
              left: orb.x,
              top: orb.y,
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle, ${orb.color}40, ${orb.color}15)`,
              border: `1px solid ${orb.color}50`,
              boxShadow: `0 0 ${orb.size/2}px ${orb.color}30`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.05, 1],
              boxShadow: [
                `0 0 ${orb.size/2}px ${orb.color}30`,
                `0 0 ${orb.size}px ${orb.color}50`,
                `0 0 ${orb.size/2}px ${orb.color}30`,
              ],
            }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
          >
            {orb.label}
          </motion.div>
        ))}

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c15f0" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <line x1="10%" y1="20%" x2="50%" y2="45%" stroke="url(#line-grad)" strokeWidth="1" />
          <line x1="85%" y1="15%" x2="50%" y2="45%" stroke="url(#line-grad)" strokeWidth="1" />
          <line x1="75%" y1="70%" x2="50%" y2="45%" stroke="url(#line-grad)" strokeWidth="1" />
          <line x1="15%" y1="75%" x2="50%" y2="45%" stroke="url(#line-grad)" strokeWidth="1" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <div className="badge-violet gap-2 text-sm py-1.5 px-4">
            <Zap size={12} className="animate-pulse" />
            Powered by Gemini 2.5 Pro — 10 AI Agents
            <Zap size={12} className="animate-pulse" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-bold leading-[1.1] mb-6"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          <span className="text-white">Your AI Companion</span>
          <br />
          <span className="gradient-text">That Never Lets You</span>
          <br />
          <span className="text-white">Miss a Deadline</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          PathPilot AI uses <span className="text-violet-400 font-semibold">10 specialized Gemini agents</span> to predict
          deadline failures, generate recovery plans, and guide{" "}
          <span className="text-cyan-400 font-semibold">JEE, NEET, GATE aspirants</span> and professionals to success.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link href="/auth/login" className="btn-primary text-base py-3.5 px-8">
            Start Your Journey Free
            <ArrowRight size={18} />
          </Link>
          <a href="#how-it-works" className="btn-secondary text-base py-3.5 px-8">
            <Play size={16} className="fill-current" />
            See How It Works
          </a>
        </motion.div>

        {/* Trust Line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-slate-500 text-sm mb-16"
        >
          No credit card required · 50,000+ students & professionals · Powered by Google AI
        </motion.p>

        {/* Floating Notification Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto"
        >
          {floatingCards.map((card, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: card.delay, ease: "easeInOut" }}
              className="glass rounded-xl p-3 text-left"
              style={{ borderColor: `${card.color}30` }}
            >
              <div className="text-xl mb-1.5">{card.icon}</div>
              <div className="text-xs font-semibold text-white mb-0.5">{card.label}</div>
              <div className="text-[10px] text-slate-500 leading-tight">{card.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-slate-600 text-xs font-medium tracking-widest uppercase">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-slate-700 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-violet-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AGENTS_INFO } from "@/lib/demo-data";

export default function AgentsCarousel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="agents" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="badge-cyan mb-4 mx-auto w-fit">
            <span>🤖</span> Multi-Agent System
          </div>
          <h2 className="section-title font-display">
            10 AI Agents Working <span className="gradient-text">For You 24/7</span>
          </h2>
          <p className="section-subtitle">
            Each agent specializes in one critical aspect of your success — together they form an unstoppable AI workforce.
          </p>
        </motion.div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {AGENTS_INFO.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="relative group rounded-2xl p-5 cursor-pointer transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${agent.color}12, ${agent.color}05)`,
                border: `1px solid ${agent.color}25`,
              }}
            >
              {/* Active indicator */}
              <motion.div
                className="absolute top-3 right-3 w-2 h-2 rounded-full"
                style={{ background: agent.color }}
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />

              {/* Icon */}
              <div className="text-3xl mb-3">{agent.icon}</div>

              {/* Agent Number */}
              <div
                className="text-[10px] font-bold mb-1 font-mono"
                style={{ color: agent.color }}
              >
                AGENT #{String(agent.id).padStart(2, "0")}
              </div>

              {/* Name */}
              <h3 className="font-display font-semibold text-white text-sm mb-2 leading-tight">
                {agent.name}
              </h3>

              {/* Description */}
              <p className="text-slate-500 text-xs leading-relaxed">
                {agent.description}
              </p>

              {/* Hover glow border */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: `inset 0 0 0 1px ${agent.color}60, 0 0 30px ${agent.color}20` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Connection Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-12 p-6 rounded-2xl text-center"
          style={{
            background: "linear-gradient(135deg, rgba(124,21,240,0.08), rgba(6,182,212,0.05))",
            border: "1px solid rgba(124,21,240,0.2)",
          }}
        >
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-400 text-xs">All agents active</span>
            </div>
            <div className="h-4 w-px bg-slate-700" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-slate-400 text-xs">Powered by Gemini 2.5 Pro</span>
            </div>
            <div className="h-4 w-px bg-slate-700" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-slate-400 text-xs">Orchestrated via Google Cloud</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

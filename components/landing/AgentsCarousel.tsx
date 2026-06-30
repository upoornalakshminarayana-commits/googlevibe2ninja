"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AGENTS_INFO } from "@/lib/demo-data";

export default function AgentsCarousel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="agents" className="relative py-24 bg-[#02040a]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">
            🤖 Multi-Agent Engine
          </span>
          <h2 className="section-heading font-sans font-bold">
            10 Autonomous <span className="gradient-text">Coordinated Agents</span>
          </h2>
          <p className="section-desc">
            A dedicated suite of specialized AI workers communicating via our telemetry backend to drive you to success.
          </p>
        </div>

        {/* 10 Agent Cards Grid (Equal Heights, widths, proper grid spacing, modern hover animations) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-stretch mt-12">
          {AGENTS_INFO.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="card-agent flex flex-col justify-between h-full bg-slate-950/50 border border-white/[0.04] p-6 cursor-pointer relative group transition-all duration-300"
            >
              {/* Dynamic glowing border highlight */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 0 1.2px ${agent.color}50, 0 0 20px ${agent.color}15`,
                }}
              />

              <div>
                {/* Active Indicator & Icon Row */}
                <div className="flex items-center justify-between mb-4.5">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-xl">
                    {agent.icon}
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 py-0.5 px-2 rounded-full">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: agent.color }}
                      animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    />
                    <span className="text-[9px] font-bold text-slate-500 font-mono">LIVE</span>
                  </div>
                </div>

                {/* Agent Number Label */}
                <div
                  className="text-[10px] font-bold font-mono tracking-wider mb-1"
                  style={{ color: agent.color }}
                >
                  MODULE #{String(agent.id).padStart(2, "0")}
                </div>

                {/* Agent Name */}
                <h3 className="font-sans font-bold text-white text-sm mb-2 leading-snug tracking-tight">
                  {agent.name}
                </h3>

                {/* Agent Description */}
                <p className="text-slate-500 text-[12px] leading-relaxed">
                  {agent.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coordinated System status board */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-14 p-5 rounded-xl text-center max-w-3xl mx-auto bg-gradient-to-r from-violet-500/[0.04] to-cyan-500/[0.03] border border-violet-500/15"
        >
          <div className="flex items-center justify-center gap-x-8 gap-y-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-400 text-xs font-medium font-mono">Agent pipeline operational</span>
            </div>
            <div className="hidden sm:block h-3 w-px bg-slate-800" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-slate-400 text-xs font-medium font-mono">10 dynamic system hooks active</span>
            </div>
            <div className="hidden sm:block h-3 w-px bg-slate-800" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-slate-400 text-xs font-medium font-mono">Orchestrated dynamically via Edge</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

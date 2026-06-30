"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FEATURES } from "@/lib/demo-data";

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  violet: {
    bg: "rgba(124, 21, 240, 0.12)",
    border: "rgba(124, 21, 240, 0.3)",
    text: "#c084fc",
    glow: "rgba(124, 21, 240, 0.2)",
  },
  cyan: {
    bg: "rgba(6, 182, 212, 0.1)",
    border: "rgba(6, 182, 212, 0.25)",
    text: "#22d3ee",
    glow: "rgba(6, 182, 212, 0.15)",
  },
  yellow: {
    bg: "rgba(245, 158, 11, 0.1)",
    border: "rgba(245, 158, 11, 0.25)",
    text: "#fbbf24",
    glow: "rgba(245, 158, 11, 0.15)",
  },
  green: {
    bg: "rgba(16, 185, 129, 0.1)",
    border: "rgba(16, 185, 129, 0.25)",
    text: "#34d399",
    glow: "rgba(16, 185, 129, 0.15)",
  },
  red: {
    bg: "rgba(239, 68, 68, 0.1)",
    border: "rgba(239, 68, 68, 0.25)",
    text: "#f87171",
    glow: "rgba(239, 68, 68, 0.15)",
  },
};

export default function FeaturesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #7c15f0, transparent)" }} />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="badge-violet mb-4 mx-auto w-fit">
            <span>⚡</span> Core Features
          </div>
          <h2 className="section-title font-display">
            Everything You Need to <span className="gradient-text">Win</span>
          </h2>
          <p className="section-subtitle">
            A complete AI-powered success toolkit — from goal planning to burnout prevention, all in one platform.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {FEATURES.map((feature, i) => {
            const colors = colorMap[feature.color] || colorMap.violet;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group relative rounded-2xl p-5 cursor-pointer transition-all duration-500"
                style={{
                  background: colors.bg,
                  border: `1px solid ${colors.border}`,
                }}
                whileHover={{
                  y: -6,
                  boxShadow: `0 20px 40px ${colors.glow}`,
                  borderColor: colors.text,
                }}
              >
                {/* Icon */}
                <div className="text-3xl mb-3">{feature.icon}</div>

                {/* Title */}
                <h3 className="font-display font-semibold text-white text-sm mb-2 leading-tight">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-xs leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl origin-left"
                  style={{ background: `linear-gradient(90deg, ${colors.text}, transparent)` }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 text-sm">
            And{" "}
            <span className="text-violet-400 font-semibold">15+ more features</span> — all powered by Gemini 2.5 Pro
          </p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FEATURES } from "@/lib/demo-data";

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  violet: {
    bg: "rgba(124, 21, 240, 0.03)",
    border: "rgba(124, 21, 240, 0.12)",
    text: "#c084fc",
    glow: "rgba(124, 21, 240, 0.08)",
  },
  cyan: {
    bg: "rgba(6, 182, 212, 0.02)",
    border: "rgba(6, 182, 212, 0.12)",
    text: "#22d3ee",
    glow: "rgba(6, 182, 212, 0.06)",
  },
  yellow: {
    bg: "rgba(245, 158, 11, 0.02)",
    border: "rgba(245, 158, 11, 0.12)",
    text: "#fbbf24",
    glow: "rgba(245, 158, 11, 0.06)",
  },
  green: {
    bg: "rgba(16, 185, 129, 0.02)",
    border: "rgba(16, 185, 129, 0.12)",
    text: "#34d399",
    glow: "rgba(16, 185, 129, 0.06)",
  },
  red: {
    bg: "rgba(239, 68, 68, 0.02)",
    border: "rgba(239, 68, 68, 0.12)",
    text: "#f87171",
    glow: "rgba(239, 68, 68, 0.06)",
  },
};

export default function FeaturesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" className="relative py-24 bg-[#02040a]" ref={ref}>
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #7c15f0, transparent)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">
            ⚡ Platform Highlights
          </span>
          <h2 className="section-heading font-sans font-bold">
            Features Built for <span className="gradient-text">High Achievers</span>
          </h2>
          <p className="section-desc">
            A comprehensive, autonomous success stack constructed with cutting-edge AI orchestration and telemetry.
          </p>
        </div>

        {/* Feature Grid: Balanced 3-column / 5-column grid, Equal heights, clean spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-stretch">
          {FEATURES.map((feature, i) => {
            const colors = colorMap[feature.color] || colorMap.violet;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between h-full bg-slate-950/40 border backdrop-blur-sm cursor-pointer"
                style={{ borderColor: colors.border }}
                whileHover={{
                  y: -5,
                  boxShadow: `0 12px 30px ${colors.glow}`,
                  borderColor: `rgba(255, 255, 255, 0.15)`,
                  background: "rgba(255, 255, 255, 0.02)",
                }}
              >
                <div>
                  {/* Icon Wrapper */}
                  <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-xl mb-4.5">
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-sans font-bold text-white text-[14px] mb-2 leading-snug tracking-tight">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-500 text-[12px] leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Highlight Accent Line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl origin-left pointer-events-none"
                  style={{ background: `linear-gradient(90deg, ${colors.text}, transparent)` }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-14"
        >
          <p className="text-slate-600 text-xs font-medium font-mono uppercase tracking-wider">
            Plus 15+ more micro-features engineered into our core engine
          </p>
        </motion.div>
      </div>
    </section>
  );
}

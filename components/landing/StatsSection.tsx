"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/demo-data";

function AnimatedCounter({ target, suffix, duration = 1800 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const isDecimal = target % 1 !== 0;
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = isDecimal
        ? parseFloat((target * eased).toFixed(1))
        : Math.round(target * eased);
      setCount(current);
      if (progress === 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref} className="ticker">{count}{suffix}</span>;
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 overflow-hidden bg-[#02040a]" ref={ref}>
      {/* Divider grids */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-slate-500 text-xs font-semibold tracking-widest uppercase font-mono">
            Trusted by Achievers Nationwide
          </span>
        </motion.div>

        {/* 4 Cards Grid Redesign: Equal dimensions, Icon top, Number center, Label bottom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="card-stat flex flex-col justify-between items-center text-center p-8 h-full"
            >
              {/* Icon Top */}
              <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-2xl mb-4 text-slate-300">
                {stat.icon}
              </div>

              {/* Number Center */}
              <div
                className="text-4xl md:text-5xl font-sans font-extrabold tracking-tight mb-3 select-none flex-grow flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #a78bfa 0%, #06b6d4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label Bottom */}
              <div className="text-slate-400 text-[13px] font-semibold tracking-wide uppercase font-sans mt-auto">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logo/Tech Partner strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="h-px w-24 bg-white/5 mx-auto mb-8" />
          <p className="text-slate-600 text-[10px] font-bold tracking-widest uppercase font-mono mb-6">
            Engineered with Industry-Leading Infrastructure
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {["Google Gemini 2.5", "Firebase Cloud", "Google Vertex AI", "Next.js", "Vercel Edge"].map((tech) => (
              <span
                key={tech}
                className="text-slate-500 hover:text-slate-300 text-xs font-semibold font-mono tracking-wider transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

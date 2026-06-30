"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MOTIVATIONAL_QUOTES } from "@/lib/demo-data";

const STAR_COUNT = 24;
const STARS = Array.from({ length: STAR_COUNT }, (_, i) => {
  const seed = (i * 137.508 + 42) % 100;
  const seed2 = (i * 73.211 + 17) % 100;
  const seed3 = (i * 31.415 + 7) % 50;
  return {
    left: `${seed}%`,
    top: `${seed2}%`,
    opacity: seed3 / 100 + 0.08,
    duration: 3 + seed3 / 20,
    delay: seed3 / 25,
  };
});

export default function MotivationSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((i) => (i + 1) % MOTIVATIONAL_QUOTES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const q = MOTIVATIONAL_QUOTES[currentIdx];

  return (
    <section className="relative py-24 bg-[#02040a] overflow-hidden" ref={ref}>
      {/* Background glow mapping */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(6,182,212,0.06) 0%, rgba(124,21,240,0.04) 50%, transparent 100%)",
        }}
      />

      {/* Determinisitc Star Field */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {STARS.map((star, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              left: star.left,
              top: star.top,
              opacity: star.opacity,
            }}
            animate={{ opacity: [0.08, 0.5, 0.08] }}
            transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-10"
        >
          <div className="badge-cyan mx-auto w-fit mb-4">
            <span>✨</span> Daily Fuel
          </div>
          <h2 className="section-title font-sans font-bold">
            Words That <span className="gradient-text">Spark Success</span>
          </h2>
        </motion.div>

        {/* Premium Quote Showcase Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="relative p-10 md:p-14 rounded-2xl bg-gradient-to-br from-violet-500/[0.04] to-cyan-500/[0.02] border border-violet-500/20 backdrop-blur-md shadow-xl"
        >
          {/* Quote Mark Icons */}
          <div className="absolute top-6 left-8 text-6xl text-violet-500/10 font-serif select-none leading-none">
            &ldquo;
          </div>
          <div className="absolute bottom-4 right-8 text-6xl text-violet-500/10 font-serif select-none leading-none">
            &rdquo;
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center min-h-[140px]"
            >
              {/* Quote text aligned to 24px/body rules */}
              <p className="text-xl md:text-2xl font-sans text-white leading-relaxed mb-6 font-light italic text-balance">
                {q.quote}
              </p>

              {/* Author Row */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-6 bg-violet-500/40" />
                <span className="text-violet-400 font-bold text-xs font-mono uppercase tracking-wider">
                  {q.author}
                </span>
                <div className="h-px w-6 bg-violet-500/40" />
              </div>

              {/* Category pill */}
              <span className="badge-violet text-[10px] font-bold py-1 px-3 bg-violet-500/5 border-violet-500/20">
                {q.category}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Stepper indicators */}
          <div className="flex justify-center gap-2.5 mt-8">
            {MOTIVATIONAL_QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIdx(i)}
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{ background: i === currentIdx ? "#7c15f0" : "rgba(255,255,255,0.15)" }}
                aria-label={`Show quote ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Verification / Brief tag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-slate-600 text-xs font-mono uppercase tracking-wider mt-8"
        >
          PathPilot AI delivers a custom energy report and motivation briefing to your panel every morning
        </motion.p>
      </div>
    </section>
  );
}

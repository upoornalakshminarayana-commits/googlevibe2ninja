"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { MOTIVATIONAL_QUOTES } from "@/lib/demo-data";

// Pre-generate stable star data to avoid SSR/CSR hydration mismatch
const STAR_COUNT = 30;
const STARS = Array.from({ length: STAR_COUNT }, (_, i) => {
  // Use deterministic-ish values based on index to avoid Math.random() on server
  const seed = (i * 137.508 + 42) % 100;
  const seed2 = (i * 73.211 + 17) % 100;
  const seed3 = (i * 31.415 + 7) % 50;
  return {
    left: `${seed}%`,
    top: `${seed2}%`,
    opacity: (seed3 / 100) + 0.1,
    duration: 2 + (seed3 / 25),
    delay: seed3 / 25,
  };
});

export default function MotivationSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((i) => (i + 1) % MOTIVATIONAL_QUOTES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const q = MOTIVATIONAL_QUOTES[currentIdx];

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      {/* Cosmic background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(124,21,240,0.15) 0%, rgba(6,182,212,0.05) 50%, transparent 100%)",
        }} />

      {/* Star particles */}
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
            animate={{ opacity: [0.1, 0.6, 0.1] }}
            transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-8"
        >
          <div className="badge-cyan mx-auto w-fit mb-6">
            <span>✨</span> Daily Motivation
          </div>
          <h2 className="section-title font-display mb-6">
            Words That <span className="gradient-text">Fuel Champions</span>
          </h2>
        </motion.div>

        {/* Quote Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="relative p-10 rounded-3xl"
          style={{
            background: "linear-gradient(135deg, rgba(124,21,240,0.12) 0%, rgba(6,182,212,0.06) 100%)",
            border: "1px solid rgba(124,21,240,0.25)",
          }}
        >
          {/* Large quote marks */}
          <div className="absolute top-4 left-6 text-6xl text-violet-700/30 font-serif select-none">&ldquo;</div>
          <div className="absolute bottom-4 right-6 text-6xl text-violet-700/30 font-serif select-none">&rdquo;</div>

          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-2xl md:text-3xl font-display text-white leading-relaxed mb-6 font-light italic">
              {q.quote}
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-violet-500" />
              <span className="text-violet-400 font-medium">{q.author}</span>
              <div className="h-px w-8 bg-violet-500" />
            </div>
            <div className="mt-2">
              <span className="badge-violet text-xs">{q.category}</span>
            </div>
          </motion.div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-6">
            {MOTIVATIONAL_QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIdx(i)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{ background: i === currentIdx ? "#7c15f0" : "rgba(255,255,255,0.2)" }}
              />
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-slate-500 text-sm mt-6"
        >
          PathPilot AI delivers personalized motivational briefings every morning based on your goals and mood.
        </motion.p>
      </div>
    </section>
  );
}

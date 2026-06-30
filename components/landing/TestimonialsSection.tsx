"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/lib/demo-data";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="badge-violet mb-4 mx-auto w-fit">
            <span>⭐</span> Success Stories
          </div>
          <h2 className="section-title font-display">
            Real People, <span className="gradient-text">Real Results</span>
          </h2>
          <p className="section-subtitle">
            From IIT to Google, from AIIMS to unicorn startups — PathPilot AI users achieve the extraordinary.
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="card-base p-8 md:p-12 mb-6"
              style={{
                background: "linear-gradient(135deg, rgba(10,22,40,0.9) 0%, rgba(26,5,51,0.6) 100%)",
                border: "1px solid rgba(124,21,240,0.25)",
              }}
            >
              {/* Quote marks */}
              <div className="text-8xl font-serif text-violet-800/30 leading-none mb-2 select-none">&ldquo;</div>

              <div className="grid md:grid-cols-3 gap-8 items-center">
                {/* Left - Avatar + Info */}
                <div className="flex flex-col items-center md:items-start gap-3">
                  <div className="relative">
                    <img
                      src={TESTIMONIALS[current].avatar}
                      alt={TESTIMONIALS[current].name}
                      className="w-20 h-20 rounded-2xl object-cover"
                      style={{ background: "rgba(124,21,240,0.2)" }}
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-navy-900 flex items-center justify-center text-[10px]">
                      ✓
                    </div>
                  </div>

                  <div className="text-center md:text-left">
                    <div className="font-display font-bold text-white text-lg">
                      {TESTIMONIALS[current].name}
                    </div>
                    <div className="text-slate-400 text-sm">{TESTIMONIALS[current].role}</div>
                    <div className="text-violet-400 text-xs mt-1 font-medium">
                      {TESTIMONIALS[current].college}
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Achievement badge */}
                  <div className="badge-green text-xs">
                    🏆 {TESTIMONIALS[current].achievement}
                  </div>
                </div>

                {/* Right - Quote */}
                <div className="md:col-span-2">
                  <p className="text-white text-lg md:text-xl leading-relaxed italic font-light">
                    &ldquo;{TESTIMONIALS[current].quote}&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white transition-all hover:bg-violet-500/20"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="transition-all duration-300"
                >
                  <div
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? "24px" : "8px",
                      height: "8px",
                      background: i === current ? "#7c15f0" : "rgba(255,255,255,0.2)",
                    }}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white transition-all hover:bg-violet-500/20"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Mini testimonial grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-8"
        >
          {TESTIMONIALS.map((t, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`p-3 rounded-xl text-left transition-all duration-200 ${
                i === current
                  ? "glass-violet"
                  : "glass hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2">
                <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-lg" />
                <div>
                  <div className="text-white text-xs font-semibold truncate">{t.name.split(" ")[0]}</div>
                  <div className="text-slate-500 text-[10px] truncate">{t.achievement.split(" — ")[0]}</div>
                </div>
              </div>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

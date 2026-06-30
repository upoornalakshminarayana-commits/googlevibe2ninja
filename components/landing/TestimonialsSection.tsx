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
    <section id="testimonials" className="relative py-24 bg-[#02040a]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">
            ⭐ Success Stories
          </span>
          <h2 className="section-heading font-sans font-bold">
            Results That Speak <span className="gradient-text">For Themselves</span>
          </h2>
          <p className="section-desc">
            Discover how PathPilot AI helps JEE, NEET, and GATE aspirants optimize their daily prep pipelines.
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="relative max-w-4xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="card-base p-8 md:p-12 mb-8 bg-[#070e1c]/80 border border-violet-500/20 shadow-2xl relative overflow-hidden"
            >
              {/* Giant quote mark decoration */}
              <div className="absolute top-2 left-6 text-7xl font-serif text-violet-500/10 leading-none select-none">
                &ldquo;
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">
                {/* Left side: Profile Info */}
                <div className="flex flex-col items-center md:items-start gap-4">
                  <div className="relative">
                    <img
                      src={TESTIMONIALS[current].avatar}
                      alt={TESTIMONIALS[current].name}
                      className="w-16 h-16 rounded-2xl object-cover border border-white/10"
                      style={{ background: "rgba(124,21,240,0.1)" }}
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border border-slate-950 flex items-center justify-center text-[9px] font-bold text-white shadow-sm">
                      ✓
                    </div>
                  </div>

                  <div className="text-center md:text-left">
                    <div className="font-sans font-bold text-white text-base">
                      {TESTIMONIALS[current].name}
                    </div>
                    <div className="text-slate-400 text-xs mt-0.5">{TESTIMONIALS[current].role}</div>
                    <div className="text-violet-400 text-[11px] font-bold mt-1 uppercase font-mono tracking-wider">
                      {TESTIMONIALS[current].college}
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex gap-1.5">
                    {Array.from({ length: TESTIMONIALS[current].rating }).map((_, i) => (
                      <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Badge */}
                  <div className="badge-green text-[10px] font-bold tracking-wider py-1 px-3">
                    🏆 {TESTIMONIALS[current].achievement}
                  </div>
                </div>

                {/* Right side: Detailed Quote */}
                <div className="md:col-span-2">
                  <p className="text-white text-base md:text-lg leading-relaxed italic font-light">
                    &ldquo;{TESTIMONIALS[current].quote}&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-xl glass border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:bg-white/5 active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Slider Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="transition-all duration-300"
                  aria-label={`Go to testimonial ${i + 1}`}
                >
                  <div
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? "16px" : "6px",
                      height: "6px",
                      background: i === current ? "#7c15f0" : "rgba(255,255,255,0.2)",
                    }}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={next}
              className="w-9 h-9 rounded-xl glass border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:bg-white/5 active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Thumbnail Selector Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-12 max-w-4xl mx-auto"
        >
          {TESTIMONIALS.map((t, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`p-3.5 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between ${
                i === current
                  ? "bg-violet-500/10 border-violet-500/40 shadow-lg"
                  : "bg-slate-950/40 border-white/[0.04] hover:bg-white/[0.03]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-lg border border-white/5" />
                <div className="min-w-0">
                  <div className="text-white text-xs font-bold truncate">{t.name.split(" ")[0]}</div>
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

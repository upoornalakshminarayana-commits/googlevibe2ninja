"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-24 bg-[#02040a] overflow-hidden">
      {/* Background glow layers */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full opacity-[0.06] pointer-events-none blur-3xl"
        style={{ background: "#7c15f0" }} />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 rounded-full opacity-[0.05] pointer-events-none blur-3xl"
        style={{ background: "#06b6d4" }} />

      <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-10 md:p-16 border border-violet-500/20 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(124, 21, 240, 0.08) 0%, rgba(6, 182, 212, 0.04) 100%)",
            boxShadow: "0 0 60px rgba(124, 21, 240, 0.06)",
          }}
        >
          {/* Badge */}
          <div className="badge-violet mx-auto w-fit mb-6 bg-violet-500/10 border-violet-500/30">
            <Zap size={11} className="animate-pulse text-violet-400 fill-violet-400" />
            <span>Ready to transform your preparation?</span>
          </div>

          {/* Heading with Inter scale */}
          <h2
            className="font-sans font-extrabold text-white tracking-tight mb-6 text-balance max-w-2xl mx-auto"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Stop Guessing. Start Achieving <br />
            <span className="gradient-text">Before Your Deadline.</span>
          </h2>

          {/* Description */}
          <p className="text-slate-400 text-sm md:text-base mb-10 max-w-2xl mx-auto leading-relaxed text-balance">
            Join thousands of JEE, NEET, and GATE aspirants scaling their daily workflow velocity with 10 autonomous Gemini agents.
          </p>

          {/* Buttons Stack */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
            <Link href="/auth/login" className="btn-primary text-xs py-3 px-8 rounded-xl w-full sm:w-auto">
              <Zap size={14} />
              Start Free Journey
              <ArrowRight size={14} />
            </Link>
            <a href="#how-it-works" className="btn-ghost text-xs py-3 px-7 rounded-xl w-full sm:w-auto border-white/10 hover:border-white/20">
              Explore Documentation
            </a>
          </div>

          {/* Bottom Trust Items */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-12 pt-8 border-t border-white/[0.04] text-[11px] font-mono text-slate-500 uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400">✓</span> Free forever plan
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400">✓</span> Setup in 5 minutes
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400">✓</span> Google AI core partner
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

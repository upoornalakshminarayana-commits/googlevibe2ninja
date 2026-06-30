"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full opacity-10 pointer-events-none blur-3xl"
        style={{ background: "#7c15f0" }} />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-60 h-60 rounded-full opacity-10 pointer-events-none blur-3xl"
        style={{ background: "#06b6d4" }} />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl p-10 md:p-16"
          style={{
            background: "linear-gradient(135deg, rgba(124,21,240,0.15) 0%, rgba(6,182,212,0.08) 100%)",
            border: "1px solid rgba(124,21,240,0.3)",
            boxShadow: "0 0 80px rgba(124,21,240,0.15)",
          }}
        >
          {/* Badge */}
          <div className="badge-violet mx-auto w-fit mb-6">
            <Zap size={12} className="animate-pulse" />
            Start your journey today — it&apos;s free
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
            Don&apos;t Let Another
            <br />
            <span className="gradient-text">Deadline Slip By</span>
          </h2>

          <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Join 50,000+ students and professionals using PathPilot AI to achieve their most ambitious goals — 
            with AI that works as hard as you do.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/login" className="btn-primary text-base py-4 px-10">
              <Zap size={18} />
              Start Free — No Card Needed
              <ArrowRight size={18} />
            </Link>
            <a href="#how-it-works" className="btn-ghost text-base py-4 px-8">
              Learn More
            </a>
          </div>

          {/* Social proof mini */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-white/5">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="text-emerald-400">✓</span> Free forever plan
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="text-emerald-400">✓</span> No credit card required
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="text-emerald-400">✓</span> Setup in 5 minutes
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="text-emerald-400">✓</span> Cancel anytime
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

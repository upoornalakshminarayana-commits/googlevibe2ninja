"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Check, Zap, Crown, Building2 } from "lucide-react";

const plans = [
  {
    name: "Free Plan",
    icon: <Zap size={18} />,
    price: "₹0",
    period: "/forever",
    description: "Ideal for basic daily task scheduling.",
    color: "#06b6d4",
    popular: false,
    features: [
      "1 Active tracking goal",
      "Syllabus roadmap visualizer",
      "3 AI agent operations/day",
      "7-day progress metrics history",
      "Basic email alerts",
    ],
    cta: "Get Started Free",
    href: "/auth/login",
  },
  {
    name: "Pro Member",
    icon: <Crown size={18} />,
    price: "₹499",
    period: "/month",
    description: "Designed for serious exam aspirants.",
    color: "#7c15f0",
    popular: true,
    features: [
      "Unlimited tracking goals",
      "All 10 autonomous AI Agents active",
      "Unlimited AI scheduler operations",
      "Predictive deadline risk detection",
      "Immediate Recovery catch-up plan",
      "Conversational AI Mentor 24/7",
      "Stress curves & burnout detection",
      "Gmail + Google Calendar sync",
      "AI Digital Twin simulation profile",
    ],
    cta: "Start Pro Trial",
    href: "/auth/login",
  },
  {
    name: "Coaching Team",
    icon: <Building2 size={18} />,
    price: "₹2,999",
    period: "/month",
    description: "Built for institutes & mentors.",
    color: "#10b981",
    popular: false,
    features: [
      "Everything in Pro Member tier",
      "Support for up to 100 students",
      "Integrated batch tracking console",
      "Syllabus velocity analytics",
      "Custom trigger rule configuration",
      "Custom brand logo on dashboard",
      "Dedicated account success manager",
      "API webhook integration access",
    ],
    cta: "Contact Sales",
    href: "/auth/login",
  },
];

export default function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="relative py-24 bg-[#02040a]" ref={ref}>
      {/* Background glow circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c15f0, transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">
            💎 Pricing Plans
          </span>
          <h2 className="section-heading font-sans font-bold">
            Transparent Pricing <br />
            <span className="gradient-text">For Every Stage</span>
          </h2>
          <p className="section-desc">
            No hidden setup fees. Upgrade or downgrade your plan tier at any time. Secure billing guaranteed.
          </p>
        </div>

        {/* Plans Grid (Proportional columns, Equal Heights) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mt-12 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className={`relative rounded-2xl p-8 flex flex-col justify-between h-full backdrop-blur-sm transition-all duration-300 border ${
                plan.popular
                  ? "bg-[#0a071c]/70 border-violet-500/35 shadow-2xl scale-[1.02] md:scale-[1.04]"
                  : "bg-slate-950/40 border-white/[0.05]"
              }`}
              style={plan.popular ? { boxShadow: "0 10px 40px rgba(124, 21, 240, 0.08)" } : {}}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 badge-violet text-[10px] font-bold py-1 px-4 border border-violet-500/40 uppercase tracking-wider bg-violet-600/20">
                  ⭐ RECOMMENDED
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border"
                    style={{
                      background: `${plan.color}12`,
                      color: plan.color,
                      borderColor: `${plan.color}35`,
                    }}
                  >
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-white text-base">{plan.name}</h3>
                    <p className="text-slate-500 text-xs mt-0.5">{plan.description}</p>
                  </div>
                </div>

                {/* Price Display */}
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl font-sans font-extrabold text-white tracking-tight">{plan.price}</span>
                  <span className="text-slate-500 text-sm">{plan.period}</span>
                </div>

                {/* Separator line */}
                <div className="h-px bg-white/[0.04] w-full mb-6" />

                {/* Features List */}
                <ul className="flex flex-col gap-4.5 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-xs leading-relaxed text-slate-300">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: plan.color }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button at bottom */}
              <div className="mt-auto">
                <Link
                  href={plan.href}
                  className={`w-full text-center py-3 rounded-xl font-bold text-xs tracking-wide transition-all duration-300 flex items-center justify-center ${
                    plan.popular
                      ? "btn-primary"
                      : "btn-ghost bg-white/[0.02] hover:bg-white/[0.06] border-white/5"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <span className="text-slate-600 text-xs font-mono uppercase tracking-wider">
            🔒 30-day money-back guarantee · Secure payment processing · Cancel anytime
          </span>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Check, Zap, Crown, Building2 } from "lucide-react";

const plans = [
  {
    name: "Free",
    icon: <Zap size={20} />,
    price: "₹0",
    period: "/forever",
    description: "Perfect to get started",
    color: "#06b6d4",
    popular: false,
    features: [
      "1 Active Goal",
      "Basic Task Planning",
      "3 AI Agent calls/day",
      "7-day progress history",
      "Email notifications",
    ],
    cta: "Start Free",
    href: "/auth/login",
  },
  {
    name: "Pro",
    icon: <Crown size={20} />,
    price: "₹499",
    period: "/month",
    description: "For serious aspirants",
    color: "#7c15f0",
    popular: true,
    features: [
      "Unlimited Goals",
      "All 10 AI Agents",
      "Unlimited AI interactions",
      "Deadline Risk Prediction",
      "Recovery Plans",
      "AI Mentor (Chat + Voice)",
      "Weekly PDF Reports",
      "Gmail + Calendar sync",
      "Burnout Detection",
      "AI Digital Twin",
    ],
    cta: "Start Pro Trial",
    href: "/auth/login",
  },
  {
    name: "Enterprise",
    icon: <Building2 size={20} />,
    price: "₹2,999",
    period: "/month",
    description: "For coaching institutes",
    color: "#10b981",
    popular: false,
    features: [
      "Everything in Pro",
      "Up to 100 students",
      "Institute dashboard",
      "Batch progress analytics",
      "Custom alert rules",
      "Priority support",
      "Custom branding",
      "API access",
    ],
    cta: "Contact Sales",
    href: "/auth/login",
  },
];

export default function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="section-padding relative overflow-hidden" ref={ref}>
      {/* BG glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c15f0, transparent)" }} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <div className="badge-violet mb-4 mx-auto w-fit">
            <span>💎</span> Pricing
          </div>
          <h2 className="section-title font-display">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="section-subtitle">
            Start free. Scale as you grow. Cancel anytime. No hidden fees.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-2xl p-6 flex flex-col ${plan.popular ? "scale-105 md:scale-110" : ""}`}
              style={{
                background: plan.popular
                  ? `linear-gradient(135deg, rgba(124,21,240,0.2), rgba(168,85,247,0.1))`
                  : "rgba(10,22,40,0.6)",
                border: `1px solid ${plan.popular ? plan.color + "50" : "rgba(255,255,255,0.08)"}`,
                boxShadow: plan.popular ? `0 0 40px ${plan.color}20` : "none",
              }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 badge-violet text-xs py-1 px-4">
                  ⭐ Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${plan.color}20`, color: plan.color, border: `1px solid ${plan.color}30` }}>
                  {plan.icon}
                </div>
                <div>
                  <div className="font-display font-bold text-white">{plan.name}</div>
                  <div className="text-slate-500 text-xs">{plan.description}</div>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-display font-bold text-white">{plan.price}</span>
                <span className="text-slate-500 text-sm ml-1">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-2.5 flex-1 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={plan.href}
                className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  plan.popular
                    ? "btn-primary"
                    : "btn-ghost hover:bg-white/5"
                }`}
                style={!plan.popular ? { borderColor: plan.color + "40", color: plan.color } : {}}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
          <p className="text-slate-500 text-sm">
            🔒 30-day money-back guarantee · 🏦 Secure payment via Razorpay · 📋 Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}

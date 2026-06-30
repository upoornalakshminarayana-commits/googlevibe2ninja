"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function AlertShowcase() {
  const alerts = [
    {
      level: "GREEN",
      icon: "✅",
      label: "On Track",
      description: "You're ahead of schedule. Keep the momentum!",
      probability: 91,
      className: "alert-green",
      textColor: "#34d399",
      barColor: "#10b981",
    },
    {
      level: "YELLOW",
      icon: "⚠️",
      label: "Attention Needed",
      description: "Minor delays detected. Adjust your schedule now.",
      probability: 67,
      className: "alert-yellow",
      textColor: "#fbbf24",
      barColor: "#f59e0b",
    },
    {
      level: "RED",
      icon: "🚨",
      label: "Critical Risk",
      description: "Deadline failure likely. Recovery plan activated.",
      probability: 38,
      className: "alert-red",
      textColor: "#f87171",
      barColor: "#ef4444",
    },
    {
      level: "BLACK",
      icon: "💀",
      label: "Recovery Mode",
      description: "Emergency AI intervention. All resources focused on goal.",
      probability: 12,
      className: "alert-black",
      textColor: "#9ca3af",
      barColor: "#6b7280",
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="badge-violet mb-4 mx-auto w-fit">
            <span>🔔</span> Alert System
          </div>
          <h2 className="section-title font-display">
            4-Level AI <span className="gradient-text">Alert System</span>
          </h2>
          <p className="section-subtitle">
            PathPilot&apos;s intelligent alert system escalates based on deadline risk — from safe to emergency recovery mode.
          </p>
        </motion.div>

        {/* Alert Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {alerts.map((alert, i) => (
            <motion.div
              key={alert.level}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className={`${alert.className} rounded-2xl p-5 relative overflow-hidden`}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">{alert.icon}</div>
                <span
                  className="text-xs font-bold px-2 py-1 rounded-full font-mono"
                  style={{ background: `${alert.barColor}20`, color: alert.textColor }}
                >
                  {alert.level}
                </span>
              </div>

              {/* Label */}
              <h3 className="font-display font-bold text-white mb-1">{alert.label}</h3>
              <p className="text-slate-400 text-xs mb-4 leading-relaxed">{alert.description}</p>

              {/* Success Probability */}
              <div className="mb-1 flex justify-between items-center">
                <span className="text-slate-500 text-xs">Success Probability</span>
                <span className="font-mono text-sm font-bold" style={{ color: alert.textColor }}>
                  {alert.probability}%
                </span>
              </div>
              <div className="progress-track">
                <motion.div
                  className="progress-fill"
                  style={{ background: alert.barColor }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${alert.probability}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.15 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-slate-400 text-sm mb-4">
            PathPilot AI monitors you <span className="text-violet-400 font-semibold">24/7</span> and escalates alerts automatically — so you&apos;re never blindsided by a missed deadline.
          </p>
          <Link href="/auth/login" className="btn-primary inline-flex">
            <Zap size={16} />
            Start Tracking Your Goals
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

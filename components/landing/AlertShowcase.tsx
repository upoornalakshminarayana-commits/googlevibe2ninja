"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function AlertShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const alerts = [
    {
      level: "GREEN",
      icon: "✅",
      label: "On Track",
      description: "You are ahead of schedule. Keep up the momentum!",
      probability: 91,
      bgStyle: "linear-gradient(135deg, rgba(16, 185, 129, 0.04) 0%, rgba(16, 185, 129, 0.01) 100%)",
      borderStyle: "rgba(16, 185, 129, 0.2)",
      textColor: "#34d399",
      barColor: "#10b981",
    },
    {
      level: "YELLOW",
      icon: "⚠️",
      label: "Attention Needed",
      description: "Minor delays detected. Adjust your schedule now.",
      probability: 67,
      bgStyle: "linear-gradient(135deg, rgba(245, 158, 11, 0.04) 0%, rgba(245, 158, 11, 0.01) 100%)",
      borderStyle: "rgba(245, 158, 11, 0.2)",
      textColor: "#fbbf24",
      barColor: "#f59e0b",
    },
    {
      level: "RED",
      icon: "🚨",
      label: "Critical Risk",
      description: "Deadline failure likely. Recovery plan activated.",
      probability: 38,
      bgStyle: "linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.01) 100%)",
      borderStyle: "rgba(239, 68, 68, 0.22)",
      textColor: "#f87171",
      barColor: "#ef4444",
    },
    {
      level: "BLACK",
      icon: "💀",
      label: "Recovery Mode",
      description: "Emergency AI intervention. All resources focused on goal.",
      probability: 12,
      bgStyle: "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.005) 100%)",
      borderStyle: "rgba(255, 255, 255, 0.08)",
      textColor: "#e2e8f0",
      barColor: "#6b7280",
    },
  ];

  return (
    <section className="relative py-24 bg-[#02040a]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">
            🔔 Alert System
          </span>
          <h2 className="section-heading font-sans font-bold">
            4-Level AI <span className="gradient-text">Alert Escalation</span>
          </h2>
          <p className="section-desc">
            PathPilot AI monitors your completion patterns and escalates status levels dynamically before your deadline is compromised.
          </p>
        </div>

        {/* Alert Cards (Equal Height, Padding, Spacing, Typography) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {alerts.map((alert, i) => (
            <motion.div
              key={alert.level}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-full border backdrop-blur-sm"
              style={{
                background: alert.bgStyle,
                borderColor: alert.borderStyle,
              }}
              whileHover={{ scale: 1.02, translateY: -3 }}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl">{alert.icon}</div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full font-mono tracking-wide"
                    style={{ background: `${alert.barColor}15`, color: alert.textColor, border: `1px solid ${alert.barColor}30` }}
                  >
                    {alert.level}
                  </span>
                </div>

                {/* Info */}
                <h3 className="font-sans font-bold text-white text-base mb-2 tracking-tight">
                  {alert.label}
                </h3>
                <p className="text-slate-400 text-xs mb-6 leading-relaxed">
                  {alert.description}
                </p>
              </div>

              {/* Progress bar container aligned at bottom */}
              <div className="mt-auto">
                <div className="mb-2 flex justify-between items-center text-[11px] font-medium">
                  <span className="text-slate-500">Success Probability</span>
                  <span className="font-mono font-bold" style={{ color: alert.textColor }}>
                    {alert.probability}%
                  </span>
                </div>
                <div className="progress-track bg-white/[0.04] h-1.5 rounded-full">
                  <motion.div
                    className="progress-fill h-full rounded-full"
                    style={{ background: alert.barColor }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${alert.probability}%` } : {}}
                    transition={{ duration: 1.2, delay: i * 0.12, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Warning Message & CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-14 max-w-2xl mx-auto flex flex-col items-center gap-6"
        >
          <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
            By mapping your habits, the simulator provides accurate forecasts so you can take preventative steps before it&apos;s too late.
          </p>
          <Link href="/auth/login" className="btn-primary text-xs py-2.5 px-6 rounded-lg">
            <Zap size={13} />
            Secure Your Goals
            <ArrowRight size={13} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Zap, Mail } from "lucide-react";

const footerLinks = {
  Product: ["Features", "AI Agents", "Pricing", "Changelog", "Roadmap"],
  Students: ["JEE Prep Mode", "NEET Prep Mode", "GATE Prep Mode", "Board Exams", "UPSC Route"],
  Company: ["About Us", "Blog", "Careers", "Press Kit", "Contact Support"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Settings", "Security Audits"],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] pt-20 pb-10 bg-[#02040a]" aria-label="Global Footer">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          {/* Brand Col */}
          <div className="col-span-2 flex flex-col justify-between">
            <div>
              <Link href="/" className="flex items-center gap-2.5 mb-5 w-fit">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #7c15f0, #06b6d4)" }}
                >
                  <Zap size={14} className="text-white" />
                </div>
                <span className="font-sans font-bold text-base tracking-tight text-white">
                  PathPilot<span className="text-violet-400">.ai</span>
                </span>
              </Link>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6 max-w-xs">
                Your autonomous AI success companion. Powered by Gemini 2.5 Multi-Agents.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2.5">
              {/* Twitter */}
              <a
                href="#"
                className="w-8.5 h-8.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-violet-500/10 transition-all"
                aria-label="PathPilot Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Linkedin */}
              <a
                href="#"
                className="w-8.5 h-8.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-violet-500/10 transition-all"
                aria-label="PathPilot LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
              </a>
              {/* Github */}
              <a
                href="#"
                className="w-8.5 h-8.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-violet-500/10 transition-all"
                aria-label="PathPilot GitHub"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              {/* Email */}
              <a
                href="mailto:support@pathpilot.ai"
                className="w-8.5 h-8.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-violet-500/10 transition-all"
                aria-label="Email PathPilot Support"
              >
                <Mail size={14} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white text-xs font-bold font-mono tracking-wider uppercase mb-5 select-none">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-500 text-xs md:text-sm hover:text-slate-300 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs leading-relaxed">
            © 2026 PathPilot AI. All rights reserved. Powered by Google Gemini 2.5 + Firebase.
          </p>
          <div className="flex items-center gap-4">
            <div className="badge-violet text-[10px] font-bold py-1 px-3 bg-emerald-500/5 border-emerald-500/20 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Operational
            </div>
            <span className="text-slate-600 text-[11px] font-mono">v2.1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

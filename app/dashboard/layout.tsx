"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap, Home, Target, CheckSquare, Calendar, BarChart3,
  MessageSquare, Bot, Bell, Settings, LogOut, Menu, X, ChevronRight
} from "lucide-react";
import { DEMO_USER, DEMO_NOTIFICATIONS } from "@/lib/demo-data";

const navItems = [
  { href: "/dashboard", icon: <Home size={18} />, label: "Dashboard" },
  { href: "/dashboard/goals", icon: <Target size={18} />, label: "Goals" },
  { href: "/dashboard/tasks", icon: <CheckSquare size={18} />, label: "Tasks" },
  { href: "/dashboard/calendar", icon: <Calendar size={18} />, label: "Calendar" },
  { href: "/dashboard/analytics", icon: <BarChart3 size={18} />, label: "Analytics" },
  { href: "/dashboard/mentor", icon: <MessageSquare size={18} />, label: "AI Mentor" },
  { href: "/dashboard/agents", icon: <Bot size={18} />, label: "AI Agents" },
  { href: "/dashboard/notifications", icon: <Bell size={18} />, label: "Notifications" },
];

const unreadCount = DEMO_NOTIFICATIONS.filter((n) => !n.read).length;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-8 mt-1">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #7c15f0, #06b6d4)" }}>
          <Zap size={15} className="text-white" />
        </div>
        <span className="font-display font-bold text-base">
          <span className="gradient-text">PathPilot</span>
          <span className="text-white"> AI</span>
        </span>
      </Link>

      {/* User Card */}
      <div className="glass rounded-xl p-3 flex items-center gap-3 mb-6">
        <img
          src={DEMO_USER.photoURL}
          alt={DEMO_USER.displayName}
          className="w-9 h-9 rounded-lg flex-shrink-0"
          style={{ background: "rgba(124,21,240,0.2)" }}
        />
        <div className="min-w-0">
          <div className="text-white text-sm font-semibold truncate">{DEMO_USER.displayName}</div>
          <div className="text-slate-500 text-xs truncate">{DEMO_USER.examTarget}</div>
        </div>
        <div className="badge-green text-[10px] flex-shrink-0 ml-auto">
          Pro
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${active ? "active" : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className={active ? "text-violet-400" : ""}>{item.icon}</span>
              <span>{item.label}</span>
              {item.label === "Notifications" && unreadCount > 0 && (
                <span className="ml-auto w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
              {active && <ChevronRight size={14} className="ml-auto text-violet-400" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="mt-auto flex flex-col gap-1">
        <Link href="/dashboard/settings" className="sidebar-link">
          <Settings size={18} />
          <span>Settings</span>
        </Link>
        <Link href="/" className="sidebar-link text-red-400 hover:text-red-300">
          <LogOut size={18} />
          <span>Sign Out</span>
        </Link>
      </div>

      {/* Success Score */}
      <div className="mt-4 glass-violet rounded-xl p-4 text-center">
        <div className="text-slate-400 text-xs mb-1">Success Score</div>
        <div className="text-3xl font-display font-bold gradient-text">{DEMO_USER.successScore}</div>
        <div className="text-slate-500 text-xs">🔥 {DEMO_USER.streak} day streak</div>
        <div className="progress-track mt-2">
          <div className="progress-fill" style={{ width: `${DEMO_USER.successScore}%` }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex" style={{ background: "#03060f" }}>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 border-r border-white/5 glass-dark fixed top-0 left-0 bottom-0 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 left-0 bottom-0 w-64 z-50 lg:hidden border-r border-white/5"
              style={{ background: "rgba(6,13,31,0.98)", backdropFilter: "blur(24px)" }}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 md:px-6 border-b border-white/5 glass-dark">
          <button
            className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex-1 lg:flex-none">
            <h1 className="text-white font-semibold text-base capitalize hidden lg:block">
              {pathname.split("/").pop()?.replace("-", " ") || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Alert indicator */}
            <div className="badge-yellow text-xs hidden md:flex">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              Yellow Alert
            </div>

            {/* Notifications */}
            <Link href="/dashboard/notifications" className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* Avatar */}
            <img
              src={DEMO_USER.photoURL}
              alt={DEMO_USER.displayName}
              className="w-8 h-8 rounded-lg"
              style={{ background: "rgba(124,21,240,0.2)" }}
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

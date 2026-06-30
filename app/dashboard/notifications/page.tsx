"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DEMO_NOTIFICATIONS } from "@/lib/demo-data";
import {
  Bell, AlertTriangle, ShieldCheck, Sparkles, Check, Trash2,
  ListFilter, Calendar, BellOff
} from "lucide-react";
import toast from "react-hot-toast";

interface Notification {
  id: string;
  type: string;
  alertLevel: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: Date;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(
    DEMO_NOTIFICATIONS.map((n) => ({
      ...n,
      createdAt: new Date(n.createdAt)
    }))
  );
  const [filterType, setFilterType] = useState<string>("all");

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read.");
  };

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const deleteNotif = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success("Notification removed.");
  };

  const filtered = notifications.filter((n) => {
    if (filterType === "all") return true;
    if (filterType === "alerts") return n.type === "alert";
    if (filterType === "insights") return n.type === "motivation"; // AI agent reports
    if (filterType === "achievements") return n.type === "achievement";
    return true;
  });

  const alertColors: Record<string, { bg: string; text: string; border: string }> = {
    green: {
      bg: "rgba(16, 185, 129, 0.04)",
      text: "#34d399",
      border: "rgba(16, 185, 129, 0.1)"
    },
    yellow: {
      bg: "rgba(245, 158, 11, 0.04)",
      text: "#fbbf24",
      border: "rgba(245, 158, 11, 0.1)"
    },
    red: {
      bg: "rgba(239, 68, 68, 0.04)",
      text: "#f87171",
      border: "rgba(239, 68, 68, 0.1)"
    },
    black: {
      bg: "rgba(124, 21, 240, 0.04)",
      text: "#a855f7",
      border: "rgba(124, 21, 240, 0.15)"
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <Bell className="text-violet-400" />
            Notification Center
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Keep track of live escalations, achievements, and AI agent optimization cycles.
          </p>
        </div>
        {notifications.some((n) => !n.read) && (
          <button
            onClick={markAllRead}
            className="text-xs text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1 glass px-3 py-2 rounded-xl border border-white/5"
          >
            <Check size={14} />
            Mark all read
          </button>
        )}
      </div>

      {/* Filter tab bar */}
      <div className="flex gap-2 border-b border-white/5 pb-1">
        {["all", "alerts", "insights", "achievements"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterType(tab)}
            className={`px-4 py-2 text-xs font-semibold capitalize border-b-2 transition-all ${
              filterType === tab
                ? "border-violet-500 text-white font-bold"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {filtered.map((notif) => {
              const styles = alertColors[notif.alertLevel] || alertColors.green;
              return (
                <motion.div
                  key={notif.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`card-base p-4 flex items-start justify-between gap-4 transition-all duration-300 relative group border ${
                    notif.read ? "opacity-60 bg-white/[0.005] border-white/5" : "bg-white/[0.02]"
                  }`}
                  style={{
                    backgroundColor: notif.read ? undefined : styles.bg,
                    borderColor: notif.read ? undefined : styles.border
                  }}
                >
                  <div className="flex gap-3.5 min-w-0">
                    {/* Icon mapping */}
                    <div className="mt-0.5 flex-shrink-0">
                      {notif.type === "alert" ? (
                        <AlertTriangle size={18} style={{ color: styles.text }} />
                      ) : notif.type === "achievement" ? (
                        <ShieldCheck size={18} style={{ color: styles.text }} />
                      ) : (
                        <Sparkles size={18} style={{ color: styles.text }} />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-white text-sm font-semibold truncate leading-snug">
                          {notif.title}
                        </h3>
                        {!notif.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                        {notif.body}
                      </p>
                      <div className="text-[9px] text-slate-500 mt-2 flex items-center gap-1">
                        <Calendar size={8} />
                        {new Date(notif.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-1.5 items-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all">
                    <button
                      onClick={() => toggleRead(notif.id)}
                      className="p-1.5 rounded-lg glass hover:bg-white/10 text-slate-400 hover:text-white"
                      title={notif.read ? "Mark unread" : "Mark read"}
                    >
                      <Check size={12} />
                    </button>
                    <button
                      onClick={() => deleteNotif(notif.id)}
                      className="p-1.5 rounded-lg glass hover:bg-red-500/20 hover:text-red-400 text-slate-400"
                      title="Remove notification"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        ) : (
          <div className="card-base p-12 text-center text-slate-500 flex flex-col items-center justify-center gap-2">
            <BellOff size={24} className="text-slate-600" />
            <span className="text-xs">All caught up! No notifications in this tab.</span>
          </div>
        )}
      </div>
    </div>
  );
}

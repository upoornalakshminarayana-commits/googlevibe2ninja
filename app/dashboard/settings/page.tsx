"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DEMO_USER } from "@/lib/demo-data";
import {
  Settings, User, Shield, Key, Bell, Sliders, Save, CheckCircle,
  HelpCircle, Sparkles, AlertTriangle
} from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    displayName: DEMO_USER.displayName,
    email: DEMO_USER.email,
    examTarget: DEMO_USER.examTarget,
    dailyHours: DEMO_USER.productivityProfile.dailyAvailableHours
  });

  const [agentToggles, setAgentToggles] = useState({
    goalPlanner: true,
    riskPredictor: true,
    recoveryPlanner: true,
    burnoutDetection: true,
    gmailParser: false,
    calendarSync: false,
    nudges: true
  });

  const [geminiKey, setGeminiKey] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile settings updated locally! 💾");
  };

  const handleSaveAgents = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("AI Agent execution parameters saved! 🤖");
  };

  const handleSaveAPIKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (geminiKey.trim()) {
      localStorage.setItem("GEMINI_API_KEY", geminiKey.trim());
      toast.success("API key stored in local context! 🔑");
    } else {
      toast.error("Please enter a valid key");
    }
  };

  const toggleAgent = (key: keyof typeof agentToggles) => {
    setAgentToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
          <Settings className="text-violet-400" />
          Settings Console
        </h1>
        <p className="text-slate-500 text-xs mt-0.5">
          Configure your user details, toggle active AI agent modules, and set up your keys.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Side: Tabs Nav */}
        <div className="space-y-2 lg:col-span-1">
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === "profile" ? "glass-violet text-white font-bold" : "glass text-slate-500 hover:text-slate-300"
            }`}
          >
            <User size={14} />
            User Profile
          </button>
          <button
            onClick={() => setActiveTab("agents")}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === "agents" ? "glass-violet text-white font-bold" : "glass text-slate-500 hover:text-slate-300"
            }`}
          >
            <Sliders size={14} />
            AI Agent Toggles
          </button>
          <button
            onClick={() => setActiveTab("api")}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === "api" ? "glass-violet text-white font-bold" : "glass text-slate-500 hover:text-slate-300"
            }`}
          >
            <Key size={14} />
            Gemini API Key
          </button>
        </div>

        {/* Right Side: Settings Forms */}
        <div className="lg:col-span-3">
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card-base p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Edit Profile Context</h3>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 text-xs font-semibold block mb-1">Full Name</label>
                    <input
                      type="text"
                      className="input-field"
                      value={profile.displayName}
                      onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs font-semibold block mb-1">Email Address</label>
                    <input
                      type="email"
                      className="input-field"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 text-xs font-semibold block mb-1">Exam target / Goal Sector</label>
                    <input
                      type="text"
                      className="input-field"
                      value={profile.examTarget}
                      onChange={(e) => setProfile({ ...profile, examTarget: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs font-semibold block mb-1">Daily Available Hours</label>
                    <input
                      type="number"
                      min={1}
                      max={18}
                      className="input-field"
                      value={profile.dailyHours}
                      onChange={(e) => setProfile({ ...profile, dailyHours: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end">
                  <button type="submit" className="btn-primary py-2 px-5 text-xs font-semibold flex items-center gap-1.5">
                    <Save size={12} />
                    Save Profile
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {activeTab === "agents" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card-base p-6">
              <h3 className="text-sm font-semibold text-white mb-1">AI Coordinator Parameters</h3>
              <p className="text-slate-500 text-xs mb-5">
                Select which sub-agent modules run automated workflows in the background.
              </p>

              <form onSubmit={handleSaveAgents} className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl glass border border-white/5">
                    <div>
                      <div className="text-white text-xs font-semibold">Goal Planning Agent</div>
                      <div className="text-[10px] text-slate-500">Automatically splits new targets into milestones.</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={agentToggles.goalPlanner}
                      onChange={() => toggleAgent("goalPlanner")}
                      className="accent-violet-500 w-4 h-4 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl glass border border-white/5">
                    <div>
                      <div className="text-white text-xs font-semibold">Risk Prediction Agent</div>
                      <div className="text-[10px] text-slate-500">Calculates milestone velocity metrics and alerts.</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={agentToggles.riskPredictor}
                      onChange={() => toggleAgent("riskPredictor")}
                      className="accent-violet-500 w-4 h-4 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl glass border border-white/5">
                    <div>
                      <div className="text-white text-xs font-semibold">Burnout Detection Coordinator</div>
                      <div className="text-[10px] text-slate-500">Monitors stress curves and dynamically reduces daily hour caps.</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={agentToggles.burnoutDetection}
                      onChange={() => toggleAgent("burnoutDetection")}
                      className="accent-violet-500 w-4 h-4 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl glass border border-white/5">
                    <div>
                      <div className="text-white text-xs font-semibold">Gmail Parsing Extractor</div>
                      <div className="text-[10px] text-slate-500">Scans primary mailbox metadata for homework or exam assignments.</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={agentToggles.gmailParser}
                      onChange={() => toggleAgent("gmailParser")}
                      className="accent-violet-500 w-4 h-4 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end">
                  <button type="submit" className="btn-primary py-2 px-5 text-xs font-semibold flex items-center gap-1.5">
                    <Save size={12} />
                    Save Coordinator Toggles
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {activeTab === "api" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card-base p-6">
              <h3 className="text-sm font-semibold text-white mb-1">Gemini API Key Keyring</h3>
              <p className="text-slate-500 text-xs mb-5">
                Save your Google Gemini API key to activate real-time agent generation and chat capabilities.
              </p>

              <form onSubmit={handleSaveAPIKey} className="space-y-4">
                <div className="glass-violet rounded-xl p-4 border border-violet-500/20 mb-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="text-violet-400 shrink-0 mt-0.5" size={16} />
                    <div className="text-xs text-slate-300 leading-relaxed">
                      To run the live agent, get your Gemini API Key from
                      <a
                        href="https://aistudio.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-400 hover:underline mx-1"
                      >
                        Google AI Studio
                      </a>
                      and paste it below. Alternately, add it as `GEMINI_API_KEY` inside `.env.local` to share across sessions.
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 text-xs font-semibold block mb-1">Gemini API Key</label>
                  <input
                    type="password"
                    placeholder="AIzaSy..."
                    className="input-field"
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                  />
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end">
                  <button type="submit" className="btn-primary py-2 px-5 text-xs font-semibold flex items-center gap-1.5">
                    <Key size={12} />
                    Store Local Key
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

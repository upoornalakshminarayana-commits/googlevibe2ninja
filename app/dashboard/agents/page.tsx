"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DEMO_AGENTS } from "@/lib/demo-data";
import {
  Bot, Activity, Terminal, ShieldAlert, CheckCircle, RefreshCw,
  Play, Sparkles, Brain, Zap, Send, Info
} from "lucide-react";
import toast from "react-hot-toast";

interface Agent {
  id: string;
  name: string;
  icon: string;
  status: string;
  lastAction: string;
  actionTime: string;
  color: string;
}

interface LogEntry {
  timestamp: string;
  agent: string;
  action: string;
  status: "success" | "warning" | "info";
}

const AGENT_DESCRIPTIONS: Record<string, string> = {
  "Goal Planning Agent": "Decomposes high-level ambitions into structured milestones and milestones into tasks.",
  "Risk Prediction Agent": "Calculates progress velocity and simulates probability models to flag delays.",
  "Recovery Planning Agent": "Generates strategic catch-up roadmaps without causing user burnout.",
  "Motivation Agent": "Provides real-time productivity briefings and motivational micro-nudges.",
  "Task Breakdown Agent": "Extracts tasks into daily actionable checklists with duration bounds.",
  "Progress Analysis Agent": "Gathers weekly hours statistics and updates your AI digital twin profile."
};

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>(DEMO_AGENTS);
  const [selectedAgentName, setSelectedAgentName] = useState<string>("Goal Planning Agent");
  const [runningAgentId, setRunningAgentId] = useState<string | null>(null);

  const [logs, setLogs] = useState<LogEntry[]>([
    { timestamp: "10:14:02", agent: "Risk Prediction Agent", action: "Triggered periodic check. Checked 3 goals. Math syllabus is at risk.", status: "warning" },
    { timestamp: "10:14:05", agent: "Goal Planning Agent", action: "Re-indexed milestones for goal 'Crack JEE Advanced 2025'.", status: "success" },
    { timestamp: "09:00:00", agent: "Motivation Agent", action: "Sent daily briefing nudge to Arjun Sharma.", status: "info" },
    { timestamp: "Yesterday", agent: "Progress Analysis Agent", action: "Synced weekly study heatmap. Focus efficiency: 94%.", status: "success" }
  ]);

  const handleRunAgent = async (agent: Agent) => {
    setRunningAgentId(agent.id);
    // Simulate API call to specific agent route
    let route = "/api/agents/";
    if (agent.name === "Goal Planning Agent") route += "goal-planner";
    else if (agent.name === "Risk Prediction Agent") route += "risk-predictor";
    else if (agent.name === "Recovery Planning Agent") route += "recovery-planner";
    else if (agent.name === "Motivation Agent") route += "motivator";
    else route += "progress-analyzer";

    try {
      // Simulate API ping or trigger
      await new Promise((r) => setTimeout(r, 1800));

      // Append new terminal log entry
      const now = new Date().toLocaleTimeString("en-IN", { hour12: false });
      const newLog: LogEntry = {
        timestamp: now,
        agent: agent.name,
        action: `Manual run successfully completed. Processed parameters for Arjun Sharma. State: active.`,
        status: "success"
      };

      setLogs((prev) => [newLog, ...prev]);
      setAgents((prev) =>
        prev.map((a) =>
          a.id === agent.id
            ? { ...a, status: "active", actionTime: "just now", lastAction: "Completed manual optimization cycle" }
            : a
        )
      );

      toast.success(`${agent.name} completed successfully! Check logs.`);
    } catch {
      toast.error("Agent calculation failed.");
    } finally {
      setRunningAgentId(null);
    }
  };

  const selectedAgentDesc = AGENT_DESCRIPTIONS[selectedAgentName] || "Specialized companion agent dedicated to optimizing your study pipeline.";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <Bot className="text-violet-400" />
            AI Agent Coordinator Console
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Monitor and manually execute specialized Gemini agents driving your productivity pipeline.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Agent Cards list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider px-1">Active Agents Registry</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agents.map((agent) => {
              const isRunning = runningAgentId === agent.id;
              const isSelected = selectedAgentName === agent.name;

              return (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgentName(agent.name)}
                  className={`card-base p-4 cursor-pointer transition-all duration-300 relative group overflow-hidden ${
                    isSelected ? "border-violet-500/50 bg-white/[0.04]" : "hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{agent.icon}</span>
                      <div>
                        <h3 className="text-white text-sm font-semibold truncate max-w-[150px]">{agent.name}</h3>
                        <span className="text-[10px] text-slate-500">{agent.actionTime}</span>
                      </div>
                    </div>

                    <span className="flex items-center gap-1.5 text-[9px] px-2 py-0.5 rounded font-bold uppercase bg-white/5 text-slate-400">
                      <span className={`w-1.5 h-1.5 rounded-full ${agent.status === "active" ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`} />
                      {agent.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 mb-4 line-clamp-2">
                    {agent.lastAction}
                  </div>

                  <div className="flex justify-between items-center border-t border-white/5 pt-3">
                    <span className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                      <Activity size={10} className="text-violet-400" />
                      Gemini Core 2.5
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRunAgent(agent);
                      }}
                      disabled={isRunning || runningAgentId !== null}
                      className="p-1.5 rounded-lg glass hover:bg-violet-500/20 hover:text-violet-400 text-slate-400 transition-all flex items-center gap-1 text-[10px]"
                      title="Run manual run"
                    >
                      {isRunning ? (
                        <RefreshCw size={10} className="animate-spin" />
                      ) : (
                        <Play size={10} />
                      )}
                      Trigger
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Detailed Console logs */}
        <div className="space-y-4">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider px-1">Agent Console Log & details</div>

          {/* Details */}
          <div className="card-base p-5">
            <div className="flex items-center gap-2 mb-3">
              <Info size={14} className="text-violet-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Agent Context</h4>
            </div>
            <div className="text-white text-sm font-semibold mb-1">{selectedAgentName}</div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">{selectedAgentDesc}</p>
            <div className="text-[10px] text-slate-500 border-t border-white/5 pt-3">
              Role: System Autonomy Agent · Direct Gemini model interface · Zero state latency.
            </div>
          </div>

          {/* Developer Logs Terminal screen */}
          <div className="card-base p-4 bg-black/90 border border-white/10 font-mono text-[11px] h-64 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
              <span className="text-[10px] text-slate-400 flex items-center gap-1.5">
                <Terminal size={12} className="text-emerald-400 animate-pulse" />
                SYSTEM LOG STREAM
              </span>
              <span className="text-[9px] text-slate-600">STDOUT</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {logs.map((log, idx) => {
                const color = log.status === "warning" ? "text-yellow-400" : log.status === "success" ? "text-emerald-400" : "text-cyan-400";
                return (
                  <div key={idx} className="leading-normal">
                    <span className="text-slate-600 mr-1.5">[{log.timestamp}]</span>
                    <span className={`${color} font-bold mr-1.5`}>{log.agent}:</span>
                    <span className="text-slate-300">{log.action}</span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-white/10 pt-2 mt-2 flex justify-between items-center text-[10px] text-slate-500">
              <span>Buffers: OK</span>
              <span>Running model: Gemini-2.0-flash</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

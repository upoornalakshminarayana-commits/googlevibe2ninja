"use client";

import { motion } from "framer-motion";
import { DEMO_WEEKLY_PROGRESS, DEMO_GOALS } from "@/lib/demo-data";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from "recharts";
import {
  BarChart3, TrendingUp, AlertTriangle, ShieldCheck, Zap,
  Activity, Clock, Calendar, Brain, Award
} from "lucide-react";

export default function AnalyticsPage() {
  // Goal completion breakdown
  const pieData = DEMO_GOALS.map((goal) => ({
    name: goal.title.slice(0, 15) + "...",
    value: goal.progress,
    success: goal.successProbability
  }));

  const COLORS = ["#7c15f0", "#06b6d4", "#10b981", "#fbbf24"];

  // Weekly hours metrics
  const totalPlanned = DEMO_WEEKLY_PROGRESS.reduce((acc, curr) => acc + curr.planned, 0);
  const totalActual = DEMO_WEEKLY_PROGRESS.reduce((acc, curr) => acc + curr.actual, 0);
  const avgSuccessScore = Math.round(
    DEMO_WEEKLY_PROGRESS.reduce((acc, curr) => acc + curr.score, 0) / DEMO_WEEKLY_PROGRESS.length
  );

  // Success Score projection over 7 days
  const projectionData = [
    { day: "Day 1", score: 68, risk: 40 },
    { day: "Day 2", score: 70, risk: 38 },
    { day: "Day 3", score: 71, risk: 35 },
    { day: "Day 4", score: 74, risk: 30 },
    { day: "Day 5", score: 73, risk: 32 },
    { day: "Day 6", score: 75, risk: 28 },
    { day: "Day 7", score: 76, risk: 24 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
          <BarChart3 className="text-violet-400" />
          Success & Productivity Analytics
        </h1>
        <p className="text-slate-500 text-xs mt-0.5">
          Real-time metrics compiled by the Progress Analysis Agent.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card-base p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
            <Clock size={18} />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-white">{totalActual}h</div>
            <div className="text-slate-500 text-xs">Total Actual Study Hours</div>
          </div>
        </div>

        <div className="card-base p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
            <Zap size={18} />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-white">
              {Math.round((totalActual / totalPlanned) * 100)}%
            </div>
            <div className="text-slate-500 text-xs">Focus Efficiency</div>
          </div>
        </div>

        <div className="card-base p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Award size={18} />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-white">{avgSuccessScore}%</div>
            <div className="text-slate-500 text-xs">Avg Productivity Score</div>
          </div>
        </div>

        <div className="card-base p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-400">
            <AlertTriangle size={18} />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-white">Yellow</div>
            <div className="text-slate-500 text-xs">Global Alert Status</div>
          </div>
        </div>
      </div>

      {/* Main charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly hour comparisons */}
        <div className="card-base p-6">
          <h3 className="font-display font-bold text-white text-sm mb-5 flex items-center justify-between">
            <span>Weekly Progress (Planned vs Actual)</span>
            <span className="text-[10px] text-slate-500 font-semibold uppercase">Hours/Day</span>
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={DEMO_WEEKLY_PROGRESS} barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "rgba(10,22,40,0.95)",
                  border: "1px solid rgba(124,21,240,0.3)",
                  borderRadius: "12px",
                  color: "#f8fafc",
                  fontSize: 12
                }}
              />
              <Bar dataKey="planned" fill="rgba(124,21,240,0.2)" radius={[4, 4, 0, 0]} name="Planned" />
              <Bar dataKey="actual" fill="#7c15f0" radius={[4, 4, 0, 0]} name="Actual" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Success vs Risk line chart */}
        <div className="card-base p-6">
          <h3 className="font-display font-bold text-white text-sm mb-5 flex items-center justify-between">
            <span>Success Probability & Deadline Risk Trends</span>
            <span className="text-[10px] text-slate-500 font-semibold uppercase">Percentage %</span>
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "rgba(10,22,40,0.95)",
                  border: "1px solid rgba(124,21,240,0.3)",
                  borderRadius: "12px",
                  color: "#f8fafc",
                  fontSize: 12
                }}
              />
              <Line type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={3} dot={{ fill: "#06b6d4" }} name="Success Score" />
              <Line type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={2} strokeDasharray="4 4" name="Burnout/Miss Risk" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Goal completion shares */}
        <div className="card-base p-6">
          <h3 className="font-display font-bold text-white text-sm mb-5">
            Goal Progression shares
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: COLORS[index % COLORS.length] }} />
                  <div className="min-w-0 flex-1">
                    <div className="text-white text-xs font-semibold truncate">{item.name}</div>
                    <div className="text-[10px] text-slate-500">Progress: {item.value}% | Success Probability: {item.success}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI twin analytics report */}
        <div className="glass-violet p-6 rounded-2xl flex flex-col justify-between border border-violet-500/20">
          <div>
            <h3 className="font-display font-bold text-white text-sm mb-3 flex items-center gap-2">
              <Brain size={16} className="text-violet-400" />
              AI Twin Performance Report
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Your digital twin projections show a **76% success probability** for the upcoming board exams if you maintain a steady 6.5h study rate.
              However, the JEE Mathematics syllabus shows a risk offset of **38%** due to low milestone completion rates in calculus modules.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-400">Peak hour alignment</span>
                <span className="text-emerald-400">92% (High)</span>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-400">Streak stability index</span>
                <span className="text-cyan-400">84% (Excellent)</span>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-400">Burnout safety margin</span>
                <span className="text-yellow-500">62% (Moderate)</span>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-4 mt-4 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-slate-400 font-semibold">
              Live updates provided by the Accountability Agent.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

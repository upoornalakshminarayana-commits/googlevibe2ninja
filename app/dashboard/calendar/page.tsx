"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DEMO_TASKS, DEMO_GOALS } from "@/lib/demo-data";
import {
  Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Zap,
  AlertCircle, ShieldCheck, Sparkles, Brain, CheckCircle2, Circle
} from "lucide-react";
import toast from "react-hot-toast";

interface Task {
  id: string;
  title: string;
  goalId: string;
  scheduledDate: Date;
  duration: number;
  priority: string;
  status: string;
  category: string;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<Task[]>(
    DEMO_TASKS.map((t) => ({
      ...t,
      scheduledDate: new Date() // Sync to current date for the demo context
    }))
  );
  const [optimizing, setOptimizing] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Generate calendar grid array
  const calendarCells = [];
  // Empty slots for previous month offset
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(null);
  }
  // Days of current month
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push(new Date(year, month, d));
  }

  // Filter tasks for selected date
  const selectedTasks = tasks.filter((t) => {
    return (
      t.scheduledDate.getDate() === selectedDate.getDate() &&
      t.scheduledDate.getMonth() === selectedDate.getMonth() &&
      t.scheduledDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  const handleRunOptimizer = async () => {
    setOptimizing(true);
    // Simulate AI Scheduling Agent optimizing calendar slots
    setTimeout(() => {
      // Shift pending tasks to peak productivity hours (e.g. earlier in the day)
      toast.success("AI Scheduling Agent completed! Rearranged 3 slots to align with Peak Productivity Hours! ⚡");
      setOptimizing(false);
    }, 2000);
  };

  const priorityColor: Record<string, string> = {
    critical: "border-l-red-500 text-red-400",
    high: "border-l-amber-500 text-amber-400",
    medium: "border-l-cyan-500 text-cyan-400",
    low: "border-l-emerald-500 text-emerald-400",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <CalendarIcon className="text-violet-400" />
            Productivity Calendar
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Optimize time blocks. Sync learning milestones to your peak hours.
          </p>
        </div>
        <button
          onClick={handleRunOptimizer}
          disabled={optimizing}
          className="btn-primary py-2.5 px-4 text-xs font-semibold flex items-center gap-1.5"
        >
          {optimizing ? (
            <>
              <div className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
              Optimizing Slots...
            </>
          ) : (
            <>
              <Zap size={14} className="text-yellow-400 animate-pulse" />
              Optimize via AI Scheduler
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Calendar grid */}
        <div className="lg:col-span-2 space-y-4">
          {/* Calendar Header Controls */}
          <div className="card-base p-4 flex items-center justify-between">
            <span className="font-display font-bold text-white text-base">
              {monthNames[month]} {year}
            </span>
            <div className="flex gap-2">
              <button onClick={prevMonth} className="p-2 rounded-xl glass hover:bg-white/5 text-slate-400 hover:text-white">
                <ChevronLeft size={16} />
              </button>
              <button onClick={nextMonth} className="p-2 rounded-xl glass hover:bg-white/5 text-slate-400 hover:text-white">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="card-base p-4">
            <div className="grid grid-cols-7 text-center text-slate-500 text-xs font-bold mb-3">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {calendarCells.map((cellDate, idx) => {
                if (!cellDate) {
                  return <div key={`empty-${idx}`} className="h-20" />;
                }

                const isToday =
                  cellDate.getDate() === new Date().getDate() &&
                  cellDate.getMonth() === new Date().getMonth() &&
                  cellDate.getFullYear() === new Date().getFullYear();

                const isSelected =
                  cellDate.getDate() === selectedDate.getDate() &&
                  cellDate.getMonth() === selectedDate.getMonth() &&
                  cellDate.getFullYear() === selectedDate.getFullYear();

                // Check if this date has any tasks
                const hasTasks = tasks.some(
                  (t) =>
                    t.scheduledDate.getDate() === cellDate.getDate() &&
                    t.scheduledDate.getMonth() === cellDate.getMonth() &&
                    t.scheduledDate.getFullYear() === cellDate.getFullYear()
                );

                return (
                  <button
                    key={`day-${cellDate.getDate()}`}
                    onClick={() => setSelectedDate(cellDate)}
                    className={`h-20 rounded-2xl flex flex-col p-2 text-left relative transition-all duration-300 border ${
                      isSelected
                        ? "glass-violet border-violet-500/50"
                        : isToday
                          ? "glass-cyan border-cyan-500/40"
                          : "glass border-white/5 hover:bg-white/5"
                    }`}
                  >
                    <span className={`text-xs font-bold ${isToday || isSelected ? "text-white" : "text-slate-400"}`}>
                      {cellDate.getDate()}
                    </span>

                    {hasTasks && (
                      <div className="mt-auto flex gap-1 items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                        <span className="text-[9px] text-slate-500 font-medium">Tasks</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Tasks for selected day */}
        <div className="space-y-4">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider px-1">
            Focus blocks for {selectedDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
          </div>

          <div className="space-y-3">
            {selectedTasks.length > 0 ? (
              selectedTasks.map((task) => {
                const goal = DEMO_GOALS.find((g) => g.id === task.goalId);
                return (
                  <div
                    key={task.id}
                    className={`card-base p-4 border-l-4 ${
                      priorityColor[task.priority] || "border-l-violet-500"
                    } flex flex-col gap-2`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-white text-xs font-bold leading-tight">
                        {task.title}
                      </span>
                      <span className="text-[9px] text-slate-500 font-bold uppercase shrink-0">
                        {task.priority}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock size={10} className="text-violet-400" />
                        {task.duration} mins
                      </span>
                      <span className="text-slate-500 font-semibold">{task.category}</span>
                    </div>

                    {goal && (
                      <div className="text-[9px] text-slate-500 border-t border-white/5 pt-1.5 mt-1 truncate">
                        🎯 Goal: {goal.title}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="card-base p-8 text-center text-slate-500 text-xs">
                No focus blocks scheduled for this day. Click the Optimizer to auto-schedule pending items.
              </div>
            )}
          </div>

          {/* AI Schedule Advisor Card */}
          <div className="glass-violet rounded-2xl p-5 border border-violet-500/20">
            <h4 className="text-xs font-semibold text-white flex items-center gap-2 mb-2">
              <Brain size={14} className="text-violet-400" />
              AI Schedule Insights
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Arjun, your selected schedule contains heavy task loads during non-peak hours.
              Run the **AI Scheduler** to auto-align these tasks with your peak cycles (6am-9am, 9pm-11pm).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

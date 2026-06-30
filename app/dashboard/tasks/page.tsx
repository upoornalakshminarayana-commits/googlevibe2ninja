"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DEMO_TASKS, DEMO_GOALS } from "@/lib/demo-data";
import {
  CheckSquare, Plus, Trash2, Calendar, Clock, AlertCircle, Play,
  CheckCircle2, Circle, ListFilter, SlidersHorizontal, Brain, Sparkles, Loader2
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

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(
    DEMO_TASKS.map((t) => ({
      ...t,
      scheduledDate: new Date(t.scheduledDate)
    }))
  );

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskGoal, setNewTaskGoal] = useState(DEMO_GOALS[0]?.id || "");
  const [newTaskPriority, setNewTaskPriority] = useState("high");
  const [newTaskDuration, setNewTaskDuration] = useState(60);
  const [newTaskCategory, setNewTaskCategory] = useState("General");
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) {
      toast.error("Please provide a task name");
      return;
    }

    setLoading(true);
    try {
      // Simulate task breakdown with task-breakdown route or fallback
      const response = await fetch("/api/agents/task-breakdown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskDescription: newTaskTitle,
          duration: newTaskDuration,
          goalId: newTaskGoal
        })
      });

      let subtasks = [];
      if (response.ok) {
        const data = await response.json();
        subtasks = data.tasks || [];
      }

      const freshTask: Task = {
        id: `task-${Date.now()}`,
        title: newTaskTitle,
        goalId: newTaskGoal,
        scheduledDate: new Date(),
        duration: newTaskDuration,
        priority: newTaskPriority,
        status: "pending",
        category: newTaskCategory,
      };

      setTasks((prev) => [freshTask, ...prev]);
      setIsCreating(false);
      setNewTaskTitle("");
      toast.success(
        subtasks.length > 0
          ? `Task created & split into ${subtasks.length} AI steps!`
          : "Task successfully created!"
      );
    } catch {
      // Fallback local task creation
      const freshTask: Task = {
        id: `task-${Date.now()}`,
        title: newTaskTitle,
        goalId: newTaskGoal,
        scheduledDate: new Date(),
        duration: newTaskDuration,
        priority: newTaskPriority,
        status: "pending",
        category: newTaskCategory,
      };
      setTasks((prev) => [freshTask, ...prev]);
      setIsCreating(false);
      setNewTaskTitle("");
      toast.success("Task created.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = (id: string) => {
    setTasks((ts) =>
      ts.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === "completed" ? "pending" : "completed";
          toast.success(nextStatus === "completed" ? "Task completed! 🎉" : "Task marked as pending.");
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((ts) => ts.filter((t) => t.id !== id));
    toast.success("Task removed.");
  };

  const filteredTasks = tasks.filter((t) => {
    const matchStatus = filterStatus === "all" || t.status === filterStatus;
    const matchPriority = filterPriority === "all" || t.priority === filterPriority;
    return matchStatus && matchPriority;
  });

  const priorityColor: Record<string, string> = {
    critical: "#ef4444",
    high: "#f59e0b",
    medium: "#06b6d4",
    low: "#10b981",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <CheckSquare className="text-violet-400" />
            Today&apos;s Focus & Tasks
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Optimize your daily learning backlog. Break tasks down into atomic steps.
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="btn-primary py-2.5 px-4 text-xs font-semibold"
        >
          <Plus size={16} />
          Add Custom Task
        </button>
      </div>

      {/* Filters & Control bar */}
      <div className="card-base p-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
          <ListFilter size={14} className="text-violet-400" />
          Filter:
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Status filter */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="glass border border-white/5 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-violet-500/50"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Priority filter */}
          <div>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="glass border border-white/5 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-violet-500/50"
            >
              <option value="all">All Priorities</option>
              <option value="critical">🔴 Critical</option>
              <option value="high">🟡 High</option>
              <option value="medium">🔵 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
          </div>
        </div>

        <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
          showing {filteredTasks.length} tasks
        </div>
      </div>

      {/* Tasks checklist listing */}
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((task) => {
              const pColor = priorityColor[task.priority] || "#7c15f0";
              const goal = DEMO_GOALS.find((g) => g.id === task.goalId);

              return (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`card-base p-4 flex items-center justify-between gap-4 transition-all duration-300 relative group overflow-hidden ${
                    task.status === "completed" ? "bg-white/[0.01] border-white/5 opacity-60" : "hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="absolute top-0 bottom-0 left-0 w-1" style={{ background: pColor }} />
                  <div className="flex items-center gap-3.5 min-w-0">
                    <button
                      onClick={() => handleToggleStatus(task.id)}
                      className="text-slate-500 hover:text-white transition-colors flex-shrink-0 mt-0.5"
                    >
                      {task.status === "completed" ? (
                        <CheckCircle2 size={20} className="text-emerald-400" />
                      ) : task.status === "in-progress" ? (
                        <div className="w-5 h-5 rounded-full border-2 border-violet-400 border-t-transparent animate-spin" />
                      ) : (
                        <Circle size={20} className="text-slate-600 hover:text-slate-400" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <div
                        className={`text-sm font-semibold truncate ${
                          task.status === "completed" ? "line-through text-slate-500" : "text-white"
                        }`}
                      >
                        {task.title}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[10px] text-slate-500">
                        {goal && (
                          <span className="text-violet-400 font-medium max-w-[150px] truncate">
                            🎯 {goal.title}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {task.duration} min
                        </span>
                        <span className="px-2 py-0.5 rounded-full font-bold uppercase"
                          style={{ background: `${pColor}12`, color: pColor }}>
                          {task.priority}
                        </span>
                        <span className="text-slate-600">Category: {task.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {task.status === "pending" && (
                      <button
                        onClick={() => {
                          setTasks((ts) =>
                            ts.map((t) => (t.id === task.id ? { ...t, status: "in-progress" } : t))
                          );
                          toast.success("Task started! Stay focused! ⏱");
                        }}
                        className="p-2 rounded-xl glass hover:bg-violet-500/20 hover:text-violet-400 transition-all text-slate-400"
                        title="Start focus timer"
                      >
                        <Play size={12} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-2 rounded-xl glass hover:bg-red-500/20 hover:text-red-400 transition-all text-slate-400 opacity-0 group-hover:opacity-100"
                      title="Delete task"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        ) : (
          <div className="card-base p-12 text-center text-slate-500">
            No focus tasks found for the current filter criteria.
          </div>
        )}
      </div>

      {/* New Task modal */}
      <AnimatePresence>
        {isCreating && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card-base p-6 max-w-md w-full"
            >
              <h3 className="font-display font-bold text-lg text-white mb-1">Add Focus Task</h3>
              <p className="text-slate-500 text-xs mb-5">
                PathPilot AI task coordinator will breakdown long-running study targets into manageable chunks.
              </p>

              <form onSubmit={handleCreateTask} className="space-y-4">
                <div>
                  <label className="text-slate-400 text-xs font-semibold block mb-1">Task Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Learn complex integration by parts problems"
                    className="input-field"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-xs font-semibold block mb-1">Link to Goal</label>
                  <select
                    className="input-field py-2"
                    value={newTaskGoal}
                    onChange={(e) => setNewTaskGoal(e.target.value)}
                  >
                    {DEMO_GOALS.map((goal) => (
                      <option key={goal.id} value={goal.id}>
                        {goal.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 text-xs font-semibold block mb-1">Category</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. Physics, Coding"
                      value={newTaskCategory}
                      onChange={(e) => setNewTaskCategory(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs font-semibold block mb-1">Duration (min)</label>
                    <input
                      type="number"
                      min={10}
                      max={480}
                      className="input-field"
                      value={newTaskDuration}
                      onChange={(e) => setNewTaskDuration(parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 text-xs font-semibold block mb-1">Task Urgency</label>
                  <select
                    className="input-field py-2"
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value)}
                  >
                    <option value="critical">🔴 Critical</option>
                    <option value="high">🟡 High</option>
                    <option value="medium">🔵 Medium</option>
                    <option value="low">🟢 Low</option>
                  </select>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary py-2 px-5 text-xs font-semibold flex items-center gap-1.5"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={12} className="animate-spin" />
                        AI Breakdown...
                      </>
                    ) : (
                      <>
                        <Brain size={12} />
                        Add Task
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

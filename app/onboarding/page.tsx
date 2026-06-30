"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Zap, Check } from "lucide-react";
import toast from "react-hot-toast";

// Step 1 data
const roles = [
  { id: "jee", icon: "⚗️", label: "JEE Aspirant", desc: "Preparing for JEE Main / Advanced" },
  { id: "neet", icon: "🧬", label: "NEET Aspirant", desc: "Preparing for NEET UG / PG" },
  { id: "gate", icon: "💻", label: "GATE Aspirant", desc: "Preparing for GATE exam" },
  { id: "upsc", icon: "🏛️", label: "UPSC Aspirant", desc: "Preparing for Civil Services" },
  { id: "professional", icon: "💼", label: "Working Professional", desc: "Career growth & skill building" },
  { id: "entrepreneur", icon: "🚀", label: "Entrepreneur", desc: "Building a startup or business" },
];

// Step 2 data
const goalCategories = [
  { id: "exam", icon: "📚", label: "Crack an Exam" },
  { id: "career", icon: "💼", label: "Career Goal" },
  { id: "skill", icon: "🎯", label: "Learn a Skill" },
  { id: "project", icon: "🛠️", label: "Complete a Project" },
  { id: "fitness", icon: "💪", label: "Fitness Goal" },
  { id: "business", icon: "🚀", label: "Business Goal" },
];

// Step 3 time slots
const timeSlots = [
  "6am-7am", "7am-8am", "8am-9am", "9am-10am", "10am-11am", "11am-12pm",
  "12pm-1pm", "1pm-2pm", "2pm-3pm", "3pm-4pm", "4pm-5pm", "5pm-6pm",
  "6pm-7pm", "7pm-8pm", "8pm-9pm", "9pm-10pm", "10pm-11pm", "11pm-12am",
];

// Step 4 learning styles
const learningStyles = [
  { id: "visual", icon: "👁️", label: "Visual", desc: "Videos, diagrams, mind maps" },
  { id: "reading", icon: "📖", label: "Reading", desc: "Books, notes, articles" },
  { id: "practice", icon: "✍️", label: "Practice", desc: "Problems, exercises, projects" },
  { id: "audio", icon: "🎧", label: "Auditory", desc: "Lectures, podcasts, discussions" },
];

const TOTAL_STEPS = 4;

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    role: "",
    goalCategory: "",
    goalTitle: "",
    deadline: "",
    dailyHours: 4,
    peakHours: [] as string[],
    learningStyle: "",
    stressLevel: 5,
  });

  const next = () => {
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    else {
      toast.success("Profile created! Your AI agents are now working for you! 🤖");
      router.push("/dashboard");
    }
  };
  const back = () => setStep(Math.max(0, step - 1));

  const togglePeakHour = (hour: string) => {
    setData((d) => ({
      ...d,
      peakHours: d.peakHours.includes(hour)
        ? d.peakHours.filter((h) => h !== hour)
        : [...d.peakHours, hour],
    }));
  };

  const steps = [
    {
      title: "What best describes you?",
      subtitle: "Help us personalize your AI experience",
      content: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setData((d) => ({ ...d, role: role.id }))}
              className={`p-4 rounded-2xl text-left transition-all duration-300 ${
                data.role === role.id ? "glass-violet" : "glass hover:bg-white/5"
              }`}
              style={{
                border: data.role === role.id ? "1px solid rgba(124,21,240,0.5)" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="text-3xl mb-2">{role.icon}</div>
              <div className="font-semibold text-white text-sm mb-1">{role.label}</div>
              <div className="text-slate-500 text-xs">{role.desc}</div>
              {data.role === role.id && (
                <div className="mt-2 flex items-center gap-1 text-violet-400 text-xs font-medium">
                  <Check size={12} /> Selected
                </div>
              )}
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "What's your primary goal?",
      subtitle: "AI will create a custom roadmap for you",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {goalCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setData((d) => ({ ...d, goalCategory: cat.id }))}
                className={`p-4 rounded-2xl text-center transition-all duration-300 ${
                  data.goalCategory === cat.id ? "glass-violet" : "glass hover:bg-white/5"
                }`}
                style={{
                  border: data.goalCategory === cat.id ? "1px solid rgba(124,21,240,0.5)" : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="font-semibold text-white text-sm">{cat.label}</div>
              </button>
            ))}
          </div>

          {data.goalCategory && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="text-slate-400 text-sm mb-2 block">Describe your goal</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Crack JEE Advanced 2025 with AIR under 500"
                  value={data.goalTitle}
                  onChange={(e) => setData((d) => ({ ...d, goalTitle: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-2 block">Deadline</label>
                <input
                  type="date"
                  className="input-field"
                  value={data.deadline}
                  onChange={(e) => setData((d) => ({ ...d, deadline: e.target.value }))}
                />
              </div>
            </motion.div>
          )}
        </div>
      ),
    },
    {
      title: "When are you available to study?",
      subtitle: "AI will schedule your tasks in your free time",
      content: (
        <div className="space-y-6">
          {/* Daily hours slider */}
          <div className="glass rounded-2xl p-5">
            <div className="flex justify-between items-center mb-3">
              <label className="text-white font-semibold">Daily available hours</label>
              <span className="text-violet-400 font-bold text-xl font-mono">{data.dailyHours}h</span>
            </div>
            <input
              type="range"
              min={1} max={16} step={0.5}
              value={data.dailyHours}
              onChange={(e) => setData((d) => ({ ...d, dailyHours: parseFloat(e.target.value) }))}
              className="w-full accent-violet-500"
            />
            <div className="flex justify-between text-slate-600 text-xs mt-1">
              <span>1h</span><span>8h</span><span>16h</span>
            </div>
          </div>

          {/* Peak hours */}
          <div>
            <label className="text-slate-400 text-sm mb-3 block">Select your peak productivity hours (multiple)</label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => togglePeakHour(slot)}
                  className={`py-2 px-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    data.peakHours.includes(slot)
                      ? "bg-violet-600 text-white border border-violet-400"
                      : "glass text-slate-400 hover:text-white"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Last step — your learning style",
      subtitle: "AI Mentor will adapt its coaching to your style",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {learningStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setData((d) => ({ ...d, learningStyle: style.id }))}
                className={`p-5 rounded-2xl text-left transition-all duration-300 ${
                  data.learningStyle === style.id ? "glass-violet" : "glass hover:bg-white/5"
                }`}
                style={{
                  border: data.learningStyle === style.id ? "1px solid rgba(124,21,240,0.5)" : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="text-3xl mb-2">{style.icon}</div>
                <div className="font-semibold text-white mb-1">{style.label}</div>
                <div className="text-slate-500 text-xs">{style.desc}</div>
              </button>
            ))}
          </div>

          {/* Stress level */}
          <div className="glass rounded-2xl p-5">
            <div className="flex justify-between items-center mb-3">
              <label className="text-white font-semibold">Current stress level</label>
              <span className="font-bold text-xl font-mono" style={{
                color: data.stressLevel <= 3 ? "#10b981" : data.stressLevel <= 6 ? "#f59e0b" : "#ef4444"
              }}>
                {data.stressLevel}/10
              </span>
            </div>
            <input
              type="range"
              min={1} max={10}
              value={data.stressLevel}
              onChange={(e) => setData((d) => ({ ...d, stressLevel: parseInt(e.target.value) }))}
              className="w-full accent-violet-500"
            />
            <div className="flex justify-between text-slate-600 text-xs mt-1">
              <span>😌 Calm</span><span>😐 Moderate</span><span>😰 High Stress</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#03060f" }}>
      {/* BG */}
      <div className="fixed inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: "#7c15f0" }} />

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center gap-2.5 justify-center mb-6">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7c15f0, #06b6d4)" }}>
              <Zap size={18} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl">
              <span className="gradient-text">PathPilot</span>
              <span className="text-white"> AI</span>
            </span>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-6">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #7c15f0, #06b6d4)" }}
                  animate={{ width: i <= step ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            ))}
          </div>
          <div className="text-slate-500 text-xs">Step {step + 1} of {TOTAL_STEPS}</div>
        </div>

        {/* Card */}
        <motion.div
          className="card-base p-8"
          layout
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display font-bold text-2xl text-white mb-2">
                {steps[step].title}
              </h2>
              <p className="text-slate-400 mb-8">{steps[step].subtitle}</p>
              {steps[step].content}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/5">
            <button
              onClick={back}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-slate-400 hover:text-white transition-all font-medium text-sm ${
                step === 0 ? "opacity-0 pointer-events-none" : ""
              }`}
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <button
              onClick={next}
              className="btn-primary py-3 px-8"
            >
              {step === TOTAL_STEPS - 1 ? "Launch PathPilot AI 🚀" : "Continue"}
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

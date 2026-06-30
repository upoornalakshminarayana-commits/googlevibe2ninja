"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, ArrowRight, Shield, Users, Target } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import toast from "react-hot-toast";

const features = [
  { icon: <Target size={16} />, text: "AI Goal Architect" },
  { icon: <Shield size={16} />, text: "Deadline Risk Prediction" },
  { icon: <Users size={16} />, text: "50,000+ Success Stories" },
];

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Welcome to PathPilot AI! 🚀");
      router.push("/onboarding");
    } catch (error: unknown) {
      // Demo mode — proceed without real auth
      console.log("Auth error (demo mode):", error);
      toast.success("Welcome to PathPilot AI! (Demo Mode) 🚀");
      router.push("/onboarding");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    toast.success("Entering demo mode! 🎯");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ background: "#03060f" }}>
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a0533 100%)" }}>
        {/* BG orbs */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full blur-3xl opacity-20"
          style={{ background: "#7c15f0" }} />
        <div className="absolute bottom-[-80px] right-[-80px] w-[300px] h-[300px] rounded-full blur-3xl opacity-15"
          style={{ background: "#06b6d4" }} />

        {/* Grid */}
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7c15f0, #06b6d4)" }}>
            <Zap size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-xl">
            <span className="gradient-text">PathPilot</span>
            <span className="text-white"> AI</span>
          </span>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-display font-bold text-white leading-tight mb-4">
              Your AI companion
              <br />
              <span className="gradient-text">awaits you</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Join thousands of JEE, NEET, GATE aspirants and professionals achieving their goals with 10 specialized Gemini AI agents.
            </p>

            {/* Feature list */}
            <div className="flex flex-col gap-3">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 text-slate-300"
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(124,21,240,0.2)", color: "#a855f7" }}>
                    {f.icon}
                  </div>
                  <span className="text-sm font-medium">{f.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Testimonial snippet */}
        <div className="relative z-10 glass rounded-2xl p-5">
          <p className="text-slate-300 text-sm italic mb-3">
            &ldquo;PathPilot AI helped me crack JEE Advanced with AIR 847. The AI agents predicted my weak areas 3 weeks before the exam.&rdquo;
          </p>
          <div className="flex items-center gap-2">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" alt="Priya" className="w-7 h-7 rounded-lg" />
            <div>
              <div className="text-white text-xs font-semibold">Priya Sharma</div>
              <div className="text-slate-500 text-[10px]">IIT Bombay — AIR 847</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7c15f0, #06b6d4)" }}>
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg">
              <span className="gradient-text">PathPilot</span>
              <span className="text-white"> AI</span>
            </span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="font-display font-bold text-3xl text-white mb-2">
              Start Your Journey
            </h2>
            <p className="text-slate-400">
              Sign in to access your AI success companion
            </p>
          </div>

          {/* Auth Buttons */}
          <div className="flex flex-col gap-4">
            {/* Google Sign In */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-semibold text-white transition-all duration-300 relative overflow-hidden group"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                  </g>
                </svg>
              )}
              <span>{loading ? "Signing in..." : "Continue with Google"}</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-slate-500 text-sm">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Demo Mode */}
            <button
              onClick={handleDemoLogin}
              className="btn-primary w-full justify-center py-4"
            >
              <Zap size={18} />
              Try Demo — No Account Needed
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Legal */}
          <p className="text-slate-600 text-xs text-center mt-6 leading-relaxed">
            By continuing, you agree to our{" "}
            <a href="#" className="text-violet-400 hover:underline">Terms of Service</a> and{" "}
            <a href="#" className="text-violet-400 hover:underline">Privacy Policy</a>.
            <br />
            Your data is protected by Google Cloud encryption.
          </p>

          {/* Back link */}
          <div className="text-center mt-6">
            <Link href="/" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">
              ← Back to homepage
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

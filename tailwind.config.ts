import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // PathPilot Brand Colors
        navy: {
          950: "#03060f",
          900: "#060d1f",
          800: "#0a1628",
          700: "#0f2040",
          600: "#152a55",
          500: "#1c366b",
        },
        violet: {
          950: "#1a0533",
          900: "#2d0a5c",
          800: "#4a0d96",
          700: "#6010c4",
          600: "#7c15f0",
          500: "#9333ea",
          400: "#a855f7",
          300: "#c084fc",
          200: "#ddb0fe",
          100: "#f3e8ff",
        },
        cyan: {
          950: "#001a1f",
          900: "#003344",
          800: "#005566",
          700: "#007a99",
          600: "#00a3cc",
          500: "#06b6d4",
          400: "#22d3ee",
          300: "#67e8f9",
          200: "#a5f3fc",
          100: "#e0f9fc",
        },
        // Alert System Colors
        alert: {
          green: "#10b981",
          "green-bg": "#022c22",
          "green-border": "#065f46",
          yellow: "#f59e0b",
          "yellow-bg": "#1c1100",
          "yellow-border": "#92400e",
          red: "#ef4444",
          "red-bg": "#1c0000",
          "red-border": "#991b1b",
          black: "#1a1a2e",
          "black-bg": "#000000",
          "black-border": "#374151",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(135deg, #03060f 0%, #0a1628 30%, #1a0533 60%, #03060f 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(124,21,240,0.1) 0%, rgba(6,182,212,0.05) 100%)",
        "violet-glow":
          "radial-gradient(circle at center, rgba(124,21,240,0.3) 0%, transparent 70%)",
        "cyan-glow":
          "radial-gradient(circle at center, rgba(6,182,212,0.2) 0%, transparent 70%)",
      },
      boxShadow: {
        "violet-glow": "0 0 30px rgba(124,21,240,0.3), 0 0 60px rgba(124,21,240,0.1)",
        "cyan-glow": "0 0 30px rgba(6,182,212,0.3), 0 0 60px rgba(6,182,212,0.1)",
        "card-glow": "0 0 40px rgba(124,21,240,0.15)",
        glass: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
        "alert-green": "0 0 20px rgba(16,185,129,0.3)",
        "alert-yellow": "0 0 20px rgba(245,158,11,0.3)",
        "alert-red": "0 0 20px rgba(239,68,68,0.3)",
        "alert-black": "0 0 20px rgba(0,0,0,0.8)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "spin-slow": "spin 15s linear infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "count-up": "count-up 2s ease-out",
        "beam": "beam 3s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px rgba(124,21,240,0.4)" },
          "50%": { opacity: "0.8", boxShadow: "0 0 40px rgba(124,21,240,0.7)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        beam: {
          "0%, 100%": { transform: "scaleX(0)", opacity: "0" },
          "50%": { transform: "scaleX(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;

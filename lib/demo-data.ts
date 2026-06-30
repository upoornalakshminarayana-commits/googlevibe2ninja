// Demo data for PathPilot AI — used when Firebase is not configured

export const DEMO_USER = {
  uid: "demo-user-001",
  email: "arjun.sharma@iit.ac.in",
  displayName: "Arjun Sharma",
  photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
  role: "student",
  examTarget: "JEE Advanced",
  successScore: 76,
  streak: 14,
  onboardingComplete: true,
  productivityProfile: {
    peakHours: ["6am-9am", "9pm-11pm"],
    dailyAvailableHours: 8,
    weeklyAvailableHours: 56,
    learningStyle: "visual",
    stressLevel: 6,
  },
};

export const DEMO_GOALS = [
  {
    id: "goal-001",
    title: "Crack JEE Advanced 2025",
    category: "exam",
    deadline: new Date("2025-05-18"),
    priority: "critical",
    status: "active",
    successProbability: 72,
    alertLevel: "yellow",
    progress: 65,
    milestones: [
      { title: "Complete Physics syllabus", completed: true },
      { title: "Complete Chemistry syllabus", completed: true },
      { title: "Complete Mathematics syllabus", completed: false },
      { title: "Complete 10 mock tests", completed: false },
    ],
  },
  {
    id: "goal-002",
    title: "Score 95% in Board Exams",
    category: "exam",
    deadline: new Date("2025-03-15"),
    priority: "high",
    status: "active",
    successProbability: 88,
    alertLevel: "green",
    progress: 82,
    milestones: [
      { title: "Complete revision of all subjects", completed: true },
      { title: "Practice previous year papers", completed: true },
      { title: "Mock test series", completed: false },
    ],
  },
  {
    id: "goal-003",
    title: "Build Full-Stack Project Portfolio",
    category: "skill",
    deadline: new Date("2025-04-30"),
    priority: "medium",
    status: "at-risk",
    successProbability: 45,
    alertLevel: "red",
    progress: 30,
    milestones: [
      { title: "Learn React basics", completed: true },
      { title: "Build 2 projects", completed: false },
      { title: "Deploy to production", completed: false },
    ],
  },
];

export const DEMO_TASKS = [
  {
    id: "task-001",
    title: "Solve 20 JEE Physics problems",
    goalId: "goal-001",
    scheduledDate: new Date(),
    duration: 90,
    priority: "critical",
    status: "pending",
    category: "Physics",
  },
  {
    id: "task-002",
    title: "Organic Chemistry - Chapter 12 Revision",
    goalId: "goal-001",
    scheduledDate: new Date(),
    duration: 60,
    priority: "high",
    status: "completed",
    category: "Chemistry",
  },
  {
    id: "task-003",
    title: "Integration by Parts — 15 problems",
    goalId: "goal-001",
    scheduledDate: new Date(),
    duration: 75,
    priority: "high",
    status: "in-progress",
    category: "Mathematics",
  },
  {
    id: "task-004",
    title: "Full Mock Test #7",
    goalId: "goal-001",
    scheduledDate: new Date(),
    duration: 180,
    priority: "critical",
    status: "pending",
    category: "Mock Test",
  },
  {
    id: "task-005",
    title: "English Literature Essay Writing",
    goalId: "goal-002",
    scheduledDate: new Date(),
    duration: 45,
    priority: "medium",
    status: "pending",
    category: "English",
  },
];

export const DEMO_NOTIFICATIONS = [
  {
    id: "notif-001",
    type: "alert",
    alertLevel: "yellow",
    title: "⚠️ Deadline Risk Detected",
    body: "Mathematics syllabus completion is 3 weeks behind schedule. Recovery plan available.",
    read: false,
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: "notif-002",
    type: "achievement",
    alertLevel: "green",
    title: "🎉 14-Day Streak Achieved!",
    body: "You've maintained a 14-day study streak. You're in the top 5% of PathPilot users!",
    read: false,
    createdAt: new Date(Date.now() - 7200000),
  },
  {
    id: "notif-003",
    type: "motivation",
    alertLevel: "green",
    title: "🤖 AI Agent Update",
    body: "Goal Planning Agent has optimized your weekly schedule. 23% efficiency gain detected.",
    read: true,
    createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: "notif-004",
    type: "alert",
    alertLevel: "red",
    title: "🚨 Portfolio Project Critical",
    body: "Portfolio project is at HIGH RISK of missing deadline. Immediate action required.",
    read: false,
    createdAt: new Date(Date.now() - 1800000),
  },
];

export const DEMO_WEEKLY_PROGRESS = [
  { day: "Mon", planned: 8, actual: 7.5, score: 94 },
  { day: "Tue", planned: 8, actual: 8, score: 100 },
  { day: "Wed", planned: 7, actual: 5, score: 71 },
  { day: "Thu", planned: 8, actual: 8.5, score: 100 },
  { day: "Fri", planned: 6, actual: 6, score: 100 },
  { day: "Sat", planned: 9, actual: 7, score: 78 },
  { day: "Sun", planned: 8, actual: 4, score: 50 },
];

export const DEMO_AGENTS = [
  {
    id: "agent-001",
    name: "Goal Planning Agent",
    icon: "🎯",
    status: "active",
    lastAction: "Restructured JEE prep milestones",
    actionTime: "2 mins ago",
    color: "violet",
  },
  {
    id: "agent-002",
    name: "Risk Prediction Agent",
    icon: "⚠️",
    status: "active",
    lastAction: "Detected deadline risk for Math syllabus",
    actionTime: "5 mins ago",
    color: "yellow",
  },
  {
    id: "agent-003",
    name: "Recovery Planning Agent",
    icon: "🔄",
    status: "idle",
    lastAction: "Generated catch-up plan for Physics",
    actionTime: "1 hour ago",
    color: "cyan",
  },
  {
    id: "agent-004",
    name: "Motivation Agent",
    icon: "💪",
    status: "active",
    lastAction: "Sent morning motivation briefing",
    actionTime: "3 hours ago",
    color: "green",
  },
  {
    id: "agent-005",
    name: "Task Breakdown Agent",
    icon: "📋",
    status: "idle",
    lastAction: "Broke down Integration chapter into 12 tasks",
    actionTime: "Yesterday",
    color: "violet",
  },
  {
    id: "agent-006",
    name: "Progress Analysis Agent",
    icon: "📊",
    status: "active",
    lastAction: "Weekly performance report generated",
    actionTime: "6 hours ago",
    color: "cyan",
  },
];

export const MOTIVATIONAL_QUOTES = [
  {
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "Dreams",
  },
  {
    quote: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    category: "Persistence",
  },
  {
    quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "Resilience",
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "Passion",
  },
  {
    quote: "Your limitation—it's only your imagination.",
    author: "Unknown",
    category: "Mindset",
  },
  {
    quote: "Dream it. Wish it. Do it.",
    author: "Unknown",
    category: "Action",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "JEE Advanced Qualifier",
    college: "IIT Bombay, CSE",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    rating: 5,
    quote:
      "PathPilot AI predicted I was 40 days behind schedule and generated a recovery plan that got me to IIT Bombay. The AI agents literally changed my life.",
    achievement: "AIR 847 — JEE Advanced",
    alertLevel: "green",
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "GATE Qualifier",
    college: "IISc Bangalore",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    rating: 5,
    quote:
      "The Risk Prediction Agent flagged my weak areas 6 weeks before GATE. I wouldn't have scored 98.7 percentile without PathPilot's personalized study plan.",
    achievement: "98.7 Percentile — GATE CSE",
    alertLevel: "green",
  },
  {
    id: 3,
    name: "Ananya Krishnan",
    role: "NEET Qualifier",
    college: "AIIMS New Delhi",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya",
    rating: 5,
    quote:
      "The Burnout Detection feature saved me. It reduced my study hours intelligently when I was exhausted and improved my retention by 35%. AIIMS is the result!",
    achievement: "AIR 312 — NEET UG",
    alertLevel: "green",
  },
  {
    id: 4,
    name: "Arjun Mehta",
    role: "Software Engineer",
    college: "Google India",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunM",
    rating: 5,
    quote:
      "As a working professional, PathPilot helped me crack Google's interview in 90 days while balancing my current job. The scheduling agent is pure genius.",
    achievement: "Placed at Google — ₹42 LPA",
    alertLevel: "green",
  },
  {
    id: 5,
    name: "Kavya Reddy",
    role: "EdTech Founder",
    college: "IIM Ahmedabad Alumni",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kavya",
    rating: 5,
    quote:
      "Built my startup from idea to ₹2Cr ARR using PathPilot's goal architecture. The AI Digital Twin predicted our growth trajectory with 89% accuracy.",
    achievement: "Founded EduGrow — ₹2Cr ARR",
    alertLevel: "green",
  },
];

export const FEATURES = [
  {
    icon: "🎯",
    title: "AI Goal Architect",
    description: "Decompose any goal into actionable milestones with AI-generated timelines tailored to your schedule.",
    color: "violet",
  },
  {
    icon: "⚠️",
    title: "Deadline Failure Prediction",
    description: "Gemini AI analyzes your progress velocity and alerts you weeks before you'd miss a deadline.",
    color: "yellow",
  },
  {
    icon: "📅",
    title: "Personalized Weekly Plans",
    description: "AI generates optimal weekly schedules based on your peak productivity hours and energy levels.",
    color: "cyan",
  },
  {
    icon: "🤖",
    title: "AI Mentor (Chat)",
    description: "24/7 conversational AI mentor that knows your goals, struggles, and learning style intimately.",
    color: "violet",
  },
  {
    icon: "🔄",
    title: "Smart Recovery Plans",
    description: "When you fall behind, AI generates realistic catch-up plans without burning you out.",
    color: "cyan",
  },
  {
    icon: "🧠",
    title: "Burnout Detection",
    description: "AI monitors stress patterns and automatically adjusts workload before you hit a wall.",
    color: "red",
  },
  {
    icon: "📊",
    title: "Success Probability Simulator",
    description: "Real-time probability engine showing your chances of hitting each goal on time.",
    color: "green",
  },
  {
    icon: "👤",
    title: "AI Digital Twin",
    description: "An AI model of you that predicts how future-you will perform based on current habits.",
    color: "violet",
  },
  {
    icon: "🔔",
    title: "Smart Escalation Alerts",
    description: "4-level alert system (Green/Yellow/Red/Black) that escalates based on deadline proximity.",
    color: "yellow",
  },
  {
    icon: "🎤",
    title: "Voice Assistant",
    description: "Hands-free interaction — ask your AI companion about tasks, schedules, and progress.",
    color: "cyan",
  },
];

export const AGENTS_INFO = [
  { id: 1, name: "Goal Planning Agent", icon: "🎯", description: "Decomposes goals into structured milestones and tasks using Gemini AI", color: "#7c15f0" },
  { id: 2, name: "Task Breakdown Agent", icon: "📋", description: "Converts milestones into daily actionable tasks with time estimates", color: "#06b6d4" },
  { id: 3, name: "Scheduling Agent", icon: "📅", description: "Creates optimized schedules based on your availability and priorities", color: "#10b981" },
  { id: 4, name: "Risk Prediction Agent", icon: "⚠️", description: "Predicts deadline failures weeks in advance using progress analytics", color: "#f59e0b" },
  { id: 5, name: "Recovery Planning Agent", icon: "🔄", description: "Generates realistic catch-up plans when you fall behind schedule", color: "#ef4444" },
  { id: 6, name: "Gmail Parsing Agent", icon: "📧", description: "Extracts tasks and deadlines from your emails automatically", color: "#7c15f0" },
  { id: 7, name: "Calendar Management Agent", icon: "🗓️", description: "Syncs tasks with Google Calendar and optimizes time blocks", color: "#06b6d4" },
  { id: 8, name: "Progress Analysis Agent", icon: "📊", description: "Analyzes performance trends and identifies improvement opportunities", color: "#10b981" },
  { id: 9, name: "Motivation Agent", icon: "💪", description: "Sends personalized motivational messages based on your emotional state", color: "#f59e0b" },
  { id: 10, name: "Accountability Agent", icon: "👁️", description: "Monitors commitments and sends escalating nudges to keep you on track", color: "#a855f7" },
];

export const STATS = [
  { value: 50000, suffix: "+", label: "Active Users", icon: "👥" },
  { value: 94, suffix: "%", label: "Goal Achievement Rate", icon: "🎯" },
  { value: 10, suffix: "", label: "AI Agents", icon: "🤖" },
  { value: 4.9, suffix: "★", label: "Average Rating", icon: "⭐" },
];

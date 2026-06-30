import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "PathPilot AI — Your AI Success Companion",
  description:
    "PathPilot AI is an autonomous AI-powered productivity platform helping students, professionals, and entrepreneurs achieve goals before deadlines using 10 specialized Gemini AI agents.",
  keywords: [
    "AI productivity",
    "goal planning",
    "JEE preparation",
    "NEET preparation",
    "GATE preparation",
    "deadline tracker",
    "AI mentor",
    "study planner",
    "Gemini AI",
  ],
  openGraph: {
    title: "PathPilot AI — Your AI Success Companion",
    description: "Autonomous AI platform powered by Gemini 2.5 — predict deadline failures, get recovery plans, and achieve your goals.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "rgba(10, 22, 40, 0.95)",
              color: "#f8fafc",
              border: "1px solid rgba(124, 21, 240, 0.3)",
              backdropFilter: "blur(20px)",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}

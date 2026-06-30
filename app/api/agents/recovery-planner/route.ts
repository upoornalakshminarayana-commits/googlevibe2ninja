import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { atRiskGoal, currentDelay } = await req.json();

    const prompt = `You are the PathPilot Recovery Planning Agent. A user is falling behind:
    
    Goal: ${atRiskGoal}
    Current Delay: ${currentDelay}
    
    Generate a 3-step structured recovery catch-up route that will restore milestone velocity without causing user burnout.
    
    Respond in JSON format:
    {
      "recoverySteps": [
        {"title": "Phase 1 Recovery Focus", "dailyHourShift": 1, "targetTasks": ["Task A", "Task B"]},
        {"title": "Phase 2 Core Push", "dailyHourShift": 1.5, "targetTasks": ["Task C"]}
      ],
      "projectedRecoveryDays": 14
    }`;

    if (!GEMINI_API_KEY || GEMINI_API_KEY === "your_gemini_api_key_here") {
      return NextResponse.json({
        recoverySteps: [
          { title: "Calculus Core Practice", dailyHourShift: 1, targetTasks: ["Integration by Parts problems (20)", "Substitution drills (15)"] },
          { title: "Simulated Test Recovery", dailyHourShift: 1.5, targetTasks: ["Timed Math mock test section (90m)", "Wrong answer analysis"] }
        ],
        projectedRecoveryDays: 10
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 1024 },
        }),
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const result = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    return NextResponse.json(result);
  } catch (error) {
    console.error("Recovery Planner Agent error:", error);
    return NextResponse.json({ error: "Recovery planning failed" }, { status: 500 });
  }
}

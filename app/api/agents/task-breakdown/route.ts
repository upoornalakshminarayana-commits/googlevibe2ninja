import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { taskDescription, duration, goalId } = await req.json();

    const prompt = `You are the PathPilot Task Breakdown Agent. A user has a task:
    
    Task: ${taskDescription}
    Allocated Duration: ${duration} minutes
    Goal ID: ${goalId}
    
    Break this task down into 3-5 smaller actionable micro-steps or subtasks, each with a duration and clear action target.
    
    Respond in JSON format:
    {
      "tasks": [
        {"title": "Step 1 name", "duration": 15},
        {"title": "Step 2 name", "duration": 30}
      ]
    }`;

    if (!GEMINI_API_KEY || GEMINI_API_KEY === "your_gemini_api_key_here") {
      // Return simulation fallback
      return NextResponse.json({
        tasks: [
          { title: "Initialize session & review reference notes", duration: 15 },
          { title: "Solve core practice problems with timer active", duration: Math.max(15, duration - 30) },
          { title: "Analyze incorrect questions & formulate tips sheet", duration: 15 }
        ]
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
    console.error("Task Breakdown Agent error:", error);
    return NextResponse.json({ error: "Task breakdown failed" }, { status: 500 });
  }
}

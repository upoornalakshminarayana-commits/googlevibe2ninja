import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { goal, deadline, role } = await req.json();

    const prompt = `You are the PathPilot Goal Planning Agent. A user wants to achieve the following goal:

Goal: ${goal}
Deadline: ${deadline}
User Role: ${role}

Create a detailed goal breakdown with:
1. 4-6 major milestones with dates
2. 3-5 tasks per milestone
3. Risk assessment (Low/Medium/High)
4. Success probability (0-100%)
5. Key focus areas

Respond in JSON format:
{
  "milestones": [{"title": "", "date": "", "tasks": [], "risk": ""}],
  "successProbability": 0,
  "keyFocusAreas": [],
  "estimatedDailyHours": 0,
  "riskFactors": []
}`;

    if (!GEMINI_API_KEY || GEMINI_API_KEY === "your_gemini_api_key_here") {
      return NextResponse.json({
        milestones: [
          { title: "Foundation Phase", date: "Week 1-4", tasks: ["Study core concepts", "Practice basics", "Take notes"], risk: "Low" },
          { title: "Intermediate Phase", date: "Week 5-10", tasks: ["Advanced problems", "Mock tests", "Error analysis"], risk: "Medium" },
          { title: "Advanced Phase", date: "Week 11-16", tasks: ["Full mock exams", "Weak area focus", "Speed practice"], risk: "High" },
          { title: "Revision Phase", date: "Week 17-20", tasks: ["Quick revision", "Formula sheets", "Final mocks"], risk: "Medium" },
        ],
        successProbability: 78,
        keyFocusAreas: ["Core concepts mastery", "Time management", "Regular practice", "Mock test analysis"],
        estimatedDailyHours: 6,
        riskFactors: ["Time constraint", "Subject complexity", "Burnout risk"],
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 2048 },
        }),
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const result = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    return NextResponse.json(result);
  } catch (error) {
    console.error("Goal Planner error:", error);
    return NextResponse.json({ error: "Goal planning failed" }, { status: 500 });
  }
}

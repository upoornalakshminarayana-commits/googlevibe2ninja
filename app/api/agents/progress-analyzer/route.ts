import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { actualHoursList, plannedHoursList } = await req.json();

    const prompt = `You are the PathPilot Progress Analysis Agent. Compile hours statistics and trend index:
    
    Actual: ${JSON.stringify(actualHoursList)}
    Planned: ${JSON.stringify(plannedHoursList)}
    
    Calculate trend status and digital twin health.
    
    Respond in JSON format:
    {
      "twinHealthIndex": 85,
      "efficiencyRate": 92,
      "summary": "Short performance trend outline."
    }`;

    if (!GEMINI_API_KEY || GEMINI_API_KEY === "your_gemini_api_key_here") {
      return NextResponse.json({
        twinHealthIndex: 82,
        efficiencyRate: 94,
        summary: "You are maintaining 94% focus efficiency. Peak hours alignment is excellent, but weekend syllabus study lag requires recovery slots."
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 512 },
        }),
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const result = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    return NextResponse.json(result);
  } catch (error) {
    console.error("Progress Analyzer error:", error);
    return NextResponse.json({ error: "Progress analysis failed" }, { status: 500 });
  }
}

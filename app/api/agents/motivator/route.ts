import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { userName, currentStreak, currentStress } = await req.json();

    const prompt = `You are the PathPilot Motivation Agent. Generate a highly personalized, high-impact daily motivational quote and strategic energy advice for:
    
    User: ${userName}
    Streak: ${currentStreak} days
    Stress level: ${currentStress}/10
    
    Keep it punchy, empathetic, and quote-focused.
    
    Respond in JSON format:
    {
      "quote": "Personalized quote sentence here.",
      "author": "Inspirational Author or System Agent",
      "energyAdvice": "Quick feedback on stress control or energy conservation."
    }`;

    if (!GEMINI_API_KEY || GEMINI_API_KEY === "your_gemini_api_key_here") {
      return NextResponse.json({
        quote: "Your daily focus creates your future success. Maintain the streak!",
        author: "PathPilot Motivation Agent",
        energyAdvice: "Your stress index is moderate. Integrate a 10-minute walk between revision slots to lower cortisol levels and maximize memory retention."
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.5, maxOutputTokens: 512 },
        }),
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const result = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    return NextResponse.json(result);
  } catch (error) {
    console.error("Motivation Agent error:", error);
    return NextResponse.json({ error: "Motivation generation failed" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { goalsList } = await req.json();

    const prompt = `You are the PathPilot Deadline Risk Predictor Agent. Analyze these user goals and velocity stats:
    
    Goals Info: ${JSON.stringify(goalsList)}
    
    Calculate:
    1. Overall milestone delays
    2. Failure probability risk score (0-100%)
    3. Actionable recovery trigger recommendations
    
    Respond in JSON format:
    {
      "riskScore": 42,
      "delaysDetected": ["Math syllabus lag of 3 weeks", "Portfolio page delayed by 10 days"],
      "recommendations": ["Reallocate 2.5h from English board prep to Math integrations", "Focus on React portfolio deploy milestone"]
    }`;

    if (!GEMINI_API_KEY || GEMINI_API_KEY === "your_gemini_api_key_here") {
      return NextResponse.json({
        riskScore: 38,
        delaysDetected: [
          "Calculus syllabus progress velocity is 12% below required standard",
          "Full portfolio project deployment is behind by 5 days"
        ],
        recommendations: [
          "Shift 2 hours of general revision block to integration mock exams",
          "Focus on atomic component styling tasks before deploying build layout"
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
    console.error("Risk Predictor Agent error:", error);
    return NextResponse.json({ error: "Risk prediction failed" }, { status: 500 });
  }
}

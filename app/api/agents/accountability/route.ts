import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { missedTasks, streak } = await req.json();

    const prompt = `You are the PathPilot Accountability Agent.
Missed Tasks: ${JSON.stringify(missedTasks)}
Current Streak: ${streak}

Generate a firm but constructive accountability message nudging the user to complete their tasks and warning them about their streak.
Provide a JSON object. Format:
{
  "nudgeMessage": "string",
  "recommendedAction": "string",
  "urgencyLevel": "yellow|red|black"
}`;

    if (!GEMINI_API_KEY) {
      // Fallback response if no API key
      return NextResponse.json({
        nudgeMessage: "You have missed some important tasks today. Don't lose your momentum!",
        recommendedAction: "Complete the top priority task now for 15 minutes.",
        urgencyLevel: "yellow"
      });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json",
        }
      }),
    });

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    
    return NextResponse.json(JSON.parse(resultText));
    
  } catch (error) {
    console.error("Accountability Agent Error:", error);
    return NextResponse.json(
      { error: "Failed to generate accountability nudge." },
      { status: 500 }
    );
  }
}

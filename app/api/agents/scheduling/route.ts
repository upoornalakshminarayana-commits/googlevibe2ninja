import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { tasksList, availability } = await req.json();

    const prompt = `You are the PathPilot Scheduling Agent.
User Tasks: ${JSON.stringify(tasksList)}
Availability: ${JSON.stringify(availability)}

Provide a JSON object scheduling these tasks optimally. 
Format:
{
  "schedule": [
    { "taskId": "string", "startTime": "string (ISO)", "endTime": "string (ISO)" }
  ],
  "message": "string"
}`;

    if (!GEMINI_API_KEY) {
      // Fallback response if no API key
      return NextResponse.json({
        schedule: [
          {
            taskId: tasksList?.[0]?.id || "task-001",
            startTime: new Date().toISOString(),
            endTime: new Date(Date.now() + 3600000).toISOString(),
          }
        ],
        message: "Demo mode: Basic schedule created. Add Gemini API key for optimal scheduling."
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
    console.error("Scheduling Agent Error:", error);
    return NextResponse.json(
      { error: "Failed to generate schedule." },
      { status: 500 }
    );
  }
}

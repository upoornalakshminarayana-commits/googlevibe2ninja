import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { emailContent } = await req.json();

    const prompt = `You are the PathPilot Gmail Parsing Agent.
Email Content: ${emailContent}

Extract any action items or deadlines from this email.
Provide a JSON object. Format:
{
  "extractedTasks": [
    { "title": "string", "deadline": "string (ISO, optional)", "priority": "high|medium|low" }
  ],
  "summary": "string"
}`;

    if (!GEMINI_API_KEY) {
      // Fallback response if no API key
      return NextResponse.json({
        extractedTasks: [
          {
            title: "Submit assignment",
            deadline: new Date(Date.now() + 86400000).toISOString(),
            priority: "high"
          }
        ],
        summary: "Demo mode: Dummy task extracted from email. Add Gemini API key for real parsing."
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
    console.error("Gmail Parsing Agent Error:", error);
    return NextResponse.json(
      { error: "Failed to parse email." },
      { status: 500 }
    );
  }
}

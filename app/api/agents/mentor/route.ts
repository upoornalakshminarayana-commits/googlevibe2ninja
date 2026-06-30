import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_CONTEXT = `You are PathPilot AI Mentor — an expert AI success companion powered by Gemini 2.5 Pro. 

You know the following about this user:
- Name: Arjun Sharma
- Goal: Crack JEE Advanced 2025 (Deadline: May 2025)
- Current success probability: 72% (Yellow Alert)
- 14-day study streak
- Weak areas: Mathematics (Integration, Differential Equations)
- Peak hours: 6am-9am and 9pm-11pm
- Daily available hours: 8h
- Learning style: Visual

You are empathetic, data-driven, and action-oriented. Provide specific, personalized advice. Use markdown for formatting (bold text with **). Keep responses focused and actionable. Include emojis appropriately. Reference their specific goals and data when relevant.`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!GEMINI_API_KEY || GEMINI_API_KEY === "your_gemini_api_key_here") {
      // Return demo response when API key not configured
      return NextResponse.json({
        response: `I'm your PathPilot AI Mentor! 🤖 

For a fully personalized response to "${message}", please configure your Gemini API key in **.env.local**.

**To activate live AI responses:**
1. Get your key from [Google AI Studio](https://aistudio.google.com)
2. Add \`GEMINI_API_KEY=your_key\` to \`.env.local\`
3. Restart the dev server

In the meantime, I can still help you with pre-built insights about your JEE Advanced preparation journey! What specific area would you like to focus on?`,
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: SYSTEM_CONTEXT + "\n\nUser message: " + message }],
            },
          ],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) throw new Error("Gemini API error");

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, I couldn't generate a response. Please try again.";

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Mentor API error:", error);
    return NextResponse.json(
      { response: "I'm having trouble connecting to my AI brain right now. Please check your Gemini API key and try again! 🔧" },
      { status: 200 }
    );
  }
}

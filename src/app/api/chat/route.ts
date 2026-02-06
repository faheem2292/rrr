import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    // Aapki Nayi API Key
    const API_KEY = "AIzaSyBIY-hMNsFKEEDoEkhzTLoTYYU50FxBn_I";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are the official AI Assistant for USWA College Bhowana.
            Rules:
            - Keep answers professional and friendly.
            - Provide info about these Professors: Bio (Dr. Ahmad), Math (Zahid Mahmood), English (Ms. Sarah), Islamyat (Hafiz Usman), Urdu (Raza Abbas), Computer (Ali Raza).
            - Location: Kalri Bypass Road, Bhowana. Contact: 0301-0637955.
            - User asked: ${message}`
          }]
        }]
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Gemini Error:", data.error.message);
      return NextResponse.json({ reply: "I'm having a slight connection issue. Please call 0301-0637955 for help." });
    }

    const aiReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I am here to help!";
    return NextResponse.json({ reply: aiReply });

  } catch (error) {
    return NextResponse.json({ reply: "Connection failed. Please check your internet." });
  }
}
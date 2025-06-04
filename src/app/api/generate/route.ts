import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure this is correctly set
});

export async function POST(req: Request) {
  try {
    const { productName, features, style } = await req.json();

    if (!productName || !features) {
      return NextResponse.json(
        { error: "Missing product name or features" },
        { status: 400 }
      );
    }

    const prompt = `Write a ${style} product description for "${productName}" with these features: ${features}. Format the response aesthetically with:
    - A clear, bold title.
    - A short introductory paragraph.
    - Key features as dash points.
    Use proper markdown formatting for headings and bullet points.`;

    const response = await openai.chat.completions.create({
      // ✅ Correct API call
      model: "gpt-4.1-mini", // Use your desired model
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    return NextResponse.json({
      description: response.choices[0]?.message?.content?.trim() || "",
    });
  } catch (error: unknown) {
    console.error("API Error:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Something went wrong", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

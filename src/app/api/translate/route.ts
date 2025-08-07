import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text, sourceLanguage, targetLanguage } = await request.json();

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Handle auto-detect language option
    const prompt = sourceLanguage === 'auto'
      ? `Translate the following text to ${targetLanguage}. The source language is unknown and should be auto-detected: ${text}`
      : `Translate the following text from ${sourceLanguage} to ${targetLanguage}: ${text}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    let translatedText = data.choices?.[0]?.message?.content || "Translation failed.";
    
    // Clean up the response if it contains language detection information
    if (sourceLanguage === 'auto') {
      // Remove various patterns of language detection messages
      translatedText = translatedText.replace(/^(The language (of the text )?is [^.]+\.|I detected that the (source )?language is [^.]+\.)\s*/, '');
      translatedText = translatedText.replace(/^Translation (from [^:]+\s)?to [^:]+:\s*/, '');
      // Remove pattern like "The language of the text is {detected language}. Translation to Spanish{selected language to translate into}:"
      translatedText = translatedText.replace(/^The language of the text is [^.]+\. Translation to [^:]+:\s*/, '');
      // Remove any remaining prefixes that might indicate language detection
      translatedText = translatedText.replace(/^(Translated|Here's the translation|In [^:]+):\s*/, '');
      translatedText = translatedText.trim();
    }

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error("Translation API error:", error);
    return NextResponse.json(
      { error: "Failed to process translation request" },
      { status: 500 }
    );
  }
}

export const translateText = async (
  text: string,
  sourceLanguage: string,
  targetLanguage: string
): Promise<string> => {
  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      body: JSON.stringify({ text, sourceLanguage, targetLanguage }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return "Translation failed.";
  }
};

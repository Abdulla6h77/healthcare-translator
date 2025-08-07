"use client";

import { useState } from "react";
import { startListening } from "@/utils/speechRecognition";
import { translateText } from "@/utils/translate";
import { speak } from "@/utils/speechSynthesis";
import Link from "next/link";

export default function TranslatePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sourceLang, setSourceLang] = useState("auto");
  const [targetLang, setTargetLang] = useState("es");

  const handleTranslate = async () => {
    if (!input.trim()) return;
    const result = await translateText(input, sourceLang, targetLang);
    setOutput(result);
    speak(result, targetLang);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">
        <span className="bold">Healthcare</span> Translator
      </h1>

      <div className="form-grid">
        {/* Left Column */}
        <div className="form-column">
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="form-select"
          >
            <option value="auto">Auto-detect</option>
            <option value="en">English</option>
            <option value="ur">Urdu</option>
            <option value="hi">Hindi</option>
            <option value="bn">Bengali</option>
            <option value="pa">Punjabi</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
          </select>

          <textarea
            placeholder="Enter healthcare-related text..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="form-textarea"
          ></textarea>

          <button onClick={() => startListening(sourceLang, (text) => setInput(text))} className="form-button">
            🎤 Speak
          </button>
        </div>

        {/* Right Column */}
        <div className="form-column">
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="form-select"
          >
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="zh">Chinese</option>
            <option value="de">German</option>
            <option value="ru">Russian</option>
            <option value="ar">Arabic</option>
            <option value="pt">Portuguese</option>
          </select>

          <div className="output-box">
            {output || "Translated text will appear here."}
            {output && (
              <button onClick={() => speak(output, targetLang)} className="speak-output">
                🔊
              </button>
            )}
          </div>

          <button onClick={handleTranslate} className="form-button">
            Translate
          </button>
        </div>
      </div>

      <div className="about-link">
        <Link href="/about">📘 How to use this app</Link>
      </div>
    </div>
  );
}
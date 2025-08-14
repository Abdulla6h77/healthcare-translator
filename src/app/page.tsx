"use client";

import { useState } from "react";
import { startListening } from "@/utils/speechRecognition";
import { translateText } from "@/utils/translate";
import { speak } from "@/utils/speechSynthesis";


export default function TranslatePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sourceLang, setSourceLang] = useState("auto");
  const [targetLang, setTargetLang] = useState("es");
  const [showModal, setShowModal] = useState(false);

  const handleTranslate = async () => {
    if (!input.trim()) return;
    const result = await translateText(input, sourceLang, targetLang);
    setOutput(result);
    speak(result, targetLang);
  };

  return (
    <>
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
          <button onClick={() => setShowModal(true)} style={{ background: 'none', border: 'none', color: '#003366', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer', fontSize: 'inherit' }}>
            📘 How to use this app
          </button>
        </div>
      </div>

      

      {showModal  && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>How to Use Healthcare Translator</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="modal-close"
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <section>
                <h3>🎯 Purpose</h3>
                <p>This healthcare translator helps medical professionals and patients communicate effectively across language barriers in healthcare settings.</p>
              </section>

              <section>
                <h3>🚀 Getting Started</h3>
                <ol>
                  <li><strong>Select Source Language:</strong> Choose the language you want to translate from, or use &ldquo;Auto-detect&rdquo; to let the system identify it automatically.</li>
                  <li><strong>Select Target Language:</strong> Choose the language you want to translate to.</li>
                  <li><strong>Enter Text:</strong> Type healthcare-related text in the left textarea, or use the microphone button to speak.</li>
                  <li><strong>Translate:</strong> Click the &ldquo;Translate&rdquo; button to get the translation.</li>
                  <li><strong>Listen:</strong> Click the speaker icon 🔊 to hear the translation spoken aloud.</li>
                </ol>
              </section>

              <section>
                <h3>🎤 Voice Features</h3>
                <ul>
                  <li><strong>Speech Input:</strong> Click the 🎤 &ldquo;Speak&rdquo; button to dictate text instead of typing</li>
                  <li><strong>Audio Output:</strong> The translated text will be automatically spoken, and you can replay it using the 🔊 button</li>
                </ul>
              </section>

              <section>
                <h3>🏥 Healthcare Focus</h3>
                <p>This translator is optimized for medical terminology and healthcare conversations, including:</p>
                <ul>
                  <li>Symptoms and medical conditions</li>
                  <li>Treatment instructions</li>
                  <li>Medication information</li>
                  <li>Appointment scheduling</li>
                  <li>Emergency medical situations</li>
                </ul>
              </section>

              <section>
                <h3>💡 Tips for Best Results</h3>
                <ul>
                  <li>Speak clearly when using voice input</li>
                  <li>Use simple, clear sentences</li>
                  <li>Double-check important medical information</li>
                  <li>Have the patient confirm they understand the translation</li>
                </ul>
              </section>

              <section>
                <h3>⚠️ Important Notice</h3>
                <p><em>This tool is meant to assist with basic communication. For critical medical decisions, always consult with professional medical interpreters when possible.</em></p>
              </section>
            </div>
          </div>
        </div>
      )};
      </>
  );
}

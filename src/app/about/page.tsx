import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body, html, #__next {
          height: 100%;
          margin: 0;
          font-family: sans-serif;
          background: linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%);
          color: #003366;
        }

        .page-container {
          min-height: 100vh;
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
        }

        .back-button-link {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.6rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 8px;
          background: #6FE7DB;
          color: white;
          text-decoration: none;
          box-shadow: 0 2px 6px rgb(0 0 0 / 0.15);
          cursor: pointer;
          transition: background-color 0.3s ease;
          user-select: none;
          border: none;
        }
        .back-button-link:hover {
          background: #54cfc3;
        }

        h1 {
          font-size: 2.5rem;
          font-weight: 800;
          margin: 0;
          color: #003366;
          text-align: center;
        }

        h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #005580;
          margin: 0 0 1rem 0;
          text-align: center;
        }

        .guide-card {
          max-width: 650px;
          width: 100%;
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 14px rgb(0 0 0 / 0.1);
          color: #003366;
          font-size: 1rem;
          line-height: 1.5;
          text-align: left;
          user-select: text;
        }

        .guide-card p {
          margin: 1rem 0;
        }

        .guide-card span {
          font-weight: 700;
        }

        .note {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.9rem;
          color: #007a99;
          border-top: 1px solid #6FE7DB;
          padding-top: 1rem;
          user-select: none;
        }

        /* Responsive */
        @media (max-width: 600px) {
          .page-container {
            padding: 1.5rem 1rem;
            gap: 1.5rem;
          }

          h1 {
            font-size: 2rem;
          }

          h2 {
            font-size: 1.2rem;
            margin-bottom: 1rem;
          }

          .guide-card {
            padding: 1.5rem;
            font-size: 0.95rem;
          }

          .back-button-link {
            font-size: 0.9rem;
            padding: 0.5rem 1rem;
            align-self: center;
          }
        }
      `}</style>

      <div className="page-container">
        <Link href="/" className="back-button-link">
          ← Back to Translator
        </Link>

        <h1>Healthcare Translator Guide</h1>
        <h2>How to use the app</h2>

        <div className="guide-card">
          <p><span>Step 1:</span> Select the source language (or use Auto-detect)</p>
          <p><span>Step 2:</span> Choose the target language</p>
          <p><span>Step 3:</span> Tap the 🎤 Speak button or type your input</p>
          <p><span>Step 4:</span> Click <strong>Translate</strong> to hear and view the translation</p>
          <p><span>Step 5:</span> Use 🔊 to listen to the translation again</p>

          <p className="note">
            This app is optimized for both mobile and desktop use 📱💻
          </p>
        </div>
      </div>
    </>
  );
}

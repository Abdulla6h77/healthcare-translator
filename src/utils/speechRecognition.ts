// speechRecognition.ts

// Add TypeScript interface definitions for the Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  interpretation: any;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  onstart: () => void;
  onspeechstart: () => void;
  onspeechend: () => void;
  onnomatch: () => void;
  onaudiostart: () => void;
  onaudioend: () => void;
  onsoundstart: () => void;
  onsoundend: () => void;
}
declare global {
  interface Window {
    webkitSpeechRecognition?: { new(): SpeechRecognition };
    SpeechRecognition?: new () => SpeechRecognition;
  }
}

export const getSpeechRecognition = (): SpeechRecognition | null => {
    const SpeechRecognitionAPI =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognitionAPI) {
    alert("Speech recognition not supported in this browser.");
    return null;
  }

  const recognition = new SpeechRecognitionAPI() as SpeechRecognition;
  recognition.continuous = false;
  recognition.interimResults = false;

  return recognition;
};

// Define startListening function
export const startListening = (
  sourceLang: string,
  onTranscript: (text: string) => void
) => {
  const recognition = getSpeechRecognition();
  if (!recognition) return;

  // Set language to empty string if 'auto' is selected, which enables auto-detection
  recognition.lang = sourceLang === 'auto' ? '' : sourceLang;
  recognition.start();

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const transcript = event.results[0][0].transcript;
    onTranscript(transcript);
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    console.error("Speech recognition error:", event.error);
    alert("Error during speech recognition: " + event.error);
  };
};

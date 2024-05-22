// src/components/VoiceGuidedForm.js
import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "regenerator-runtime/runtime";

const Speech = () => {
  const [step, setStep] = useState(0);
  const [medicines, setMedicines] = useState("");
  const [time, setTime] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const { transcript, resetTranscript } = useSpeechRecognition();

  const steps = [
    "Please Enter Patient's Name",
    "Please Doctor Name",
    "Age of the patient",
    "Please enter patient Weight",
    "Please enter patient Height",
    "Please enter Systolic Blood Pressure",
    "Please enter Diasotolic Blood Pressure",
    "Please enter Temperature",
    "SPO2 level?",
    "Enter the patient Symptoms",
    "Enter medicine Name",
    "Kindly Provide the Times",
    "is there any test available?",
    "Provide any other suggestions",
    "Ok, I Got it, Thanks",
  ];

  useEffect(() => {
    if (step < steps.length) {
      speak(steps[step]);
      startListening();
    }
  }, [step]);

  useEffect(() => {
    if (transcript && step < steps.length) {
      const timeout = setTimeout(() => {
        saveResponse();
      }, 2000); // 4 seconds of inactivity triggers saveResponse

      return () => clearTimeout(timeout); // Clear timeout on new input
    }
  }, [transcript]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const saveResponse = () => {
    if (step === 0) setMedicines(transcript);
    if (step === 1) setTime(transcript);
    if (step === 2) setSuggestions(transcript);
    resetTranscript();
    SpeechRecognition.stopListening();
    setStep(step + 1);
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div>Your browser does not support speech recognition.</div>;
  }

  const startInteraction = () => {
    setMedicines("");
    setTime("");
    setSuggestions("");
    resetTranscript();
    setStep(0);
  };

  return (
    <div>
      <button onClick={startInteraction}>Start Interaction</button>
      <form>
        <label>
          Medicine Prescription:
          <textarea value={medicines} readOnly />
        </label>
        <label>
          Time:
          <textarea value={time} readOnly />
        </label>
        <label>
          Suggestions:
          <textarea value={suggestions} readOnly />
        </label>
      </form>
      <p>Live Transcription: {transcript}</p>
    </div>
  );
};

export default Speech;

import { GoogleGenerativeAI } from "@google/generative-ai";
import { geminiConfigs } from "../config/geminiConfiguration.js";

async function sendPrompt(prompt) {
  const genAI = new GoogleGenerativeAI(geminiConfigs.apikey);
  const model = genAI.getGenerativeModel({ model: geminiConfigs.model, systemInstruction: geminiConfigs.systemInstructions  });

  const result = await model.generateContent(prompt);
  const text = result.response.candidates[0].content.parts[0].text; 
  return text;
}

export default function authService() {
  return Object.freeze({
    sendPrompt,
  });
}

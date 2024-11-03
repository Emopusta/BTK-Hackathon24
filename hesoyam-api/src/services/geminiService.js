import { GoogleGenerativeAI } from "@google/generative-ai";
import { geminiConfigs } from "../config/geminiConfiguration.js";

async function sendPrompt(promptHistory, promptMessage) {
  const genAI = new GoogleGenerativeAI(geminiConfigs.apikey);
  const model = genAI.getGenerativeModel({ model: geminiConfigs.model, systemInstruction: geminiConfigs.systemInstructions  });

  // TODO : get this from geminiConfiguration.
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const chatSession = model.startChat({
    generationConfig,
    history: promptHistory,
  });

  const result = await chatSession.sendMessage(promptMessage);
  const text = result.response.text(); 
  return text;
}

export default function authService() {
  return Object.freeze({
    sendPrompt,
  });
}

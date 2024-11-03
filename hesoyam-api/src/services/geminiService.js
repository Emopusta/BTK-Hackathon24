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
  return convertToHtml(text);
}

function convertToHtml(text) {

  let html = text.replace(/\n/g, '<br>');
  html = html.replace(/\* \*\*(.*?)\*\*/g, '<li><strong>$1</strong>');
  html = html.replace(/<\/li><br>/g, '</li>');
  html = html.replace(/<li>/, '<ul><li>');
  html = html.replace(/<\/li><br><br>/, '</li></ul><br>');

  return html;
}

export default function authService() {
  return Object.freeze({
    sendPrompt,
  });
}

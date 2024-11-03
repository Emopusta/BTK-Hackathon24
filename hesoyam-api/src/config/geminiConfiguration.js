import dotenv from "dotenv";
dotenv.config();

 export const geminiConfigs = {
    apikey: process.env.API_KEY,
    model : process.env.AI_MODEL,
    systemInstructions: process.env.SYSTEM_INSTRUCTIONS
}

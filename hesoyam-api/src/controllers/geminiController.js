import asyncHandler from "../middlewares/asyncHandler.js";
import GeminiResponseModel from "../models/geminiResponseModel.js";
import successDataResult from "../utils/successDataResult.js";

const sendPrompt = asyncHandler(async function (req, res){
    const { prompt } = req.body
    const response = await req.geminiService.sendPrompt(prompt);

    const model = { ...GeminiResponseModel };
    model.text = response;

    res.status(200).json(successDataResult({model}))
})

export { sendPrompt };
import geminiService from "../services/geminiService.js";


async function serviceRegistrer(req, res, next){
    try {
        req.geminiService = geminiService();
        next()
    } catch (error) {
        console.error(error);
    }
}

export default serviceRegistrer
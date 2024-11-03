import express from "express";
import dotenv from "dotenv";
import geminiRoutes from "./routes/geminiRoutes.js";
import serviceRegistrer from "./middlewares/serviceRegistrer.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import cors from 'cors';
dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(serviceRegistrer)
app.use("/api/Gemini", geminiRoutes);

app.get("/", async function(req, res){
    res.send("hesoyam backend...");
})

app.use(function (req, res, next){
    res.status(404).send('<h1>Page not found</h1>')
})

app.use(errorMiddleware);

app.listen(port, function(){ console.log(`Server is running on port ${port}`)});
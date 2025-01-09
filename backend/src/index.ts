import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from 'fs';
require("dotenv").config(); //import unsuccessfuls


const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("API key is not defined. Please set GEMINI_API_KEY in your .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function fileToGenerativePart(path: string, mimeType: string) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString("base64"),
            mimeType,
        },
    };
}

async function generateContent() {
    const prompt = "Describe how this product might be manufactured.";
    const imagePart = fileToGenerativePart("/path/to/image.png", "image/png");

    try {
        const result = await model.generateContent([prompt, imagePart]);
        console.log(result.response.text());
    } catch (error) {
        console.error("Error generating content:", error);
    }
}

// Call the function to execute the request
generateContent();

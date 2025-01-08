require("dotenv").config();
console.log(process.env.GEMINI_API_KEY);
const { GoogleGenerativeAI } = require("@google/generative-ai");


async function main() {
    const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = "2+2";
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
}
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI(process.env.GOOGLE_API_KEY);
const router = express.Router();

router.post("/get/ai/response", async(req, res) => {
    const { code } = req.body;
    const response = await ai.models.generateContent({
        model : "gemini-2.5-flash",
        contents : `
            You are a senior software engineer with 10+ years of experience in full-stack development. Review the following code carefully.

            Focus your review on:
            - Code quality, structure, and maintainability  
            - Readability and naming conventions  
            - Performance and efficiency  
            - Security and potential bugs  
            - Scalability and best practices  

            For each issue, explain **why** it's a problem and how to improve it.  
            If the code is fine, highlight what was done well.

            Here is the code below : 
            ${code}
        `
    });
    res.status(200).json({ result : response.text });
});

module.exports = router;
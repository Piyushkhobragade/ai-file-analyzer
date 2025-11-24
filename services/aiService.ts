/**
 * Gemini AI Service
 * 
 * This service handles interactions with the Google Gemini API.
 * It sends file content to the model and requests a structured JSON analysis.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

export interface AnalysisResult {
    summary: string;
    keywords: string[];
    sentiment: 'Positive' | 'Neutral' | 'Negative';
    confidence: number;
}

// Initialize Gemini API
// Ensure GEMINI_API_KEY is set in your .env.local file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/**
 * Analyzes a file using Gemini AI.
 * 
 * @param fileBuffer - The file content as a Buffer
 * @param mimeType - The MIME type of the file (e.g., 'application/pdf', 'image/png')
 * @returns Promise<AnalysisResult>
 */
export async function analyzeWithGemini(fileBuffer: Buffer, mimeType: string): Promise<AnalysisResult> {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not set in environment variables.");
    }

    try {
        console.log(`[Gemini] Starting analysis for file type: ${mimeType}`);

        // Use Gemini 2.0 Flash (available for this key)
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // Convert Buffer to Base64 for Gemini
        const filePart = {
            inlineData: {
                data: fileBuffer.toString("base64"),
                mimeType: mimeType,
            },
        };

        const prompt = `
      Analyze this document/image and provide a structured JSON response.
      
      Return ONLY raw JSON (no markdown code blocks) with the following schema:
      {
        "summary": "A concise summary of the content (max 3 sentences)",
        "keywords": ["Array", "of", "5", "key", "topics"],
        "sentiment": "Positive" | "Neutral" | "Negative",
        "confidence": number (0.0 to 1.0 indicating confidence in analysis)
      }
    `;

        const result = await model.generateContent([prompt, filePart]);
        const response = await result.response;
        const text = response.text();

        console.log("[Gemini] Raw response received");

        // Clean up potential markdown code blocks if Gemini adds them
        const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();

        const analysisData: AnalysisResult = JSON.parse(cleanJson);

        return analysisData;

    } catch (error: any) {
        console.error("[Gemini] Error during analysis:", error);
        throw new Error(`Gemini Analysis Failed: ${error.message}`);
    }
}

// Backward compatibility alias if needed, or just use analyzeWithGemini directly
export const analyzeFile = (fileBuffer: Buffer, fileName: string, fileType: string) => analyzeWithGemini(fileBuffer, fileType);

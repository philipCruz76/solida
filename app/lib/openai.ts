import OpenAI from "openai";

// Validate that the API key is set
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error("OPENAI_API_KEY is not set in environment variables");
  // In production, you might want to throw an error or handle this differently
}

// Create the OpenAI client with validated API key
export const openai = new OpenAI({
  apiKey: apiKey || "",
  defaultHeaders: {
    "User-Agent": "Solida-Website/1.0",
  },
  timeout: 30000, // 30 seconds timeout
  maxRetries: 2,
});

const express = require("express");
const cors = require("cors");  // Ensure this is only declared once
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());  // Enable cross-origin requests
app.use(express.json());

// OpenAI Configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Route: Generate Content
app.get("/generate", async (req, res) => {
    const { type } = req.query;
    console.log("Request received at /generate with type:", type);

    try {
        if (type === "ppt") {
            const aiContent = await generateAIContent("Generate a PowerPoint about AI");
            res.json({ success: true, content: aiContent });
        } else {
            res.status(400).json({ error: "Invalid type. Use type=ppt in the query." });
        }
    } catch (error) {
        console.error("Full error details:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to generate AI content." });
    }
});

// Generate AI Content Function
async function generateAIContent(prompt) {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo", // Ensure this is a valid model
        messages: [
          { role: "system", content: "You are an AI assistant that generates content." },
          { role: "user", content: prompt }
        ],
        max_tokens: 150,
      });
  
      console.log("OpenAI Response:", response.data); // Log full response from OpenAI
      return response.data.choices[0].message.content.trim(); // Return the content from the response
    } catch (error) {
      // Improved error handling with more details
      if (error.response) {
        // OpenAI API error response
        console.error("OpenAI API Error:", error.response.data);
        return `Error from OpenAI: ${error.response.data.error.message}`;
      } else {
        // Network or other errors
        console.error("Unknown Error:", error.message);
        return `Unknown Error: ${error.message}`;
      }
    }
  }

// Catch-All for Undefined Routes
app.use((req, res) => {
  res.status(404).send("Endpoint not found. Check your URL or route.");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

console.log("API Key Loaded:", process.env.OPENAI_API_KEY ? "Loaded" : "Not Found");

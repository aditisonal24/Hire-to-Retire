import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Safe resolution for __filename and __dirname in both ESM and CJS bundles
const getDirname = () => {
  if (typeof __dirname !== "undefined") return __dirname;
  if (typeof import.meta !== "undefined" && import.meta.url) {
    return path.dirname(fileURLToPath(import.meta.url));
  }
  return process.cwd();
};
const _dir = getDirname();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy GoogleGenAI initialization
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Chat Endpoint for Delivery Directors
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { prompt, contextData } = req.body;
    const ai = getGenAI();

    if (!ai) {
      // Fallback smart response when API key is missing
      return res.json({
        reply: `[Simulated Insights] Based on your current pipeline: You have 3 demands with SLA warnings in Banking Practice. Revenue at risk is ~$1.8M. Recommended Action: Prioritize Approval for DEM-2024-002 and reallocate 2 Senior Cloud Architects from Bench.`
      });
    }

    const systemInstruction = `You are an executive AI assistant specialized in IT Delivery Management, Resource Allocation, Financial Margin Optimization, and Demand Governance for Delivery Directors (DDs) in Tier-1 Global IT Consulting & Services.
Provide crisp, structured, executive-ready answers with actionable bullet points and financial metrics.
Context snapshot: ${JSON.stringify(contextData || {})}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    res.json({ reply: response.text || "No response generated." });
  } catch (error: any) {
    console.error("Error in /api/ai/chat:", error);
    res.status(500).json({
      error: "Failed to generate AI insights",
      message: error?.message || "Internal server error"
    });
  }
});

// AI Staffing Recommendation Endpoint
app.post("/api/ai/recommend-staffing", async (req, res) => {
  try {
    const { demand, availableResources } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        recommendations: [
          {
            resourceId: "RES-101",
            matchPercentage: 94,
            reasoning: "Strong React & Node.js experience, 100% available from Aug 1, optimal bill rate for 38% target margin."
          },
          {
            resourceId: "RES-104",
            matchPercentage: 88,
            reasoning: "Senior Solutions Architect with AWS & Azure credentials, rolling off Project Titan next week."
          }
        ]
      });
    }

    const prompt = `Analyze this IT project demand and match from the list of resources:
Demand: ${JSON.stringify(demand)}
Resources: ${JSON.stringify(availableResources)}

Respond ONLY in valid JSON format:
{
  "recommendations": [
    {
      "resourceId": "string",
      "matchPercentage": number,
      "reasoning": "string"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Error in /api/ai/recommend-staffing:", error);
    res.status(500).json({ error: "Failed to run AI staffing recommendations" });
  }
});

// Start server with Vite middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

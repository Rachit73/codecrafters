import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Groq from "groq-sdk";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// API routes FIRST
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/chat", async (req, res) => {
  const { messages, systemPrompt } = req.body;
  
  const groqKey = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

  // 1. Try Groq first (Primary)
  if (groqKey && groqKey.trim() !== "") {
    try {
      console.log("Using Groq as primary AI service...");
      const groq = new Groq({ apiKey: groqKey.trim() });
      const completion = await groq.chat.completions.create({
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 1024,
        stream: true,
      });

      res.setHeader('Content-Type', 'text/event-stream');
      for await (const chunk of completion) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
      res.write('data: [DONE]\n\n');
      return res.end();
    } catch (e: any) {
      console.warn("Groq failed:", e.message || e);
    }
  }

  // 2. Fallback to Gemini (Backend)
  try {
    if (!geminiKey || geminiKey.trim() === "") {
      return res.status(500).json({ error: "AI_SERVICE_UNAVAILABLE", details: "No API keys configured." });
    }

    const ai = new GoogleGenAI({ apiKey: geminiKey.trim() });
    const contents = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const result = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents,
      config: { systemInstruction: systemPrompt }
    });

    res.setHeader('Content-Type', 'text/event-stream');
    for await (const chunk of result) {
      const content = chunk.text;
      if (content) res.write(`data: ${JSON.stringify({ content })}\n\n`);
    }
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error: any) {
    res.status(500).json({ error: "AI_SERVICE_UNAVAILABLE", details: error.message });
  }
});

// Setup middleware
const isProd = process.env.NODE_ENV === "production" || process.env.VERCEL;

if (isProd) {
  const distPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith('/api/')) return next();
    
    const indexPath = path.join(distPath, 'index.html');
    res.sendFile(indexPath);
  });
} else {
  // Dynamic import for Vite in development
  const setupVite = async () => {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  };
  setupVite();
}

if (!process.env.VERCEL) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;

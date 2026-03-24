import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Groq from "groq-sdk";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
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

    console.log("AI Service Diagnostic:", {
      hasGroq: !!groqKey,
      hasGemini: !!geminiKey,
      groqPrefix: groqKey?.substring(0, 4)
    });

    // 1. Try Groq first
    if (groqKey && groqKey.trim() !== "" && groqKey.trim().startsWith('gsk_')) {
      try {
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
        // If it's an auth error, we continue to Gemini fallback
      }
    }

    // 2. Fallback to Gemini (Backend) - ONLY if key exists
    try {
      const geminiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
      if (!geminiKey || geminiKey.trim() === "") {
        console.warn("No Gemini key available for fallback.");
        return res.status(500).json({ error: "GROQ_SERVICE_FAILED", details: "Groq failed and no fallback key is configured." });
      }

      const ai = new GoogleGenAI({ apiKey: geminiKey.trim() });
      
      const contents = messages.map((m: any) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const result = await ai.models.generateContentStream({
        model: "gemini-3-flash-preview",
        contents,
        config: {
          systemInstruction: systemPrompt,
        }
      });

      res.setHeader('Content-Type', 'text/event-stream');
      for await (const chunk of result) {
        const content = chunk.text;
        if (content) res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
      res.write('data: [DONE]\n\n');
      res.end();
    } catch (error: any) {
      console.error("All AI models failed:", error.message || error);
      res.status(500).json({ 
        error: "AI_SERVICE_UNAVAILABLE", 
        details: error.message || "Please check your API keys in Settings." 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

startServer();

// Export the app for Vercel
export default (req: any, res: any) => {
  // This is a placeholder, in a real Vercel setup, 
  // we would export the Express app instance.
};

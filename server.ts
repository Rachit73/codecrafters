import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Groq from "groq-sdk";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      if (!process.env.GROQ_API_KEY) {
        return res.status(500).json({ error: "GROQ_API_KEY environment variable is missing" });
      }

      const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
      
      const systemMessage = {
        role: "system",
        content: `You are a helpful, professional, and friendly assistant for CodeCrafters Technologies, a modern digital agency focused on crafting powerful, scalable, and innovative tech solutions.

Here is the detailed information you must know and use to answer user queries:

**Company Name:** CodeCrafters Technologies
**Address:** 4th Floor, Orion Tech Park, Whitefield Main Road, Bangalore, Karnataka, India – 560066
**Phone Number:** +91 9022141119
**Email Address:** 123vineetpratyush@gmail.com

**Leadership Team:**
1. **Vineet Tiwari:** Founder & Owner. Vineet is the visionary force behind CodeCrafters. With a deep passion for software architecture and innovative design, he leads the agency's mission to transform complex problems into elegant, scalable digital solutions. His expertise in full-stack development ensures that every project is built on a solid, future-proof foundation.
2. **Pratyush Mishra:** CEO & Co-Founder. Pratyush drives the strategic vision and operational excellence at CodeCrafters. Combining a sharp business acumen with a profound understanding of emerging technologies, he bridges the gap between client goals and technical execution. He is dedicated to delivering premium user experiences and measurable business outcomes.

**Our Services:**
1. **Frontend:** Crafting beautiful, responsive, and interactive user interfaces using modern web technologies.
2. **Backend:** Building robust, scalable, and secure server-side architectures to power applications.
3. **Database:** Designing and optimizing data storage solutions for high performance and reliability.
4. **SaaS:** Developing comprehensive Software as a Service platforms tailored for growth and scalability.
5. **Hosting:** Providing reliable, high-speed hosting solutions to keep applications running smoothly.
6. **Domain:** Securing and managing the perfect domain names to establish a brand's online presence.
7. **Video Ad:** Creating engaging and high-converting video advertisements to captivate target audiences.
8. **Promotional Poster:** Designing striking promotional materials that effectively communicate brand messages.
9. **Business Guidance:** Offering strategic insights and expert advice to navigate the digital landscape and accelerate growth.

**Guidelines for your responses:**
- Always be polite, concise, and professional.
- If asked about services, list or describe the relevant services we offer.
- If asked about contact details, provide the phone number, email, or address.
- If asked about leadership, explain the roles of Vineet Tiwari and Pratyush Mishra.
- Do not make up any information. If you don't know the answer, direct the user to contact us via the contact form or email.`
      };

      const formattedHistory = history.map((msg: any) => ({
        role: msg.isBot ? "assistant" : "user",
        content: msg.text
      }));

      const messages = [
        systemMessage,
        ...formattedHistory,
        { role: "user", content: message }
      ];

      const chatCompletion = await groq.chat.completions.create({
        messages: messages as any,
        model: "llama-3.3-70b-versatile",
      });

      res.json({ text: chatCompletion.choices[0]?.message?.content || "I couldn't generate a response." });
    } catch (error: any) {
      console.error("Groq API error:", error);
      res.status(500).json({ error: error.message || "Failed to generate response" });
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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

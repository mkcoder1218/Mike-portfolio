import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { fetchGitHubData } from "./src/lib/github.ts";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Simple in-memory cache: key -> { timestamp, data }
  const cache: Record<string, { timestamp: number; data: any }> = {};
  const CACHE_TTL = 3600 * 1000; // 1 hour in ms

  // API Endpoint
  app.get("/api/github", async (req, res) => {
    try {
      const username = (req.query.username as string) || "mkcoder1218";
      const year = parseInt(req.query.year as string) || 2026;
      
      const cacheKey = `${username}-${year}`;
      const cached = cache[cacheKey];
      const now = Date.now();

      if (cached && (now - cached.timestamp < CACHE_TTL)) {
        return res.json(cached.data);
      }

      console.log(`Fetching fresh GitHub data for ${username} (${year})...`);
      const data = await fetchGitHubData(username, year);
      
      cache[cacheKey] = {
        timestamp: now,
        data
      };

      res.json(data);
    } catch (err: any) {
      console.error("Error in /api/github:", err);
      res.status(500).json({ error: err.message || "Failed to fetch GitHub data" });
    }
  });

  // Integrate Vite as Middleware or Serve Static Build files
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

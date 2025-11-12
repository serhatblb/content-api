import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import api from "./routes/api.js";
import quotes from "./routes/quotes.js";
import captions from "./routes/captions.js";
import hashtags from "./routes/hashtags.js";
import facts from "./routes/facts.js";
import planner from "./routes/planner.js";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";

const app = express();
const PORT = process.env.PORT || 3000;

// 🧱 Güvenlik & Performans middleware'leri
app.use(helmet());
app.use(cors({ origin: "*", credentials: false })); // 🔥 tüm kaynaklara izin ver
app.use(compression());
app.use(express.json());
app.use(morgan("tiny"));

// ⏳ Rate limit (Free plan örneği: 60 req/dk)
const limiter = rateLimit({ windowMs: 60 * 1000, max: 60 });
app.use(limiter);

// 🧩 API rotaları
app.use("/api", api);
app.use("/quotes", quotes);
app.use("/captions", captions);
app.use("/hashtags", hashtags);
app.use("/facts", facts);
app.use("/planner", planner);

// 🩺 Health kontrol
app.get("/health", (req, res) => 
  res.json({ ok: true, uptime: process.uptime(), ts: Date.now() })
);

// 🌍 Public klasör (HTML dosyaları)
app.use(express.static("public"));

// 📘 Swagger dokümantasyonu
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 🏠 Ana sayfa (fallback)
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Influencer Content API 🚀</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #222831, #393E46);
            color: #EEEEEE;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          h1 { font-size: 2.5rem; color: #00ADB5; margin-bottom: 0.5rem; }
          p { margin: 0.25rem 0; font-size: 1.1rem; }
          a {
            color: #00ADB5;
            text-decoration: none;
            border: 1px solid #00ADB5;
            padding: 8px 16px;
            border-radius: 8px;
            margin-top: 20px;
            transition: all 0.3s;
          }
          a:hover {
            background: #00ADB5;
            color: #222831;
          }
        </style>
      </head>
      <body>
        <h1>🚀 Influencer Content API</h1>
        <p>Hazır içerik fikirleri, caption'lar, hashtag'ler ve daha fazlası.</p>
        <p>API dokümantasyonuna buradan ulaş:</p>
        <a href="/docs">📘 Swagger Docs</a>
        <p style="margin-top:40px;font-size:0.9rem;">v1.0.0 – © 2025 Content API</p>
      </body>
    </html>
  `);
});

// 🚀 Sunucu başlat
app.listen(PORT, () => {
  console.log(`✅ Content API running on http://localhost:${PORT}`);
});

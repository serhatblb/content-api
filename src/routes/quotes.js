import { Router } from "express";
import fs from "fs";
import { ok, notFound } from "../utils/respond.js";
import { pickRandom } from "../utils/random.js";
import { getCache, setCache } from "../utils/cache.js";

const quotes = JSON.parse(fs.readFileSync("./data/quotes.json", "utf8"));
const router = Router();

router.get("/random", (req, res) => {
  const { lang, author, topic } = req.query;
  const key = `quotes:random:${lang || "*"}:${author || "*"}:${topic || "*"}`;
  const cached = getCache(key);
  if (cached) return ok(res, cached);

  let list = quotes;
  if (lang) list = list.filter(q => (q.lang || "").toLowerCase() === String(lang).toLowerCase());
  if (author) list = list.filter(q => (q.author || "").toLowerCase().includes(String(author).toLowerCase()));
  if (topic) list = list.filter(q => (q.topics || []).some(t => t.toLowerCase().includes(String(topic).toLowerCase())));

  const item = pickRandom(list);
  if (!item) return notFound(res, "Uygun kayıt bulunamadı");
  setCache(key, item, 30);
  return ok(res, item);
});

export default router;

import { Router } from "express";
import fs from "fs";
import { ok } from "../utils/respond.js";
import { sample, pickRandom } from "../utils/random.js";

const captions = JSON.parse(fs.readFileSync("./data/captions.json", "utf8"));
const hashtags = JSON.parse(fs.readFileSync("./data/hashtags.json", "utf8"));
const quotes   = JSON.parse(fs.readFileSync("./data/quotes.json", "utf8")); // 🔥 bu satır eksikti
const router = Router();

router.get("/daily", (req, res) => {
  const { niche = "general", lang = "tr" } = req.query;

  const capPool = captions.filter(c => (!c.lang || c.lang === lang) && (!c.niche || c.niche === niche));
  const quotePool = quotes.filter(q => (!q.lang || q.lang === lang));
  const hashPool = hashtags.filter(h => (!h.lang || h.lang === lang) && (!h.niche || h.niche === niche));

  const cap = pickRandom(capPool) || { text: "Bugün küçük bir adım at. ✨" };
  const qt  = pickRandom(quotePool) || { quote: "Devam eden kazanır.", author: "Anonim" };
  const hl  = pickRandom(hashPool) || { list: ["#gününnotu", "#motivasyon"] };

  const today = new Date().toISOString().slice(0, 10);
  const pack = {
    date: today,
    niche,
    hook: `Bunu kimse söylemedi: ${qt.author || "Bir bilge"} bir cümleyle!`,
    caption: cap.text,
    hashtags: sample(hl.list, 10),
    cta: "Bugünkü fikrini yorumlara yaz!",
    image_suggestion: [niche, "minimal", "blue-tone"],
    quote: { text: qt.quote, author: qt.author },
  };

  return ok(res, pack);
});

export default router;

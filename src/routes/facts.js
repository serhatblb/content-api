import { Router } from "express";
import { ok, notFound } from "../utils/respond.js";
import { pickRandom, sample } from "../utils/random.js";

import fs from "fs";
const captions = JSON.parse(fs.readFileSync("./data/captions.json", "utf8"));
const hashtags = JSON.parse(fs.readFileSync("./data/hashtags.json", "utf8"));
const facts = JSON.parse(fs.readFileSync("./data/facts.json", "utf8"));
const planner = JSON.parse(fs.readFileSync("./data/planner.json", "utf8"));




const router = Router();




/**
* @openapi
* /hashtags/suggest:
* get:
* summary: Nişe göre hashtag önerisi
* parameters:
* - in: query
* name: niche
* schema: { type: string }
* - in: query
* name: count
* schema: { type: integer, default: 10 }
* - in: query
* name: lang
* schema: { type: string }
*/
router.get("/suggest", (req, res) => {
const { niche, count = 10, lang } = req.query;
let list = hashtags;
if (niche) list = list.filter(x => (x.niche || "").toLowerCase() === String(niche).toLowerCase());
if (lang) list = list.filter(x => (x.lang || "").toLowerCase() === String(lang).toLowerCase());




const item = pickRandom(list);
if (!item) return notFound(res, "Hashtag bulunamadı");
const n = Math.min(Number(count) || 10, item.list.length);
return ok(res, sample(item.list, n));
});




export default router;
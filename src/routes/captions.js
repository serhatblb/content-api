import { Router } from "express";
import { ok, notFound } from "../utils/respond.js";
import { pickRandom } from "../utils/random.js";

import fs from "fs";
const captions = JSON.parse(fs.readFileSync("./data/captions.json", "utf8"));
const hashtags = JSON.parse(fs.readFileSync("./data/hashtags.json", "utf8"));
const facts = JSON.parse(fs.readFileSync("./data/facts.json", "utf8"));
const planner = JSON.parse(fs.readFileSync("./data/planner.json", "utf8"));


const router = Router();


/**
* @openapi
* /captions/random:
* get:
* summary: Rastgele caption
* parameters:
* - in: query
* name: niche
* schema: { type: string }
* - in: query
* name: tone
* schema: { type: string }
* - in: query
* name: length
* schema: { type: string, enum: [short, medium, long] }
* - in: query
* name: lang
* schema: { type: string }
*/
router.get("/random", (req, res) => {
const { niche, tone, length, lang } = req.query;
let list = captions;
if (niche) list = list.filter(x => (x.niche || "").toLowerCase() === String(niche).toLowerCase());
if (tone) list = list.filter(x => (x.tone || "").toLowerCase() === String(tone).toLowerCase());
if (length) list = list.filter(x => (x.length || "").toLowerCase() === String(length).toLowerCase());
if (lang) list = list.filter(x => (x.lang || "").toLowerCase() === String(lang).toLowerCase());


const item = pickRandom(list);
if (!item) return notFound(res, "Uygun caption bulunamadı");
return ok(res, item);
});


/**
* @openapi
* /captions/pack:
* get:
* summary: Nişe göre çoklu caption
* parameters:
* - in: query
* name: niche
* schema: { type: string }
* - in: query
* name: count
* schema: { type: integer, default: 10 }
*/
router.get("/pack", (req, res) => {
const { niche, count = 10 } = req.query;
let list = captions;
if (niche) list = list.filter(x => (x.niche || "").toLowerCase() === String(niche).toLowerCase());
const n = Math.min(Number(count) || 10, 50);
const results = [];
for (let i = 0; i < n; i++) {
const item = pickRandom(list);
if (item) results.push(item);
}
return ok(res, { count: results.length, results });
});


export default router;
import { Router } from "express";
import fs from "fs";
import { pickRandom } from "../utils/random.js";
import { ok } from "../utils/respond.js";

const router = Router();
const quotes = JSON.parse(fs.readFileSync("./data/quotes.json", "utf8"));

router.get("/random", (req, res) => {
  const q = pickRandom(quotes);
  return ok(res, q);
});

export default router;

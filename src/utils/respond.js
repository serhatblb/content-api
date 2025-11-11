export const ok = (res, data) => res.status(200).json({ ok: true, data });
export const bad = (res, message = "Bad request") => res.status(400).json({ ok: false, message });
export const notFound = (res, message = "Not found") => res.status(404).json({ ok: false, message });
export const fail = (res, message = "Server error") => res.status(500).json({ ok: false, message });
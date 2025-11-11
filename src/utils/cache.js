// Basit bellek içi cache (key → { value, expireAt })
const store = new Map();


export function setCache(key, value, ttlSec = 60) {
const expireAt = Date.now() + ttlSec * 1000;
store.set(key, { value, expireAt });
}


export function getCache(key) {
const hit = store.get(key);
if (!hit) return null;
if (hit.expireAt < Date.now()) {
store.delete(key);
return null;
}
return hit.value;
}
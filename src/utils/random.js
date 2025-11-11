export function pickRandom(arr) {
if (!Array.isArray(arr) || arr.length === 0) return null;
const idx = Math.floor(Math.random() * arr.length);
return arr[idx];
}


export function sample(arr, count) {
if (!Array.isArray(arr) || arr.length === 0) return [];
const copy = [...arr];
const out = [];
while (out.length < Math.min(count, copy.length)) {
const i = Math.floor(Math.random() * copy.length);
out.push(copy.splice(i, 1)[0]);
}
return out;
}
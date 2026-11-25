import { readFileSync } from "node:fs";

const MAX_CHARS = 280;
const line = readFileSync(new URL("./one-line.txt", import.meta.url), "utf8").replace(/\n$/, "");

// The marathon rule: one line, 1–280 characters, nothing else.
if (line.length === 0) { console.error("FAIL: empty line"); process.exit(1); }
if (line.length > MAX_CHARS) { console.error(`FAIL: ${line.length}/${MAX_CHARS} characters`); process.exit(1); }
if (line.includes("\n") || line.includes("\r")) { console.error("FAIL: not a single line"); process.exit(1); }
if (/\r/.test(line) || / $/.test(line)) { console.error("FAIL: carriage return or trailing space"); process.exit(1); }
if (!/[.!?]$/.test(line)) { console.error("FAIL: line must end with terminal punctuation"); process.exit(1); }
if (/^\s|\s$/.test(line)) { console.error("FAIL: leading or trailing whitespace"); process.exit(1); }
if (/\s{2,}/.test(line)) { console.error("FAIL: double space inside the line"); process.exit(1); }
console.log(line);
console.log(`OK: ${line.length}/${MAX_CHARS} characters, single line.`);

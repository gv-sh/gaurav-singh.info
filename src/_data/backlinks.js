// src/_data/backlinks.js
//
// Eleventy global data file. Exports a function; Eleventy calls it once
// per build, and the return value becomes available as `backlinks` in
// all templates.
//
// We walk every note in src/notes/, extract its forward links, then
// invert the graph so each note can look up "what links to me?" in O(1).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function extractForwardLinks(body) {
  // Matches markdown link syntax where href is /<id>/ — IDs are
  // alphanumeric plus hyphens (our post-hyphenation filenames), no slashes.
  const re = /\]\(\/([a-zA-Z0-9][a-zA-Z0-9-]*)\/?\)/g;
  const found = new Set();
  let m;
  while ((m = re.exec(body)) !== null) {
    found.add(m[1]);
  }
  return Array.from(found);
}

export function buildBacklinksMap(notes) {
  const map = {};
  for (const source of notes) {
    const targets = extractForwardLinks(source.content);
    for (const targetId of targets) {
      if (!map[targetId]) map[targetId] = [];
      map[targetId].push({
        id: source.id,
        title: source.title,
      });
    }
  }
  // Sort each backlink list deterministically.
  for (const k of Object.keys(map)) {
    map[k].sort((a, b) => a.id.localeCompare(b.id));
  }
  return map;
}

function loadAllNotes() {
  const notesDir = path.join(__dirname, "..", "notes");
  if (!fs.existsSync(notesDir)) return [];
  return fs
    .readdirSync(notesDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(notesDir, f), "utf8");
      const parsed = matter(raw);
      return {
        id: parsed.data.id,
        title: parsed.data.title,
        content: parsed.content,
      };
    });
}

export default function () {
  return buildBacklinksMap(loadAllNotes());
}

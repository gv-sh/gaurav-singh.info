// lib/note-links.js
//
// Shared logic for note cross-links: parsing /notes/<slug>/ links out of note
// bodies, inverting them into a backlinks map, and building the force-graph.
// Kept OUTSIDE src/_data so it can carry named exports for unit tests — an
// Eleventy .js data file must default-export ONLY (Eleventy otherwise treats
// the module's named exports as the data), so the data files stay thin wrappers.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// captures the slug in a /notes/<slug>/ markdown-link href (optional #anchor)
export const NOTE_LINK_RE = /\]\(\/notes\/([a-zA-Z0-9][a-zA-Z0-9-]*)\/?(?:#[^)]*)?\)/g;

export function extractForwardLinks(body) {
  const found = new Set();
  let m;
  NOTE_LINK_RE.lastIndex = 0;
  while ((m = NOTE_LINK_RE.exec(body)) !== null) found.add(m[1]);
  return Array.from(found);
}

export function buildBacklinksMap(notes) {
  const map = {};
  for (const source of notes) {
    for (const targetSlug of extractForwardLinks(source.content)) {
      if (targetSlug === source.slug) continue; // ignore self-links
      if (!map[targetSlug]) map[targetSlug] = [];
      map[targetSlug].push({ slug: source.slug, title: source.title });
    }
  }
  for (const k of Object.keys(map)) {
    map[k].sort((a, b) => a.title.localeCompare(b.title));
  }
  return map;
}

export function buildGraph(notes) {
  const slugs = new Set(notes.map((n) => n.slug));
  const nodes = notes.map((n) => ({
    id: n.slug,
    title: n.title,
    cat: n.cat,
    url: `/notes/${n.slug}/`,
    deg: 0,
  }));
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  const seen = new Set();
  const links = [];
  for (const n of notes) {
    const local = new Set();
    for (const target of extractForwardLinks(n.content)) {
      if (target === n.slug || !slugs.has(target)) continue;
      local.add(target);
    }
    for (const target of local) {
      const key = [n.slug, target].sort().join("::"); // undirected
      if (seen.has(key)) continue;
      seen.add(key);
      links.push({ source: n.slug, target });
      byId[n.slug].deg++;
      byId[target].deg++;
    }
  }
  return { nodes, links };
}

export function loadNotes(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const parsed = matter(fs.readFileSync(path.join(dir, f), "utf8"));
      return {
        slug: parsed.data.slug || f.replace(/\.md$/, ""),
        title: (parsed.data.title || "").toString().replace(/^[>|-]\s*/, "").trim(),
        cat: String(parsed.data.root || ""),
        content: parsed.content,
      };
    });
}

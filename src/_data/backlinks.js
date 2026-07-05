// src/_data/backlinks.js
//
// Eleventy global data file. Default-export ONLY (see lib/note-links.js for why).
// Walks every note, extracts /notes/<slug>/ forward links, and inverts the graph
// so each note can look up "what links to me?" by slug.

import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildBacklinksMap, loadNotes } from "../../lib/note-links.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function () {
  return buildBacklinksMap(loadNotes(path.join(__dirname, "..", "notes")));
}

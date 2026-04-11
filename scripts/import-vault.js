// scripts/import-vault.js
//
// One-shot script that reads Gaurav's Obsidian vault at
// ~/Library/Mobile Documents/iCloud~md~obsidian/Documents/obsidian/gvsh.cc
// and writes normalized notes into src/notes/.
//
// Currently exports pure helpers only. See Task 3 for the main() entry.

function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractLede(body) {
  // Strip leading HTML tags (img, figure, caption italics, etc.) and empty lines.
  const cleaned = body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
    // Drop paragraphs that are pure HTML or a single italic caption.
    .filter((p) => !/^<[^>]+>$/.test(p))
    .filter((p) => !/^_[^_]+_$/.test(p))
    .filter((p) => !/^!\[[^\]]*\]\([^)]+\)$/.test(p));

  if (cleaned.length === 0) return '';

  // Take the first real paragraph.
  let lede = cleaned[0];

  // Strip basic markdown: bold, italic, links, inline code.
  lede = lede
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

  // Truncate at ~140 characters at a word boundary.
  if (lede.length > 140) {
    const truncated = lede.slice(0, 140);
    const lastSpace = truncated.lastIndexOf(' ');
    lede = truncated.slice(0, lastSpace > 0 ? lastSpace : 140) + '…';
  }

  return lede;
}

function assignAutoId(rootNum, indexWithinRoot) {
  const n = String(indexWithinRoot + 1).padStart(2, '0');
  return `${rootNum}-${n}`;
}

function transformFrontmatter(input, assignments) {
  const out = { ...input };
  // Strip Eleventy layout that the vault set for a previous site.
  delete out.layout;
  // Strip the old "meta" field — it was a year label in the old site.
  delete out.meta;
  // Inject assignments.
  out.id = assignments.id;
  out.root = assignments.root;
  out.slug = assignments.slug;
  if (assignments.profile_url) out.profile_url = assignments.profile_url;
  return out;
}

module.exports = {
  slugify,
  extractLede,
  assignAutoId,
  transformFrontmatter,
};

// scripts/import-vault.js
//
// One-shot script that reads Gaurav's Obsidian vault at
// ~/Library/Mobile Documents/iCloud~md~obsidian/Documents/obsidian/gvsh.cc
// and writes normalized notes into src/notes/.

const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');

// Maps vault folders to the five roots.
// Root 1 (Reading) is intentionally empty at launch.
const VAULT_ROOT = '/Users/gvsh/Library/Mobile Documents/iCloud~md~obsidian/Documents/obsidian/gvsh.cc';

const IMPORT_MAP = [
  // Root 2: Making
  { glob: 'articles', root: 2 },
  { glob: 'projects', root: 2 },
  { glob: 'reride', root: 2 },
  { glob: 'mathscapes', root: 2 },

  // Root 3: Thinking out loud
  { glob: 'notes/design', root: 3 },
  { glob: 'notes/maths', root: 3 },
  { glob: 'notes/misc', root: 3 },
  { glob: 'notes/reflect', root: 3 },
  { glob: 'notes/travel', root: 3 },
  { glob: '', root: 3, only: ['bio.md'] }, // bio lives at the vault root

  // Root 4: Teaching — every classroom/<year>/ folder
  { glob: 'classroom/2013', root: 4 },
  { glob: 'classroom/2014', root: 4 },
  { glob: 'classroom/2015', root: 4 },
  { glob: 'classroom/2016', root: 4 },
  { glob: 'classroom/2017', root: 4 },
  { glob: 'classroom/2018', root: 4 },
  { glob: 'classroom/2019', root: 4 },
  { glob: 'classroom/2020', root: 4 },
  { glob: 'classroom/2021', root: 4 },
  { glob: 'classroom/2022', root: 4 },

  // Root 5: People
  { glob: 'shoutouts/mentors', root: 5 },
  { glob: 'shoutouts/peers', root: 5 },
  { glob: 'shoutouts/students', root: 5 },
];

function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractLede(body) {
  // Strip leading HTML blocks (img, figure, caption italics, etc.) and empty lines.
  const cleaned = body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
    // Drop paragraphs that start with an HTML tag. Covers single-line <img …/>
    // as well as multi-line <figure>…</figure> blocks in the vault.
    .filter((p) => !p.startsWith('<'))
    // Drop single italic captions and standalone image markdown.
    .filter((p) => !/^_[^_]+_$/.test(p))
    .filter((p) => !/^!\[[^\]]*\]\([^)]+\)$/.test(p));

  if (cleaned.length === 0) return '';

  // Take the first real paragraph.
  let lede = cleaned[0];

  // Strip leading markdown heading marker if the first paragraph is a heading.
  lede = lede.replace(/^#{1,6}\s+/, '');

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
  // These are placeholder IDs only — they get replaced by hand-assigned Luhmann
  // IDs in Task 7. The 2-digit format assumes fewer than 100 notes per root,
  // which is comfortably above the real count. Warn if we ever exceed it.
  if (indexWithinRoot >= 99) {
    console.warn(
      `assignAutoId: index ${indexWithinRoot} exceeds 2-digit format in root ${rootNum}`
    );
  }
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

function readVaultFiles() {
  // Returns an array of { root, sourcePath, relativePath } for every .md
  // file in the import map.
  const files = [];
  for (const entry of IMPORT_MAP) {
    const folder = path.join(VAULT_ROOT, entry.glob);
    if (!fs.existsSync(folder)) {
      console.warn(`[warn] vault folder missing: ${folder}`);
      continue;
    }
    const dirEntries = fs.readdirSync(folder, { withFileTypes: true });
    for (const dirent of dirEntries) {
      if (!dirent.isFile() || !dirent.name.endsWith('.md')) continue;
      if (entry.only && !entry.only.includes(dirent.name)) continue;
      files.push({
        root: entry.root,
        sourcePath: path.join(folder, dirent.name),
        sourceName: dirent.name,
      });
    }
  }
  return files;
}

function importVault() {
  const files = readVaultFiles();
  console.log(`Found ${files.length} candidate notes across 5 roots.`);

  // Bucket files by root so we can assign sequential auto-IDs within each root.
  const byRoot = new Map();
  for (const f of files) {
    if (!byRoot.has(f.root)) byRoot.set(f.root, []);
    byRoot.get(f.root).push(f);
  }

  // Load existing id-map if it exists, so we preserve hand-assigned IDs across re-runs.
  const idMapPath = path.join(__dirname, 'id-map.json');
  let existingIdMap = {};
  if (fs.existsSync(idMapPath)) {
    existingIdMap = JSON.parse(fs.readFileSync(idMapPath, 'utf8'));
  }

  const newIdMap = {};
  const targetDir = path.join(__dirname, '..', 'src', 'notes');
  fs.mkdirSync(targetDir, { recursive: true });

  // Clear old imports — anything in src/notes gets rewritten every run.
  for (const existing of fs.readdirSync(targetDir)) {
    if (existing.endsWith('.md')) fs.unlinkSync(path.join(targetDir, existing));
  }

  for (const [rootNum, rootFiles] of byRoot.entries()) {
    // Sort files deterministically by sourceName within a root.
    rootFiles.sort((a, b) => a.sourceName.localeCompare(b.sourceName));

    rootFiles.forEach((f, i) => {
      const key = f.sourcePath.replace(VAULT_ROOT + '/', '');
      const id = existingIdMap[key] || assignAutoId(rootNum, i);
      newIdMap[key] = id;

      const raw = fs.readFileSync(f.sourcePath, 'utf8');
      const parsed = matter(raw);

      // The frontmatter in the vault already has title + date.
      const slug = slugify(parsed.data.title || f.sourceName.replace(/\.md$/, ''));

      const newFrontmatter = transformFrontmatter(parsed.data, {
        id,
        root: rootNum,
        slug,
      });

      // Filename is the ID with slashes (if any) replaced by hyphens.
      // Since Task 2 auto-IDs don't contain slashes yet, this is a no-op for now
      // but matters in Task 7 when IDs become things like `2/1a`.
      const filename = `${id.replace(/\//g, '-')}.md`;
      const outPath = path.join(targetDir, filename);

      const newContent = matter.stringify(parsed.content.trim() + '\n', newFrontmatter);
      fs.writeFileSync(outPath, newContent, 'utf8');
    });
  }

  // Write back the updated id-map.
  fs.writeFileSync(idMapPath, JSON.stringify(newIdMap, null, 2) + '\n', 'utf8');

  console.log(`Wrote ${Object.keys(newIdMap).length} notes to ${targetDir}`);
  console.log(`ID map saved to ${idMapPath}`);
}

// Run when invoked directly.
if (require.main === module) {
  importVault();
}

module.exports = {
  slugify,
  extractLede,
  assignAutoId,
  transformFrontmatter,
  readVaultFiles,
  importVault,
};

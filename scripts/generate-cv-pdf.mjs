// Renders the built /cv/ page to a PDF using headless Chrome.
// No dependencies: serves _site over a local HTTP server (root-absolute
// asset URLs break under file://), then prints with --print-to-pdf.
// Usage: npm run cv:pdf  (or: node scripts/generate-cv-pdf.mjs [out.pdf])

import http from "node:http";
import path from "node:path";
import { execFile } from "node:child_process";
import { readFile, access, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteDir = path.join(root, "_site");
// default: the copy served at /assets/gaurav-singh-cv.pdf (linked from the CV page)
const outFile = path.resolve(
  process.argv[2] ?? path.join(root, "src", "assets", "gaurav-singh-cv.pdf")
);

const chromeCandidates = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
].filter(Boolean);

const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".woff2": "font/woff2",
};

async function findChrome() {
  for (const candidate of chromeCandidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {}
  }
  throw new Error(
    "Chrome not found. Install Google Chrome or set CHROME_PATH."
  );
}

try {
  await access(path.join(siteDir, "cv", "index.html"));
} catch {
  console.error("_site/cv/index.html missing — run `npm run build` first.");
  process.exit(1);
}

const siteUrl = JSON.parse(
  await readFile(path.join(root, "src", "_data", "site.json"), "utf8")
).url;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  let filePath = path.join(siteDir, decodeURIComponent(url.pathname));
  if (filePath.endsWith(path.sep) || !path.extname(filePath)) {
    filePath = path.join(filePath, "index.html");
  }
  try {
    let body = await readFile(filePath);
    if (filePath.endsWith(".html")) {
      // absolutise anchor links so they work in the printed PDF
      // (asset links stay relative and load from this local server)
      body = body
        .toString()
        .replace(/(<a\s[^>]*href=")\//g, `$1${siteUrl}/`)
        .replaceAll("\u2013", "-");  // hyphens parse more reliably in ATS systems
    }
    res.writeHead(200, {
      "content-type": types[path.extname(filePath)] ?? "application/octet-stream",
    });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end("not found");
  }
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();

try {
  const chrome = await findChrome();
  await new Promise((resolve, reject) => {
    execFile(
      chrome,
      [
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        `--print-to-pdf=${outFile}`,
        `http://127.0.0.1:${port}/cv/`,
      ],
      (err) => (err ? reject(err) : resolve())
    );
  });
  console.log(`wrote ${outFile}`);
  // keep the already-built site current without a second eleventy run
  const served = path.join(siteDir, "assets", "gaurav-singh-cv.pdf");
  if (outFile === path.join(root, "src", "assets", "gaurav-singh-cv.pdf")) {
    await copyFile(outFile, served);
    console.log(`copied to ${served}`);
  }
} finally {
  server.close();
}

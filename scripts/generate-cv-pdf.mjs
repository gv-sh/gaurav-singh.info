// Renders a built CV page to a PDF using headless Chrome.
// No dependencies: serves _site over a local HTTP server (root-absolute
// asset URLs break under file://), then prints with --print-to-pdf.
// Usage: npm run cv:pdf
// Or: node scripts/generate-cv-pdf.mjs [out.pdf] [route]

import http from "node:http";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { readFile, access, copyFile, mkdtemp, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteDir = path.join(root, "_site");
// default: the professional CV linked from the CV page
const outFile = path.resolve(
  process.argv[2] ?? path.join(root, "src", "assets", "gaurav-singh-professional-cv.pdf")
);
const cvRoute = process.argv[3] ?? "/cv/";
const cvPage = path.join(siteDir, cvRoute.replace(/^\//, ""), "index.html");

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

function run(command, args) {
  return new Promise((resolve, reject) => {
    execFile(command, args, (err) => (err ? reject(err) : resolve()));
  });
}

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
  await access(cvPage);
} catch {
  console.error(`${cvPage} missing — run \`npm run build\` first.`);
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
  await run(chrome, [
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${outFile}`,
    `http://127.0.0.1:${port}${cvRoute}`,
  ]);
  console.log(`wrote ${outFile}`);
  // Keep PDFs written to src/assets current in the already-built site.
  const assetsDir = path.join(root, "src", "assets");
  if (path.dirname(outFile) === assetsDir) {
    const served = path.join(siteDir, "assets", path.basename(outFile));
    await copyFile(outFile, served);
    console.log(`copied to ${served}`);

    const previewName = path.basename(outFile).includes("academic")
      ? "academic"
      : "professional";
    const previewDir = await mkdtemp(path.join(os.tmpdir(), "cv-preview-"));
    const rasterPrefix = path.join(previewDir, previewName);
    try {
      await run("pdftoppm", ["-png", "-r", "150", outFile, rasterPrefix]);
      for (const page of [1, 2]) {
        const previewFile = path.join(assetsDir, `${previewName}-${page}.webp`);
        await run("cwebp", [
          "-quiet", "-q", "90", "-m", "6", "-sharp_yuv",
          `${rasterPrefix}-${page}.png`, "-o", previewFile,
        ]);
        await copyFile(previewFile, path.join(siteDir, "assets", path.basename(previewFile)));
      }
      console.log(`updated ${previewName} page previews`);
    } finally {
      await rm(previewDir, { recursive: true, force: true });
    }
  }
} finally {
  server.close();
}

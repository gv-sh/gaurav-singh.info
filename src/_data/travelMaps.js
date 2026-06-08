// ============================================================================
// Travel maps — a small build-time map-labelling engine (d3-geo + world-atlas).
//
// One set of rules, applied to every region (and every zoomed inset):
//
//  1. Each visited place is a small filled square at its projected point.
//  2. A place gets its FULL NAME (on a solid background) if a clear spot exists.
//     Candidate positions are tried in order — the four sides (E, W, N, S) at
//     growing distance, then the diagonals. A candidate is valid only if its box
//       (a) stays fully inside the map frame (no edge overflow),
//       (b) doesn't overlap another label or sit on/near any marker,
//       (c) doesn't sit on the country outline, and
//       (d) — when the label has a handle — that handle doesn't cross another.
//  3. A leader (octilinear: 45° off the marker, then straight into the label's
//     near edge) is drawn when a label is pushed out OR placed diagonally.
//     Crossings are reduced first by rejecting crossing candidates, then by a
//     swap pass that swaps two labels' positions when that uncrosses them.
//  4. Sparser points are placed first, so dense pockets are what's left over.
//  5. Insets are DECLARED per region: { bbox } lifts the main map's places in
//     that lng/lat box into one zoomed, named inset (markers + a box + a frustum
//     on the main map), or { detailFeature, detailPlaces, srcFeature } for a
//     feature inset like Tasmania. An inset re-runs all these rules with room,
//     ignores the coastline, crops to its content, and keeps its own legend.
//  6. Anything still unplaceable becomes a numbered badge (mini square + number,
//     de-collided with its own handle); names go in a legend below the map (or
//     inside the inset, for inset badges).
//  7. Everything is monochrome via currentColor, drawn once at build time.
// ============================================================================
import { createRequire } from "module";
import { readFileSync } from "node:fs";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";

const require = createRequire(import.meta.url);
const world = require("world-atlas/countries-50m.json");
const countries = feature(world, world.objects.countries).features;
const byName = (n) => countries.find((c) => c.properties.name === n);

// ---- tunables ---------------------------------------------------------------
const PAD = 16; // frame margin around a map
const MARK = 4; // place-marker square side
const BADGE = 13; // numbered-node badge side
const CHAR_W = 7.9; // label char width at 12px mono — over-estimated so a box always covers its text
const LABEL_H = 14; // label box height
const SIDE_GAP = 8; // gap between marker and adjacent label
const LEG_LH = 17; // legend line height
const COL_GAP = 22; // gap between side-by-side insets
const INSET_W = 260; // detail-map width an inset is fit into
const FRUSTUM_GAP = 46; // vertical gap between map and inset row
const NEIGHBOR_R = 40; // px: radius used to order placement (sparser points first)
const DIRS = ["E", "W", "NE", "SE", "NW", "SW", "N", "S"]; // candidate sides, in priority order
// how far a label/badge may be pushed from its marker (kept tight so leaders stay short)
const DIST = [SIDE_GAP, SIDE_GAP + 10, SIDE_GAP + 20, SIDE_GAP + 32];

// ---- geometry helpers -------------------------------------------------------

// Tasmania: the polygon near (146.5, -42) inside Australia's MultiPolygon.
function tasmania() {
  const aus = byName("Australia");
  let best = null;
  let len = 0;
  for (const poly of aus.geometry.coordinates) {
    const ring = poly[0];
    let sx = 0;
    let sy = 0;
    for (const [x, y] of ring) {
      sx += x;
      sy += y;
    }
    const cx = sx / ring.length;
    const cy = sy / ring.length;
    if (cx > 143 && cx < 149 && cy < -39 && cy > -45 && ring.length > len) {
      best = poly;
      len = ring.length;
    }
  }
  return { type: "Feature", properties: { name: "Tasmania" }, geometry: { type: "Polygon", coordinates: best } };
}

// Keep only polygons whose centroid sits in a [west, east, south, north] window.
function clipFeature(feat, [w, e, s, n]) {
  const polys = feat.geometry.coordinates.filter((poly) => {
    const ring = poly[0];
    let sx = 0;
    let sy = 0;
    for (const [x, y] of ring) {
      sx += x;
      sy += y;
    }
    return sx / ring.length >= w && sx / ring.length <= e && sy / ring.length >= s && sy / ring.length <= n;
  });
  return { type: "Feature", properties: feat.properties, geometry: { type: "MultiPolygon", coordinates: polys } };
}

// A GeoJSON rectangle around a set of places (degrees of margin), for zooming.
function geoBBox(places, m = 0.45) {
  const lng = places.map((p) => p.coords[0]);
  const lat = places.map((p) => p.coords[1]);
  const w = Math.min(...lng) - m;
  const e = Math.max(...lng) + m;
  const s = Math.min(...lat) - m;
  const nn = Math.max(...lat) + m;
  // ring wound for d3-geo (clockwise) so it reads as a small region, not the whole sphere
  return { type: "Polygon", coordinates: [[[w, s], [w, nn], [e, nn], [e, s], [w, s]]] };
}

// Projected boundary vertices (decimated) — obstacles so labels avoid the coastline.
function boundaryPoints(feat, proj, step = 2) {
  const pts = [];
  let c = 0;
  const walk = (coords) => {
    if (typeof coords[0] === "number") {
      if (c++ % step === 0) {
        const q = proj(coords);
        if (q) pts.push({ x: q[0], y: q[1] });
      }
    } else {
      coords.forEach(walk);
    }
  };
  walk(feat.geometry.coordinates);
  return pts;
}

// ---- small SVG pieces -------------------------------------------------------
const clamp = (v, a, c) => Math.max(a, Math.min(v, c));
// octilinear leader path points: marker -> 45° diagonal -> label's near edge
function leaderPts(d, b) {
  const ex = clamp(d.x, b.cx - b.w / 2, b.cx + b.w / 2);
  const ey = clamp(d.y, b.cy - b.h / 2, b.cy + b.h / 2);
  const ddx = ex - d.x;
  const ddy = ey - d.y;
  const diag = Math.min(Math.abs(ddx), Math.abs(ddy));
  return [[d.x, d.y], [d.x + Math.sign(ddx) * diag, d.y + Math.sign(ddy) * diag], [ex, ey]];
}
const marker = (d) => `<rect class="geo-dot" x="${(d.x - MARK / 2).toFixed(1)}" y="${(d.y - MARK / 2).toFixed(1)}" width="${MARK}" height="${MARK}"/>`;
const badgeAt = (cx, cy, num) => `<rect class="geo-badge" x="${(cx - BADGE / 2).toFixed(1)}" y="${(cy - BADGE / 2).toFixed(1)}" width="${BADGE}" height="${BADGE}"/><text class="geo-badgenum" x="${cx.toFixed(1)}" y="${(cy + 0.5).toFixed(1)}" text-anchor="middle" dominant-baseline="middle">${num}</text>`;
const badge = (d, num) => badgeAt(d.x, d.y, num);
const leaderPath = (d, box) => {
  const p = leaderPts(d, box);
  return `<path class="geo-leader" d="M${p[0][0].toFixed(1)},${p[0][1].toFixed(1)} L${p[1][0].toFixed(1)},${p[1][1].toFixed(1)} L${p[2][0].toFixed(1)},${p[2][1].toFixed(1)}"/>`;
};
// do two leader polylines (arrays of points) intersect?
const segHit = (a, b, c, e) => {
  const ccw = (p, q, r) => (r[1] - p[1]) * (q[0] - p[0]) > (q[1] - p[1]) * (r[0] - p[0]);
  return ccw(a, c, e) !== ccw(b, c, e) && ccw(a, b, c) !== ccw(a, b, e);
};
const leadersCross = (A, B) => {
  for (let s = 0; s < A.length - 1; s++) for (let t = 0; t < B.length - 1; t++) if (segHit(A[s], A[s + 1], B[t], B[t + 1])) return true;
  return false;
};
function drawLabel(name, d, pl) {
  let leader = "";
  if (pl.leader) {
    const p = leaderPts(d, pl.box);
    leader = `<path class="geo-leader" d="M${p[0][0].toFixed(1)},${p[0][1].toFixed(1)} L${p[1][0].toFixed(1)},${p[1][1].toFixed(1)} L${p[2][0].toFixed(1)},${p[2][1].toFixed(1)}"/>`;
  }
  const anchor = pl.box.cx > d.x + 1 ? "start" : pl.box.cx < d.x - 1 ? "end" : "middle";
  const tx = anchor === "start" ? pl.box.cx - pl.box.w / 2 : anchor === "end" ? pl.box.cx + pl.box.w / 2 : pl.box.cx;
  // solid background behind the text so the coastline/land doesn't show through
  const bg = `<rect class="geo-lblbg" x="${(pl.box.cx - pl.box.w / 2).toFixed(1)}" y="${(pl.box.cy - pl.box.h / 2).toFixed(1)}" width="${pl.box.w.toFixed(1)}" height="${pl.box.h}"/>`;
  return `${leader}${marker(d)}${bg}<text class="geo-lbl" x="${tx.toFixed(1)}" y="${pl.box.cy.toFixed(1)}" text-anchor="${anchor}" dominant-baseline="middle">${name}</text>`;
}

// ---- the rules engine: place full-name labels (Rules 2–4) -------------------
// Returns place[i] = { box, leader } for points it could label, else null.
function placeLabels(places, dots, innerW, innerH, bpts) {
  if (!places.length) return [];
  const dotBoxes = dots.map((d) => ({ cx: d.x, cy: d.y, w: MARK, h: MARK }));
  const hit = (b, list, pad) => list.some((o) => Math.abs(b.cx - o.cx) < (b.w + o.w) / 2 + pad && Math.abs(b.cy - o.cy) < (b.h + o.h) / 2 + pad);
  const hitEdge = (b, pad) => bpts.some((p) => Math.abs(b.cx - p.x) < b.w / 2 + pad && Math.abs(b.cy - p.y) < b.h / 2 + pad);
  const inView = (b) => b.cx - b.w / 2 >= -PAD + 1 && b.cx + b.w / 2 <= innerW + PAD - 1 && b.cy - b.h / 2 >= -PAD + 1 && b.cy + b.h / 2 <= innerH + PAD - 1;
  const boxAt = (d, w, h, dir, dist) => {
    let cx = d.x;
    let cy = d.y;
    if (dir.includes("E")) cx = d.x + dist + w / 2;
    if (dir.includes("W")) cx = d.x - dist - w / 2;
    if (dir.includes("N")) cy = d.y - dist - h / 2;
    if (dir.includes("S")) cy = d.y + dist + h / 2;
    return { cx, cy, w, h };
  };
  const placed = [];
  const insideAny = (x, y, list, pad, skip) => list.some((o, idx) => idx !== skip && Math.abs(x - o.cx) < o.w / 2 + pad && Math.abs(y - o.cy) < o.h / 2 + pad);
  const leaderClear = (pts, ownDot) => {
    for (let s = 0; s < pts.length - 1; s++) {
      const [x0, y0] = pts[s];
      const [x1, y1] = pts[s + 1];
      const steps = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0) / 4));
      for (let t = 0; t <= steps; t++) {
        const x = x0 + ((x1 - x0) * t) / steps;
        const y = y0 + ((y1 - y0) * t) / steps;
        if (insideAny(x, y, placed, 1, -1) || insideAny(x, y, dotBoxes, 5, ownDot)) return false;
      }
    }
    return true;
  };
  const tryPlace = (i, w) => {
    const d = dots[i];
    // a place may carry a manual hint { dir, di } — tried first, allowed to sit
    // over the coastline (so a label can be pushed into open space off the land)
    const hint = places[i].hint;
    if (hint) {
      const b = boxAt(d, w, LABEL_H, hint.dir, DIST[hint.di ?? 1]);
      if (inView(b) && !hit(b, placed, 2) && !hit(b, dotBoxes, 5) && leaderClear(leaderPts(d, b), i)) return { b, di: hint.di ?? 1, dir: hint.dir };
    }
    for (let di = 0; di < DIST.length; di++) {
      for (const dir of DIRS) {
        const diagonal = dir.length === 2;
        const b = boxAt(d, w, LABEL_H, dir, DIST[di]);
        if (!inView(b)) continue;
        if (hit(b, placed, 2) || hit(b, dotBoxes, 5) || hitEdge(b, 1)) continue;
        // a diagonal label always gets a handle, so its leader must also be clear
        if ((di > 0 || diagonal) && !leaderClear(leaderPts(d, b), i)) continue;
        return { b, di, dir };
      }
    }
    return null;
  };

  // Rule 4: sparser points first
  const density = dots.map((d, i) => dots.reduce((n, e, j) => n + (i !== j && Math.hypot(e.x - d.x, e.y - d.y) < NEIGHBOR_R ? 1 : 0), 0));
  const order = places.map((_, i) => i).sort((a, b) => density[a] - density[b]);
  const place = new Array(places.length).fill(null);
  for (const i of order) {
    const got = tryPlace(i, places[i].name.length * CHAR_W + 2);
    if (got) {
      placed.push(got.b);
      place[i] = { box: got.b, leader: got.di > 0 || got.dir.length === 2 };
    }
  }

  // Rule 3: swap-to-uncross
  const segCross = (a, b, c, d) => {
    const ccw = (p, q, r) => (r[1] - p[1]) * (q[0] - p[0]) > (q[1] - p[1]) * (r[0] - p[0]);
    return ccw(a, c, d) !== ccw(b, c, d) && ccw(a, b, c) !== ccw(a, b, d);
  };
  const crosses = (i, j) => {
    if (!place[i] || !place[j] || !place[i].leader || !place[j].leader) return false;
    const A = leaderPts(dots[i], place[i].box);
    const B = leaderPts(dots[j], place[j].box);
    for (let s = 0; s < A.length - 1; s++) for (let t = 0; t < B.length - 1; t++) if (segCross(A[s], A[s + 1], B[t], B[t + 1])) return true;
    return false;
  };
  const bad = (idx) => {
    const b = place[idx].box;
    if (!inView(b)) return true;
    for (let k = 0; k < place.length; k++) {
      if (Math.abs(b.cx - dots[k].x) < b.w / 2 + 5.5 && Math.abs(b.cy - dots[k].y) < b.h / 2 + 5.5) return true;
      if (k !== idx && place[k] && Math.abs(b.cx - place[k].box.cx) < (b.w + place[k].box.w) / 2 + 2 && Math.abs(b.cy - place[k].box.cy) < (b.h + place[k].box.h) / 2 + 2) return true;
    }
    return !leaderClear(leaderPts(dots[idx], b), idx);
  };
  for (let pass = 0; pass < 4; pass++) {
    let changed = false;
    for (let i = 0; i < place.length; i++) {
      for (let j = i + 1; j < place.length; j++) {
        if (!crosses(i, j)) continue;
        const bi = place[i].box;
        const bj = place[j].box;
        const oi = { x: bi.cx - dots[i].x, y: bi.cy - dots[i].y };
        const oj = { x: bj.cx - dots[j].x, y: bj.cy - dots[j].y };
        bi.cx = dots[i].x + oj.x;
        bi.cy = dots[i].y + oj.y;
        bj.cx = dots[j].x + oi.x;
        bj.cy = dots[j].y + oi.y;
        if (!crosses(i, j) && !bad(i) && !bad(j)) changed = true;
        else {
          bi.cx = dots[i].x + oi.x;
          bi.cy = dots[i].y + oi.y;
          bj.cx = dots[j].x + oj.x;
          bj.cy = dots[j].y + oj.y;
        }
      }
    }
    if (!changed) break;
  }
  return place;
}

// Numbered badges for leftover points (Rule 6). A badge sits on its point when
// clear; when badges would overlap, the point keeps a small marker and the badge
// is pushed off with a leader. Numbers come from the shared counter.
function placeBadges(idxs, places, dots, innerW, innerH, bpts, obstacles, labelLeaders, counter, legendNames) {
  const dotBoxes = dots.map((d) => ({ cx: d.x, cy: d.y, w: MARK, h: MARK }));
  const overlap = (b, list, pad) => list.some((o) => Math.abs(b.cx - o.cx) < (b.w + o.w) / 2 + pad && Math.abs(b.cy - o.cy) < (b.h + o.h) / 2 + pad);
  const hitEdge = (b, pad) => bpts.some((p) => Math.abs(b.cx - p.x) < b.w / 2 + pad && Math.abs(b.cy - p.y) < b.h / 2 + pad);
  const inView = (b) => b.cx - b.w / 2 >= -PAD + 1 && b.cx + b.w / 2 <= innerW + PAD - 1 && b.cy - b.h / 2 >= -PAD + 1 && b.cy + b.h / 2 <= innerH + PAD - 1;
  const boxAt = (d, dir, dist) => {
    let cx = d.x;
    let cy = d.y;
    if (dir.includes("E")) cx = d.x + dist + BADGE / 2;
    if (dir.includes("W")) cx = d.x - dist - BADGE / 2;
    if (dir.includes("N")) cy = d.y - dist - BADGE / 2;
    if (dir.includes("S")) cy = d.y + dist + BADGE / 2;
    return { cx, cy, w: BADGE, h: BADGE };
  };
  const insideAny = (x, y, list, pad, skip) => list.some((o, ix) => ix !== skip && Math.abs(x - o.cx) < o.w / 2 + pad && Math.abs(y - o.cy) < o.h / 2 + pad);
  const placedBadges = [];
  const placedLeaders = labelLeaders.slice(); // badge handles must not cross these (or each other)
  const leaderClear = (pts, ownDot) => {
    for (let s = 0; s < pts.length - 1; s++) {
      const [x0, y0] = pts[s];
      const [x1, y1] = pts[s + 1];
      const steps = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0) / 4));
      for (let t = 0; t <= steps; t++) {
        const x = x0 + ((x1 - x0) * t) / steps;
        const y = y0 + ((y1 - y0) * t) / steps;
        if (insideAny(x, y, obstacles, 2, -1) || insideAny(x, y, placedBadges, 1, -1) || insideAny(x, y, dotBoxes, 4, ownDot)) return false;
      }
    }
    return true;
  };
  const res = new Map();
  for (const i of idxs) {
    const d = dots[i];
    const num = counter.n++;
    legendNames.push(places[i].name);
    const atBox = { cx: d.x, cy: d.y, w: BADGE, h: BADGE };
    const coversOtherDot = dots.some((e, k) => k !== i && Math.abs(d.x - e.x) < BADGE / 2 + MARK / 2 + 1 && Math.abs(d.y - e.y) < BADGE / 2 + MARK / 2 + 1);
    if (inView(atBox) && !overlap(atBox, obstacles, 2.5) && !overlap(atBox, placedBadges, 1) && !coversOtherDot) {
      placedBadges.push(atBox);
      res.set(i, { box: atBox, atDot: true, num });
      continue;
    }
    // Search outward — badges are tiny, so they can always reach open space.
    // A position is NEVER accepted if it overlaps a label, marker, or badge.
    const FAR = [SIDE_GAP, SIDE_GAP + 10, SIDE_GAP + 20, SIDE_GAP + 34, SIDE_GAP + 50, SIDE_GAP + 70, SIDE_GAP + 94, SIDE_GAP + 122];
    let got = null;
    for (let di = 0; di < FAR.length && !got; di++) {
      for (const dir of DIRS) {
        const b = boxAt(d, dir, FAR[di]);
        if (!inView(b) || overlap(b, obstacles, 2.5) || overlap(b, placedBadges, 1.5) || overlap(b, dotBoxes, 2) || hitEdge(b, 1)) continue;
        const lp = leaderPts(d, b);
        if (!leaderClear(lp, i)) continue;
        if (placedLeaders.some((L) => leadersCross(lp, L))) continue; // no crossing handles
        got = b;
        break;
      }
    }
    if (!got) {
      // relax the coastline rule but still never overlap or cross another handle
      for (let di = 0; di < FAR.length && !got; di++) {
        for (const dir of DIRS) {
          const b = boxAt(d, dir, FAR[di]);
          if (!inView(b) || overlap(b, obstacles, 2) || overlap(b, placedBadges, 1.5) || overlap(b, dotBoxes, 2)) continue;
          if (placedLeaders.some((L) => leadersCross(leaderPts(d, b), L))) continue;
          got = b;
          break;
        }
      }
    }
    if (!got) got = { cx: d.x, cy: d.y, w: BADGE, h: BADGE };
    placedBadges.push(got);
    placedLeaders.push(leaderPts(d, got));
    res.set(i, { box: got, atDot: false, num });
  }
  return res;
}

// legend panel (Rule 6): a numbered badge (same as the map) + the name per row.
function legendPanel(names, x, y, bordered = true) {
  if (!names.length) return { svg: "", w: 0, h: 0 };
  const maxChars = Math.max(...names.map((n) => n.length));
  const w = 8 + BADGE + 6 + maxChars * CHAR_W + 8;
  const h = (names.length - 1) * LEG_LH + BADGE + 12;
  const lines = names
    .map((n, i) => {
      const cy = y + BADGE / 2 + 6 + i * LEG_LH;
      return badgeAt(x + 8 + BADGE / 2, cy, i + 1) + `<text class="geo-leg" x="${(x + 8 + BADGE + 6).toFixed(1)}" y="${cy.toFixed(1)}" dominant-baseline="middle">${n}</text>`;
    })
    .join("");
  const box = bordered ? `<rect class="geo-legbox" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}"/>` : "";
  return { svg: box + lines, w, h };
}

// ---- a zoomed inset: a boxed detail map (Rule 5) ----------------------------
// `inset` = { detailFeature, detailPlaces, srcFeature }. Returns geometry + svg.
// Unplaceable points inside the inset become badges, numbered via `counter`/`names`.
function renderInset(inset, x, y, clipId) {
  // fit the zoom region into a square, then crop to its content (no empty box)
  const proj = geoMercator().fitSize([INSET_W, INSET_W], inset.srcFeature);
  const path = geoPath(proj);
  const b = path.bounds(inset.srcFeature);
  const b0x = b[0][0];
  const b0y = b[0][1];
  const cw = Math.ceil(b[1][0] - b0x);
  const ch = Math.ceil(b[1][1] - b0y);
  // dots in the inset's own content frame (0..cw, 0..ch)
  const dots = inset.detailPlaces.map((p) => {
    const [px, py] = proj(p.coords);
    return { x: px - b0x, y: py - b0y };
  });
  // [] = ignore the coastline inside the inset, so labels can use the whole frame
  const place = placeLabels(inset.detailPlaces, dots, cw, ch, []);
  const idx = inset.detailPlaces.map((_, i) => i);
  const obstacles = idx.filter((i) => place[i]).map((i) => place[i].box);
  const labelLeaders = idx.filter((i) => place[i] && place[i].leader).map((i) => leaderPts(dots[i], place[i].box));
  // the inset keeps its OWN numbering + legend (within the box)
  const counter = { n: 1 };
  const names = [];
  const bp = placeBadges(idx.filter((i) => !place[i]), inset.detailPlaces, dots, cw, ch, [], obstacles, labelLeaders, counter, names);
  const body = inset.detailPlaces
    .map((p, i) => {
      if (place[i]) return drawLabel(p.name, dots[i], place[i]);
      const r = bp.get(i);
      if (r.atDot) return badge(dots[i], r.num);
      return leaderPath(dots[i], r.box) + marker(dots[i]) + badgeAt(r.box.cx, r.box.cy, r.num);
    })
    .join("");
  // optional title row at the top (a string, or an array for multiple lines)
  const titleLines = Array.isArray(inset.name) ? inset.name : inset.name ? [inset.name] : [];
  const titleW = titleLines.length ? Math.max(...titleLines.map((l) => l.length)) * CHAR_W : 0;
  const titleH = titleLines.length ? titleLines.length * 15 + 6 : 0;
  const detailTop = PAD + titleH;

  // legend dimensions, anchored to the box's bottom-right corner (over the sea)
  const legW = names.length ? 8 + BADGE + 6 + Math.max(...names.map((n) => n.length)) * CHAR_W + 8 : 0;
  const legH = names.length ? (names.length - 1) * LEG_LH + BADGE + 12 : 0;

  const boxW = Math.max(cw, titleW, legW) + PAD * 2;
  const boxH = detailTop + ch + PAD;
  const legX = x + boxW - PAD - legW;
  const legY = y + boxH - PAD - legH;

  const title = titleLines.map((l, i) => `<text class="geo-inset-title" x="${x + PAD}" y="${y + PAD + 6 + i * 15}">${l}</text>`).join("");
  const legBox = names.length ? `<rect class="geo-legbg" x="${legX.toFixed(1)}" y="${legY.toFixed(1)}" width="${legW}" height="${legH}"/>` : "";
  const leg = legendPanel(names, legX, legY, true);

  const svg =
    `<clipPath id="${clipId}"><rect x="${x}" y="${y}" width="${boxW}" height="${boxH}"/></clipPath>` +
    `<rect class="geo-legbox" x="${x}" y="${y}" width="${boxW}" height="${boxH}"/>` +
    title +
    `<g clip-path="url(#${clipId})"><g transform="translate(${x + PAD},${y + detailTop})"><g transform="translate(${(-b0x).toFixed(1)},${(-b0y).toFixed(1)})"><path class="geo-land" d="${path(inset.detailFeature)}"/></g>${body}</g></g>` +
    legBox +
    leg.svg;
  return { svg, w: boxW, h: boxH };
}

// ---- a full region: main map + auto/declared insets + legend ----------------
function renderRegion(feat, width, places, prefix, declaredInsets = []) {
  const proj = geoMercator().fitWidth(width, feat);
  const path = geoPath(proj);
  const innerH = Math.ceil(path.bounds(feat)[1][1]);
  const mainW = width + PAD * 2;
  const mainH = innerH + PAD * 2;
  const dots = places.map((p) => {
    const [x, y] = proj(p.coords);
    return { x, y };
  });
  const bpts = boundaryPoints(feat, proj);
  // Rule 5: insets are declared per region. A spec is either { bbox:[w,e,s,n] } —
  // which lifts the main map's places inside that box into one zoomed inset — or a
  // feature inset { detailFeature, detailPlaces, srcFeature } with its own places
  // (e.g. Tasmania). Inset points show only as markers on the main map (boxed and
  // joined to the inset by a frustum); their names are placed inside the inset.
  const insets = [];
  const insetSet = new Set();
  for (const spec of declaredInsets) {
    if (spec.bbox) {
      const [w, e, s, n] = spec.bbox;
      const members = places.map((_, i) => i).filter((i) => places[i].coords[0] >= w && places[i].coords[0] <= e && places[i].coords[1] >= s && places[i].coords[1] <= n);
      members.forEach((i) => insetSet.add(i));
      const dp = members.map((i) => places[i]);
      if (dp.length) insets.push({ name: spec.name, detailFeature: feat, detailPlaces: dp, srcFeature: geoBBox(dp) });
    } else {
      insets.push(spec);
    }
  }
  const mainIdx = places.map((_, i) => i).filter((i) => !insetSet.has(i));

  // place full-name labels for the points that stay on the main map
  const subPlace = placeLabels(mainIdx.map((i) => places[i]), mainIdx.map((i) => dots[i]), width, innerH, bpts);
  const place = new Array(places.length).fill(null);
  mainIdx.forEach((i, k) => {
    place[i] = subPlace[k];
  });
  const unplaced = mainIdx.filter((i) => !place[i]);

  // numbering shared across main badges + inset badges -> one legend
  const counter = { n: 1 };
  const legendNames = [];
  const obstacles = mainIdx.filter((i) => place[i]).map((i) => place[i].box);
  const labelLeaders = mainIdx.filter((i) => place[i] && place[i].leader).map((i) => leaderPts(dots[i], place[i].box));
  const badgePlace = placeBadges(unplaced, places, dots, width, innerH, bpts, obstacles, labelLeaders, counter, legendNames);

  let main = `<path class="geo-land" d="${path(feat)}"/>`;
  mainIdx.forEach((i) => {
    if (place[i]) main += drawLabel(places[i].name, dots[i], place[i]);
  });
  unplaced.forEach((i) => {
    const r = badgePlace.get(i);
    if (r.atDot) main += badge(dots[i], r.num);
    else main += leaderPath(dots[i], r.box) + marker(dots[i]) + badgeAt(r.box.cx, r.box.cy, r.num);
  });
  insetSet.forEach((i) => {
    main += marker(dots[i]);
  });

  // insets in a row below the map, each joined to its source box by a frustum
  let insetSvg = "";
  let extras = "";
  let cursorX = PAD;
  const insetTop = mainH + FRUSTUM_GAP;
  let maxInsetH = 0;
  insets.forEach((ins, k) => {
    const r = renderInset(ins, cursorX, insetTop, `clip-${prefix}-${k}`);
    insetSvg += r.svg;
    const sb = path.bounds(ins.srcFeature);
    const SX0 = PAD + sb[0][0];
    const SY0 = PAD + sb[0][1];
    const SX1 = PAD + sb[1][0];
    const SY1 = PAD + sb[1][1];
    extras += `<rect class="geo-box" x="${SX0.toFixed(1)}" y="${SY0.toFixed(1)}" width="${(SX1 - SX0).toFixed(1)}" height="${(SY1 - SY0).toFixed(1)}"/>`;
    extras += `<path class="geo-zoom" d="M${SX0.toFixed(1)},${SY1.toFixed(1)} L${cursorX.toFixed(1)},${insetTop}"/><path class="geo-zoom" d="M${SX1.toFixed(1)},${SY1.toFixed(1)} L${(cursorX + r.w).toFixed(1)},${insetTop}"/>`;
    cursorX += r.w + COL_GAP;
    maxInsetH = Math.max(maxInsetH, r.h);
  });
  const insetsRight = insets.length ? cursorX - COL_GAP + PAD : 0;

  // legend sits BELOW the map (and any insets), so the map keeps full width in the column
  const belowInsets = insets.length ? insetTop + maxInsetH : mainH;
  const legY = belowInsets + (insets.length ? PAD : FRUSTUM_GAP);
  const leg = legendPanel(legendNames, PAD, legY);

  const W = Math.max(mainW, insetsRight, leg.w ? leg.w + PAD * 2 : 0);
  let H = belowInsets + PAD;
  if (leg.h) H = legY + leg.h + PAD;

  return `<svg class="geo-map" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Outline map of ${feat.properties.name || prefix}, places I have visited marked.">
  <g transform="translate(${PAD},${PAD})">${main}</g>
  ${extras}
  ${insetSvg}
  ${leg.svg}
</svg>`;
}

// ---- region data ------------------------------------------------------------

// India: official Survey-of-India outline (full Jammu & Kashmir), simplified to
// ~70KB. Its rings are wound opposite to d3-geo's spherical convention, so we
// reverse them (otherwise the polygon reads as "everything outside India").
const indiaGeo = JSON.parse(readFileSync(new URL("../geo/india.geojson", import.meta.url), "utf8"));
const indiaFeature = {
  type: "Feature",
  properties: { name: "India" },
  geometry: { type: "MultiPolygon", coordinates: indiaGeo.geometries[0].coordinates.map((poly) => poly.map((ring) => ring.slice().reverse())) },
};
const indiaPlaces = [
  { name: "Tezpur", coords: [92.8, 26.63] },
  { name: "Delhi", coords: [77.21, 28.61] },
  { name: "Kanpur", coords: [80.33, 26.45] },
  { name: "Agra", coords: [78.01, 27.18] },
  { name: "Gwalior", coords: [78.18, 26.22] },
  { name: "Jaisalmer", coords: [70.92, 26.91], hint: { dir: "N", di: 2 } },
  { name: "Jodhpur", coords: [73.02, 26.29] },
  { name: "Barmer", coords: [71.39, 25.75], hint: { dir: "E", di: 0 } },
  { name: "Gandhinagar", coords: [72.65, 23.22], hint: { dir: "E", di: 0 } },
  { name: "Vadodara", coords: [73.18, 22.31] },
  { name: "Surat", coords: [72.83, 21.17] },
  { name: "Bhopal", coords: [77.41, 23.26] },
  { name: "Nashik", coords: [73.79, 19.99] },
  { name: "Mumbai", coords: [72.88, 19.08] },
  { name: "Hyderabad", coords: [78.49, 17.39] },
  { name: "Warangal", coords: [79.59, 17.97] },
  { name: "Shivamogga", coords: [75.57, 13.93] },
  { name: "Chikkamagaluru", coords: [75.77, 13.32] },
  { name: "Sakleshpur", coords: [75.78, 12.94] },
  { name: "Mysuru", coords: [76.64, 12.3] },
  { name: "Bengaluru", coords: [77.59, 12.97] },
  { name: "Nandi Hills", coords: [77.68, 13.37] },
  { name: "Vellore", coords: [79.13, 12.92] },
  { name: "Tirupati", coords: [79.42, 13.63] },
  { name: "Sullurupeta", coords: [80.02, 13.7] },
  { name: "Sriharikota", coords: [80.23, 13.73] },
  { name: "Chennai", coords: [80.27, 13.08] },
  { name: "Coimbatore", coords: [76.96, 11.02] },
];

const australiaFeature = clipFeature(byName("Australia"), [112, 155, -44, -9]);
const tasFeature = tasmania();
const australiaPlaces = [
  { name: "Great Barrier Reef", coords: [146.8, -16.5] },
  { name: "Cairns", coords: [145.77, -16.92] },
  { name: "Maleny", coords: [152.85, -26.76] },
  { name: "Brisbane", coords: [153.03, -27.47] },
  { name: "Moogerah", coords: [152.55, -28.03] },
  { name: "Tamborine", coords: [153.19, -27.97] },
  { name: "Gold Coast", coords: [153.43, -28.02] },
  { name: "Lamington", coords: [153.13, -28.23] },
  { name: "SpringBrook", coords: [153.27, -28.23] },
  { name: "Uki", coords: [153.33, -28.42] },
  { name: "Byron Bay", coords: [153.61, -28.64] },
  { name: "Yamba", coords: [153.36, -29.44] },
  { name: "Sydney", coords: [151.21, -33.87] },
  { name: "Melbourne", coords: [144.96, -37.81] },
  { name: "Great Ocean Road", coords: [143.67, -38.75] },
  { name: "Twelve Apostles", coords: [143.1, -38.66] },
];
const tasmaniaPlaces = [
  { name: "Launceston", coords: [147.14, -41.43] },
  { name: "Cradle Mountain", coords: [145.96, -41.68] },
  { name: "Mount Wellington", coords: [147.24, -42.9] },
  { name: "Hobart", coords: [147.33, -42.88] },
  { name: "Bruny Island", coords: [147.27, -43.38] },
  { name: "Hastings Caves", coords: [146.88, -43.42] },
  { name: "Port Arthur", coords: [147.85, -43.14] },
];
const nepalPlaces = [
  { name: "Gandhruk", coords: [83.81, 28.38] },
  { name: "Sarangkot", coords: [83.95, 28.24] },
  { name: "Pokhra", coords: [83.99, 28.21] },
  { name: "Fewa lake", coords: [83.95, 28.21] },
  { name: "Pumdikot", coords: [83.86, 28.18] },
  { name: "Kathmandu", coords: [85.32, 27.71] },
  { name: "Nagarkot", coords: [85.52, 27.72] },
];

export default {
  // South India and the Gold Coast/Brisbane area are dense, so they're pulled
  // into zoomed insets; Tasmania is a feature inset with its own places.
  india: renderRegion(indiaFeature, 460, indiaPlaces, "in", [{ name: "South India", bbox: [74.5, 81, 10.5, 14.5] }]),
  australia: renderRegion(australiaFeature, 460, australiaPlaces, "au", [
    { name: ["Gold Coast &", "Brisbane"], bbox: [151.8, 154.2, -29.8, -26.4] },
    { name: "Tasmania", detailFeature: tasFeature, detailPlaces: tasmaniaPlaces, srcFeature: tasFeature },
  ]),
  nepal: renderRegion(byName("Nepal"), 460, nepalPlaces, "np"),
};

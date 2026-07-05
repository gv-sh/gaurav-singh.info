// test/backlinks.test.js — run with `node --test`
import test from "node:test";
import assert from "node:assert/strict";

import { extractForwardLinks, buildBacklinksMap, buildGraph } from "../lib/note-links.js";

test("extractForwardLinks: finds /notes/<slug>/ links in markdown", () => {
  const body = "See also [the primes note](/notes/primes/) and [iterflow](/notes/introducing-mathscapes/).";
  assert.deepEqual(extractForwardLinks(body).sort(), ["introducing-mathscapes", "primes"]);
});

test("extractForwardLinks: ignores external and non-note links", () => {
  const body = "External [link](https://example.com) and [work](/work/) and [x](/notes/).";
  assert.deepEqual(extractForwardLinks(body), []);
});

test("extractForwardLinks: ignores bare anchor links", () => {
  const body = "See [this section](#introduction).";
  assert.deepEqual(extractForwardLinks(body), []);
});

test("extractForwardLinks: tolerates a trailing #anchor and deduplicates", () => {
  const body = "[a](/notes/primes/) and [b](/notes/primes/#top) both point to primes.";
  assert.deepEqual(extractForwardLinks(body), ["primes"]);
});

test("buildBacklinksMap: produces the inverse graph keyed by slug", () => {
  const notes = [
    { slug: "iterflow", title: "Iterflow", content: "Mentions [auxetics](/notes/auxetics/)." },
    { slug: "auxetics", title: "Auxetics", content: "No links." },
    { slug: "primes", title: "Primes", content: "Also [iterflow](/notes/iterflow/) and [auxetics](/notes/auxetics/)." },
  ];
  const map = buildBacklinksMap(notes);
  assert.deepEqual(map["iterflow"].map((x) => x.slug).sort(), ["primes"]);
  assert.deepEqual(map["auxetics"].map((x) => x.slug).sort(), ["iterflow", "primes"]);
  assert.deepEqual(map["primes"] || [], []);
});

test("buildBacklinksMap: entries carry slug and title of the source note", () => {
  const notes = [
    { slug: "iterflow", title: "Iterflow", content: "[primes](/notes/primes/)" },
    { slug: "primes", title: "Primes", content: "" },
  ];
  const map = buildBacklinksMap(notes);
  assert.equal(map["primes"][0].slug, "iterflow");
  assert.equal(map["primes"][0].title, "Iterflow");
});

test("buildBacklinksMap: ignores self-links", () => {
  const notes = [{ slug: "primes", title: "Primes", content: "I link to [myself](/notes/primes/)." }];
  assert.deepEqual(buildBacklinksMap(notes)["primes"] || [], []);
});

test("buildGraph: nodes, undirected deduped edges, and degree", () => {
  const notes = [
    { slug: "a", title: "A", cat: "2", content: "[b](/notes/b/) and [b again](/notes/b/)" },
    { slug: "b", title: "B", cat: "3", content: "[a](/notes/a/)" }, // reciprocal — still one edge
    { slug: "c", title: "C", cat: "4", content: "no links" },
  ];
  const g = buildGraph(notes);
  assert.equal(g.nodes.length, 3);
  assert.equal(g.links.length, 1); // a-b collapsed to a single undirected edge
  const deg = Object.fromEntries(g.nodes.map((n) => [n.id, n.deg]));
  assert.deepEqual(deg, { a: 1, b: 1, c: 0 });
});

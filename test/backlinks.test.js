// test/backlinks.test.js — run with `node --test`
import test from "node:test";
import assert from "node:assert/strict";

import { extractForwardLinks, buildBacklinksMap } from "../src/_data/backlinks.js";

test("extractForwardLinks: finds /<id>/ style links in markdown", () => {
  const body = "See also [the primes note](/3-01/) and [iterflow](/2-05/).";
  assert.deepEqual(extractForwardLinks(body).sort(), ["2-05", "3-01"]);
});

test("extractForwardLinks: ignores external links", () => {
  const body = "External [link](https://example.com) and [another](http://foo.bar/).";
  assert.deepEqual(extractForwardLinks(body), []);
});

test("extractForwardLinks: ignores anchor links", () => {
  const body = "See [this section](#introduction).";
  assert.deepEqual(extractForwardLinks(body), []);
});

test("extractForwardLinks: deduplicates", () => {
  const body = "[a](/2-01/) and [b](/2-01/) both point to 2-01.";
  assert.deepEqual(extractForwardLinks(body), ["2-01"]);
});

test("buildBacklinksMap: produces the inverse graph", () => {
  const notes = [
    { id: "2-01", title: "Iterflow", content: "Mentions [auxetics](/2-02/)." },
    { id: "2-02", title: "Auxetics", content: "No links." },
    { id: "3-01", title: "Primes", content: "Also [iterflow](/2-01/) and [auxetics](/2-02/)." },
  ];
  const map = buildBacklinksMap(notes);
  assert.deepEqual(map["2-01"].map((x) => x.id).sort(), ["3-01"]);
  assert.deepEqual(map["2-02"].map((x) => x.id).sort(), ["2-01", "3-01"]);
  assert.deepEqual(map["3-01"] || [], []);
});

test("buildBacklinksMap: backlinks include title and id of the source note", () => {
  const notes = [
    { id: "2-01", title: "Iterflow", content: "[primes](/3-01/)" },
    { id: "3-01", title: "Primes", content: "" },
  ];
  const map = buildBacklinksMap(notes);
  assert.equal(map["3-01"][0].id, "2-01");
  assert.equal(map["3-01"][0].title, "Iterflow");
});

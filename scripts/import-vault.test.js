// scripts/import-vault.test.js
const test = require('node:test');
const assert = require('node:assert/strict');

const {
  slugify,
  extractLede,
  assignAutoId,
  transformFrontmatter,
} = require('./import-vault.js');

test('slugify: lowercases and dashes basic strings', () => {
  assert.equal(slugify('Hello World'), 'hello-world');
  assert.equal(slugify('Composable Streaming Statistics'), 'composable-streaming-statistics');
});

test('slugify: strips non-alphanumerics', () => {
  assert.equal(slugify('Dr. Naveen Bagalkot'), 'dr-naveen-bagalkot');
  assert.equal(slugify('what-is-aatp?'), 'what-is-aatp');
});

test('slugify: collapses repeated dashes', () => {
  assert.equal(slugify('foo  bar   baz'), 'foo-bar-baz');
  assert.equal(slugify('a -- b'), 'a-b');
});

test('extractLede: returns the first ~140 chars of the first paragraph', () => {
  const body = 'This is the first paragraph with some real content.\n\nAnd a second paragraph.';
  assert.equal(extractLede(body), 'This is the first paragraph with some real content.');
});

test('extractLede: strips markdown syntax from the lede', () => {
  const body = 'A **bold** word and a [link](/foo) and _italic_ text.';
  assert.equal(extractLede(body), 'A bold word and a link and italic text.');
});

test('extractLede: skips images and HTML at the top of a note', () => {
  const body = '<img src="/foo.jpg" alt="cover"/>\n\n_Caption_\n\nReal first paragraph starts here.';
  assert.equal(extractLede(body), 'Real first paragraph starts here.');
});

test('extractLede: skips multi-line html figure blocks', () => {
  const body = '<figure>\n  <img src="/foo.jpg"/>\n</figure>\n\nReal first paragraph.';
  assert.equal(extractLede(body), 'Real first paragraph.');
});

test('extractLede: strips leading markdown heading marker', () => {
  const body = '# My Note Title\n\nThe real body begins after the heading.';
  assert.equal(extractLede(body), 'My Note Title');
});

test('extractLede: truncates at ~140 chars with an ellipsis', () => {
  const long = 'x'.repeat(200);
  const result = extractLede(long);
  assert.ok(result.length <= 141, 'result should be <=141 chars');
  assert.ok(result.endsWith('…'), 'result should end with ellipsis');
});

test('assignAutoId: gives sequential 2-digit IDs within a root', () => {
  assert.equal(assignAutoId(2, 0), '2-01');
  assert.equal(assignAutoId(2, 1), '2-02');
  assert.equal(assignAutoId(3, 14), '3-15');
});

test('transformFrontmatter: preserves title and date, injects id/root/slug, strips layout', () => {
  const input = {
    title: 'Primes',
    date: '2013-03-05',
    layout: 'base.njk',
  };
  const out = transformFrontmatter(input, { id: '3-05', root: 3, slug: 'primes' });
  assert.equal(out.title, 'Primes');
  assert.equal(out.date, '2013-03-05');
  assert.equal(out.id, '3-05');
  assert.equal(out.root, 3);
  assert.equal(out.slug, 'primes');
  assert.equal(out.layout, undefined, 'legacy layout field should be stripped');
});

test('transformFrontmatter: copies optional profile_url for people notes', () => {
  const input = { title: 'Lena Heubusch', date: '2023-11-06' };
  const out = transformFrontmatter(input, {
    id: '5-01',
    root: 5,
    slug: 'lena-heubusch',
    profile_url: 'https://lenaheubusch.com',
  });
  assert.equal(out.profile_url, 'https://lenaheubusch.com');
});

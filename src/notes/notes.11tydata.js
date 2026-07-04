// src/notes/notes.11tydata.js
// Directory data file — applies to every .md in src/notes/.
export default {
  layout: "note.njk",
  tags: ["note"],
  permalink: function (data) {
    return `/notes/${data.slug}/`;
  },
  eleventyComputed: {
    noteBacklinks: function (data) {
      const key = (data.id || "").replace(/\//g, "-");
      return (data.backlinks && data.backlinks[key]) || [];
    },
  },
};

// src/notes/notes.11tydata.js
// Directory data file — applies to every .md in src/notes/.
module.exports = {
  layout: 'note.njk',
  tags: ['note'],
  permalink: function(data) {
    return `/${data.id.replace(/\//g, '-')}/`;
  },
};

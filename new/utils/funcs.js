'use strict';

function slugify(str) {
  return str.replace(/[^\w-.]/g, '_');
}

module.exports = {
  slugify,
};

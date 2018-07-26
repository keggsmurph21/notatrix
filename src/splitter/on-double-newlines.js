'use strict';

const _ = require('underscore');
const re = require('../utils/regex');

module.exports = (text, options={}) => {

  options = _.defaults(options, {
    trimChunks: true
  });

  return text.split(re.doubleNewlines).map(chunk => {
    if (options.trimChunks) {
      return chunk.trim();
    } else {
      return chunk;
    }
  });
};

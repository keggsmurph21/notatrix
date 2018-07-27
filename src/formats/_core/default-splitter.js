'use strict';

const _ = require('underscore');
const utils = require('../../utils');

module.exports = (text, options={}) => {

  options = _.defaults(options, {
    trimChunks: true
  });

  return text.split(utils.utils.re.doubleNewlines).map(chunk => {
    if (options.trimChunks) {
      return chunk.trim();
    } else {
      return chunk;
    }
  });
};

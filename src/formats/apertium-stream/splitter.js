'use strict';

const SplitterError = require('../../errors').SplitterError;

module.exports = (text, options) => {
  throw new SplitterError('not implemented', text, options);
};

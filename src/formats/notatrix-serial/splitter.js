'use strict';

const SplitterError = require('../../errors').SplitterError;

module.exports = (text, options) => {
  throw new SplitterError('Can\'t split notatrix serial', text, options);
};

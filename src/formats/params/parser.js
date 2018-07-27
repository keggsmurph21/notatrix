'use strict';

const _ = require('underscore');

const nx = require('../../nx');
const utils = require('../../utils');
const ParserError = utils.ParserError;
const detect = require('./detector');

module.exports = (text, options) => {

  try {
    detect(text, options);
  } catch (e) {
    if (e instanceof utils.DetectorError)
      throw new ParserError(e.message);

    throw e;
  }

  return {
    input: text,
    options: options,
    comments: [],
    tokens: text,
  };
};

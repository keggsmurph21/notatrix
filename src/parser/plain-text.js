'use strict';

const ParserError = require('../errors').ParserError;

const _ = require('underscore');
const re = require('../utils/regex');
const funcs = require('../utils/funcs');

module.exports = (text, options) => {

  options = _.defaults(options, {
    allowEmptyString: false,
    allowNewlines: false,
    bracketsAllowanceTreshold: 0.2, // set to <0 or >1 to avoid
  });

  if (!text && !options.allowEmptyString)
    throw new ParserError(`Illegal plain text: empty string`, text, options);

  if (funcs.isJSONSerializable(text))
    throw new ParserError(`Illegal plain text: JSON object`, text, options);

  if (/\n/.test(text) && !options.allowNewlines)
    throw new ParserError(`Illegal plain text: contains newlines`, text, options);

  if (options.bracketsAllowanceTreshold >= 0) {

    const numWords = text.split(re.whitespace).length;
    const numBrackets = (text.match(/[\[\]]/g) || []).length;
    const ratio = numBrackets / numWords;

    if (ratio > options.bracketsAllowanceTreshold)
      throw new ParserError(`Illegal plain text: contains too many brackets (${ratio})`, text, options);
  }

  return 'plain text';
};

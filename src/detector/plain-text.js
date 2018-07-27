'use strict';

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
    return undefined;

  if (funcs.isPlainObjOrStringified(text))
    return undefined;

  if (/\n/.test(text) && !options.allowNewlines)
    return undefined;

  if (options.bracketsAllowanceTreshold >= 0) {

    const numWords = text.split(re.whitespace).length;
    const numBrackets = (text.match(/[\[\]]/g) || []).length;

    if (numBrackets / numWords > options.bracketsAllowanceTreshold)
      return undefined;
  }

  return 'plain text';
};

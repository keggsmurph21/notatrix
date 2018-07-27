'use strict';

const _ = require('underscore');
const re = require('../utils/regex');
const funcs = require('../utils/funcs');

module.exports = (text, options) => {

  options = _.defaults(options, {
    allowEmptyString: false,
    allowTrailingWhitespace: true,
    allowLeadingWhitespace: true,
    allowNoDependencies: false,
    allowNewlines: false,
  });

  if (!text && !options.allowEmptyString)
    return undefined;

  if (funcs.isPlainObjOrStringified(text))
    return undefined;

  if (/\n/.test(text) && !options.allowNewlines)
    return undefined;

  // internal stuff
  let isBrackets = true;
  let parsing = null;
  let depth = 0;
  let sawBracket = false;

  text.split('').forEach((char, i) => {

    if (!isBrackets)
      return;

    switch (char) {

      case ('['):
        if (parsing === ']')
          isBrackets = false;

        sawBracket = true;
        depth += 1;
        break;

      case (']'):
        if (parsing === '[')
          isBrackets = false;

        sawBracket = true;
        depth -= 1;
        break;

      case (' '):
      case ('\t'):
      case ('\n'):

        if (!options.allowLeadingWhitespace) {
          if (parsing !== null && !re.whitespace.test(parsing))
            isBrackets = false;
        }
        break;
    }
    parsing = char;

  });

  if (!sawBracket && !options.allowNoDependencies)
    isBrackets = false;

  if (depth !== 0)
    isBrackets = false;

  if (re.whitespace.test(parsing) && !options.allowTrailingWhitespace)
    isBrackets = false;

  return isBrackets ? 'Brackets' : undefined;
};

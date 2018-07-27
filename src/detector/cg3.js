'use strict';

const _ = require('underscore');
const re = require('../utils/regex');
const funcs = require('../utils/funcs');

module.exports = (text, options) => {

  options = _.defaults(options, {
    allowEmptyString: false,
    allowTrailingWhitespace: true,
    allowLeadingWhitespace: true
  });

  if (!text && !options.allowEmptyString)
    return undefined;

  if (funcs.isPlainObjOrStringified(text))
    return undefined;

  // internal stuff
  let isCG3 = true;
  let parsing = null;

  // iterate over the lines and check each one
  text.split(/\n/).forEach(line => {

    if (!isCG3)
      return;

    if (re.whiteline.test(line)) {

      if (parsing === null) {

        if (!options.allowLeadingWhitespace)
          isCG3 = false;

      } else {

        if (parsing !== 'token-body' || !options.allowTrailingWhitespace)
          isCG3 = false;

      }

      parsing = 'whitespace';

    } else if (re.comment.test(line)) {

      if ( parsing === 'token-start'
        || parsing === 'token-body')
        isCG3 = false;

      parsing = 'comment';

    } else if (re.cg3TokenStart.test(line)) {

      if (parsing === 'token-start')
        isCG3 = false;

      parsing = 'token-start';

    } else if (re.cg3TokenContent.test(line)) {

      if ( parsing === 'comment'
        || parsing === 'whitespace')
        isCG3 = false;

      parsing = 'token-body';

    } else {

      isCG3 = false;

    }
  });

  return isCG3 ? 'CG3' : undefined;
};

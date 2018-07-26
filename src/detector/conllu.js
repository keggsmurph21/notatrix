'use strict';

const _ = require('underscore');
const re = require('../utils/regex');

module.exports = (text, options) => {

  options = _.defaults(options, {
    allowEmptyString: false,
    requireTenParams: false,
    allowTrailingEmptyLines: true,
  });

  // be more or less strict about the fields we require being set
  const tokenLine = options.requireTenParams
    ? re.conlluTokenLineTenParams
    : re.conlluTokenLine;

  // internal stuff
  let isConllu = true;
  let doneComments = false;
  let doneContent = false;

  // iterate over the lines and check each one
  const lines = text.split(/\n/);
  lines.forEach((line, i) => {
    if (re.comment.test(line)) {

      // can only have comments at the beginning
      if (doneComments)
        isConllu = false;

    } else {

      // done parsing comments
      doneComments = true;

      if (line) {
        if (!tokenLine.test(line))
          isConllu = false;

        if (doneContent)
          isConllu = false;

      } else {

        // only allow empty lines after we've looked at all the content
        if (!options.allowTrailingEmptyLines)
          isConllu = false;

        doneContent = true;
      }

    }
  });

  if (!text && !options.allowEmptyString)
    return undefined;

  return isConllu ? 'CoNLL-U' : undefined;
};

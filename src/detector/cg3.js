'use strict';

const _ = require('underscore');
const re = require('../utils/regex');

module.exports = (text, options) => {

  options = _.defaults(options, {
    allowEmptyString: false,
    allowTrailingEmptyLines: true,
  });

  // be more or less strict about the fields we require being set
  //const tokenLine = re.cg3TokenLine;

  // internal stuff
  let isCG3 = true;
  let doneComments = false;
  let doneContent = false;

  // iterate over the lines and check each one
  text.split(/\n/).forEach(line => {
    if (re.comment.test(line)) {

      // can only have comments at the beginning
      if (doneComments)
        isCG3 = false;

    } else {

      // done parsing comments
      doneComments = true;

      /*
      if (line) {
        //if (!tokenLine.test(line))
          //isCG3 = false;

        if (doneContent)
          isCG3 = false;

      } else {

        // only allow empty lines after we've looked at all the content
        if (!options.allowTrailingEmptyLines)
          isCG3 = false;

        doneContent = true;
      }
      */

    }
  });

  if (!text && !options.allowEmptyString)
    return undefined;

  return isCG3 ? 'CG3' : undefined;
};

/*
if (word.match(/^\W*[\'|\"]</)) {
  format = 'CG3';

*/

'use strict';

const _ = require('underscore');
const re = require('../utils/regex');
const funcs = require('../utils/funcs');

module.exports = (text, options) => {

  options = _.defaults(options, {
    allowEmptyString: false,
    allowLeadingWhitespace: true,
    allowBookendWhitespace: true,
    allowTrailingWhitespace: true,
    allowNoDependencies: false,
  });

  if (!text && !options.allowEmptyString)
    return undefined;

  if (funcs.isPlainObjOrStringified(text))
    return undefined;

  // be more or less strict about whitespace
  const dependencyRegex = options.allowBookendWhitespace
    ? re.sdDependency
    : re.sdDependencyNoWhitespace;

  // internal stuff
  let isSD = true;
  let parsingDeps = false;
  let parsingWhitespace = false;
  let parsedDeps = 0;

  const lines = text.split(/\n/);
  lines.forEach((line, i) => {

    if (!isSD)
      return;

    if (re.whiteline.test(line)) {
      if (parsingDeps) {
        if (!options.allowTrailingWhitespace)
          isSD = false;
      } else {
        if (!options.allowLeadingWhitespace)
          isSD = false;
      }
    }

    if (re.comment.test(line)) {

    } else if (!parsingDeps) {

      if (dependencyRegex.test(line))
        isSD = false;

      parsingDeps = true;

    } else if (!dependencyRegex.test(line)) {

      isSD = false;

    } else {

      parsedDeps += 1;

    }
  });

  if (parsedDeps === 0 && !options.allowNoDependencies)
    isSD = false;

  return isSD ? 'SD' : undefined;
};

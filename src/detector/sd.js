'use strict';

const DetectorError = require('../errors').DetectorError;

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
    throw new DetectorError(`Illegal SD: empty string`, text, options);

  if (funcs.isJSONSerializable(text))
    throw new DetectorError(`Illegal SD: JSON object`, text, options);

  // be more or less strict about whitespace
  const dependencyRegex = options.allowBookendWhitespace
    ? re.sdDependency
    : re.sdDependencyNoWhitespace;

  // internal stuff
  let parsingDeps = false;
  let parsingWhitespace = false;
  let parsedDeps = 0;

  const lines = text.split(/\n/);
  lines.forEach((line, i) => {

    if (re.whiteline.test(line)) {
      if (parsingDeps) {
        if (!options.allowTrailingWhitespace)
          throw new DetectorError(`Illegal SD: contains trailing whitespace`, text, options);

      } else {
        if (!options.allowLeadingWhitespace)
          throw new DetectorError(`Illegal SD: contains leading whitespace`, text, options);

      }
    }

    if (re.comment.test(line)) {

    } else if (!parsingDeps) {

      if (dependencyRegex.test(line))
        throw new DetectorError(`Illegal SD: missing text line`, text, options);

      parsingDeps = true;

    } else if (!dependencyRegex.test(line)) {

      throw new DetectorError(`Illegal SD: expected dependency line`, text, options);

    } else {

      parsedDeps += 1;

    }
  });

  if (parsedDeps === 0 && !options.allowNoDependencies)
    throw new DetectorError(`Illegal SD: contains no dependencies`, text, options);

  return 'SD';
};

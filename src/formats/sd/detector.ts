"use strict";

import * as _ from "underscore";

import {DetectorError, isJSONSerializable, RE} from "utils";
import {SentenceOptions} from "nx/sentence";

export default function(text: string, options: SentenceOptions): string {
  options = _.defaults(options, {
    allowEmptyString: false,
    allowLeadingWhitespace: true,
    allowBookendWhitespace: true,
    allowTrailingWhitespace: true,
    allowNoDependencies: false,
  });

  if (!text && !options.allowEmptyString)
    throw new DetectorError(`Illegal SD: empty string`, text, options);

  if (isJSONSerializable(text))
    throw new DetectorError(`Illegal SD: JSON object`, text, options);

  // be more or less strict about whitespace
  const dependencyRegex = options.allowBookendWhitespace
                              ? RE.sdDependency
                              : RE.sdDependencyNoWhitespace;

  // internal stuff
  let parsingDeps = false;
  let parsingWhitespace = false;
  let parsedDeps = 0;

  const lines = text.split(/\n/);
  lines.forEach((line, i) => {
    if (RE.whiteline.test(line)) {
      if (parsingDeps) {
        if (!options.allowTrailingWhitespace)
          throw new DetectorError(`Illegal SD: contains trailing whitespace`,
                                  text, options);

      } else {
        if (!options.allowLeadingWhitespace)
          throw new DetectorError(`Illegal SD: contains leading whitespace`,
                                  text, options);
      }
    }

    if (RE.comment.test(line)) {
    } else if (!parsingDeps) {
      if (dependencyRegex.test(line))
        throw new DetectorError(`Illegal SD: missing text line`, text, options);

      parsingDeps = true;

    } else if (!dependencyRegex.test(line)) {
      throw new DetectorError(`Illegal SD: expected dependency line`, text,
                              options);

    } else {
      parsedDeps += 1;
    }
  });

  if (parsedDeps === 0 && !options.allowNoDependencies)
    throw new DetectorError(`Illegal SD: contains no dependencies`, text,
                            options);

  return "SD";
};

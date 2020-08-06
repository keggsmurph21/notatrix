"use strict";

import * as _ from "underscore";

import {GeneratorError, RE} from "utils";
import {Sentence, SentenceOptions, SentenceSerial} from "nx/sentence";
import {Token} from "nx/token";
import getLoss from "./get-loss";

interface Generated {
  output: string;
  loss: string[];
}

export default function(sent: Sentence, options: SentenceOptions): Generated {
  if (!sent.isParsed)
    return {
      output: null,
      loss: undefined,
    };

  if (!sent || sent.className !== "Sentence")
    throw new GeneratorError(`Unable to generate, input not a Sentence`, sent,
                             options);

  options = _.defaults(options, sent.options,
                       {

                       });

  sent.index();

  const output =
      sent.tokens
          .map(token => {
            return token.isSuperToken
                       ? (token as Token)
                             .subTokens.map(subToken => subToken.value)
                             .join(" ")
                       : token.form;
          })
          .join(" ")
          .replace(RE.spaceBeforePunctuation, "$1");

  return {
    output: output,
    loss: getLoss(sent),
  };
};

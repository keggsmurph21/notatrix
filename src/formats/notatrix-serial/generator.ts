"use strict";

import * as _ from "underscore";

import {GeneratorError} from "utils";
import {Sentence, SentenceOptions, SentenceSerial} from "nx/sentence";
import getLoss from "./get-loss";

interface Generated {
  output: SentenceSerial;
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

  return {
    output: sent.serialize(),
    loss: getLoss(sent),
  };
};

"use strict";

import * as _ from "underscore";

import {C, GeneratorError} from "utils";
import {Sentence, SentenceOptions, SentenceSerial} from "nx/sentence";
import {Token} from "nx/token";
import getLoss from "./get-loss";

interface Generated {
  output: any;
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

  const output = sent.tokens.map((token: Token) => {
    if (token.analysis)
      throw new GeneratorError(
          "Unable to generate, contains ambiguous analyses or multiword tokens",
          sent, options);

    let params: any = {};
    C.fields.forEach(field => {
      // @ts-ignore: 7053
      params[field] = token[field];
    });
    params.head = token.getHead(null);

    return _.pick(params, (value: any) => value != undefined);
  });

  return {
    output: output,
    loss: getLoss(sent),
  };
};

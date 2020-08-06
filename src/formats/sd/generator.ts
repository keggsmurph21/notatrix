"use strict";

import * as _ from "underscore";

import {GeneratorError} from "utils";
import {Sentence, SentenceOptions, SentenceSerial} from "nx/sentence";
import {Token} from "nx/token";
import getLoss from "./get-loss";
import generateText from "../plain-text/generator";

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

  let lines = [];
  sent.comments.forEach(comment => { lines.push("# " + comment.body); });

  lines.push(generateText(sent, {}).output);

  [sent.root].concat(sent.tokens).forEach(token => {
    token.mapDependents(dependent => {
      lines.push(
          `${dependent.deprel || "_"}(${token.form}, ${dependent.token.form})`);
    });
  });

  /*
  sent.root.mapDependents(dependent => lines.push(`${dependent.deprel}(${})`))
  if (sent.root)
    lines.push(`root(ROOT, ${sent.root.form})`);

  sent.tokens.forEach(token => {

    if (token._head && token.deprel && token._head.className !== 'RootToken')
      lines.push(`${token.deprel}(${token._head.form}, ${token.form})`);

  });
  */

  return {
    output: lines.join("\n"),
    loss: getLoss(sent),
  };
};

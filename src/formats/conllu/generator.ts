"use strict";

import * as _ from "underscore";

import {C, GeneratorError} from "utils";
import {Sentence, SentenceOptions} from "nx/sentence";
import {BaseToken} from "nx/base-token";
import {Token} from "nx/token";
import getLoss from "./get-loss";

interface Generated {
  output: string;
  loss: string[];
}

function toString(token: BaseToken): string {
  const head = !token.isEmpty && token.heads.first;

  return [

    token.indices.conllu,
    token.form || C.fallback,
    token.lemma || C.fallback,
    token.upostag || C.fallback,
    token.xpostag || C.fallback,
    token.feats || C.fallback,
    head ? head.token.indices.conllu : C.fallback,
    head && head.deprel ? head.deprel : C.fallback,
    token._getDeps("CoNLL-U").join("|") || C.fallback,
    token.misc || C.fallback,

  ].join("\t");
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

  let lines: string[] = [];
  sent.comments.forEach(comment => { lines.push("# " + comment.body); });
  sent.tokens.forEach(token => {
    lines.push(toString(token));
    (token as Token) // oof
        .subTokens.forEach(subToken => { lines.push(toString(subToken)); });
  });

  return {
    output: lines.join("\n"),
    loss: getLoss(sent),
  };
}

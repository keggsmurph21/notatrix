"use strict";

import * as _ from "underscore";

import {C, GeneratorError, thin} from "utils";
import {Sentence, SentenceOptions} from "nx/sentence";
import {BaseToken} from "nx/base-token";
import getLoss from "./get-loss";

interface Generated {
  output: string;
  loss: string[];
}

function isSet(field: string): string|null {
  return field && field !== C.fallback ? field : null;
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

  options = _.defaults(options, sent.options, {
    omitIndices: false,
    allowMissingLemma: true,
  });

  sent.index();

  let lines: string[] = [];
  sent.comments.forEach(comment => lines.push("# " + comment.body));
  sent.tokens.forEach(token => {
    function push(token: BaseToken, indent: number): void {
      if (!token.lemma && !options.allowMissingLemma)
        throw new GeneratorError(`Unable to generate, token has no lemma`, sent,
                                 options);

      const head = token.heads.first;
      const dependency =
          options.omitIndices
              ? null
              : "#" + token.indices.cg3 + "->" +
                    (head == undefined ? "" : head.token.indices.cg3);

      let line =
          [`"${isSet(token.lemma) || isSet(token.form) || C.fallback}"`]
              .concat(isSet(token.xpostag) || isSet(token.upostag))
              .concat((token._feats || []).join(" "))
              .concat((token._misc || []).join(" "))
              .concat(head && isSet(head.deprel) ? "@" + head.deprel : null)
              .concat(dependency);

      const indentStr = (token.semicolon ? ";" : "") + "\t".repeat(indent);
      lines.push(indentStr + line.filter(thin).join(" "));
    };

    lines.push(`"<${token.form || C.fallback}>"`);

    if (token._analyses && token._analyses.length) {
      token._analyses.forEach(analysis => {
        analysis.subTokens.forEach((subToken, i) => { push(subToken, i + 1); });
      });

    } else {
      push(token, 1);
    }
  });

  return {
    output: lines.join("\n"),
    loss: getLoss(sent),
  };
};

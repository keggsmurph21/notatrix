"use strict";

import * as _ from "underscore";

import {GeneratorError} from "utils";
import {Sentence, SentenceOptions} from "nx/sentence";
import {BaseToken} from "nx/base-token";
import getLoss from "./get-loss";

interface Generated {
  output: string;
  loss: string[];
}

interface Node {
  token: BaseToken;
  deprel?: string|null;
  deps: Node[];
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

  if (!sent.root)
    throw new GeneratorError("Unable to generate, could not find root", sent,
                             options);

  // build the tree structure
  let seen = new Set([sent.root]);
  let root: Node = {
    token: sent.root,
    deprel: null,
    deps: [],
  };

  function visit(node: Node): void {
    node.token.mapDependents(tokenDep => {
      if (seen.has(tokenDep.token))
        throw new GeneratorError(
            "Unable to generate, dependency structure non-linear", sent,
            options);

      let dep: Node = {deps: [], token: tokenDep.token};
      node.deps.push(dep);
      seen.add(dep.token);
      visit(dep);
    });
  }
  visit(root);

  // console.log(root);

  if (seen.size < sent.size + 1)
    throw new GeneratorError("Unable to generate, sentence not fully connected",
                             sent, options);

  // parse the tree into a string
  let output = "";
  function walk(node: Node): void {
    output += "[" + (node.deprel || "_") + " ";

    node.deps.forEach(dep => {
      if (dep.token.indices.absolute < node.token.indices.absolute)
        walk(dep);
    });

    output += " " + node.token.form + " ";

    node.deps.forEach(dep => {
      if (dep.token.indices.absolute > node.token.indices.absolute)
        walk(dep);
    });

    output += " ] ";
  };
  root.deps.forEach(dep => walk(dep));

  // clean up the output
  output = output.replace(/\s+/g, " ")
               .replace(/ \]/g, "]")
               .replace(/\[ /g, "[")
               .replace(/(\w)_(\w)/, "$1 $2")
               .trim();

  // console.log(output);

  return {
    output: output,
    loss: getLoss(sent),
  };
};

"use strict";

import * as _ from "underscore";

import {DetectorError, ParserError, thin, RE} from "utils";
import detect from "./detector";
import parseText from "../plain-text/parser";
import {SentenceOptions, SentenceSerial} from "nx/sentence";
import {TokenSerial} from "nx/base-token";

interface Chunk {
  type: string;
  body?: string;
  deprel?: string;
  head?: string;
  dep?: string;
}

function getTokenIndexFromString(tokens: TokenSerial[], token: string): number|
    null {
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].form.toLowerCase() === token.toLowerCase())
      return i;
  }

  return null;
}

export default function(text: string,
                        options: SentenceOptions): SentenceSerial {

  // console.log();
  // console.log(text);

  options = _.defaults(options, {
    allowEmptyString: false,
    allowBookendWhitespace: true,
    allowWhiteLines: true,
  });

  try {
    detect(text, options);
  } catch (e) {
    if (e instanceof DetectorError)
      throw new ParserError(e.message, text, options);

    throw e;
  }

  const lines = text.split("\n");
  const depRegex = options.allowBookendWhitespace ? RE.sdDependencyNoWhitespace
                                                  : RE.sdDependency;

  let chunks: Chunk[] = [];
  lines.forEach(line => {
    const whiteline = line.match(RE.whiteline),
          comment = line.match(RE.comment), dep = line.match(depRegex);

    if (whiteline) {
    } else if (comment) {
      chunks.push({type: "comment", body: comment[2]});

    } else if (dep) {
      chunks.push(
          {type: "dependency", deprel: dep[1], head: dep[2], dep: dep[3]});

    } else {
      chunks.push({
        type: "text",
        body: line,
      });
    }
  });

  // console.log(chunks);

  let tokens: TokenSerial[];
  let comments: string[] = [];
  let expecting = ["comment", "text"];

  chunks.forEach(chunk => {
    if (expecting.indexOf(chunk.type) === -1)
      throw new ParserError(
          `expecting ${expecting.join("|")}, got ${chunk.type}`, text, options);

    if (chunk.type === "comment") {
      comments.push(chunk.body);
      expecting = ["comment", "text"];

    } else if (chunk.type === "text") {
      tokens = parseText(chunk.body, {}).tokens;
      expecting = ["dependency"];

    } else if (chunk.type === "dependency") {
      let index = getTokenIndexFromString(tokens, chunk.dep);
      if (index === null)
        throw new ParserError(`unable to find token with form ${chunk.dep}`,
                              text, options);

      tokens[index].heads = [{
        index: getTokenIndexFromString(tokens, chunk.head).toString(),
        deprel: chunk.deprel,
      }];
      expecting = ["dependency"];

    } else {
      throw new ParserError(`unrecognized chunk type: ${chunk.type}`, text,
                            options);
    }
  });

  // console.log(comments);
  // console.log(tokens);

  return {
    input: text,
    options: options,
    comments: comments,
    tokens: tokens,
  };
};

"use strict";

import * as _ from "underscore";

import {DetectorError, ParserError, thin, RE} from "utils";
import detect from "./detector";
import {SentenceOptions, SentenceSerial} from "nx/sentence";
import {TokenSerial} from "nx/base-token";

interface Indices {
  major: number;
  minor: number|null;
}

function parseIndex(str: string): Indices {
  const match = (str || "").match(RE.conlluEmptyIndex);
  if (!match)
    return null;

  if (match[2]) {
    return {
      major: parseInt(match[1]),
      minor: parseInt(match[2].slice(1)),
    };
  }
  return {
    major: parseInt(match[1]),
    minor: null,
  };
}

function assertNext(supStr: string, subStr: string, text: string,
                    options: SentenceOptions): void {
  if (supStr === null)
    return;

  const sup = parseIndex(supStr);
  const sub = parseIndex(subStr);

  if (sub.minor === null) {
    if (sub.major - sup.major !== 1)
      throw new ParserError(
          `unexpected token index (at: ${sup.major}${
              sup.minor === null ? "" : "." + sup.minor}, got: ${sup.major}${
              sup.minor === null ? "" : "." + sup.minor})`,
          text, options);

  } else if (sup.minor === null) {
    if (sub.minor !== 1)
      throw new ParserError(
          `unexpected token index (at: ${sup.major}${
              sup.minor === null ? "" : "." + sup.minor}, got: ${sup.major}${
              sup.minor === null ? "" : "." + sup.minor})`,
          text, options);

  } else {
    if (sub.minor - sup.minor !== 1)
      throw new ParserError(
          `unexpected token index (at: ${sup.major}${
              sup.minor === null ? "" : "." + sup.minor}, got: ${sup.major}${
              sup.minor === null ? "" : "." + sup.minor})`,
          text, options);
  }
}

interface Head {
  deprel: string;
  index: string;
}

function getHeads(isEmpty: boolean, head: string, deprel: string,
                  deps: string): Head[]|null {
  head = RE.fallback.test(head) ? null : head;
  deprel = RE.fallback.test(deprel) ? null : deprel;
  deps = RE.fallback.test(deps) ? null : deps;

  let heads: Head[] = [];
  let seen: Set<string> = new Set();

  if (head && !isEmpty) {
    heads.push({
      index: head,
      deprel: deprel || null,
    });
    seen.add(head);
  }

  if (deps) {
    deps.split("|").forEach(subDep => {
      const subDeps = subDep.split(":");

      if (!seen.has(subDeps[0]))
        heads.push({
          index: subDeps[0],
          deprel: subDeps[1] || null,
        });

      seen.add(subDeps[0]);
    });
  } else if (isEmpty) {
    // FIXME: Add this as a "strict mode" requirement?
    // throw new ParserError(`Missing "deps" for empty node:
    // ${line}`, text, options);
  }

  return heads.length ? heads : null;
}

interface Chunk {
  type: string;
  body?: string;
  isEmpty?: boolean;
  lemma?: string;
  upostag?: string;
  xpostag?: string;
  feats?: string[];
  heads?: Head[];
  index?: string;
  startIndex?: string;
  stopIndex?: string;
  form?: string;
  misc?: string[];
}

interface Analysis {
  subTokens: Token[];
}

interface Token {
  body?: string;
  isEmpty?: boolean;
  lemma?: string;
  upostag?: string;
  xpostag?: string;
  feats?: string[];
  heads?: Head[];
  index?: string;
  startIndex?: string;
  stopIndex?: string;
  form?: string;
  misc?: string[];
  currentIndex?: string;
  analyses?: Analysis[];
}

export default function(text: string,
                        options: SentenceOptions): SentenceSerial {
  options = _.defaults(options, {
    allowEmptyString: false,
    requireTenParams: false,
    allowWhiteLines: true,
    enhanced: false,
  });

  try {
    detect(text, options);
  } catch (e) {
    if (e instanceof DetectorError)
      throw new ParserError(e.message, text, options);

    throw e;
  }

  // console.log();
  // console.log(text);

  // "tokenize" into chunks
  let i = 0;
  let chunks: Chunk[] = [];
  const lines = text.split("\n");
  const tokenRegex = options.requireTenParams ? RE.conlluTokenLineTenParams
                                              : RE.conlluTokenLine;

  lines.forEach(line => {
    const whiteline = line.match(RE.whiteline);
    const comment = line.match(RE.comment);
    const tokenLine = line.match(tokenRegex);

    if (whiteline) {
    } else if (comment) {
      chunks.push({type: "comment", body: comment[2]});

    } else if (tokenLine) {
      let token;

      let fields: string[];
      let fieldStr = tokenLine[7];
      if (/(\t|[ ]{2,})/g.test(fieldStr)) {
        fields = fieldStr.replace(/[ ]{2,}/g, "\t").split(/\t/g).filter(thin);

      } else {
        fields = fieldStr.split(/[\t ]+/g).filter(thin);
      }

      if (tokenLine[4]) {
        token = {
          type: "super-token",
          index: tokenLine[1],
          startIndex: tokenLine[2],
          stopIndex: tokenLine[5],
          form: RE.fallback.test(fields[0]) ? null : fields[0],
          misc: RE.fallback.test(fields[8]) ? null : fields[8].split("|"),
        };

      } else {
        const isEmpty = !!tokenLine[3];
        if (isEmpty) {
          options.enhanced = true;
        }

        token = {
          type: "token",
          index: tokenLine[1],
          isEmpty: isEmpty,
          form: !fields[0] || RE.fallback.test(fields[0]) ? null : fields[0],
          lemma: !fields[1] || RE.fallback.test(fields[1]) ? null : fields[1],
          upostag: !fields[2] || RE.fallback.test(fields[2]) ? null : fields[2],
          xpostag: !fields[3] || RE.fallback.test(fields[3]) ? null : fields[3],
          feats: !fields[4] || RE.fallback.test(fields[4])
                     ? null
                     : fields[4].split("|"),
          heads: getHeads(isEmpty, fields[5], fields[6], fields[7]),
          misc: !fields[8] || RE.fallback.test(fields[8])
                    ? null
                    : fields[8].split("|"),
        };
      }
      chunks.push(token);

    } else {
      throw new ParserError(`unable to match line: ${line}`, text, options);
    }
  });

  // console.log(chunks);

  let tokens: Token[] = [];
  let comments: string[] = [];
  let expecting = ["comment", "super-token", "token"];
  let superToken: Token = null;

  chunks.filter(thin).forEach(chunk => {
    if (expecting.indexOf(chunk.type) === -1)
      throw new ParserError(
          `expecting ${expecting.join("|")}, got ${chunk.type}`, text, options);

    if (chunk.type === "comment") {
      comments.push(chunk.body);
      expecting = ["comment", "super-token", "token"];

    } else if (chunk.type === "super-token") {
      superToken = {
        form: chunk.form,
        misc: chunk.misc,
        analyses: [{subTokens: []}],
        index: chunk.index,
        currentIndex: null,
        stopIndex: chunk.stopIndex
      };

      expecting = ["token"];

    } else if (chunk.type === "token") {
      if (superToken) {
        assertNext(superToken.currentIndex, chunk.index, text, options);
        superToken.currentIndex = chunk.index;

        superToken.analyses[0].subTokens.push(_.omit(chunk, ["type"]));

        if (superToken.currentIndex === superToken.stopIndex) {
          tokens.push(_.omit(superToken, ["currentIndex", "stopIndex"]));
          superToken = null;
          expecting = ["super-token", "token"];

        } else {
          expecting = ["token"];
        }

      } else {
        tokens.push(_.omit(chunk, ["type"]));
        expecting = ["super-token", "token"];
      }

    } else {
      throw new ParserError(`unrecognized chunk type: ${chunk.type}`, text,
                            options);
    }
  });

  // console.log(comments);
  // console.log(tokens);

  let tokenIndex = 0;

  return {
    input: text,
    options: options,
    comments: comments,
    // ... oof
    tokens: tokens.map(token => {
      return {
        ...token,
        index: ++tokenIndex,
        analyses: token.analyses.map(analysis => {
          return {
            ...analysis, subTokens: analysis.subTokens.map(subToken => {
              return {
                ...subToken,
                index: ++tokenIndex,
              };
            }),
          }
        }),
      };
    }),
  };
};

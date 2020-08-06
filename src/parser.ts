"use strict";

import * as _ from "underscore";

import {ParserError, C, thin} from "utils";
import {SentenceOptions, SentenceSerial} from "nx/sentence";

import {parse as parseApertiumStream} from "formats/apertium-stream";
import {parse as parseBrackets} from "formats/brackets";
import {parse as parseCg3} from "formats/cg3";
import {parse as parseConllu} from "formats/conllu";
import {parse as parseNotatrixSerial} from "formats/notatrix-serial";
import {parse as parseParams} from "formats/params";
import {parse as parsePlainText} from "formats/plain-text";
import {parse as parseSd} from "formats/sd";

export const parseAs = {
  "apertium stream": parseApertiumStream,
  apertiumStream: parseApertiumStream,
  Brackets: parseBrackets,
  brackets: parseBrackets,
  CG3: parseCg3,
  cg3: parseCg3,
  "CoNLL-U": parseConllu,
  conllu: parseConllu,
  "notatrix serial": parseNotatrixSerial,
  notatrixSerial: parseNotatrixSerial,
  Params: parseParams,
  params: parseParams,
  "plain text": parsePlainText,
  plainText: parsePlainText,
  SD: parseSd,
  sd: parseSd,
};

export default function(serial: SentenceSerial|string,
                        options: SentenceOptions): SentenceSerial|
    SentenceSerial[] {
  const text = JSON.stringify(serial);
  options = _.defaults(options, {
    suppressDetectorErrors: true,
    suppressParserErrors: true,
    returnAllPossibilities: true,
    requireOne: false,
  });

  const possibilities =
      C.formats
          .map(format => {
            try {
              // @ts-ignore 7053
              return parseAs[format](serial, options);
            } catch (e) {
              if (e instanceof ParserError && options.suppressParserErrors)
                return;

              throw e;
            }
          })
          .filter(thin);

  if (!possibilities.length && !options.suppressDetectorErrors)
    throw new ParserError("Unable to detect format", text, options);

  if (options.requireOne && possibilities.length > 1)
    throw new ParserError("Unable to detect, ambiguous input", text, options);

  return options.returnAllPossibilities ? possibilities : possibilities[0];
}

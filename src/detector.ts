"use strict";

import * as _ from "underscore";

import {
  C,
  thin,
  DetectorError,
} from "utils";
import {SentenceOptions} from "nx/sentence";

import {detect as detectApertiumStream} from "formats/apertium-stream";
import {detect as detectBrackets} from "formats/brackets";
import {detect as detectCg3} from "formats/cg3";
import {detect as detectConllu} from "formats/conllu";
import {detect as detectNotatrixSerial} from "formats/notatrix-serial";
import {detect as detectParams} from "formats/params";
import {detect as detectPlainText} from "formats/plain-text";
import {detect as detectSd} from "formats/sd";

export const as = {
  "apertium stream": detectApertiumStream,
  apertiumStream: detectApertiumStream,
  Brackets: detectBrackets,
  brackets: detectBrackets,
  CG3: detectCg3,
  cg3: detectCg3,
  "CoNLL-U": detectConllu,
  conllu: detectConllu,
  "notatrix serial": detectNotatrixSerial,
  notatrixSerial: detectNotatrixSerial,
  Params: detectParams,
  params: detectParams,
  "plain text": detectPlainText,
  plainText: detectPlainText,
  SD: detectSd,
  sd: detectSd,
};

export default function(text: string, options: SentenceOptions): string|
    string[] {
  options = _.defaults(options, {
    suppressDetectorErrors: true,
    returnAllMatches: true,
    requireOneMatch: false,
  });

  const matches: any = C.formats
                           .map((format: string) => {
                             try {
                               // @ts-ignore 7053
                               return as [format](text, options);
                             } catch (e) {
                               if (e instanceof DetectorError)
                                 return;

                               throw e;
                             }
                           })
                           .filter(thin);

  if (!matches.length && !options.suppressDetectorErrors)
    throw new DetectorError("Unable to detect format", text, options);

  if (matches.length > 1 && !options.suppressDetectorErrors &&
      options.requireOneMatch)
    throw new DetectorError("Detected multiple formats", text, options);

  return options.returnAllMatches ? matches : matches[0];
}

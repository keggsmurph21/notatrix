"use strict";

import * as _ from "underscore";

import {thin, SplitterError} from "utils";
import {SentenceOptions} from "nx/sentence";
import detector from "./detector";

import defaultSplitter from "./formats/default-splitter";

import {split as splitApertiumStream} from "./formats/apertium-stream";
import {split as splitBrackets} from "./formats/brackets";
import {split as splitCg3} from "./formats/cg3";
import {split as splitConllu} from "./formats/conllu";
import {split as splitNotatrixSerial} from "./formats/notatrix-serial";
import {split as splitParams} from "./formats/params";
import {split as splitPlainText} from "./formats/plain-text";
import {split as splitSd} from "./formats/sd";

export const splitAs = {
  "apertium stream": splitApertiumStream,
  apertiumStream: splitApertiumStream,
  Brackets: splitBrackets,
  brackets: splitBrackets,
  CG3: splitCg3,
  cg3: splitCg3,
  "CoNLL-U": splitConllu,
  conllu: splitConllu,
  "notatrix serial": splitNotatrixSerial,
  notatrixSerial: splitNotatrixSerial,
  Params: splitParams,
  params: splitParams,
  "plain text": splitPlainText,
  plainText: splitPlainText,
  SD: splitSd,
  sd: splitSd,
};

export default function(text: string, options: SentenceOptions): string[] {
  let fromDefault = new Set();
  const splitAsDefault = defaultSplitter(text, options);
  splitAsDefault.forEach(line => {
    const formats = detector(line, options);
    if (formats instanceof Array)
      formats.forEach(format => fromDefault.add(format));
    else
      fromDefault.add(formats);
  });

  let fromPlainText = new Set();
  const splitAsPlainText = splitAs.plainText(text, options);
  splitAsPlainText.forEach((line: string) => {
    const formats = detector(line, options);
    if (formats instanceof Array)
      formats.forEach(format => fromPlainText.add(format));
    else
      fromPlainText.add(formats);
  });

  if (fromDefault.size !== 1 && fromPlainText.size === 1 &&
      fromPlainText.has("plain text")) {
    return splitAsPlainText;
  }

  return splitAsDefault;
}

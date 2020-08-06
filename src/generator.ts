"use strict";

import {generate as generateApertiumStream} from "formats/apertium-stream";
import {generate as generateBrackets} from "formats/brackets";
import {generate as generateCg3} from "formats/cg3";
import {generate as generateConllu} from "formats/conllu";
import {generate as generateNotatrixSerial} from "formats/notatrix-serial";
import {generate as generateParams} from "formats/params";
import {generate as generatePlainText} from "formats/plain-text";
import {generate as generateSd} from "formats/sd";

export const as = {
  "apertium stream": generateApertiumStream,
  apertiumStream: generateApertiumStream,
  Brackets: generateBrackets,
  brackets: generateBrackets,
  CG3: generateCg3,
  cg3: generateCg3,
  "CoNLL-U": generateConllu,
  conllu: generateConllu,
  "notatrix serial": generateNotatrixSerial,
  notatrixSerial: generateNotatrixSerial,
  Params: generateParams,
  params: generateParams,
  "plain text": generatePlainText,
  plainText: generatePlainText,
  SD: generateSd,
  sd: generateSd,
};

export default as;

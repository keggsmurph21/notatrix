/**
 * Supported output formats:
 *  * ApertiumStream (coming soon!)
 *  * Brackets
 *  * CG3
 *  * CoNLL-U
 *  * NotatrixSerial
 *  * Params
 *  * Plain text
 *  * SDParse
 */

import * as apertiumStream from "./apertium-stream";
import * as brackets from "./brackets";
import * as cg3 from "./cg3";
import * as conllu from "./conllu";
import * as notatrixSerial from "./notatrix-serial";
import * as params from "./params";
import * as plainText from "./plain-text";
import * as sd from "./sd";

export const formats = {
  "apertium stream": apertiumStream,
  apertiumStream,
  Brackets: brackets,
  brackets,
  CG3: cg3,
  cg3,
  "CoNLL-U": conllu,
  conllu,
  "notatrix serial": notatrixSerial,
  notatrixSerial,
  Params: params,
  params,
  "plain text": plainText,
  plainText,
  SD: sd,
  sd,
};

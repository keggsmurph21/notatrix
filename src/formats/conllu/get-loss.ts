"use strict";

import * as _ from "underscore";

import fields from "./fields";
import type {TokenSerial} from "nx/base-token";
import type {Sentence} from "nx/sentence";

function tokenCalcLoss(sent: Sentence, token: TokenSerial,
                       losses: Set<string>): void {
  if (token.heads.length > 1 && !sent.options.enhanced)
    losses.add("enhanced dependencies");

  Object.keys(_.omit(token, fields)).forEach(field => {
    switch (field) {
    case ("uuid"):
    case ("index"):
    case ("other"):
      break;

    case ("analyses"):
      if (token.analyses.length > 1) {
        losses.add("analyses");
      } else {
        const analysis = token.analyses[0],
              analysisKeys = Object.keys(analysis);

        if (analysisKeys.length > 1 || analysisKeys[0] !== "subTokens") {
          losses.add("analyses");
        } else {
          analysis.subTokens.map(t => tokenCalcLoss(sent, t, losses));
        }
      }
      break;

    default:
      losses.add(field);
    }
  });
}

export default function(sent: Sentence): string[] {
  const serial = sent.serialize();
  let losses: Set<string> = new Set();

  serial.tokens.map(t => tokenCalcLoss(sent, t, losses));

  return Array.from(losses);
};

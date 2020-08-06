"use strict";

import * as _ from "underscore";

import fields from "./fields";
import type {Sentence} from "nx/sentence";
import type {TokenSerial} from "nx/base-token";
import type {AnalysisSerial} from "nx/analysis";

function tokenCalcLoss(token: TokenSerial, losses: Set<string>): void {
  if (token.heads && token.heads.length > 1)
    losses.add("enhanced dependencies");

  Object.keys(_.omit(token, fields)).forEach(field => {
    switch (field) {
    case ("uuid"):
    case ("index"):
    case ("deps"):
    case ("feats"):
    case ("misc"):
      break;

    case ("upostag"):
      if (token.xpostag && token.upostag)
        losses.add(field);
      break;

    case ("isEmpty"):
      if (token.isEmpty)
        losses.add(field);
      break;

    default:
      losses.add(field);
    }
  });
}

export default function(sent: Sentence): string[] {
  const serial = sent.serialize();
  let losses: Set<string> = new Set();

  serial.tokens.map(token => {
    tokenCalcLoss(token, losses);

    (token.analyses || []).forEach((analysis: AnalysisSerial) => {
      const analysisKeys = Object.keys(analysis);
      if (analysisKeys.length > 1 || analysisKeys[0] !== "subTokens") {
        losses.add("analyses");
      } else {
        analysis.subTokens.map(subToken => {
          tokenCalcLoss(subToken, losses);

          if (subToken.form != undefined)
            losses.add("form");
        });
      }
    });
  });

  return Array.from(losses);
};

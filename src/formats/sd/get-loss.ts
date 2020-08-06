"use strict";

import * as _ from "underscore";

import fields from "./fields";
import type {Sentence} from "nx/sentence";

export default function(sent: Sentence): string[] {
  const serial = sent.serialize();
  let losses: Set<string> = new Set();

  serial.tokens.forEach(token => {
    if (token.heads && token.heads.length > 1)
      losses.add("enhanced dependencies");

    Object.keys(_.omit(token, fields)).forEach(field => {
      switch (field) {
      case ("uuid"):
      case ("index"):
      case ("deps"):
        break;

      case ("heads"):
        if (token.heads.length > 1)
          losses.add(field);
        break;

      case ("feats"):
      case ("misc"):
        if (token[field] && token[field].length)
          losses.add(field);
        break;

      default:
        // @ts-ignore 7053
        if (token[field])
          losses.add(field);
      }
    })
  });

  return Array.from(losses);
};

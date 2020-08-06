"use strict";

import * as _ from "underscore";

import fields from "./fields";
import type {Sentence} from "nx/sentence";

export default function(sent: Sentence): string[] {
  const serial = sent.serialize();
  let losses: Set<string> = new Set();

  if (serial.comments.length)
    losses.add("comments");

  serial.tokens.forEach(
      token => {Object.keys(_.omit(token, fields)).forEach(field => {
        switch (field) {
        case ("uuid"):
        case ("index"):
          break;

        case ("feats"):
        case ("misc"):
          if (token[field] && token[field].length)
            losses.add(field);
          break;

        case ("heads"):
          if (token.heads.length)
            losses.add("heads");
          break;

        default:
          // @ts-ignore: 7053
          if (token[field])
            losses.add(field);
        }
      })});

  return Array.from(losses);
};

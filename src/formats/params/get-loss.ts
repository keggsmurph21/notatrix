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

        case ("heads"):
          if (token.heads.length > 1)
            losses.add("enhanced dependencies");
          break;

        default:
          losses.add(field);
        }
      })});

  return Array.from(losses);
};

"use strict";

import * as _ from "underscore";

import fields from "./fields";
import type {Sentence} from "nx/sentence";

export default function(sent: Sentence): string[] {
  throw new Error("not implemented");
  const serial = sent.serialize();

  let losses: Set<string> = new Set();

  if (!fields.hasComments && serial.comments.length)
    losses.add("comments");

  serial.tokens.forEach(token => {
    Object.keys(_.omit(token, fields)).forEach(field => {
      switch (field) {
      case ("index"):
        break;

      default:
        losses.add(field);
      }
    });
  });

  return Array.from(losses);
};

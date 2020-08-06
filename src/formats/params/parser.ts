"use strict";

import * as _ from "underscore";

import {DetectorError, ParserError} from "utils";
import detect from "./detector";
import {Sentence, SentenceOptions, SentenceSerial} from "nx/sentence";

export default function(rawObj: any, options: SentenceOptions): SentenceSerial {
  try {
    detect(rawObj, options);
  } catch (e) {
    if (e instanceof DetectorError)
      throw new ParserError(e.message, rawObj.toString(), options);

    throw e;
  }

  if (typeof rawObj == "string") {
    // ... oof
    rawObj = JSON.parse(rawObj);
  }

  return {
    input: JSON.stringify(rawObj),
    options: options,
    comments: [],
    tokens: rawObj.map((token: any, i: any) => {
      token.index = `${i}`;
      return token;
    }),
  };
};

"use strict";

import * as _ from "underscore";

import {DetectorError, ParserError} from "utils";
import detect from "./detector";
import {Sentence, SentenceOptions, SentenceSerial} from "nx/sentence";

export default function(rawObj: SentenceSerial|string,
                        options: SentenceOptions): SentenceSerial {
  try {
    detect(rawObj, options);
  } catch (e) {
    if (e instanceof DetectorError)
      throw new ParserError(e.message, rawObj.toString(), options);

    throw e;
  }

  if (typeof rawObj == "string") {
    // ... oof
    return JSON.parse(rawObj);
  }

  return rawObj;
};

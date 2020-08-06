"use strict";

import * as _ from "underscore";

import {C, DetectorError, isJSONSerializable} from "utils";
import {SentenceOptions, SentenceSerial} from "nx/sentence";

export default function(rawObj: string[]|string,
                        options: SentenceOptions): string {
  options = _.defaults(options, {
    allowEmptyList: false,
    allowTrailingWhitespace: true,
    allowLeadingWhitespace: true
  });

  if (!isJSONSerializable(rawObj))
    throw new DetectorError(`Illegal Params: not JSON object`,
                            rawObj.toString(), options);

  const objs = typeof rawObj === "string" ? JSON.parse(rawObj) : rawObj;

  if (Array.isArray(objs)) {
    if (!objs.length && !options.allowEmptyList)
      throw new DetectorError(`Illegal Params: contains no tokens`,
                              rawObj.toString(), options);

    objs.forEach(obj => {
      const omitted = Object.keys(_.omit(obj, C.fields));
      if (omitted.length)
        throw new DetectorError(
            `Illegal Params: contains illegal keys (${omitted.join(", ")})`,
            rawObj.toString(), options);

      const picked = Object.keys(_.pick(obj, C.fields));
      if (!picked.length)
        throw new DetectorError(`Illegal Params: missing required keys`,
                                rawObj.toString(), options);
    });

  } else {
    throw new DetectorError(
        `Illegal Params: expected array of parameters, got ${typeof objs}`,
        rawObj.toString(), options)
  }

  return "Params";
};

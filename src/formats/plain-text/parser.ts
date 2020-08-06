"use strict";

import * as _ from "underscore";

import {DetectorError, ParserError, thin, RE} from "utils";
import detect from "./detector";
import {SentenceOptions, SentenceSerial} from "nx/sentence";

export default function(text: string,
                        options: SentenceOptions): SentenceSerial {
  options = _.defaults(options, {
    allowEmptyString: true,
  });

  text = text || "";

  try {
    detect(text, options);
  } catch (e) {
    if (e instanceof DetectorError)
      throw new ParserError(e.message, text, options);

    throw e;
  }

  // console.log();
  // console.log(text);

  let chunks = [];
  let word = "";

  _.each(text, (char, i) => {
    if (RE.whitespace.test(char)) {
      chunks.push(word);
      word = "";

    } else if (RE.punctuation.test(char)) {
      if (!RE.allPunctuation.test(word)) {
        chunks.push(word);
        word = "";
      }
      word += char;

    } else {
      word += char;
    }
  });

  chunks.push(word);

  // console.log(chunks);

  let tokens = chunks.filter(thin).map((chunk, i) => {
    return {
      form: chunk,
      index: i,
    };
  });

  // console.log(comments);
  // console.log(tokens);

  return {
    input: text,
    options: options,
    comments: [],
    tokens: tokens,
  };
};

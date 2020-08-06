"use strict";

import * as _ from "underscore";

import {SplitterError, thin, RE} from "utils";
import {SentenceOptions} from "nx/sentence";

export default function(text: string, options: SentenceOptions): string[] {
  options = _.defaults(options, {trimChunks: true});

  return text.split(RE.sentenceThenPunctuation)
      .map(chunk => {
        if (options.trimChunks) {
          return chunk.trim();
        } else {
          return chunk;
        }
      })
      .filter(thin);
};

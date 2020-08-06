"use strict";

import {SplitterError} from "utils";
import {SentenceOptions} from "nx/sentence";

export default function(text: string, options: SentenceOptions): string[] {
  throw new SplitterError("Can't split notatrix serial", text, options);
};

"use strict";

import {DetectorError} from "utils";
import {SentenceOptions} from "nx/sentence";

export default function(text: string, options: SentenceOptions): string {
  throw new DetectorError("not implemented", text, options);
}

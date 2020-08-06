"use strict";

export {default as fields} from "./fields";
export {default as split} from "../default-splitter";
export {default as detect} from "./detector";
export {default as parse} from "./parser";
export {default as generate} from "./generator";

export const name = "CoNNL-U";

/*
{
  semicolon: Boolean || undefined,
  isEmpty: Boolean || undefined,
  index: String || undefined,
  form: String || null || undefined,
  lemma: String || null || undefined,
  upostag: String || null || undefined,
  xpostag: String || null || undefined,
  feats: String || null || undefined,
  head: String || null || undefined,
  deprel: String || null || undefined,
  deps: String || null || undefined,
  other: Array || undefined,
  analyses: [
    subTokens: [
      semicolon: Boolean || undefined,
      isEmpty: Boolean || undefined,
      index: String || undefined,
      form: String || null || undefined,
      lemma: String || null || undefined,
      upostag: String || null || undefined,
      xpostag: String || null || undefined,
      feats: String || null || undefined,
      head: String || null || undefined,
      deprel: String || null || undefined,
      deps: String || null || undefined,
      other: Array || undefined,
    ]
  ]
}
*/

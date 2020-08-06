"use strict";

import {BaseToken} from "./base-token";
import {Analysis} from "./analysis";
import type {SubToken} from "./sub-token";

export class Token extends BaseToken {
  public _i: number;
  constructor(sent?: any, serial?: any) {
    super(sent, "Token", serial);

    this._analyses =
        (serial.analyses || []).map((ana: any) => new Analysis(sent, ana));
    this._i = (this._analyses.length ? 0 : null);
  }

  get analysis(): Analysis|null {
    if (this._i === null)
      return null;

    return this._analyses[this._i];
  }

  get subTokens(): SubToken[] {
    return this.analysis ? this.analysis.subTokens : [];
  }
}

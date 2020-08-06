"use strict";

import {NxError} from "utils";
import {NxBaseClass} from "./base-class";
import {SubToken} from "./sub-token";
import type {TokenSerial} from "./base-token";

export interface AnalysisSerial {
  subTokens: TokenSerial[];
}

/**
 * Abstraction over a CG3 analysis.  Most sentences have just one of these for
 *  each token.
 */
export class Analysis extends NxBaseClass {
  public _subTokens: SubToken[];
  constructor(sent: any, serial: any) {
    super("Analysis");
    this._subTokens =
        (serial.subTokens || []).map((sub: any) => new SubToken(sent, sub));
  }

  get subTokens() { return this._subTokens; }
}

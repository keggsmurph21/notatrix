"use strict";

import {BaseToken, Form, Indices} from "./base-token";

export class RootToken extends BaseToken {
  public readonly form: Form;
  public readonly indices: Indices;
  constructor(sent: any) {
    super(sent, "RootToken");

    this.form = "ROOT";
    this.indices = {
      absolute: 0,
      conllu: "0",
      cg3: 0,
      cytoscape: 0,
      serial: null,
    };
  }
}

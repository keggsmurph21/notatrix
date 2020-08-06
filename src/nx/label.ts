"use strict";

import {hashStringToHex, getContrastingColor} from "utils";
import {NxBaseClass} from "./base-class";

export interface LabelSerial {
  name: string;
  desc: string;
  bColor: string;
  tColor: string;
}

/**
 * Allows us to extract labels from "field = value"-type comments, so that
 *  we can filter a corpus by Label and arbitrarily apply that label to
 *  multiple Sentences.
 */
export class Label extends NxBaseClass {
  public bColor: string;
  public tColor: string;
  public desc: string;
  constructor(public readonly name: string) {
    super("Label");
    this.bColor = hashStringToHex(name);
    this.tColor = getContrastingColor(this.bColor);
    this.desc = "";
  }

  serialize(): LabelSerial {
    return {
      name: this.name,
      desc: this.desc,
      bColor: this.bColor,
      tColor: this.tColor,
    };
  }

  static deserialize(serial: LabelSerial): Label {
    const label = new Label(serial.name);
    label.desc = serial.desc;
    label.bColor = serial.bColor;
    label.tColor = serial.tColor;

    return label;
  }
}

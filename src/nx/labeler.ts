"use strict";

const _ = require("underscore");

import {CommentType} from "./comment";
import {getRandomHexColor, getContrastingColor, RE} from "utils";
import {NxBaseClass} from "./base-class";
import {Label, LabelSerial} from "./label";
import type {Sentence} from "./sentence";

interface LabelData {
  _label: Label;
  _sents: Set<Sentence>;
}

export interface LabelerSerial {
  labels: LabelSerial[];
  filter: string[];
}

/**
 * Abstraction to hold a mapping of String => Label pairs, as well as some
 *  methods for doing work on those labels.
 */
export class Labeler extends NxBaseClass {
  public _labels: {[name: string]: LabelData} = {};
  public _filter: Set<string> = new Set();
  constructor(public readonly corpus: any) { super("Labeler"); }

  /**
   * @typedef Labeler_SortReturnT
   * @property {String} name Label name
   * @property {Number} size Number of sentences with Label
   */

  /**
   * Sort all labels in Corpus by number of Sentences with that label
   *
   * @return {Labeler_SortReturnT}
   */
  sort() {
    const size = (name: string) => this._labels[name]._sents.size;

    return Object.keys(this._labels)
        .sort((x, y) => {
          if (size(x) < size(y))
            return 1;

          if (size(x) > size(y))
            return -1;

          return 0;
        })
        .map(name => {
          return {
            name: name,
            size: this._labels[name]._sents.size,
          };
        });
  }

  serialize(): LabelerSerial {
    return {
      labels:
          Object.values(this._labels).map(label => label._label.serialize()),
      filter: Array.from(this._filter)
    };
  }

  static deserialize(corpus: any, serial: LabelerSerial): Labeler {
    const labeler = new Labeler(corpus);
    serial.labels.forEach(label => labeler.addLabel(label.name));
    labeler._filter = new Set(...serial.filter);

    return labeler;
  }

  /**
   * Get a Label given its name
   *
   * @param {String} name
   * @return {Label}
   */
  get(name: string): LabelData { return this._labels[name]; }

  /**
   * Get the number of sentences with a given Label
   *
   * @param {String} name
   * @return {Number}
   */
  count(name: string): number {
    return this._labels[name] ? this._labels[name]._sents.size : 0;
  }

  /**
   * Crawl through a sentence's comments to see if it has a particular Label
   *
   * @param {Sentence} sent
   * @param {String} searching
   * @return {Boolean}
   */
  sentenceHasLabel(sent: Sentence, searching: string): boolean {
    let hasLabel = false;
    sent.comments.forEach(comment => {
      if (comment.type === CommentType.Label) {
        comment.labels.forEach(name => {
          if (name === searching)
            hasLabel = true;
        });
      }
    });

    return hasLabel;
  }

  /**
   * Checks if a given Sentence should be filtered
   *
   * @param {Sentence} sent
   * @return {Boolean}
   */
  sentenceInFilter(sent: Sentence): boolean {
    let inFilter = false;
    sent.comments.forEach(comment => {
      if (comment.type === CommentType.Label) {
        comment.labels.forEach(name => {
          if (this._filter.has(name))
            inFilter = true;
        });
      }
    });

    return inFilter;
  }

  /**
   * Adds a Label name to the filter
   *
   * @param {String} name
   */
  addToFilter(name: string): void {
    if (this.get(name))
      this._filter.add(name);
  }

  /**
   * Removes a Label name from the filter
   *
   * @param {String} name
   */
  removeFromFilter(name: string): void { this._filter.delete(name); }

  /**
   * Callback to be triggered whenever we add a new Sentence to a Corpus
   *
   * @param {Sentence} sent
   */
  onAdd(sent: Sentence): void {
    sent.comments.forEach(comment => {
      if (comment.type === CommentType.Label) {
        comment.labels.forEach(name => { this.addLabel(name, [sent]); });
      }
    });
  }

  /**
   * Callback to be triggered whenever we remove a Sentence from a Corpus
   *
   * @param {Sentence} sent
   */
  onRemove(sent: Sentence): void {
    sent.comments.forEach(comment => {
      if (comment.type === CommentType.Label) {
        comment.labels.forEach(name => { this.removeLabel(name, [sent]); });
      }
    });
  }

  /**
   * Add new Label with the given name (if it doesn't already exist) and
   *  attach it to a list of Sentences.
   *
   * @param {String} name
   * @param {Sentence[]} [sents=[]]
   */
  addLabel(name: string, sents: Sentence[] = []): LabelData {
    let label = this.get(name);
    if (!label) {
      label = {
        _label: new Label(name),
        _sents: new Set(),
      };
      this._labels[name] = label;
    }

    sents.forEach(sent => {
      sent.comments.forEach(comment => {
        if (comment.type === CommentType.Label) {
          comment.labels.push(name);
          label._sents.add(sent);
        }
      });
    });

    return label;
  }

  /**
   * Remove a Label by name (if it exists) from a set of Sentences (can
   *  be omitted).
   *
   * @param {String} name
   * @param {Sentence[]} sents
   */
  removeLabel(name: string, sents: Sentence[] = []): LabelData|null {
    const label = this.get(name);
    if (!label)
      return null;

    (sents || label._sents)
        .forEach((sent: Sentence) => {sent.comments.forEach(comment => {
                   if (comment.type === CommentType.Label) {
                     const index = comment.labels.indexOf(name);
                     comment.labels.splice(index, 1);
                   }
                 })});

    if (!this.count(name))
      delete this._labels[name];

    return label;
  }

  /**
   * Change the name of a Label from oldName => newName
   *
   * @param {String} oldName
   * @param {String} newName
   * @return {Label}
   */
  changeLabelName(oldName: string, newName: string): LabelData|null {
    if (this.get(newName))
      return null; // already exists

    const oldLabel = this.removeLabel(oldName);
    if (!oldLabel)
      return null;

    const newLabel = this.addLabel(newName, Array.from(oldLabel._sents));
    newLabel._label.desc = oldLabel._label.desc;
    newLabel._label.bColor = oldLabel._label.bColor;
    newLabel._label.tColor = oldLabel._label.tColor;

    return newLabel;
  }

  /**
   * Change the color of a Label to a given color
   *
   * @param {String} name
   * @param {String} color
   * @return {Boolean} - whether the operation succeeded
   */
  changeLabelColor(name: string, color: string): boolean {
    const label = this.get(name);
    if (!label)
      return false;

    if (color) {
      color = (color.match(RE.hexColorSixDigit) || [])[1];
      const int = parseInt(color, 16);
      if (isNaN(int) || int<0 || int>255)
        return false; // out of bounds
    } else {
      color = getRandomHexColor();
    }

    label._label.bColor = color;
    label._label.tColor = getContrastingColor(color);

    return true;
  }

  /**
   * Change the description of a Label to a given description
   *
   * @param {String} name
   * @param {String} desc
   * @return {Boolean} - whether the operation succeeded
   */
  changeLabelDesc(name: string, desc: string): boolean {
    const label = this.get(name);
    if (!label)
      return false;

    if (typeof desc !== "string")
      return false;

    label._label.desc = desc;
    return true;
  }
}

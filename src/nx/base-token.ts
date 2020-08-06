"use strict";

const _ = require("underscore");
const uuid = require("uuid/v4");

const utils = require("../utils");
const NxError = utils.NxError;
import {NxBaseClass} from "./base-class";
import {Relation, RelationItem, RelationSet} from "./relation-set";
import type {SubToken} from "./sub-token";
import type {Analysis, AnalysisSerial} from "./analysis";

export interface Indices {
  absolute: number|null;
  cg3: number|null;
  conllu: string|null;
  cytoscape: number|null;
  serial: number|null;
  ana?: number|null;
  sup?: number|null;
  sub?: number|null;
}

export type Uuid = unknown;
export type Semicolon = unknown;
export type IsEmpty = unknown;
export type Form = string;
export type Lemma = string;
export type UPosTag = string;
export type XPosTag = string;

interface HeadSerial {
  deprel: string;
  index: string;
}

export interface TokenSerial {
  uuid?: Uuid;
  index: number;
  semicolon?: Semicolon;
  isEmpty?: IsEmpty;
  form?: Form;
  lemma?: Lemma;
  upostag?: UPosTag;
  xpostag?: XPosTag;
  feats?: any;
  misc?: any;
  heads?: HeadSerial[];
  analyses?: AnalysisSerial[];
}

/**
 * Ancestor of Token, SubToken, SuperToken.  Implements methods common
 *  to all three of them.
 */
export class BaseToken extends NxBaseClass {
  public readonly uuid: Uuid;
  public semicolon: Semicolon;
  public isEmpty: IsEmpty;
  public form: Form;
  public lemma: Lemma;
  public upostag: UPosTag;
  public xpostag: XPosTag;
  public _feats: string[] = undefined;
  public _feats_inited: boolean = false;
  public _misc: string[] = undefined;
  public _misc_inited: boolean = false;
  public _heads: HeadSerial[];
  public _analyses: Analysis[]|null = null;
  public heads: RelationSet;
  public dependents: RelationSet;
  public indices: Indices;
  constructor(public sent: any, name: string, serial: any = {}) {
    super(name);

    this.uuid = uuid();

    this.uuid = serial.uuid || this.uuid;

    this.semicolon = serial.semicolon;
    this.isEmpty = serial.isEmpty;
    this.form = serial.form;
    this.lemma = serial.lemma;
    this.upostag = serial.upostag;
    this.xpostag = serial.xpostag;
    this.feats = serial.feats;
    this.misc = serial.misc;

    this._heads = serial.heads;
    this.heads = new RelationSet(this, "dependents");
    this.dependents = new RelationSet(this, "heads");

    this.indices = {
      absolute: null,
      conllu: null,
      cg3: null,
      cytoscape: null,
      serial: serial.index,
    };
  }

  /**
   * Add a head to a token with a dependency relation.
   *
   * @param {BaseToken} head
   * @param {String} deprel
   */
  addHead(head: BaseToken, deprel: string): boolean {
    if (!(head instanceof BaseToken))
      throw new NxError("cannot add head unless it is a token");

    if (head === this)
      throw new NxError("token cannot be its own head");

    if (typeof deprel !== "string" && deprel != null)
      throw new NxError("deprel must be a string, null, or undefined");

    // if we're not enhanced, only can have 1 head at a time
    if (!this.sent.options.enhanced)
      this.heads.clear();

    return this.heads.add(head, deprel);
  }

  /**
   * Change the dependency relation for a given head.
   *
   * @param {BaseToken} head
   * @param {String} deprel
   */
  modifyHead(head: BaseToken, deprel: Relation): boolean {
    if (!(head instanceof BaseToken))
      throw new NxError("cannot add head unless it is a token");

    if (typeof deprel !== "string" && deprel != null)
      throw new NxError("deprel must be a string, null, or undefined");

    return this.heads.modify(head, deprel);
  }

  /**
   * Remove a head and its dependency relation.
   *
   * @param {BaseToken} head
   */
  removeHead(head: BaseToken): boolean {
    if (!(head instanceof BaseToken))
      throw new NxError("cannot add head unless it is a token");

    return !!this.heads.remove(head);
  }

  /**
   * Remove all heads
   */
  removeAllHeads() { return this.heads.clear(); }

  /**
   * Apply a callback to each of a token's heads
   */
  mapHeads<T>(callback: (item: RelationItem, index?: number) => T): T[] {
    // if (this.sent.options.enhanced) {
    return this.heads.map(callback);
    /*} else {
      return this.heads.first
        ? [ this.heads.first ].map(callback)
        : [].map(callback);
    }*/
  }

  /**
   * Apply a callback to each of token's dependents
   */
  mapDependents<T>(callback: (item: RelationItem, index?: number) => T): T[] {
    return this.dependents.map(callback);
  }

  /**
   * Get the head index for a given format
   *
   * @param {String} format
   * @return {String}
   */
  getHead(format: string): string|null {
    if (!this.heads.length)
      return null;

    if (format === "CoNLL-U")
      return `${this.heads.first.token.indices.conllu}`;

    if (format === "CG3")
      return `${this.heads.first.token.indices.cg3}`;

    return `${this.heads.first.token.indices.absolute}`;
  }

  _getDeprel(): string|null {
    if (!this.heads.length)
      return null;

    return this.heads.first.deprel;
  }

  _getDeps(format: string): string[] {
    function getIndex(token: BaseToken): string|null {
      if (format === "CoNLL-U")
        return token.indices.conllu;

      if (format === "CG3")
        return token.indices.cg3.toString();

      return token.indices.absolute.toString();
    }

    if (!this.heads.length || !this.sent.options.enhanced)
      return [];

    return this.mapHeads(utils.noop)
        .sort((x: RelationItem, y: RelationItem) => {
          if (getIndex(x.token) < getIndex(y.token))
            return -1;

          if (getIndex(x.token) > getIndex(y.token))
            return 1;

          return 0;
        })
        .map((head: RelationItem) => {
          return head.deprel ? `${getIndex(head.token)}:${head.deprel}`
                             : `${getIndex(head.token)}`;
        });
  }

  /**
   * Mark this token as "empty" (aka "null")
   *
   * @param {boolean} isEmpty
   */
  setEmpty(isEmpty: boolean): void { this.isEmpty = isEmpty; }

  /**
   * Apply a callback to each of a token's analyses and subTokens
   *
   * @param {Function} callback
   */
  walk<T>(callback: (st: SubToken, i?: number) => T): T[][]|null {
    let i = 0;
    if (this._analyses)
      return this._analyses.map(analysis => {
        return analysis._subTokens.map(
            subToken => { return callback(subToken, ++i); });
      });

    return null;
  }

  /**
   * Serialize a token to JSON format
   */
  serialize(): TokenSerial {
    let serial: TokenSerial = {

      uuid: this.uuid,
      form: this.form,
      index: this.indices.absolute,

      semicolon: this.semicolon,
      isEmpty: this.isEmpty,
      lemma: this.lemma,
      upostag: this.upostag,
      xpostag: this.xpostag,
      feats: this._feats,
      misc: this._misc,
      heads: this.mapHeads(head => {
        return {
          index: head.token.indices.absolute.toString(),
          deprel: head.deprel,
        };
      }),
    };

    if (this._analyses && this._analyses.length)
      serial.analyses = this._analyses.map(analysis => {
        return {
          subTokens: analysis._subTokens.map(subToken => subToken.serialize()),
        };
      });

    serial = _.pick(serial, (value: any) => value !== undefined);

    return serial;
  }

  get isSuperToken() {
    return !!(this._analyses || []).reduce((total, analysis) => {
      return total += analysis._subTokens.length;
    }, 0);
  }

  get value() { return this.form || this.lemma; }

  get feats(): string[]|undefined {
    return this._feats_inited ? this._feats : undefined;
  }

  set feats(feats: string[]|undefined) {
    if (feats === undefined)
      return;

    this._feats_inited = true;
    this._feats = feats || [];
  }

  get misc(): string[]|undefined {
    return this._misc_inited ? this._misc : undefined;
  }

  set misc(misc: string[]|undefined) { // [(serial.misc || ''), (serial.other ||
    // []).join('|')].join('|');
    if (misc === undefined)
      return;

    this._misc_inited = true;
    this._misc = misc || [];
  }

  set other(other: string[]|undefined) {
    if (other === undefined)
      return;

    if (typeof other === "string")
      other = [other];

    this._misc_inited = true;
    this._misc = (other || []).filter(utils.thin);
  }
}

"use strict";

import * as _ from "underscore";
import * as fs from "fs";
import * as path from "path";
import {v4 as uuid} from "uuid";

import {NxError} from "utils";

import split from "../splitter";
import detect from "../detector";
import parse from "../parser";
import generate from "../generator";

import {NxBaseClass} from "./base-class";
import {Label} from "./label";
import {Labeler, LabelerSerial} from "./labeler";
import {Sentence, SentenceOptions, SentenceSerial} from "./sentence";

interface CorpusMeta {
  //
}

interface CorpusSnapshot {
  filename: string|null;
  sentences: number;
  errors: number;
  labels: Label[];
}

interface CorpusSerial {
  filename: string|null;
  meta: CorpusMeta;
  options: SentenceOptions;
  labeler: LabelerSerial;
  sentences: SentenceSerial[];
  index: number;
}

/**
 * Abstraction over a collection of Sentences.  NOTE: this class is
 *  out-of-date and will be replaced soon :)
 */
export class Corpus extends NxBaseClass {
  public treebank_id: unknown;
  public options: SentenceOptions;
  public filename: string|null = null;
  public sources: string[] = [];
  public _labeler: Labeler;
  public _sentences: Sentence[] = [];
  public _index: number = -1;
  public _meta: CorpusMeta = {};
  public _filterIndex: number = -1;
  constructor(options: SentenceOptions) {
    super("Corpus");
    this.treebank_id = uuid();

    this.options = _.defaults(options, {
      requireOne: true,
    });

    this._labeler = new Labeler(this);
  }

  get snapshot() {
    return {
      filename: this.filename,
      sentences: this.length,
      errors: this.errors.length,
      labels: this._labeler.sort(),
    };
  }

  get length() { return this._sentences.length; }

  get errors() { return this._sentences.filter(sent => sent.isParsed); }

  serialize(): CorpusSerial {
    return {
      filename: this.filename,
      meta: this._meta,
      options: this.options,
      labeler: this._labeler.serialize(),
      sentences: this._sentences.map(sent => sent.serialize(this.options)),
      index: this._index,
    };
  }

  static deserialize(serial: CorpusSerial): Corpus {
    const corpus = new Corpus(serial.options);
    corpus.filename = serial.filename || null;
    corpus._meta = serial.meta;
    corpus._labeler = Labeler.deserialize(corpus, serial.labeler);
    corpus._sentences = serial.sentences.map(s => {
      const sent = new Sentence(s, _.defaults(s.options, serial.options));
      sent._meta = s.meta;

      Object.entries(corpus._labeler._labels).forEach(([name, label]) => {
        if (corpus._labeler.sentenceHasLabel(sent, name))
          label._sents.add(sent);
      });

      return sent;
    });
    corpus.index = serial.index;

    return corpus;
  }

  get sentence() { return this.index < 0 ? null : this._sentences[this.index]; }

  get filtered(): Sentence[] {
    return this._labeler._filter.size
               ? this._sentences.filter(
                     sent => this._labeler.sentenceInFilter(sent))
               : [];
  }

  get index() { return this._index; }

  set index(index: number) {
    const filtered = this.filtered, total = filtered.length || this.length;

    if (isNaN(index)) {
      index = filtered.length ? this._filterIndex : this.index;
    } else if (index < 0 && total) {
      index = 0;
    } else if (index > total - 1) {
      index = total - 1;
    }

    if (filtered.length) {
      this._filterIndex = index;
      this._index = filtered[index]._index;
    } else {
      this._filterIndex = -1;
      this._index = index;
    }
  }

  reindex() {
    this._sentences.forEach((sent, i) => { sent._index = i; });
  }

  first() {
    this.index = this.length ? 0 : -1;
    return this;
  }
  prev() {
    if (!this.length)
      return null;

    const filtered = this.filtered;
    let index = filtered.length ? this._filterIndex : this._index;

    if (index === 0)
      return null;

    this.index = --index;
    return this;
  }
  next() {
    if (!this.length)
      return null;

    const filtered = this.filtered;
    let index = filtered.length ? this._filterIndex : this._index;
    let total =
        filtered.length ? filtered.length - 1 : this._sentences.length - 1;

    if (index === total)
      return null;

    this.index = ++index;
    return this;
  }
  last() {
    const filtered = this.filtered;
    this.index = filtered.length ? filtered.length - 1 : this.length - 1;

    return this;
  }

  getSentence(index: number): Sentence|null {
    if (index == undefined)
      index = this.index;

    if (0 > index || index > this.length - 1)
      return null;

    return this._sentences[index] || null;
  }

  setSentence(index: string, text: string) {
    if (text === null || text === undefined) { // if only passed 1 arg
      text = index || "";
      index = this.index.toString();
    }

    const i = parseInt(index);
    if (isNaN(i) || this.getSentence(i) === null)
      throw new NxError(`cannot set sentence at index ${index}`);

    this._labeler.onRemove(this.getSentence(i));
    const sent = new Sentence(text, this.options);
    sent.corpus = this;

    this._sentences[i] = sent;
    this._labeler.onAdd(sent);
    this.reindex();

    return sent;
  }

  insertSentence(index?: string, text?: string): Sentence {
    if (text === null || text === undefined) { // if only passed 1 arg
      text = index || "";
      index = (this.index + 1).toString();
    }

    let i = parseFloat(index);
    if (isNaN(i))
      throw new NxError(`cannot insert sentence at index ${index}`);

    i = i < 0 ? 0 : i > this.length ? this.length : parseInt(index);

    const sent = new Sentence(text, this.options);
    sent.corpus = this;

    this._sentences = this._sentences.slice(0, i).concat(sent).concat(
        this._sentences.slice(i));
    this._labeler.onAdd(sent);

    this.index = i;
    this.reindex();
    return sent;
  }

  removeSentence(index: string): Sentence {
    if (!this.length)
      return null;

    if (index === undefined) // if not passed args
      index = this.index.toString();

    let i = parseFloat(index);
    if (isNaN(i))
      throw new NxError(`cannot remove sentence at index ${index}`);

    i = i < 0 ? 0 : i > this.length - 1 ? this.length - 1 : parseInt(index);

    const removed = this._sentences.splice(i, 1)[0];
    if (!this.length)
      this.insertSentence();

    this._labeler.onRemove(removed);

    if (i <= this.index)
      this.index--;
    this.reindex();
    return removed;
  }

  pushSentence(text: string): Sentence {
    return this.insertSentence(Infinity.toString(), text);
  }

  popSentence(): Sentence { return this.removeSentence(Infinity.toString()); }

  parse(s: string): Corpus {
    const splitted = split(s, this.options); // might throw errors
    const index = this.index || 0;

    splitted.forEach((split: string, i: number) => {
      // console.log(i, split);
      this.insertSentence((index + i).toString(), split);
    });

    return this;
  }

  static fromString(s: string, options: SentenceOptions): Corpus {
    const corpus = new Corpus(options);
    corpus.parse(s);
    return corpus;
  }

  readFile(filepath: string, next: (c: Corpus) => void): void {
    fs.exists(filepath, exists => {
      if (!exists)
        throw new NxError(`cannot read file: cannot find path ${filepath}`);

      fs.readFile(filepath, (err, data) => {
        if (err)
          throw err;

        this.parse(data.toString());
        this.sources.push(filepath);
        this.filename = path.basename(filepath);

        if (next)
          next(this);
      });
    });
  }

  static fromFile(filepath: string,
                  options: SentenceOptions|((c: Corpus) => void),
                  next?: (c: Corpus) => void): Corpus {
    if (next === undefined) {
      // @ts-ignore 2322
      next = options;
      options = {};
    }
    const corpus = new Corpus(options as SentenceOptions);
    corpus.readFile(filepath, next);

    return corpus;
  }

  writeFile(format: string, filepath: string): Corpus {
    filepath = this.getWritePath(filepath);

    const contents = this.serialize();
    fs.writeFile(filepath, JSON.stringify(contents), err => {
      if (err)
        throw err;
    });

    return this;
  }

  getWritePath(filepath: string): string {
    if (filepath)
      return filepath;

    const lastSource = this.sources.slice(-1)[0];
    return (lastSource || "export") + ".nxcorpus";
  }
}
